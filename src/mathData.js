/* =========================================================================
   MATH DATA & PROCEDURAL QUESTION GENERATOR
   Procedurally generates unbounded non-repeating Grade 8 linear-equation
   questions. Every answer is an integer; distractors are built from real
   student misconceptions (sign errors, one-side-only changes, skipped steps).
   ========================================================================= */

export const WESTERN_NAMES = [
  "Leo", "Emma", "Alex", "Oliver", "Sophia", "Jack", "Maya", "Lucas",
  "Ethan", "Chloe", "Noah", "Liam", "Harper", "Ava", "Mason", "Ella",
  "James", "Mia", "Logan", "Charlotte"
];

export const PRACTICE_WORLDS = [
  { id: 0, name: "Box Market", icon: "📦", range: "Q1–10",   difficulty: 1, pool: ["add", "sub"] },
  { id: 1, name: "Cube Canyon",        icon: "🧊", range: "Q11–20",  difficulty: 1, pool: ["add", "sub", "mul", "div"] },
  { id: 2, name: "Taxi Town",          icon: "🚕", range: "Q21–30",  difficulty: 2, pool: ["twoPlus", "twoMinus"] },
  { id: 3, name: "Phone Plaza",   icon: "📱", range: "Q31–40",  difficulty: 2, pool: ["word", "twoPlus", "twoMinus", "verify"] },
  { id: 4, name: "Bakery Balance",     icon: "🥐", range: "Q41–50",  difficulty: 3, pool: ["both", "twoPlus", "twoMinus"] },
  { id: 5, name: "Bracket Bridge",     icon: "🌉", range: "Q51–60",  difficulty: 3, pool: ["bracket", "twoMinus", "both"] },
  { id: 6, name: "Fraction Falls",     icon: "💧", range: "Q61–70",  difficulty: 3, pool: ["frac", "bracket", "twoPlus"] },
  { id: 7, name: "Detective Alley",    icon: "🕵️", range: "Q71–80",  difficulty: 4, pool: ["firstStep", "verify", "both", "frac"] },
  { id: 8, name: "Rocket Rental",      icon: "🚀", range: "Q81–90",  difficulty: 4, pool: ["wordBoth", "word", "both", "bracket"] },
  { id: 9, name: "Equation Citadel",   icon: "🏰", range: "Q91–100", difficulty: 4, pool: ["both", "bracket", "frac", "twoPlus", "twoMinus", "wordBoth", "firstStep"] }
];

/* ---------- helpers ---------- */
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Display number with a proper minus sign */
export function fmt(n) {
  const v = Number.isInteger(n) ? n : Number(n.toFixed(2));
  return v < 0 ? `−${Math.abs(v)}` : `${v}`;
}

/** Linear expression "ax + b" with sensible omissions: x, 3x, 2x + 5, x − 4 */
export function expr(a, b) {
  let s = "";
  if (a !== 0) s += a === 1 ? "x" : a === -1 ? "−x" : `${fmt(a)}x`;
  if (b !== 0) {
    if (a === 0) s += fmt(b);
    else s += b > 0 ? ` + ${b}` : ` − ${Math.abs(b)}`;
  }
  return s || "0";
}

/** x-values: mostly positive, negative answers appear in harder worlds */
function pickX(diff, lo = 2, hiBase = 8) {
  const hi = hiBase + diff * 2;
  if (diff >= 3 && Math.random() < 0.3) return -randInt(1, 8);
  return randInt(lo, hi);
}

/**
 * Build 4 options: the correct one + 3 unique integer distractors
 * (misconception candidates first, then neighbours of the answer).
 */
function buildOptions(correct, candidates, format) {
  const seen = new Set([correct]);
  const picks = [];
  const consider = v => {
    if (picks.length >= 3) return;
    if (!Number.isFinite(v) || !Number.isInteger(v) || seen.has(v)) return;
    if (Math.abs(v) > Math.abs(correct) * 3 + 15) return; // keep distractors believable
    seen.add(v);
    picks.push(v);
  };
  shuffle(candidates).forEach(consider);
  [1, -1, 2, -2, 3, -3, 4, -4, 5, 6].forEach(d => consider(correct + d));
  consider(correct * 2);
  consider(-correct);

  const values = shuffle([correct, ...picks]);
  return { options: values.map(format), correctIndex: values.indexOf(correct) };
}

