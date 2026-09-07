import SitePage from "../site-page";
import { pageMetadata } from "../seo";

export const metadata = pageMetadata(
  "Approach | Three Arches",
  "The philosophy of body, care and relationships that guides Three Arches across individual, organizational and hospitality contexts.",
  "/about",
);

export default function About() { return <SitePage page="about" />; }
