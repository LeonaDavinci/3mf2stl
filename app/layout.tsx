import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "3MF TO STL — Convert 3MF to STL in your browser",
  metadataBase: new URL("https://www.3mf2stl.com"),
  description:
    "Fast, private, fully client-side 3MF to STL converter. No uploads, 150 MB per file, real progress reporting, batch ZIP export. Built with Next.js.",
  keywords: ["3MF", "STL", "converter", "mesh", "CAD", "3D printing", "Next.js"],
  authors: [{ name: "3MF TO STL" }],
  openGraph: {
    title: "3MF TO STL — 3MF to STL converter",
    url: "https://www.3mf2stl.com",
    description:
      "Private, in-browser 3MF → STL conversion. No uploads, real progress, batch export.",
    type: "website",
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
