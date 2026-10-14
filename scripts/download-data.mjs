// Downloads Pokémon Showdown's battle data into data/raw/ for exploring.
// Run: node scripts/download-data.mjs
import { mkdir, writeFile } from "node:fs/promises";

const BASE = "https://play.pokemonshowdown.com/data/";
const FILES = ["pokedex.json", "moves.json", "learnsets.json", "typechart.js", "abilities.js", "items.js"];
const OUT = new URL("../data/raw/", import.meta.url);

await mkdir(OUT, { recursive: true });

for (const file of FILES) {
  const res = await fetch(BASE + file);
  if (!res.ok) throw new Error(`${file}: HTTP ${res.status}`);
  let text = await res.text();
  // Showdown ships JSON minified on one line; pretty-print so it's readable in VS Code.
  // The .js files are JavaScript object literals, not JSON, so they're saved as-is.
  if (file.endsWith(".json")) text = JSON.stringify(JSON.parse(text), null, 2);
  await writeFile(new URL(file, OUT), text);
  console.log(`${file.padEnd(16)} ${(text.length / 1024).toFixed(0).padStart(6)} KB`);
}
