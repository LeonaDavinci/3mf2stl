import { readFileSync } from "fs";
import { convert3mf, zipStls } from "../lib/converter.ts";

const p = "C:/Users/star/WorkBuddy/2026-07-28-00-35-53/3mf2stl/sample.3mf";
const buf = readFileSync(p);
const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);

const res = await convert3mf(ab, { format: "binary", name: "sample.3mf" }, () => {});
console.log("binary  -> triangles:", res.stats.triangles, "bytes:", res.bytes.byteLength,
  "bbox:", res.stats.bbox.size.map((n) => +n.toFixed(2)), "unit:", res.stats.unit);

const res2 = await convert3mf(ab, { format: "ascii", name: "sample.3mf" });
const asciiText = Buffer.from(res2.bytes).toString("latin1");
console.log("ascii   -> bytes:", res2.bytes.byteLength, "starts:", JSON.stringify(asciiText.slice(0, 16)));

if (!asciiText.startsWith("solid sample")) throw new Error("ASCII header wrong");
if (res.bytes.byteLength !== 84 + res.stats.triangles * 50) throw new Error("binary size wrong");
if (res.stats.triangles !== 24) throw new Error("expected 24 triangles, got " + res.stats.triangles);

const z = zipStls([{ name: "sample.stl", bytes: res.bytes }]);
console.log("zip     -> bytes:", z.byteLength, "(should be > binary bytes)");
if (z.byteLength <= res.bytes.byteLength) throw new Error("zip not larger than payload");

console.log("\nALL ENGINE CHECKS PASSED");
