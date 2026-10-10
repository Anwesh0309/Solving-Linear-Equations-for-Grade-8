/* Checks that every line the app can speak (src/utils/narration.js) is listed
   in scripts/generate_audio.js `phrases`, with the same style, and vice-versa.
   Usage: node scripts/verify_audio_parity.js  (npm run verify-audio) */
import { phrases } from './generate_audio.js';
import { allNarrationSegments } from '../src/utils/narration.js';

const segs = allNarrationSegments();
const byText = new Map(phrases.map(p => [p.text, p.style]));
let problems = 0;

for (const s of segs) {
  if (!byText.has(s.text)) { console.error('✗ missing in phrases:', s.text.slice(0, 70)); problems++; }
  else if (byText.get(s.text) !== s.style) { console.error(`✗ style mismatch (${byText.get(s.text)} vs ${s.style}):`, s.text.slice(0, 60)); problems++; }
}
const spoken = new Set(segs.map(s => s.text));
for (const p of phrases) if (!spoken.has(p.text)) { console.error('✗ phrase never spoken:', p.text.slice(0, 70)); problems++; }

console.log(problems ? `\n${problems} problem(s) found.` : `✓ Audio parity OK — ${spoken.size} unique lines.`);
process.exit(problems ? 1 : 0);
