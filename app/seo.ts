import type { Metadata } from "next";

export type SiteLanguage = "en" | "fi" | "pt";

export function localizedPath(path: string, lang: SiteLanguage) {
  if (lang === "en") return path;
  return path === "/" ? `/${lang}` : `/${lang}${path}`;
}

export function pageMetadata(title: string, description: string, path: string, lang: SiteLanguage = "en"): Metadata {
  const canonical = localizedPath(path, lang);
  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: path,
        fi: localizedPath(path, "fi"),
        pt: localizedPath(path, "pt"),
        "x-default": path,
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonical,
      locale: lang === "fi" ? "fi_FI" : lang === "pt" ? "pt_BR" : "en_US",
      images: [{ url: "/og.png", alt: "Three Arches" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.png"],
    },
  };
}
