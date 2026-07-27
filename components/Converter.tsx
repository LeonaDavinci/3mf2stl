"use client";

import { useCallback, useRef, useState } from "react";
import { convert3mf, zipStls, type ConvertStats } from "@/lib/converter";

interface FileItem {
  id: string;
  name: string;
  size: number;
  file: File;
  status: "queued" | "converting" | "done" | "error";
  progress: number;
  stage: string;
  error?: string;
  baseName?: string;
  bytes?: Uint8Array;
  stats?: ConvertStats;
}

interface Toast {
  id: string;
  msg: string;
  kind: "ok" | "err" | "info";
}

const MAX_BYTES = 150 * 1024 * 1024; // 150 MB per file

function fmtBytes(b: number): string {
  if (b < 1024) return b + " B";
  if (b < 1024 * 1024) return (b / 1024).toFixed(1) + " KB";
  if (b < 1024 * 1024 * 1024) return (b / 1024 / 1024).toFixed(1) + " MB";
  return (b / 1024 / 1024 / 1024).toFixed(2) + " GB";
}

export default function Converter() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [format, setFormat] = useState<"binary" | "ascii">("binary");
  const [dragOver, setDragOver] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const processing = useRef(false);
  const pending = useRef<FileItem[]>([]);
  const formatRef = useRef(format);
  formatRef.current = format;

  const toast = useCallback((msg: string, kind: Toast["kind"] = "info") => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, msg, kind }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4200);
  }, []);

  const update = useCallback((id: string, patch: Partial<FileItem>) => {
    setFiles((fs) => fs.map((f) => (f.id === id ? { ...f, ...patch } : f)));
  }, []);

  const runConversion = useCallback(
    async (items: FileItem[]) => {
      if (processing.current) {
        pending.current.push(...items);
        return;
      }
      processing.current = true;
      try {
        for (const item of items) {
          update(item.id, { status: "converting", progress: 4, stage: "Reading file…" });
          try {
            const buf = await item.file.arrayBuffer();
            const res = await convert3mf(
              buf,
              { format: formatRef.current, name: item.name },
              (pct, stage) => update(item.id, { progress: pct, stage }),
            );
            update(item.id, {
              status: "done",
              progress: 100,
              stage: "Ready",
              baseName: res.baseName,
              bytes: res.bytes,
              stats: res.stats,
            });
          } catch (e) {
            const msg = e instanceof Error ? e.message : "Conversion failed";
            update(item.id, { status: "error", progress: 0, stage: "Failed", error: msg });
            toast(`${item.name}: ${msg}`, "err");
          }
        }
      } finally {
        processing.current = false;
        if (pending.current.length) {
          const next = pending.current;
          pending.current = [];
          void runConversion(next);
        }
      }
    },
    [update, toast],
  );

  const addFiles = useCallback(
    (list: File[]) => {
      const incoming = list.filter((f) => /\.3mf$/i.test(f.name));
      const skipped = list.length - incoming.length;
      if (skipped > 0) toast(`Skipped ${skipped} non-.3mf file(s).`, "info");
      const tooBig = incoming.filter((f) => f.size > MAX_BYTES);
      tooBig.forEach((f) => toast(`${f.name} exceeds the 150 MB limit.`, "err"));
      const accepted = incoming.filter((f) => f.size <= MAX_BYTES);
      if (!accepted.length) return;

      const newItems: FileItem[] = accepted.map((f) => ({
        id: crypto.randomUUID(),
        name: f.name,
        size: f.size,
        file: f,
        status: "queued",
        progress: 0,
        stage: "Queued",
      }));
      setFiles((prev) => [...prev, ...newItems]);
      void runConversion(newItems);
    },
    [runConversion, toast],
  );

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files?.length) addFiles(Array.from(e.dataTransfer.files));
  };

  const downloadOne = (item: FileItem) => {
    if (!item.bytes || !item.baseName) return;
    const blob = new Blob([item.bytes as BlobPart], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = item.baseName + ".stl";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  };

  const downloadAll = () => {
    const done = files.filter((f) => f.status === "done" && f.bytes);
    if (!done.length) return;
    const payload = done.map((f) => ({
      name: (f.baseName || f.name.replace(/\.3mf$/i, "")) + ".stl",
      bytes: f.bytes!,
    }));
    const zipped = zipStls(payload);
    const blob = new Blob([zipped as BlobPart], { type: "application/zip" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "3mf-to-stl-bundle.zip";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
    toast(`Downloaded ${done.length} STL file(s) as a ZIP.`, "ok");
  };

  const removeItem = (id: string) => setFiles((prev) => prev.filter((f) => f.id !== id));
  const clearAll = () => setFiles([]);

  const doneCount = files.filter((f) => f.status === "done").length;
  const busy = files.some((f) => f.status === "converting");
  const overall = files.length
    ? Math.round(files.reduce((s, f) => s + f.progress, 0) / files.length)
    : 0;
  const convertingAny = files.some(
    (f) => f.status === "converting" || f.status === "queued",
  );

  return (
    <div className="converter">
      <div
        className={"dropzone" + (dragOver ? " is-over" : "")}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".3mf"
          multiple
          hidden
          onChange={(e) => {
            if (e.target.files?.length) addFiles(Array.from(e.target.files));
            e.target.value = "";
          }}
        />
        <div className="dz-icon" aria-hidden>
          <svg viewBox="0 0 48 48" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M24 31V11" />
            <path d="M16 19l8-8 8 8" />
            <path d="M8 33v6a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2v-6" />
          </svg>
        </div>
        <p className="dz-title">Drop .3mf files here</p>
        <p className="dz-sub">
          or <span className="link">browse</span> — up to <strong>150 MB</strong> each, multiple files supported
        </p>
      </div>

      <div className="options">
        <span className="opt-label">Output format</span>
        <div className="seg">
          <button
            className={"seg-btn" + (format === "binary" ? " active" : "")}
            onClick={() => setFormat("binary")}
            type="button"
          >
            Binary STL
          </button>
          <button
            className={"seg-btn" + (format === "ascii" ? " active" : "")}
            onClick={() => setFormat("ascii")}
            type="button"
          >
            ASCII STL
          </button>
        </div>
      </div>

      {files.length > 0 && (
        <div className="batch">
          <div className="batch-head">
            <span>
              {convertingAny
                ? "Converting…"
                : doneCount === files.length
                  ? "All files converted"
                  : "In queue"}
            </span>
            <span className="batch-pct">{overall}%</span>
          </div>
          <div className="batch-bar">
            <div
              className={"batch-fill" + (overall >= 100 ? " complete" : "")}
              style={{ width: overall + "%" }}
            />
          </div>
        </div>
      )}

      {files.length > 0 && (
        <div className="queue">
          {files.map((f) => (
            <div key={f.id} className={"qitem q-" + f.status}>
              <div className="q-row">
                <span className="q-name" title={f.name}>
                  {f.name}
                </span>
                <span className="q-size">{fmtBytes(f.size)}</span>
                <button
                  className="q-x"
                  onClick={() => removeItem(f.id)}
                  aria-label="Remove"
                  type="button"
                >
                  ×
                </button>
              </div>

              {f.status === "done" && f.stats ? (
                <div className="q-meta">
                  <span>{f.stats.triangles.toLocaleString()} triangles</span>
                  <span>·</span>
                  <span>{fmtBytes(f.stats.bytes)}</span>
                  <span>·</span>
                  <span>{f.stats.unit}</span>
                  <button className="q-dl" onClick={() => downloadOne(f)} type="button">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M12 3v12" />
                      <path d="M7 10l5 5 5-5" />
                      <path d="M5 21h14" />
                    </svg>
                    Download STL
                  </button>
                </div>
              ) : f.status === "error" ? (
                <div className="q-error">{f.error || "Failed"}</div>
              ) : (
                <div className="q-progress">
                  <div className="bar">
                    <div className="bar-fill" style={{ width: f.progress + "%" }} />
                  </div>
                  <span className="q-stage">
                    {f.stage} · {Math.round(f.progress)}%
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {files.length > 0 && (
        <div className="actions">
          <button className="btn primary" onClick={downloadAll} disabled={!doneCount} type="button">
            Download all ({doneCount}) as ZIP
          </button>
          <button className="btn ghost" onClick={clearAll} disabled={busy} type="button">
            Clear list
          </button>
        </div>
      )}

      <div className="toasts">
        {toasts.map((t) => (
          <div key={t.id} className={"toast toast-" + t.kind}>
            {t.msg}
          </div>
        ))}
      </div>
    </div>
  );
}
