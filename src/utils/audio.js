/* =========================================================================
   AUDIO ENGINE (ElevenLabs "Alice" pipeline + Zero-Overlap Controller)
   Voice: Alice (Clear, Engaging Educator) — Voice ID: Xb7hH8MSUJpSbSDYk0k2
   Model: eleven_multilingual_v2

   Resolution order for every narrated line:
     1. audioMap[text]      -> pre-generated static .mp3 (zero latency)
     2. /api/elevenlabs     -> optional server proxy (if deployed)
     3. ElevenLabs direct   -> uses VITE_ELEVENLABS_API_KEY from .env.local
     4. Web Speech API      -> last-resort browser voice (Alice-style fallback)

   ZERO-OVERLAP GUARANTEE:
     Whenever the user skips, switches slides, changes questions, or leaves
     a phase, all currently playing audio elements and Web Speech utterances
     are immediately terminated and cleaned up.
   ========================================================================= */
import { audioMap } from './audioMap.js';

export const VOICE_ID = 'Xb7hH8MSUJpSbSDYk0k2';
export const MODEL_ID = 'eleven_multilingual_v2';

/* Per-style voice settings */
export const STYLE_SETTINGS = {
  celebration:   { stability: 0.12, similarity_boost: 0.45, style: 0.75, use_speaker_boost: true, rate: 1.06, pitch: 1.2 },
  encouragement: { stability: 0.16, similarity_boost: 0.50, style: 0.65, use_speaker_boost: true, rate: 1.0,  pitch: 1.1 },
  question:      { stability: 0.20, similarity_boost: 0.55, style: 0.55, use_speaker_boost: true, rate: 0.98, pitch: 1.08 },
  emphasis:      { stability: 0.16, similarity_boost: 0.50, style: 0.60, use_speaker_boost: true, rate: 0.95, pitch: 1.05 },
  thinking:      { stability: 0.24, similarity_boost: 0.60, style: 0.35, use_speaker_boost: true, rate: 0.90, pitch: 0.95 },
  statement:     { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true, rate: 1.0,  pitch: 1.0 },
  instruction:   { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true, rate: 1.0,  pitch: 1.0 }
};

const API_KEY = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_ELEVENLABS_API_KEY) || '';

export let audioMuted = false;
let currentAudioElement = null;
let currentQueue = 0;
let ttsVoice = null;

/* ---------- Web Speech fallback voice selection ---------- */
function pickVoice() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  return (
    voices.find(v => /female|alice|zira|samantha|victoria|google us english/i.test(v.name)) ||
    voices.find(v => v.lang && v.lang.startsWith('en')) ||
    voices[0]
  );
}
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => { ttsVoice = pickVoice(); };
  ttsVoice = pickVoice();
}

/* ---------- Segment helpers ---------- */
export const say = text => ({ text, style: 'statement' });
export const ask = text => ({ text, style: 'question' });
export const cheer = text => ({ text, style: 'celebration' });
export const emphasize = text => ({ text, style: 'emphasis' });
export const think = text => ({ text, style: 'thinking' });
export const celebrate = text => ({ text, style: 'celebration' });
export const instruct = text => ({ text, style: 'encouragement' });

/* ---------- URL resolution (cache check -> dynamic request) ---------- */
const dynamicCache = new Map();
const cacheKey = (text, style) => `${style}::${text}`;

