import SitePage from "../site-page";
import { pageMetadata } from "../seo";

export const metadata = pageMetadata(
  "Hospitality Partnerships & Team Learning | Three Arches",
  "Bodywork for guests and Embodied Communication for hospitality teams, informed by firsthand experience in high-standard hospitality.",
  "/hospitality",
);

export default function Hospitality() { return <SitePage page="hospitality" />; }
