import SitePage from "../site-page";
import { pageMetadata } from "../seo";

export const metadata = pageMetadata(
  "Alex Mendes | Three Arches",
  "Meet Alex Mendes and the path connecting massage therapy, somatics, movement research, group facilitation and organizational learning.",
  "/alex",
);

export default function Alex() { return <SitePage page="alex" />; }