/* ---------- archetypes ---------- */
const fmtX = v => `x = ${fmt(v)}`;

function qAdd(diff) {
  const x = randInt(3, 10 + 3 * diff), a = randInt(2, 9 + diff);
  const b = x + a;
  return {
    prompt: `Solve for x:  x + ${a} = ${b}`,
    answer: x, format: fmtX,
    candidates: [b + a, a, b, a - b, x + 1],
    diagram: { left: `x + ${a}`, right: `${b}` },
    explanation: `Subtract ${a} from both sides: x = ${b} − ${a} = ${x}.`
  };
}

function qSub(diff) {
  const x = randInt(5, 12 + 3 * diff), a = randInt(2, 9);
  const b = x - a;
  return {
    prompt: `Solve for x:  x − ${a} = ${b}`,
    answer: x, format: fmtX,
    candidates: [b - a, a, b, a * b, x - 1],
    diagram: { left: `x − ${a}`, right: `${b}` },
    explanation: `Add ${a} to both sides: x = ${b} + ${a} = ${x}.`
  };
}

function qMul(diff) {
  const a = randInt(2, 6 + diff), x = randInt(2, 9 + diff);
  const b = a * x;
  return {
    prompt: `Solve for x:  ${a}x = ${b}`,
    answer: x, format: fmtX,
    candidates: [b - a, b + a, b * a, a, b],
    diagram: { left: `${a}x`, right: `${b}` },
    explanation: `Divide both sides by ${a}: x = ${b} ÷ ${a} = ${x}.`
  };
}

function qDiv(diff) {
  const a = randInt(2, 5 + diff), b = randInt(2, 8 + diff);
  const x = a * b;
  return {
    prompt: `Solve for x:  x ÷ ${a} = ${b}`,
    answer: x, format: fmtX,
    candidates: [b - a, b + a, b, a, x + a],
    diagram: { left: `x ÷ ${a}`, right: `${b}` },
    explanation: `Multiply both sides by ${a}: x = ${b} × ${a} = ${x}.`
  };
}

function qTwo(diff, plus) {
  const a = randInt(2, 3 + diff);
  let x = pickX(diff);
  let b = randInt(1, 8 + 3 * diff);
  if (!plus && diff <= 2) b = randInt(1, Math.max(1, Math.min(b, a * x - 1)));
  const sb = plus ? b : -b;
  const c = a * x + sb;
  const eq = `${expr(a, sb)} = ${fmt(c)}`;
  return {
    prompt: `Solve for x:  ${eq}`,
    answer: x, format: fmtX,
    candidates: [(c - sb * -1) / a, (c + sb) / a, c / a - sb, (c - sb) * a, c - sb, c + sb],
    diagram: { left: expr(a, sb), right: fmt(c) },
    explanation: plus
      ? `Subtract ${b} from both sides: ${a}x = ${fmt(c - b)}. Divide by ${a}: x = ${fmt(x)}.`
      : `Add ${b} to both sides: ${a}x = ${fmt(c + b)}. Divide by ${a}: x = ${fmt(x)}.`
  };
}

function qBoth(diff) {
  let a, c, b, d, x;
  for (let tries = 0; tries < 30; tries++) {
    c = randInt(1, 3 + diff);
    a = c + randInt(1, 4);
    x = pickX(diff, 2, 7);
    b = randInt(1, 9 + diff * 2);
    d = (a - c) * x + b;
    if (d > -20 && d < 70 && !(c === 1 && a === 2 && b === d)) break;
  }
  const flip = Math.random() < 0.35; // sometimes put the bigger x-term on the right
  const L = flip ? expr(c, d) : expr(a, b);
  const R = flip ? expr(a, b) : expr(c, d);
  return {
    prompt: `Solve for x:  ${L} = ${R}`,
    answer: x, format: fmtX,
    candidates: [(d + b) / (a - c), (d - b) / (a + c), (d - b) / a, (d - b) / c, (b - d) / (a - c) * -1 + 1],
    diagram: { left: L, right: R },
    explanation: `Gather the x-terms: subtract ${c}x from both sides to get ${flip ? `${fmt(d)} = ${expr(a - c, b)}` : `${expr(a - c, b)} = ${fmt(d)}`}. Then ${b >= 0 ? `subtract ${b}` : `add ${Math.abs(b)}`} and divide by ${a - c}: x = ${fmt(x)}.`
  };
}

