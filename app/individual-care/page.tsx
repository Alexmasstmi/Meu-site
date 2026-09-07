import SitePage from "../site-page";
import { pageMetadata } from "../seo";

export const metadata = pageMetadata(
  "Massage Therapy & Somatic Care in Helsinki | Three Arches",
  "Massage therapy, manual therapy and somatic care for pain, tension, stress, recovery and renewed connection with your body in Helsinki.",
  "/individual-care",
);

export default function IndividualCare() { return <SitePage page="care" />; }
