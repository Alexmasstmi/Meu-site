import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Three Arches home page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Three Arches/);
  assert.match(html, /Everything begins with the body/);
  assert.match(html, /Individual Care/);
  assert.match(html, /Organizations/);
  assert.match(html, /Hospitality/);
  assert.match(html, /Care, experienced and shared/);
  assert.match(html, /Saara Milton/);
  assert.match(html, /Read all reviews on Google/);
  assert.match(html, /id="site-menu"/);
});

test("server-renders the first encounter contact routes", async () => {
  const response = await render("/contact?lang=en");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /First Encounter/);
  assert.match(html, /\+358 40 809 3022/);
  assert.match(html, /tmialexmass@gmail\.com/);
  assert.match(html, /Snellmaninkatu 29 C/);
  assert.match(html, /Open in Google Maps/);
  assert.match(html, /wa\.me\/358408093022/);
  assert.match(html, /Already visited Three Arches/);
  assert.match(html, /Visit our Google profile/);
});
