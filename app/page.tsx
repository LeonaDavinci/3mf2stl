import Converter from "@/components/Converter";
import ThemeToggle from "@/components/ThemeToggle";

// Fully static prerendering for best SEO + instant loads.
export const dynamic = "force-static";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "3mf to stl converter in seconds",
    url: "https://www.3mftostl.site",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "A browser-native 3MF to STL converter. Your file is rebuilt locally and exported as binary or ASCII STL in seconds — nothing is uploaded.",
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
            <span className="pill">Runs on your device · nothing is uploaded</span>
            <h1>
              From <span className="grad">3MF</span> to <span className="grad">STL</span>
              <br /> in a few seconds — without sending a byte anywhere
            </h1>
            <p className="lede">
              3mftostl.site reads your 3MF package in the browser, rebuilds every
              mesh with its transforms, and hands you a clean STL. No cloud, no
              queue, no file-size surprises.
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
          <h2>Why 3mftostl.site instead of yet another upload-and-wait tool?</h2>
          <p className="section-lede">
            Most converters ship your design to a server you can&apos;t see. We took
            the opposite bet — every byte stays on your machine. Here is what that
            buys you.
          </p>
          <div className="grid">
            <div className="card">
              <div className="card-ic">🔐</div>
              <h3>Private by architecture</h3>
              <p>
                Conversion runs in JavaScript on your own device. Your models never
                touch our disks or anyone else&apos;s, so confidential prints stay
                confidential.
              </p>
            </div>
            <div className="card">
              <div className="card-ic">⚡</div>
              <h3>No network round-trips</h3>
              <p>
                Because nothing is uploaded, even a 120&nbsp;MB build starts
                transforming the instant you drop it — no progress bar stuck at
                &quot;uploading.&quot;
              </p>
            </div>
            <div className="card">
              <div className="card-ic">🧩</div>
              <h3>Real build-tree support</h3>
              <p>
                We walk the full 3MF object tree — nested parts, instances and their
                4×4 matrices — so multi-body assemblies keep their intended shape.
              </p>
            </div>
            <div className="card">
              <div className="card-ic">🗜️</div>
              <h3>Batch conversion + ZIP</h3>
              <p>
                Queue several .3mf files, pick binary or ASCII, and pull the whole
                batch down as a single ZIP in one click.
              </p>
            </div>
            <div className="card">
              <div className="card-ic">🪶</div>
              <h3>Tiny footprint</h3>
              <p>
                No heavy 3D engine behind the page. It is a few kilobytes of CSS and
                JS, so it opens instantly on any connection or old laptop.
              </p>
            </div>
            <div className="card">
              <div className="card-ic">🆓</div>
              <h3>No catch</h3>
              <p>
                No login wall, no watermark, no per-file ceiling. Convert as many
                models as you like, for free, forever.
              </p>
            </div>
          </div>
        </section>

        <section id="models" className="section">
          <h2>What people throw at 3mftostl.site</h2>
          <p className="section-lede">
            Dice, drone frames, dioramas — if it ships as a 3MF, it becomes
            slicer-ready STL. 3mftostl.site flattens the whole build, transforms and
            nested components included.
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
                Tabletop heroes, busts and high-detail sculpts. Binary STL keeps the
                crisp edges your resin or FDM printer wants.
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
                Gears, brackets and multi-body assemblies. Each instance&apos;s
                transform is honored, so parts line up the way the designer intended.
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
                Buildings, castles, landscape tiles — even meshes near the 150&nbsp;MB
                mark — convert without dropping facets.
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
                Anatomy, prosthetics, organic curves. Surfaces stay smooth in both
                binary and ASCII STL output.
              </p>
            </article>
          </div>
        </section>

        <section id="how" className="section">
          <h2>Three steps, zero uploads</h2>
          <ol className="steps">
            <li>
              <span className="step-n">1</span>
              <div>
                <h3>Drop your .3mf</h3>
                <p>One file or a whole batch. We read the extension and bounce oversized files before they ever choke the tab.</p>
              </div>
            </li>
            <li>
              <span className="step-n">2</span>
              <div>
                <h3>We rebuild it locally</h3>
                <p>The 3MF — a zip of meshes plus a build tree — is unpacked, its transforms resolved, and every triangle flattened into STL.</p>
              </div>
            </li>
            <li>
              <span className="step-n">3</span>
              <div>
                <h3>Save your STL</h3>
                <p>Grab each result on its own, or pull the full queue as a ZIP — binary for slicers, ASCII when a tool insists.</p>
              </div>
            </li>
          </ol>
        </section>

        <section id="faq" className="section">
          <h2>FAQ</h2>
          <div className="faq">
            <details>
              <summary>Does my file actually stay on my device?</summary>
              <p>Yes. Every byte is parsed and encoded by JavaScript in your tab. There is no server endpoint that receives your model.</p>
            </details>
            <details>
              <summary>Binary or ASCII — which do I want?</summary>
              <p>Binary is compact and is what nearly every slicer expects. ASCII is plain text; choose it only when a specific workflow demands it.</p>
            </details>
            <details>
              <summary>How big a file can I convert?</summary>
              <p>Up to 150 MB each. Anything larger is rejected up front with a clear note, keeping the page responsive.</p>
            </details>
            <details>
              <summary>Will multi-part assemblies come out right?</summary>
              <p>They will. 3mftostl.site walks the entire 3MF build tree — nested components and per-item 4×4 transforms included — so multi-object models stay aligned.</p>
            </details>
          </div>
        </section>

        <section id="cura" className="section">
          <h2>Converting 3MF to STL for Cura?</h2>
          <p className="section-lede">
            UltiMaker Cura slices STL natively. If your model ships as 3MF, flatten it
            to a Cura-ready STL first — our{" "}
            <a href="/convert-3mf-to-stl-cura">3MF to STL for Cura guide</a> walks
            through exactly how, with Cura-specific tips on binary vs ASCII, scale and
            multi-part assemblies.
          </p>
        </section>
      </main>

      <footer className="footer">
        <span>3MF TO STL · built for people who&apos;d rather not upload.</span>
        <span className="muted">No tracking. No uploads. Just STL.</span>
      </footer>
    </div>
  );
}