async function requestDynamic(text, style) {
  const cfg = STYLE_SETTINGS[style] || STYLE_SETTINGS.statement;
  const voice_settings = {
    stability: cfg.stability,
    similarity_boost: cfg.similarity_boost,
    style: cfg.style,
    use_speaker_boost: cfg.use_speaker_boost
  };

  // 1) Server-side proxy
  try {
    const res = await fetch('/api/elevenlabs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, voice_id: VOICE_ID, model_id: MODEL_ID, voice_settings })
    });
    if (res.ok && /audio/i.test(res.headers.get('content-type') || '')) {
      return URL.createObjectURL(await res.blob());
    }
  } catch (e) {}

  // 2) Direct ElevenLabs call
  if (!API_KEY || !API_KEY.startsWith('sk_')) return null;
  try {
    const res = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}?output_format=mp3_44100_128`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'xi-api-key': API_KEY, Accept: 'audio/mpeg' },
        body: JSON.stringify({ text, model_id: MODEL_ID, voice_settings })
      }
    );
    if (!res.ok) return null;
    return URL.createObjectURL(await res.blob());
  } catch (e) {
    return null;
  }
}

/** Returns a playable URL for the text, or null if only browser speech is possible. */
export function getAudioUrl(text, style = 'statement') {
  if (audioMap[text]) return Promise.resolve(audioMap[text]);
  const key = cacheKey(text, style);
  if (!dynamicCache.has(key)) {
    const p = requestDynamic(text, style).then(url => {
      if (!url) dynamicCache.delete(key);
      return url;
    });
    dynamicCache.set(key, p);
  }
  return dynamicCache.get(key);
}

/* ---------- Zero-Overlap Playback Engine ---------- */
function playUrl(url, myQueue) {
  return new Promise(resolve => {
    if (myQueue !== currentQueue || audioMuted) return resolve();

    const audio = new Audio();
    audio.preload = 'auto';
    currentAudioElement = audio;

    let finished = false;
    const cleanup = () => {
      if (finished) return;
      finished = true;
      audio.onended = null;
      audio.onerror = null;
      if (currentAudioElement === audio) {
        currentAudioElement = null;
      }
      resolve();
    };

    audio.onended = cleanup;
    audio.onerror = cleanup;
    audio.src = url;

    audio.play().catch(() => {
      cleanup();
    });
  });
}

function fallbackSpeech(seg, myQueue) {
  return new Promise(resolve => {
    if (audioMuted || myQueue !== currentQueue || typeof window === 'undefined' || !('speechSynthesis' in window) || !seg.text) {
      return resolve();
    }

    try {
      window.speechSynthesis.cancel();
    } catch (e) {}

    const cfg = STYLE_SETTINGS[seg.style] || STYLE_SETTINGS.statement;
    const utter = new SpeechSynthesisUtterance(seg.text);
    if (ttsVoice) utter.voice = ttsVoice;
    utter.rate = cfg.rate || 1.0;
    utter.pitch = cfg.pitch || 1.0;
    utter.volume = 1;

    let finished = false;
    const cleanup = () => {
      if (finished) return;
      finished = true;
      utter.onend = null;
      utter.onerror = null;
      resolve();
    };

    utter.onend = cleanup;
    utter.onerror = cleanup;

    try {
      window.speechSynthesis.speak(utter);
    } catch (e) {
      cleanup();
    }
  });
}

async function speakSegment(seg, myQueue) {
  if (audioMuted || !seg || !seg.text || myQueue !== currentQueue) return;
  const style = seg.style || 'statement';

  let url = await getAudioUrl(seg.text, style);
  if (myQueue !== currentQueue || audioMuted) return;

  if (url) {
    await playUrl(url, myQueue);
    return;
  }

  if (myQueue !== currentQueue || audioMuted) return;
  await fallbackSpeech(seg, myQueue);
}

/** Plays an array of segments sequentially. An immediate stop cleans up any prior audio. */
export async function narrate(segments, autoplay = true) {
  if (!autoplay || audioMuted) return;
  stopNarration();
  const myQueue = ++currentQueue;
  const segList = (Array.isArray(segments) ? segments : [segments]).filter(Boolean);

  for (let i = 0; i < segList.length; i++) {
    if (myQueue !== currentQueue || audioMuted) return;
    if (segList[i + 1]) {
      getAudioUrl(segList[i + 1].text, segList[i + 1].style || 'statement');
    }
    await speakSegment(segList[i], myQueue);
  }
}

/** Instantly halts ALL audio, resets audio elements, and cancels browser speech */
export function stopNarration() {
  currentQueue++;

  if (currentAudioElement) {
    currentAudioElement.onended = null;
    currentAudioElement.onerror = null;
    try {
      currentAudioElement.pause();
      currentAudioElement.currentTime = 0;
      currentAudioElement.src = '';
    } catch (e) {}
    currentAudioElement = null;
  }

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {}
  }
}

export function setMuted(m) {
  audioMuted = m;
  if (m) stopNarration();
}
