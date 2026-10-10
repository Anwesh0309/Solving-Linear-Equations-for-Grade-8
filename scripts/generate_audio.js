/* =========================================================================
   OFFLINE AUDIO GENERATION  —  node scripts/generate_audio.js  (npm run generate-audio)
   Pre-generates every narrated line with ElevenLabs (voice: Alice) and writes:
     - public/assets/audio/*.mp3
     - src/utils/audioMap.js   (text -> mp3 path)
   Options:  --force   re-generate files that already exist
   Content policy: ONLY paragraph text and questions. NEVER titles/headings.
   ========================================================================= */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { CURATED_PRACTICE_QUESTIONS } from '../src/practiceQuestionsData.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const AUDIO_DIR = path.join(ROOT, 'public', 'assets', 'audio');
const MAP_FILE = path.join(ROOT, 'src', 'utils', 'audioMap.js');

const VOICE_ID = 'Xb7hH8MSUJpSbSDYk0k2'; // Alice
const MODEL_ID = 'eleven_multilingual_v2';

const VOICE_SETTINGS = {
  celebration:   { stability: 0.12, similarity_boost: 0.45, style: 0.75, use_speaker_boost: true },
  encouragement: { stability: 0.16, similarity_boost: 0.50, style: 0.65, use_speaker_boost: true },
  question:      { stability: 0.20, similarity_boost: 0.55, style: 0.55, use_speaker_boost: true },
  emphasis:      { stability: 0.16, similarity_boost: 0.50, style: 0.60, use_speaker_boost: true },
  thinking:      { stability: 0.24, similarity_boost: 0.60, style: 0.35, use_speaker_boost: true },
  statement:     { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true },
  instruction:   { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true }
};

// >>> PHRASES START (exact text + style; paragraphs & questions only)
export const basePhrases = [
  { text: "Maya's balance scale holds a mystery box plus 3 cubes on one side and 11 cubes on the other. It balances perfectly! Take 3 cubes off both sides and the box is revealed: it weighs just 8 cubes!", style: 'statement' },
  { text: "How can we solve any equation without guessing?", style: 'question' },
  { text: "Look around! A see-saw, a shop scale, and a phone bill all hide a missing number. Maya calls this hidden value x, a letter that holds its place until we solve for it.", style: 'statement' },
  { text: "An equation says two things are equal, like 2 x plus 3 equals 11. The equals sign is the balance point: the left side and the right side must always weigh exactly the same.", style: 'statement' },
  { text: "To keep a scale balanced, whatever you do to one side, you must do to the other side. You can add to both sides, subtract from both sides, multiply both sides, or divide both sides.", style: 'emphasis' },
  { text: "To free x, we undo whatever was done to it. Addition and subtraction undo each other, and multiplication and division undo each other. These pairs are called inverse operations.", style: 'emphasis' },
  { text: "In x plus 5 equals 12, the 5 is added to x, so subtract 5 from both sides to get x equals 7. In 3 x equals 15, x is multiplied by 3, so divide both sides by 3 to get x equals 5.", style: 'emphasis' },
  { text: "For 2 x plus 3 equals 11, first subtract 3 from both sides to get 2 x equals 8. Then divide both sides by 2 to get x equals 4. Undo adding or subtracting first, then undo multiplying or dividing.", style: 'emphasis' },
  { text: "Maya compares two gym plans. Plan A costs 4 dollars plus 3 dollars per visit, and Plan B costs 10 dollars plus 2 dollars per visit. They cost the same when 3 x plus 4 equals 2 x plus 10. Subtract 2 x from both sides to get x plus 4 equals 10, so x equals 6 visits!", style: 'encouragement' },
  { text: "Brackets need expanding first: 3 times the bracket x minus 2 becomes 3 x minus 6. And always check your answer by putting it back into the equation. If both sides match, you are right! Now step into the lab to balance, undo, and solve!", style: 'celebration' },
  { text: "Welcome to the Balance Scale station! Here you will see why both sides must always stay equal.", style: 'encouragement' },
  { text: "Maya's scale balances a mystery box plus 3 cubes against 11 cubes. Pick a move, apply it to both sides, and reveal the weight of the box!", style: 'statement' },
  { text: "Three identical bags balance 15 cubes. Choose a move that keeps the scale balanced and reveals what one bag weighs!", style: 'statement' },
  { text: "Two bags and 3 cubes balance 11 cubes. Order matters here: which move should you make first, and which second?", style: 'statement' },
  { text: "Awesome! You solved it and kept the scale balanced!", style: 'celebration' },
  { text: "Welcome to the Undo Lab! Practice reversing steps, putting them in order, and catching mistakes.", style: 'encouragement' },
  { text: "A number machine multiplies x by 3, then adds 2, and prints 20. Run it backwards: tap the undo buttons in the right order to find the starting number!", style: 'statement' },
  { text: "Solve 4 x minus 6 equals 18 by tapping the solution cards in the correct order. Watch out for the trick card!", style: 'statement' },
  { text: "A student solved 2 x plus 6 equals 14, but one line has a mistake. Tap the faulty line, then choose how to fix it!", style: 'statement' },
  { text: "Brilliant! You undid every step perfectly!", style: 'celebration' },
  { text: "Welcome to the Solo Solver! Now it's your turn to solve real problems on your own.", style: 'encouragement' },
  { text: "A taxi charges 3 dollars to start plus 2 dollars for every kilometre. Maya paid 15 dollars in total. How many kilometres did she ride? Solve 2 x plus 3 equals 15.", style: 'question' },
  { text: "Plan A costs 5 dollars plus 4 dollars per visit. Plan B costs 15 dollars plus 2 dollars per visit. After how many visits do both plans cost the same? Solve 4 x plus 5 equals 2 x plus 15.", style: 'question' },
  { text: "The chest opens with the code x that solves 3 times the bracket x minus 2 equals 21. Find the code to unlock the treasure!", style: 'question' },
  { text: "Outstanding! Your answer checks out!", style: 'celebration' },
  { text: "Not quite. Check your steps and try again!", style: 'encouragement' },
  { text: "Correct! Great equation solving!", style: 'celebration' },
  { text: "Yes! You kept it balanced!", style: 'celebration' },
  { text: "Brilliant work!", style: 'celebration' },
  { text: "Not quite. Let's learn from it!", style: 'encouragement' },
  { text: "Good try. Check the steps and keep going!", style: 'encouragement' },
  { text: "Almost! Every mistake helps us learn.", style: 'encouragement' },
  { text: "Out of hearts! No worries, let's practice some more and try again!", style: 'thinking' },
  { text: "What did you learn about solving linear equations? Explain it to Robo with an example!", style: 'thinking' },
  { text: "Outstanding reflection! Lesson complete!", style: 'celebration' }
];

