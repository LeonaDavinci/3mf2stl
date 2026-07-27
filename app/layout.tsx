import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  // Primary keyword as the page title, per SEO request.
  title: "3MF to STL Converter Online",
  metadataBase: new URL("https://www.3mf2stl.com"),
  description:
    "Convert 3MF to STL online for free, 100% in your browser. No uploads, up to 150 MB per file, real-time progress, batch ZIP export, and accurate 3MF build-tree support for 3D printing.",
  keywords: [
    "3MF to STL converter online",
    "3MF to STL",
    "convert 3MF to STL",
    "3MF converter",
    "STL converter",
    "online 3MF to STL",
    "3D printing converter",
  ],
  authors: [{ name: "3MF TO STL" }],
  applicationName: "3MF TO STL",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "3MF to STL Converter Online — Free & Private",
    url: "https://www.3mf2stl.com",
    description:
      "Free 3MF to STL conversion that runs entirely in your browser. No uploads, real-time progress, batch ZIP export.",
    siteName: "3MF TO STL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "3MF to STL Converter Online — Free & Private",
    description:
      "Convert 3MF to STL online, 100% in your browser. No uploads, up to 150 MB, batch export.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" className="h-full">
      <head>
        {/* Google Analytics (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-6BE5WDTPFT"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-6BE5WDTPFT');`,
          }}
        />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
