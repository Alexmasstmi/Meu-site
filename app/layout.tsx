import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://threearches.co/#localbusiness",
  name: "Three Arches Hierontastudio – Tmi Alex Mendes",
  alternateName: "Three Arches",
  description:
    "Massage therapy, manual therapy and somatic care for individuals, teams and organizations in Helsinki.",
  url: "https://threearches.co/",
  logo: "https://threearches.co/brand/three-arches-logo.png",
  image: "https://threearches.co/brand/three-arches-logo.png",
  telephone: "+358408093022",
  email: "alexmendes@threearches.co",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Snellmaninkatu 29 C",
    addressLocality: "Helsinki",
    postalCode: "00170",
    addressCountry: "FI",
  },
  areaServed: {
    "@type": "City",
    name: "Helsinki",
  },
  hasMap:
    "https://www.google.com/maps/search/?api=1&query=Three%20Arches%20Hierontastudio%20-%20Tmi%20Alex%20Mendes",
  sameAs: [
    "https://www.google.com/maps/search/?api=1&query=Three%20Arches%20Hierontastudio%20-%20Tmi%20Alex%20Mendes",
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "threearches.co";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const title = "Three Arches — Body, care & Relationships";
  const description = "Massage therapy, manual therapy and somatic care for individuals, teams and organizations in Helsinki.";

  return {
    title,
    description,
    icons: { icon: "/brand/three-arches-symbol.png", shortcut: "/brand/three-arches-symbol.png", apple: "/brand/three-arches-symbol.png" },
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary", title, description },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
