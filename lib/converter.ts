// lib/converter.ts — Fully client-side 3MF -> STL conversion engine.
//
// No DOM / WebGL dependencies. It parses the 3MF XML with a small,
// namespace-agnostic tokenizer so it runs identically in the browser and in
// Node (handy for tests). 3MF is a ZIP container holding one or more `.model`
// XML files. Each model declares <resources> with <object> meshes and a
// <build> listing the objects (with optional 4x4 transforms) that get printed.
// We resolve the build tree (including <components>), transform every vertex,
// compute facet normals, then emit a binary or ASCII STL.

import { unzipSync, zipSync, type Unzipped } from "fflate";

type Vec3 = [number, number, number];

function attr(tag: string, name: string): string | null {
  const m = tag.match(new RegExp(name + "\\s*=\\s*[\"']([^\"']*)[\"']", "i"));
  return m ? m[1] : null;
}

// Parse a 3MF transform string into a row-major length-16 matrix.
function parseMatrix(str: string | null): number[] {
  if (!str) return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  const nums = (str.match(/-?\d+\.?\d*(?:e[-+]?\d+)?/gi) || [])
    .map(Number)
    .filter((n) => !Number.isNaN(n));
  if (nums.length >= 16) return nums.slice(0, 16);
  if (nums.length >= 12) {
    return [
      nums[0], nums[1], nums[2], nums[3],
      nums[4], nums[5], nums[6], nums[7],
      nums[8], nums[9], nums[10], nums[11],
      0, 0, 0, 1,
    ];
  }
  return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
}

function mul4(a: number[], b: number[]): number[] {
  const r = new Array(16);
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let s = 0;
      for (let k = 0; k < 4; k++) s += a[i * 4 + k] * b[k * 4 + j];
      r[i * 4 + j] = s;
    }
  }
  return r;
}

function applyM(m: number[], x: number, y: number, z: number): Vec3 {
  return [
    m[0] * x + m[1] * y + m[2] * z + m[3],
    m[4] * x + m[5] * y + m[6] * z + m[7],
    m[8] * x + m[9] * y + m[10] * z + m[11],
  ];
}

interface ObjDef {
  verts: Vec3[];
  tris: [number, number, number][];
  comps: { objectid: string; transform: string | null }[];
}
interface ParsedModel {
  objects: Record<string, ObjDef>;
  buildItems: { objectid: string; transform: string | null }[];
  unit: string;
}

function parseModel(xml: string): ParsedModel {
  const result: ParsedModel = { objects: {}, buildItems: [], unit: "millimeter" };

  const objRe = /<object\b[^>]*>([\s\S]*?)<\/object>/g;
  let om: RegExpExecArray | null;
  while ((om = objRe.exec(xml)) !== null) {
    const open = om[0].slice(0, om[0].indexOf(">"));
    const body = om[1];
    const id = attr(open, "id");
    if (id === null) continue;

    const verts: Vec3[] = [];
    const vRe = /<vertex\b[^>]*>/g;
    let vm: RegExpExecArray | null;
    while ((vm = vRe.exec(body)) !== null) {
      const t = vm[0];
      const x = parseFloat(attr(t, "x") || "0");
      const y = parseFloat(attr(t, "y") || "0");
      const z = parseFloat(attr(t, "z") || "0");
      verts.push([x, y, z]);
    }

    const tris: [number, number, number][] = [];
    const tRe = /<triangle\b[^>]*>/g;
    let tm: RegExpExecArray | null;
    while ((tm = tRe.exec(body)) !== null) {
      const t = tm[0];
      tris.push([
        parseInt(attr(t, "v1") || "-1", 10),
        parseInt(attr(t, "v2") || "-1", 10),
        parseInt(attr(t, "v3") || "-1", 10),
      ]);
    }

    const comps: { objectid: string; transform: string | null }[] = [];
    const cRe = /<component\b[^>]*>/g;
    let cm: RegExpExecArray | null;
    while ((cm = cRe.exec(body)) !== null) {
      const t = cm[0];
      const oid = attr(t, "objectid");
      if (oid !== null) comps.push({ objectid: oid, transform: attr(t, "transform") });
    }

    result.objects[id] = { verts, tris, comps };
  }

  const buildM = xml.match(/<build\b[^>]*>([\s\S]*?)<\/build>/i);
  if (buildM) {
    const iRe = /<item\b[^>]*>/g;
    let im: RegExpExecArray | null;
    while ((im = iRe.exec(buildM[1])) !== null) {
      const t = im[0];
      const oid = attr(t, "objectid");
      if (oid !== null) result.buildItems.push({ objectid: oid, transform: attr(t, "transform") });
    }
  }

  const modelM = xml.match(/<model\b[^>]*>/i);
  result.unit = modelM ? (attr(modelM[0], "unit") || "millimeter") : "millimeter";

  return result;
}

