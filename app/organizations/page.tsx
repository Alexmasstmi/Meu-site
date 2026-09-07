import SitePage from "../site-page";
import { pageMetadata } from "../seo";

export const metadata = pageMetadata(
  "Embodied Communication for Teams | Three Arches",
  "Experiential workshops for teams exploring presence, trust, boundaries, support, adaptability and communication through embodied learning.",
  "/organizations",
);

export default function Organizations() { return <SitePage page="organizations" />; }
