import SitePage from "../site-page";
import { pageMetadata } from "../seo";

export const metadata = pageMetadata(
  "Contact & Booking | Three Arches Helsinki",
  "Book massage and somatic care in Helsinki or begin a conversation about Embodied Communication and hospitality partnerships.",
  "/contact",
);

export default function Contact() { return <SitePage page="contact" />; }