// Recursively resolve the build tree into world-space triangles.
function collectTriangles(parsed: ParsedModel): Vec3[][] {
  const out: Vec3[][] = [];
  const stack: { id: string; m: number[] }[] = parsed.buildItems.map((it) => ({
    id: it.objectid,
    m: parseMatrix(it.transform),
  }));

  let guard = 0;
  while (stack.length) {
    if (++guard > 5_000_000) break; // safety against pathological recursion
    const { id, m } = stack.pop()!;
    const def = parsed.objects[id];
    if (!def) continue;

    for (const [a, b, c] of def.tris) {
      const va = def.verts[a];
      const vb = def.verts[b];
      const vc = def.verts[c];
      if (!va || !vb || !vc) continue;
      out.push([
        applyM(m, va[0], va[1], va[2]),
        applyM(m, vb[0], vb[1], vb[2]),
        applyM(m, vc[0], vc[1], vc[2]),
      ]);
    }

    for (const comp of def.comps) {
      stack.push({ id: comp.objectid, m: mul4(m, parseMatrix(comp.transform)) });
    }
  }
  return out;
}

export interface ConvertOptions {
  format?: "binary" | "ascii";
  name?: string;
}

export interface ConvertStats {
  triangles: number;
  objects: number;
  unit: string;
  bbox: { min: number[]; max: number[]; size: number[] };
  bytes: number;
}

export interface ConvertResult {
  bytes: Uint8Array;
  stats: ConvertStats;
  baseName: string;
}

/**
 * Convert a .3mf ArrayBuffer to STL bytes.
 * @param onProgress called with percent (0-100) and a human stage label.
 */
export async function convert3mf(
  buffer: ArrayBuffer,
  opts: ConvertOptions = {},
  onProgress: (pct: number, stage: string) => void = () => {},
): Promise<ConvertResult> {
  const format = opts.format || "binary";
  const baseName = (opts.name || "model").replace(/\.3mf$/i, "");

  onProgress(8, "Extracting archive");
  const files: Unzipped = unzipSync(new Uint8Array(buffer));

  onProgress(22, "Reading 3D model");
  const decoder = new TextDecoder();
  const models: ParsedModel[] = [];
  let unit = "millimeter";
  for (const [name, data] of Object.entries(files)) {
    if (/\.model$/i.test(name)) {
      const xml = decoder.decode(data);
      if (/<model\b/i.test(xml)) {
        const p = parseModel(xml);
        unit = p.unit;
        models.push(p);
      }
    }
  }
  if (!models.length) throw new Error("No 3D model found inside this .3mf file.");

  onProgress(38, "Resolving mesh & transforms");
  let allTriangles: Vec3[][] = [];
  let objectCount = 0;
  for (const m of models) {
    objectCount += Object.keys(m.objects).length;
    const tris = collectTriangles(m);
    allTriangles = allTriangles.concat(tris);
  }

  const n = allTriangles.length;
  if (!n) throw new Error("The 3MF model contains no triangles to export.");

  const positions = new Float32Array(n * 9);
  const normals = new Float32Array(n * 9);
  const min = [Infinity, Infinity, Infinity];
  const max = [-Infinity, -Infinity, -Infinity];

  onProgress(46, "Building STL geometry");
  const step = Math.max(1, Math.floor(n / 200)); // report ~200 times
  const yieldEvery = Math.max(20000, Math.floor(n / 300)); // let the UI repaint
  const sleep = () => new Promise<void>((r) => setTimeout(r, 0));
  let yi = 0;

  for (let i = 0; i < n; i++) {
    const [p1, p2, p3] = allTriangles[i];
    // facet normal = (p2-p1) x (p3-p1)
    const ux = p2[0] - p1[0];
    const uy = p2[1] - p1[1];
    const uz = p2[2] - p1[2];
    const vx = p3[0] - p1[0];
    const vy = p3[1] - p1[1];
    const vz = p3[2] - p1[2];
    let nx = uy * vz - uz * vy;
    let ny = uz * vx - ux * vz;
    let nz = ux * vy - uy * vx;
    const len = Math.hypot(nx, ny, nz) || 1;
    nx /= len;
    ny /= len;
    nz /= len;

    const o = i * 9;
    positions[o] = p1[0];
    positions[o + 1] = p1[1];
    positions[o + 2] = p1[2];
    positions[o + 3] = p2[0];
    positions[o + 4] = p2[1];
    positions[o + 5] = p2[2];
    positions[o + 6] = p3[0];
    positions[o + 7] = p3[1];
    positions[o + 8] = p3[2];
    normals[o] = nx;
    normals[o + 1] = ny;
    normals[o + 2] = nz;
    normals[o + 3] = nx;
    normals[o + 4] = ny;
    normals[o + 5] = nz;
    normals[o + 6] = nx;
    normals[o + 7] = ny;
    normals[o + 8] = nz;

    for (const p of [p1, p2, p3]) {
      if (p[0] < min[0]) min[0] = p[0];
      if (p[0] > max[0]) max[0] = p[0];
      if (p[1] < min[1]) min[1] = p[1];
      if (p[1] > max[1]) max[1] = p[1];
      if (p[2] < min[2]) min[2] = p[2];
      if (p[2] > max[2]) max[2] = p[2];
    }

    if (i % step === 0) onProgress(46 + Math.round((i / n) * 46), "Building STL geometry");
    if (++yi % yieldEvery === 0) {
      onProgress(46 + Math.round((i / n) * 46), "Building STL geometry");
      await sleep();
    }
  }

  onProgress(94, "Encoding " + (format === "binary" ? "binary" : "ASCII") + " STL");
  const bytes = format === "binary"
    ? encodeBinary(positions, normals, n, baseName)
    : encodeAscii(positions, normals, n, baseName);

  onProgress(100, "Done");
  return {
    bytes,
    stats: {
      triangles: n,
      objects: objectCount,
      unit,
      bbox: {
        min,
        max,
        size: [max[0] - min[0], max[1] - min[1], max[2] - min[2]],
      },
      bytes: bytes.byteLength,
    },
    baseName,
  };
}

