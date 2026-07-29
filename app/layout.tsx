import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "threearches.co";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const title = "Three Arches — Body, care & Relationships";
  const description = "Somatic care and embodied learning for people, teams and organizations in Helsinki.";

  return {
    title,
    description,
    icons: { icon: "/brand/three-arches-symbol.png", shortcut: "/brand/three-arches-symbol.png", apple: "/brand/three-arches-symbol.png" },
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary", title, description },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