function qBracket(diff) {
  const a = randInt(2, 3 + diff);
  const b = pick([-1, 1]) * randInt(1, 3 + diff);
  const x = pickX(diff, 2, 7);
  const c = a * (x + b);
  const inner = b > 0 ? `x + ${b}` : `x − ${Math.abs(b)}`;
  return {
    prompt: `Solve for x:  ${a}(${inner}) = ${fmt(c)}`,
    answer: x, format: fmtX,
    candidates: [c / a + b, (c - b) / a, c / a, (c + a) / a - b, c - a * b],
    diagram: { left: `${a}(${inner})`, right: fmt(c) },
    explanation: `Divide both sides by ${a}: ${inner} = ${fmt(c / a)}. Then ${b > 0 ? `subtract ${b}` : `add ${Math.abs(b)}`}: x = ${fmt(x)}.`
  };
}

function qFrac(diff) {
  const a = randInt(2, 4 + Math.floor(diff / 2));
  const k = randInt(2, 6 + diff);
  const x = a * k;
  const b = randInt(1, 9);
  const plus = Math.random() < 0.6;
  const c = k + (plus ? b : -b);
  const L = `x ÷ ${a} ${plus ? "+" : "−"} ${b}`;
  return {
    prompt: `Solve for x:  ${L} = ${fmt(c)}`,
    answer: x, format: fmtX,
    candidates: [c - (plus ? b : -b), a * c - (plus ? b : -b), a * (c + (plus ? b : -b)), k + a, c * a],
    diagram: { left: L, right: fmt(c) },
    explanation: `${plus ? `Subtract ${b}` : `Add ${b}`} from both sides: x ÷ ${a} = ${k}. Multiply by ${a}: x = ${x}.`
  };
}

function qVerify(diff) {
  const eqPick = pick(["two", "both"]);
  let L, R, x, test;
  if (eqPick === "two") {
    const a = randInt(2, 3 + diff), b = randInt(1, 9);
    x = randInt(2, 9 + diff);
    L = expr(a, b); R = `${a * x + b}`;
    test = `${a}(${x}) + ${b} = ${a * x + b}`;
  } else {
    const c = randInt(1, 3), a = c + randInt(1, 3), b = randInt(1, 8);
    x = randInt(2, 8);
    const d = (a - c) * x + b;
    L = expr(a, b); R = expr(c, d);
    test = `${a}(${x}) + ${b} = ${a * x + b}  and  ${c}(${x}) + ${d} = ${c * x + d}`;
  }
  return {
    prompt: `Which value of x makes this equation true?  ${L} = ${R}`,
    answer: x, format: fmtX,
    candidates: [x + 1, x - 1, x + 2, x - 2],
    diagram: { left: L, right: R, mode: "verify" },
    explanation: `Substitute x = ${x}: ${test}. Both sides match!`
  };
}

function qFirstStep(diff) {
  const a = randInt(2, 4 + diff), b = randInt(2, 9), plus = Math.random() < 0.55;
  const x = randInt(2, 9), c = a * x + (plus ? b : -b);
  const eq = `${expr(a, plus ? b : -b)} = ${c}`;
  const good = plus ? `Subtract ${b} from both sides` : `Add ${b} to both sides`;
  const options = shuffle([
    good,
    plus ? `Add ${b} to both sides` : `Subtract ${b} from both sides`,
    plus ? `Subtract ${b} from the left side only` : `Add ${b} to the left side only`,
    `Divide only the ${a}x term by ${a}`
  ]);
  return {
    custom: true,
    prompt: `To solve ${eq}, which move should come FIRST?`,
    options, correctIndex: options.indexOf(good),
    diagram: { left: expr(a, plus ? b : -b), right: `${c}`, mode: "verify" },
    explanation: `${good} so the ${plus ? "+" : "−"} ${b} is undone on BOTH sides. Then divide by ${a}.`
  };
}