function encodeBinary(positions: Float32Array, normals: Float32Array, n: number, name: string): Uint8Array {
  const buf = new ArrayBuffer(84 + n * 50);
  const dv = new DataView(buf);
  const header = "3MF TO STL  " + name;
  for (let i = 0; i < 80; i++) dv.setUint8(i, i < header.length ? header.charCodeAt(i) & 0xff : 0);
  dv.setUint32(80, n, true);
  let off = 84;
  for (let i = 0; i < n; i++) {
    const o = i * 9;
    dv.setFloat32(off, normals[o], true); off += 4;
    dv.setFloat32(off, normals[o + 1], true); off += 4;
    dv.setFloat32(off, normals[o + 2], true); off += 4;
    for (let k = 0; k < 9; k++) {
      dv.setFloat32(off, positions[o + k], true);
      off += 4;
    }
    dv.setUint16(off, 0, true); off += 2;
  }
  return new Uint8Array(buf);
}

function encodeAscii(positions: Float32Array, normals: Float32Array, n: number, name: string): Uint8Array {
  const lines = [`solid ${name}`];
  for (let i = 0; i < n; i++) {
    const o = i * 9;
    lines.push(`  facet normal ${fmt(normals[o])} ${fmt(normals[o + 1])} ${fmt(normals[o + 2])}`);
    lines.push("    outer loop");
    lines.push(`      vertex ${fmt(positions[o])} ${fmt(positions[o + 1])} ${fmt(positions[o + 2])}`);
    lines.push(`      vertex ${fmt(positions[o + 3])} ${fmt(positions[o + 4])} ${fmt(positions[o + 5])}`);
    lines.push(`      vertex ${fmt(positions[o + 6])} ${fmt(positions[o + 7])} ${fmt(positions[o + 8])}`);
    lines.push("    endloop");
    lines.push("  endfacet");
  }
  lines.push(`endsolid ${name}`);
  const enc = new TextEncoder();
  return enc.encode(lines.join("\n"));
}

function fmt(v: number): string {
  return Math.abs(v) < 1e-4 && v !== 0
    ? v.toExponential(6)
    : parseFloat(v.toFixed(6)).toString();
}

/** Bundle several STL byte arrays into a single ZIP (returns Uint8Array). */
export function zipStls(files: { name: string; bytes: Uint8Array }[]): Uint8Array {
  const obj: Record<string, Uint8Array> = {};
  for (const f of files) obj[f.name] = f.bytes;
  return zipSync(obj, { level: 0 });
}