// Add 10 worlds x 10 questions = 100 questions
const practiceQuestionPhrases = [];
for (let w = 0; w < 10; w++) {
  (CURATED_PRACTICE_QUESTIONS[w] || []).forEach(q => {
    practiceQuestionPhrases.push({
      text: q.spoken,
      style: 'question'
    });
  });
}

export const phrases = [...basePhrases, ...practiceQuestionPhrases];
// <<< PHRASES END

function loadKey() {
  if (process.env.VITE_ELEVENLABS_API_KEY) return process.env.VITE_ELEVENLABS_API_KEY;
  const envPath = path.join(ROOT, '.env.local');
  if (fs.existsSync(envPath)) {
    const m = fs.readFileSync(envPath, 'utf8').match(/^\s*VITE_ELEVENLABS_API_KEY\s*=\s*(.+)\s*$/m);
    if (m) return m[1].trim().replace(/^["']|["']$/g, '');
  }
  return '';
}

const slugify = t => t.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '').slice(0, 40);
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const force = process.argv.includes('--force');
  const apiKey = loadKey();
  if (!apiKey) {
    console.error('Missing VITE_ELEVENLABS_API_KEY (set it in .env.local).');
    process.exit(1);
  }
  fs.mkdirSync(AUDIO_DIR, { recursive: true });

  const map = {};
  let made = 0, reused = 0, failed = 0;

  for (let i = 0; i < phrases.length; i++) {
    const { text, style } = phrases[i];
    const file = `audio_${slugify(text)}_${i}.mp3`;
    const out = path.join(AUDIO_DIR, file);

    if (!force && fs.existsSync(out) && fs.statSync(out).size > 1000) {
      map[text] = `/assets/audio/${file}`;
      reused++;
      continue;
    }

    try {
      const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}?output_format=mp3_44100_128`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'xi-api-key': apiKey, Accept: 'audio/mpeg' },
        body: JSON.stringify({ text, model_id: MODEL_ID, voice_settings: VOICE_SETTINGS[style] || VOICE_SETTINGS.statement })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status} ${await res.text()}`);
      fs.writeFileSync(out, Buffer.from(await res.arrayBuffer()));
      map[text] = `/assets/audio/${file}`;
      made++;
      console.log(`✓ [${i + 1}/${phrases.length}] ${style.padEnd(13)} ${file}`);
    } catch (e) {
      failed++;
      console.error(`✗ [${i + 1}/${phrases.length}] ${text.slice(0, 50)}…  ${e.message}`);
    }
    await sleep(500); // rate limit
  }

  const body = Object.entries(map)
    .map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)}`)
    .join(',\n');
  fs.writeFileSync(
    MAP_FILE,
    `/* AUTO-GENERATED by scripts/generate_audio.js — do not edit by hand.\n   Key: exact spoken text  ->  Value: path of the pre-generated .mp3. */\nexport const audioMap = {\n${body}\n};\n`
  );
  console.log(`\nDone. generated ${made}, reused ${reused}, failed ${failed}. audioMap.js updated (${Object.keys(map).length} entries).`);
  if (failed) console.log('Re-run the script to retry failed lines (existing files are kept).');
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) main();