const WORD_BANK = [
  { ctx: n => `${n}'s phone plan costs $B per month plus $A for each GB of data. This month's bill is $C. How many GB did ${n} use?`, unit: "GB", icon: "📱", letX: "the GB of data used" },
  { ctx: n => `A taxi charges $B to start plus $A per kilometre. ${n} paid $C. How many kilometres was the ride?`, unit: "km", icon: "🚕", letX: "the kilometres travelled" },
  { ctx: n => `A theme park charges $B entry plus $A for every ride. ${n} spent $C in total. How many rides did ${n} take?`, unit: "rides", icon: "🎢", letX: "the number of rides" },
  { ctx: n => `${n} has $B saved and adds $A every week. After how many weeks will ${n} have $C?`, unit: "weeks", icon: "🐷", letX: "the number of weeks" },
  { ctx: n => `${n} thinks of a number, multiplies it by A, then adds B. The result is C. What was the number?`, unit: "", icon: "💭", letX: "the number" }
];

function qWord(diff) {
  const w = pick(WORD_BANK);
  const name = pick(WESTERN_NAMES);
  const A = randInt(2, 4 + diff), x = randInt(2, 9 + diff), B = randInt(2, 15);
  const C = A * x + B;
  const text = w.ctx(name).replace("$A", `$${A}`).replace("$B", `$${B}`).replace("$C", `$${C}`)
    .replace(/multiplies it by A/, `multiplies it by ${A}`).replace(/adds B/, `adds ${B}`).replace(/is C\./, `is ${C}.`);
  return {
    prompt: text,
    answer: x, format: v => `${fmt(v)}${w.unit ? " " + w.unit : ""}`,
    candidates: [(C + B) / A, C / A - B, C - B, (C - B) * A, x + 1],
    diagram: { mode: "word", icon: w.icon, letX: w.letX },
    explanation: `Write ${A}x + ${B} = ${C}. Subtract ${B}: ${A}x = ${C - B}. Divide by ${A}: x = ${x}.`
  };
}

function qWordBoth(diff) {
  const name = pick(WESTERN_NAMES);
  const c = randInt(1, 3 + Math.floor(diff / 2)), a = c + randInt(1, 3);
  const x = randInt(3, 10);
  const b = randInt(1, 9);
  const d = (a - c) * x + b;
  const scen = pick([
    { t: `${name} compares two bike shops. Shop A charges $${b} plus $${a} per hour. Shop B charges $${d} plus $${c} per hour. After how many hours do both shops cost the same?`, unit: "hours", icon: "🚲", letX: "the hours rented" },
    { t: `Two rocket rides: Ride A costs $${b} to board plus $${a} per minute. Ride B costs $${d} plus $${c} per minute. For how many minutes do both cost the same?`, unit: "minutes", icon: "🚀", letX: "the minutes flown" },
    { t: `${name} compares two music apps. App A has a $${b} fee plus $${a} per album. App B has a $${d} fee plus $${c} per album. For how many albums are the costs equal?`, unit: "albums", icon: "🎧", letX: "the number of albums" }
  ]);
  return {
    prompt: scen.t,
    answer: x, format: v => `${fmt(v)} ${scen.unit}`,
    candidates: [(d + b) / (a - c), (d - b) / (a + c), (d - b) / a, x + 1],
    diagram: { mode: "word", icon: scen.icon, letX: scen.letX },
    explanation: `Set ${expr(a, b)} = ${expr(c, d)}. Subtract ${c}x: ${expr(a - c, b)} = ${d}. Then solve: x = ${x}.`
  };
}

const ARCHETYPES = {
  add: qAdd, sub: qSub, mul: qMul, div: qDiv,
  twoPlus: d => qTwo(d, true), twoMinus: d => qTwo(d, false),
  both: qBoth, bracket: qBracket, frac: qFrac,
  verify: qVerify, firstStep: qFirstStep,
  word: qWord, wordBoth: qWordBoth
};

/**
 * Generate a procedural question for a given world
 */
export function makeQuestion(worldIndex = 0) {
  const world = PRACTICE_WORLDS[worldIndex] || PRACTICE_WORLDS[0];
  const key = pick(world.pool);
  const q = ARCHETYPES[key](world.difficulty);

  let options, correctIndex;
  if (q.custom) {
    ({ options, correctIndex } = q);
  } else {
    ({ options, correctIndex } = buildOptions(q.answer, q.candidates, q.format));
  }

  return {
    world,
    kind: key,
    prompt: q.prompt,
    options,
    correctIndex,
    diagramData: q.diagram,
    explanation: q.explanation
  };
}
