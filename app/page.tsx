import Converter from "@/components/Converter";
import ThemeToggle from "@/components/ThemeToggle";

// Fully static prerendering for best SEO + instant loads.
export const dynamic = "force-static";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "3MF to STL Converter Online",
    url: "https://www.3mf2stl.com",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Convert 3MF to STL online for free, entirely in your browser. No uploads, up to 150 MB per file, batch ZIP export.",
    featureList: [
      "Client-side 3MF to STL conversion",
      "No file uploads — fully private",
      "Binary and ASCII STL output",
      "Batch conversion with ZIP export",
      "Up to 150 MB per file",
    ],
  };

  return (
    <div className="page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
          <a href="#why">Why us</a>
          <a href="#models">Model types</a>
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

        <section id="why" className="section">
          <h2>Why choose 3mf2stl.com?</h2>
          <p className="section-lede">
            Lots of file converters exist. Here is why makers, engineers and
            3D-printing enthusiasts convert 3MF to STL online with us.
          </p>
          <div className="grid">
            <div className="card">
              <div className="card-ic">🔐</div>
              <h3>Your files never leave your device</h3>
              <p>
                Every conversion runs inside your browser. Nothing is uploaded to a
                server, so your designs stay completely private.
              </p>
            </div>
            <div className="card">
              <div className="card-ic">⚡</div>
              <h3>Instant, no server round-trips</h3>
              <p>
                Start converting the moment you drop a file. With no network
                upload, even large models begin processing right away.
              </p>
            </div>
            <div className="card">
              <div className="card-ic">🎯</div>
              <h3>Accurate 3MF support</h3>
              <p>
                We resolve the full build tree — objects, nested components and
                per-item 4×4 transforms — so assemblies come out correct.
              </p>
            </div>
            <div className="card">
              <div className="card-ic">📦</div>
              <h3>Batch conversion + ZIP</h3>
              <p>
                Queue many .3mf files, pick binary or ASCII, and pull the whole lot
                down as a single ZIP.
              </p>
            </div>
            <div className="card">
              <div className="card-ic">🪶</div>
              <h3>Lightweight by design</h3>
              <p>
                No 3D engine bloating the page. The site weighs almost nothing and
                loads instantly on any connection.
              </p>
            </div>
            <div className="card">
              <div className="card-ic">💸</div>
              <h3>Free, no account needed</h3>
              <p>
                No sign-up, no watermark, no per-file limits. Convert as many models
                as you like, for free.
              </p>
            </div>
          </div>
        </section>

        <section id="models" className="section">
          <h2>3MF models you can convert with 3mf2stl.com</h2>
          <p className="section-lede">
            From tiny tabletop miniatures to multi-part mechanical assemblies,
            3mf2stl.com flattens every 3MF build into clean, slicer-ready STL —
            transforms, nested components and all.
          </p>
          <div className="models-grid">
            <article className="model-card">
              <img
                className="model-img"
                src="/models/miniature.png"
                alt="3D-printed miniature figurine"
                width="400"
                height="400"
                loading="lazy"
              />
              <h3>Miniatures &amp; figurines</h3>
              <p>
                Tabletop characters, busts and detailed sculptures. Binary STL keeps
                fine features intact for crisp prints.
              </p>
            </article>
            <article className="model-card">
              <img
                className="model-img"
                src="/models/mechanical.png"
                alt="3D-printed mechanical parts and gears"
                width="400"
                height="400"
                loading="lazy"
              />
              <h3>Mechanical &amp; functional parts</h3>
              <p>
                Gears, brackets and assemblies. We resolve each component's transform
                so multi-part models align perfectly.
              </p>
            </article>
            <article className="model-card">
              <img
                className="model-img"
                src="/models/architecture.png"
                alt="3D-printed architectural model"
                width="400"
                height="400"
                loading="lazy"
              />
              <h3>Architecture &amp; terrain</h3>
              <p>
                Buildings, castles and dioramas — even large meshes up to 150&nbsp;MB —
                convert without losing detail.
              </p>
            </article>
            <article className="model-card">
              <img
                className="model-img"
                src="/models/biology.png"
                alt="3D-printed biomedical and organic model"
                width="400"
                height="400"
                loading="lazy"
              />
              <h3>Biomedical &amp; organic</h3>
              <p>
                Anatomical models, prosthetics and organic shapes. Smooth surfaces and
                fine curvature are preserved in both binary and ASCII STL.
              </p>
            </article>
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
