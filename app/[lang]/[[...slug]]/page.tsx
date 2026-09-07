import { notFound } from "next/navigation";
import SitePage, { type Lang, type Page } from "../../site-page";
import { pageMetadata } from "../../seo";

const routePages: Record<string, Page> = {
  "": "home",
  about: "about",
  alex: "alex",
  contact: "contact",
  hospitality: "hospitality",
  "individual-care": "care",
  organizations: "organizations",
};

const seo = {
  fi: {
    home: ["Hieronta ja somaattinen hoiva Helsingissä | Three Arches", "Hierontaa, manuaalista terapiaa ja somaattista hoivaa Helsingissä sekä Embodied Communication -työskentelyä tiimeille ja organisaatioille."],
    about: ["Three Archesin lähestymistapa", "Kehoon, hoivaan ja suhteisiin perustuva filosofia, joka ohjaa Three Archesin yksilö-, organisaatio- ja vieraanvaraisuustyötä."],
    alex: ["Alex Mendes | Three Arches", "Tutustu Alex Mendesin taustaan hieronnassa, somatiikassa, Formative Psychologyssa, liikkeessä ja relationaalisessa oppimisessa."],
    care: ["Hieronta Kruununhaassa, Helsinki | Three Arches", "Hierontaa, manuaalista terapiaa ja somaattista hoivaa kipuun, jännitykseen, stressiin ja palautumiseen Kruununhaassa, Helsingin keskustassa."],
    organizations: ["Embodied Communication tiimeille | Three Arches", "Kokemuksellisia Embodied Communication -työpajoja läsnäolosta, luottamuksesta, rajoista, tuesta, sopeutumiskyvystä ja viestinnästä."],
    hospitality: ["Hyvinvointi ja Embodied Communication vieraanvaraisuuteen", "Kehollista hoivaa vieraille ja Embodied Communication -työskentelyä vieraanvaraisuustiimeille Helsingissä."],
    contact: ["Yhteystiedot ja ajanvaraus | Three Arches Helsinki", "Varaa hieronta tai somaattinen hoito Helsingissä tai aloita keskustelu Embodied Communication -työskentelystä."],
  },
  pt: {
    home: ["Massagem e cuidado somático em Helsinque | Three Arches", "Massoterapia, terapia manual e cuidado somático em Helsinque, além de Embodied Communication para equipes e organizações."],
    about: ["A abordagem da Three Arches", "A filosofia de corpo, cuidado e relações que orienta o trabalho individual, organizacional e de hospitalidade da Three Arches."],
    alex: ["Alex Mendes | Three Arches", "Conheça a trajetória de Alex Mendes entre massoterapia, somáticas, Psicologia Formativa, movimento e aprendizagem relacional."],
    care: ["Massagem em Kruununhaka, Helsinque | Three Arches", "Massoterapia, terapia manual e cuidado somático para dor, tensão, estresse e recuperação em Kruununhaka, no centro de Helsinque."],
    organizations: ["Embodied Communication para equipes | Three Arches", "Workshops experienciais de Embodied Communication sobre presença, confiança, limites, apoio, adaptabilidade e comunicação."],
    hospitality: ["Bem-estar e Embodied Communication para hospitalidade", "Cuidado corporal para hóspedes e Embodied Communication para equipes de hospitalidade em Helsinque."],
    contact: ["Contato e agendamento | Three Arches Helsinque", "Agende massagem e cuidado somático em Helsinque ou inicie uma conversa sobre Embodied Communication."],
  },
} as const;

const paths: Record<Page, string> = { home: "/", about: "/about", alex: "/alex", care: "/individual-care", organizations: "/organizations", hospitality: "/hospitality", contact: "/contact" };

export function generateStaticParams() {
  return (["fi", "pt"] as const).flatMap((lang) => Object.keys(routePages).map((slug) => ({ lang, slug: slug ? [slug] : [] })));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug?: string[] }> }) {
  const { lang, slug = [] } = await params;
  const page = routePages[slug.join("/")];
  if ((lang !== "fi" && lang !== "pt") || !page) return {};
  const [title, description] = seo[lang][page];
  return pageMetadata(title, description, paths[page], lang);
}

export default async function LocalizedPage({ params }: { params: Promise<{ lang: string; slug?: string[] }> }) {
  const { lang, slug = [] } = await params;
  const page = routePages[slug.join("/")];
  if ((lang !== "fi" && lang !== "pt") || !page || slug.length > 1) notFound();
  return <SitePage page={page} initialLang={lang as Lang} />;
}
