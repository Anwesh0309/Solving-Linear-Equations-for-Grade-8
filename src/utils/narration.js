/* =========================================================================
   NARRATION SCRIPTS — maps app phases to their audio scripts.
   Only paragraph text and questions are narrated. NEVER titles / headings.
   Every string here must also exist in scripts/generate_audio.js `phrases`
   (run `npm run verify-audio` to check).
   ========================================================================= */
import { say, ask, cheer, instruct, emphasize, think } from './audio.js';
import { STORY_SLIDES, WONDER, REFLECT_QUESTION } from '../storyData.js';
import {
  STATIONS, STATION_ACTIVITIES, SIM_SUCCESS, SIM_RETRY,
  PRACTICE_CORRECT, PRACTICE_INCORRECT, OUT_OF_HEARTS, REFLECT_DONE
} from '../simData.js';
import { CURATED_PRACTICE_QUESTIONS } from '../practiceQuestionsData.js';

const STORY_STYLES = ['statement', 'statement', 'emphasis', 'emphasis', 'emphasis', 'emphasis', 'encouragement', 'celebration'];
const STYLE_FN = { statement: say, emphasis: emphasize, encouragement: instruct, celebration: cheer };

const pick = arr => arr[Math.floor(Math.random() * arr.length)];

export function wonderNarration() {
  return [say(WONDER.spokenBody), ask(WONDER.question)];
}

export function getStoryNarration(index) {
  const slide = STORY_SLIDES[index];
  if (!slide) return [];
  return [STYLE_FN[STORY_STYLES[index]](slide.spoken)];
}

export function simulateStationIntro(station) {
  const s = STATIONS.find(x => x.id === station);
  return s ? [instruct(s.intro)] : [];
}

export function simulateActivityNarration(station, actIdx) {
  const act = STATION_ACTIVITIES[station][actIdx];
  const segs = [];
  if (actIdx === 0) segs.push(...simulateStationIntro(station));
  segs.push(station === 3 ? ask(act.spoken) : say(act.spoken));
  return segs;
}

export const simulateSuccessNarration = station => [cheer(SIM_SUCCESS[station])];
export const simulateRetryNarration = () => [instruct(SIM_RETRY)];

export const practiceQuestionNarration = (worldIndex, qIndex) => {
  const q = CURATED_PRACTICE_QUESTIONS[worldIndex]?.[qIndex];
  return q ? [ask(q.spoken)] : [];
};

export const practiceCorrectNarration = () => [cheer(pick(PRACTICE_CORRECT))];
export const practiceIncorrectNarration = () => [instruct(pick(PRACTICE_INCORRECT))];
export const outOfHeartsNarration = () => [think(OUT_OF_HEARTS)];

export const reflectQuestionNarration = () => [think(REFLECT_QUESTION)];
export const reflectCompleteNarration = () => [cheer(REFLECT_DONE)];

/** Every line the app can speak (used by the parity checker). */
export function allNarrationSegments() {
  const out = [...wonderNarration()];
  STORY_SLIDES.forEach((_, i) => out.push(...getStoryNarration(i)));
  [1, 2, 3].forEach(st => {
    STATION_ACTIVITIES[st].forEach((_, i) => out.push(...simulateActivityNarration(st, i)));
    out.push(...simulateSuccessNarration(st));
  });
  out.push(...simulateRetryNarration());
  PRACTICE_CORRECT.forEach(t => out.push(cheer(t)));
  PRACTICE_INCORRECT.forEach(t => out.push(instruct(t)));
  out.push(...outOfHeartsNarration(), ...reflectQuestionNarration(), ...reflectCompleteNarration());
  for (let w = 0; w < 10; w++) {
    (CURATED_PRACTICE_QUESTIONS[w] || []).forEach(q => {
      out.push(ask(q.spoken));
    });
  }
  return out;
}
