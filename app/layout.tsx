import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "3mf to stl converter in seconds",
  metadataBase: new URL("https://www.3mftostl.site"),
  description:
    "3mftostl.site turns 3MF files into STL meshes right inside your browser — no installs, no uploads, no waiting on a server. Drop a model, convert it locally, and export binary or ASCII STL in seconds.",
  keywords: [
    "3mf to stl converter in seconds",
    "3MF to STL",
    "convert 3MF to STL",
    "3MF converter",
    "STL converter",
    "client side 3MF to STL",
    "3D printing converter",
    "private 3MF converter",
  ],
  authors: [{ name: "3MF TO STL" }],
  applicationName: "3MF TO STL",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "3mf to stl converter in seconds",
    url: "https://www.3mftostl.site",
    description:
      "A browser-native 3MF to STL converter. Nothing is uploaded — your model is rebuilt locally and exported in seconds.",
    siteName: "3MF TO STL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "3mf to stl converter in seconds",
    description:
      "Convert 3MF to STL in your browser. No uploads, up to 150 MB, batch ZIP export, ready in seconds.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
