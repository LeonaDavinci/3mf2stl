# 3MF TO STL — 3MF → STL Converter

A fast, private **3MF → STL** converter that runs **entirely in your browser**.
No uploads, no server, no 3D engine bloating the page. Built with **Next.js (App
Router, SSR)** + React + TypeScript.

🌐 Live site: **https://www.3mf2stl.com**

## Why it's different

- **Private by design** — files are decoded and re-encoded on the client. There is
  no server endpoint that ever receives your model.
- **Lightweight** — no WebGL / Three.js scene. The page is pure HTML + CSS and loads
  instantly.
- **Honest progress** — staged progress (extract → resolve → build → encode) with a
  live percentage, even on huge meshes.
- **Batch + ZIP** — queue many files, pick binary or ASCII STL, export the whole
  queue as one ZIP.
- **Real 3MF support** — resolves the full build tree, including nested `<components>`
  and per-item 4×4 transforms, into correct world-space triangles.
- **Roomy limit** — 150 MB per file (3× the usual 50 MB).

## How the conversion works

3MF is a ZIP container holding one or more `.model` XML files. Each model declares
`<resources>` with `<object>` meshes and a `<build>` listing the objects (with
optional transforms) that get printed. MeshForge:

1. unzips the archive (`fflate`),
2. parses every `.model` with a small namespace-agnostic tokenizer,
3. resolves the build tree (objects + components + build-item transforms),
4. transforms every vertex into world space and computes facet normals,
5. writes a **binary** or **ASCII** STL.

Because the heavy lifting happens client-side, **3MF TO STL** needs no backend
for conversion — the Next.js server only renders the page (SSR) and serves static
assets.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
# production
npm run build && npm run start
```

## Deploy

It's a standard Next.js app — deploy to Vercel, Netlify, Cloudflare Pages, Docker,
or any Node host. Because conversion is client-side, the server only ever serves
static assets.

## Project layout

```
app/
  layout.tsx        # SSR root layout + metadata
  page.tsx          # SSR landing (hero, features, FAQ) + <Converter/>
  globals.css       # theme (dark/light), no Tailwind
  icon.svg          # favicon
components/
  Converter.tsx     # 'use client' — dropzone, queue, progress, ZIP download
  ThemeToggle.tsx   # 'use client' — light/dark switch
lib/
  converter.ts      # pure conversion engine (no DOM/WebGL)
```

## License

MIT
