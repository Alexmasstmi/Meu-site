import SitePage from "./site-page";
import { pageMetadata } from "./seo";

export const metadata = pageMetadata(
  "Three Arches | Massage Therapy & Somatic Care in Helsinki",
  "Massage therapy, manual therapy and somatic care in Helsinki, alongside Embodied Communication for teams and organizations.",
  "/",
);

export default function Home() {
  return <SitePage page="home" />;
}
