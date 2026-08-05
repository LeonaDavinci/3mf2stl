import type { Metadata } from "next";
import Converter from "@/components/Converter";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "Convert 3MF to STL for Cura — in seconds, no upload",
  description:
    "How to turn a 3MF file into a Cura-ready STL. Convert 3MF to STL for Cura right in your browser — binary output, no uploads, multi-part assemblies preserved.",
  keywords: [
    "convert 3mf to stl for cura",
    "3mf to stl cura",
    "cura 3mf to stl",
    "cura stl converter",
    "3mf to stl for ultimaker cura",
  ],
  alternates: { canonical: "/convert-3mf-to-stl-cura" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Convert 3MF to STL for Cura — in seconds, no upload",
    url: "https://www.3mf2stl.com/convert-3mf-to-stl-cura",
    description:
      "Flatten a 3MF build into a Cura-ready STL in your browser. No uploads, binary output, assemblies kept intact.",
    siteName: "3MF TO STL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Convert 3MF to STL for Cura — in seconds, no upload",
    description:
      "Turn a 3MF file into a Cura-ready STL in your browser. No uploads, binary output, assemblies intact.",
  },
};

export const dynamic = "force-static";

export default function CuraPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Convert 3MF to STL for Cura",
    url: "https://www.3mf2stl.com/convert-3mf-to-stl-cura",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "A browser-native way to convert 3MF to a Cura-ready STL. Nothing is uploaded; the build tree is resolved locally and exported as binary STL.",
  };

  return (
    <div className="page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="aurora" aria-hidden />

      <header className="nav">
        <a className="brand" href="/">
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
          <a href="/#why">Why us</a>
          <a href="/#how">How it works</a>
          <a href="/#faq">FAQ</a>
          <ThemeToggle />
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <span className="pill">Cura-ready STL · generated locally</span>
            <h1>
              Convert <span className="grad">3MF</span> to <span className="grad">STL</span>
              <br /> for Cura, in a few seconds
            </h1>
            <p className="lede">
              UltiMaker Cura slices STL natively. When your download ships as 3MF,
              3mf2stl.com flattens it into a clean, Cura-ready STL right in your
              browser — no upload, no account, no waiting on a server.
            </p>
          </div>

          <div className="hero-card">
            <Converter />
          </div>
        </section>

        <section id="why-cura" className="section">
          <h2>Why Cura users flatten 3MF to STL</h2>
          <p className="section-lede">
            Cura opens 3MF too, but STL is still the safest common denominator across
            slicers, repair tools and print farms. Here is when a Cura-ready STL is
            the better pick.
          </p>
          <div className="grid">
            <div className="card">
              <div className="card-ic">🧊</div>
              <h3>Smaller, simpler files</h3>
              <p>
                Binary STL drops the textures, thumbnails and metadata that 3MF carries,
                so Cura loads the mesh faster and the project stays portable.
              </p>
            </div>
            <div className="card">
              <div className="card-ic">🔗</div>
              <h3>One mesh, no surprises</h3>
              <p>
                STL bakes every part into a single triangle soup. That is exactly what
                most downstream tools expect, with no build-tree ambiguity.
              </p>
            </div>
            <div className="card">
              <div className="card-ic">🛠️</div>
              <h3>Repair-friendly</h3>
              <p>
                Mesh fixers (Netfabb, Microsoft 3D Builder, PrusaSlicer) ingest STL
                first. Flatten early and you can repair before Cura ever sees it.
              </p>
            </div>
            <div className="card">
              <div className="card-ic">🤝</div>
              <h3>Shareable everywhere</h3>
              <p>
                Send one STL to a friend, a print service or a different slicer without
                wondering whether their software reads 3MF the same way.
              </p>
            </div>
          </div>
        </section>

        <section id="how" className="section">
          <h2>Turn a 3MF into a Cura-ready STL</h2>
          <ol className="steps">
            <li>
              <span className="step-n">1</span>
              <div>
                <h3>Drop the .3mf</h3>
                <p>Drag your 3MF onto the converter above, or browse for it. Multi-part builds are welcome.</p>
              </div>
            </li>
            <li>
              <span className="step-n">2</span>
              <div>
                <h3>Pick binary STL</h3>
                <p>Cura expects binary STL. It is compact and loads instantly — leave ASCII for the rare tool that asks for plain text.</p>
              </div>
            </li>
            <li>
              <span className="step-n">3</span>
              <div>
                <h3>Download and slice</h3>
                <p>Save the STL and open it in Cura. Assemblies keep their transforms, so parts line up the way the designer intended.</p>
              </div>
            </li>
          </ol>
        </section>

        <section id="tips" className="section">
          <h2>Cura-specific tips</h2>
          <div className="faq">
            <details>
              <summary>Binary or ASCII STL for Cura?</summary>
              <p>Binary. Cura reads both, but binary files are far smaller and parse faster. Use ASCII only if a specific pipeline demands text.</p>
            </details>
            <details>
              <summary>Will my multi-part 3MF stay aligned?</summary>
              <p>Yes. 3mf2stl.com resolves the full build tree — nested components and per-item 4×4 transforms — so a multi-object model flattens into correctly placed triangles.</p>
            </details>
            <details>
              <summary>Units and scale — will they survive?</summary>
              <p>STL has no units, so Cura treats one unit as one millimeter by default. Your 3MF&apos;s coordinates are preserved 1:1, so size is unchanged; just confirm Cura&apos;s scene scale if a model looks off.</p>
            </details>
            <details>
              <summary>My 3MF is over 150 MB — what now?</summary>
              <p>The converter rejects files above 150 MB to keep the tab responsive. Split very large builds into smaller 3MF exports, then convert each part.</p>
            </details>
          </div>
        </section>

        <section className="section">
          <h2>Back to the converter</h2>
          <p className="section-lede">
            Ready to flatten a model? Use the{" "}
            <a href="/">3MF to STL converter</a> on the home page, or just drop a file
            into the box above.
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
