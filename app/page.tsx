import Converter from "@/components/Converter";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <div className="page">
      <div className="aurora" aria-hidden />

      <header className="nav">
        <a className="brand" href="#top">
          <svg className="brand-mark" viewBox="0 0 32 32" width="26" height="26" aria-hidden>
            <defs>
              <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#37e6ff" />
                <stop offset="1" stopColor="#7c5cff" />
              </linearGradient>
            </defs>
            <g fill="none" stroke="url(#bg)" strokeWidth="1.7" strokeLinejoin="round">
              <path d="M16 4 L27 11 L16 18 L5 11 Z" />
              <path d="M5 11 L16 18 L16 28 L5 21 Z" />
              <path d="M27 11 L16 18 L16 28 L27 21 Z" />
            </g>
          </svg>
          <span>3MF TO STL</span>
        </a>
        <nav className="nav-links">
          <a href="#features">Features</a>
          <a href="#how">How it works</a>
          <a href="#faq">FAQ</a>
          <ThemeToggle />
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <span className="pill">100% in-browser · no uploads</span>
            <h1>
              Turn <span className="grad">3MF</span> into <span className="grad">STL</span>
              <br /> without leaving your machine
            </h1>
            <p className="lede">
              A fast, private 3MF&nbsp;→&nbsp;STL converter that runs entirely in your
              browser. Drop a file, watch a real progress bar, download binary or ASCII
              STL — even bundle a whole batch as one ZIP.
            </p>
          </div>

          <div className="hero-card">
            <Converter />
          </div>

          {/* Lightweight hint banner: pure CSS/SVG geometry, no WebGL. */}
          <div className="banner" aria-hidden>
            <svg viewBox="0 0 600 200" className="banner-svg" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="s1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#37e6ff" />
                  <stop offset="1" stopColor="#7c5cff" />
                </linearGradient>
              </defs>
              <g className="float f1" fill="none" stroke="url(#s1)" strokeWidth="1.4" strokeLinejoin="round" opacity="0.9">
                <path d="M120 60 L160 80 L120 100 L80 80 Z" />
                <path d="M80 80 L120 100 L120 150 L80 130 Z" />
                <path d="M160 80 L120 100 L120 150 L160 130 Z" />
              </g>
              <g className="float f2" fill="none" stroke="#37e6ff" strokeWidth="1.4" strokeLinejoin="round" opacity="0.75">
                <path d="M300 40 L340 60 L300 80 L260 60 Z" />
                <path d="M260 60 L300 80 L300 130 L260 110 Z" />
                <path d="M340 60 L300 80 L300 130 L340 110 Z" />
              </g>
              <g className="float f3" fill="none" stroke="#7c5cff" strokeWidth="1.4" strokeLinejoin="round" opacity="0.8">
                <path d="M470 60 L510 80 L470 100 L430 80 Z" />
                <path d="M430 80 L470 100 L470 150 L430 130 Z" />
                <path d="M510 80 L470 100 L470 150 L510 130 Z" />
              </g>
            </svg>
          </div>
        </section>

        <section id="features" className="section">
          <h2>Built for people who convert a lot</h2>
          <div className="grid">
            <div className="card">
              <div className="card-ic">🔒</div>
              <h3>Private by design</h3>
              <p>Files are decoded and re-encoded on your device. Nothing is uploaded to any server — ever.</p>
            </div>
            <div className="card">
              <div className="card-ic">📊</div>
              <h3>Honest progress</h3>
              <p>Staged progress (extract → resolve → build → encode) with a live percentage, even on huge meshes.</p>
            </div>
            <div className="card">
              <div className="card-ic">📦</div>
              <h3>Batch + ZIP</h3>
              <p>Queue many files, pick binary or ASCII, and pull the whole lot down as a single ZIP.</p>
            </div>
            <div className="card">
              <div className="card-ic">🪶</div>
              <h3>Lightweight</h3>
              <p>No 3D engine, no heavy frameworks in the way. The page weighs almost nothing and loads instantly.</p>
            </div>
            <div className="card">
              <div className="card-ic">🧩</div>
              <h3>Real 3MF support</h3>
              <p>Resolves components, build-item transforms and multiple objects into correct world-space triangles.</p>
            </div>
            <div className="card">
              <div className="card-ic">⚡</div>
              <h3>150 MB per file</h3>
              <p>Roomy limit (3× the usual 50 MB) with a clear warning if a file is too big to handle.</p>
            </div>
          </div>
        </section>

        <section id="how" className="section">
          <h2>How it works</h2>
          <ol className="steps">
            <li>
              <span className="step-n">1</span>
              <div>
                <h3>Drop your .3mf</h3>
                <p>Drag one or many files onto the zone, or browse. We only accept .3mf and reject oversized files up front.</p>
              </div>
            </li>
            <li>
              <span className="step-n">2</span>
              <div>
                <h3>We convert locally</h3>
                <p>The 3MF (a zipped mesh format) is unzipped, its build tree is resolved with all transforms, and triangles are flattened.</p>
              </div>
            </li>
            <li>
              <span className="step-n">3</span>
              <div>
                <h3>Download STL</h3>
                <p>Grab each file individually, or export the whole queue as a ZIP — binary or ASCII, your choice.</p>
              </div>
            </li>
          </ol>
        </section>

        <section id="faq" className="section">
          <h2>FAQ</h2>
          <div className="faq">
            <details>
              <summary>Is my file really never uploaded?</summary>
              <p>Yes. All parsing and encoding happens in your browser tab via JavaScript. There is no server endpoint that receives your model.</p>
            </details>
            <details>
              <summary>Binary or ASCII STL — which should I pick?</summary>
              <p>Binary is smaller and faster to write, and is what most slicers expect. ASCII is human-readable text; choose it only when a tool specifically needs it.</p>
            </details>
            <details>
              <summary>What is the file size limit?</summary>
              <p>150 MB per file. Larger files are rejected with a warning before conversion starts, to keep the tab responsive.</p>
            </details>
            <details>
              <summary>Does it handle assemblies with multiple parts?</summary>
              <p>Yes. MeshForge resolves the full 3MF build tree, including nested components and per-item 4×4 transforms, so multi-object models come out correct.</p>
            </details>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>3MF TO STL · 3MF → STL, client-side.</span>
        <span className="muted">No tracking. No uploads. Just conversion.</span>
      </footer>
    </div>
  );
}
