import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "⚡ FII PULSE PRO | Institutional Order Flow Cockpit V62",
  description: "Real-time Institutional Order Flow, Volume Delta & Auction Profiler",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#030712]">{children}</body>
    </html>
  );
}
