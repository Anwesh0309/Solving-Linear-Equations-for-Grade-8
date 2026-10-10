# Linear Equations Quest — Grade 8 Interactive Math Module

An interactive, gamified educational module for Grade 8 students to master solving linear equations through intuitive physical models, real-world simulations, anime-style storytelling, and 10 themed challenge worlds.

---

## Features
- **Phase 1: Wonder & Curiosity**: Interactive mystery balance scale problem that sparks inquiry.
- **Phase 2: Story Adventure**: 8-step visual narrative with high-quality anime illustrations starring Maya discovering balance rules, inverse operations, brackets, and verification.
- **Phase 3: Simulation Stations**:
  - **Station 1: Balance Scale**: Artisan market crates, stationery sacks, and gift baskets with a physical needle gauge and Golden Rule tilt alarm.
  - **Station 2: Undo Lab**: Retro arcade token dispensers, birthday parcel unboxing protocol, and cafe receipt auditor with interactive magnifying glass.
  - **Station 3: Solo Solver**: Metro City taxi dashboard with live taximeter, FitZone vs PowerGym membership cards, and ancient vault cipher tumblers.
- **Phase 4: Practice Worlds**: 10 themed game worlds with 100 curated non-repeating Grade 8 questions, step-by-step explanations, visual diagrams, hearts system, and star ratings.
- **Phase 5: Reflection & Mastery**: Metacognitive prompt and celebratory score report.

---

## Audio Pipeline & Zero-Overlap Engine
- **Voice**: ElevenLabs Alice (`Xb7hH8MSUJpSbSDYk0k2`), `eleven_multilingual_v2`
- **Zero-Overlap Architecture**: Immediate queue invalidation halts previous audio when skipping slides, changing stations, answering questions, or switching phases.
- **Pre-generated MP3s**: 133+ static audio files stored in `public/assets/audio/` for instant zero-latency playback.
- **Browser TTS Fallback**: Seamless Web Speech API fallback when offline or without API credits.

---

## Running Locally

```bash
# Install dependencies
npm install

# Start Vite dev server
npm run dev

# Build production bundle
npm run build
```

## Audio Scripts
```bash
# Generate offline audio with ElevenLabs
npm run generate-audio

# Verify audio parity across data and audio map (135 lines)
npm run verify-audio

# Clean up orphaned audio assets
npm run clean-audio
```

## Project Structure
- `src/stages/`: WonderPhase, StoryPhase, SimulatePhase, PracticePhase, ReflectPhase, IntroPhase.
- `src/components/sim/`: BalanceLab, UndoLab, SoloSolver.
- `src/practiceQuestionsData.js`: 100 curated practice questions across 10 worlds.
- `src/utils/audio.js`: Zero-overlap audio controller and TTS resolver.
- `src/utils/sfx.js`: Synthesized Web Audio API sound effects.
- `public/assets/images/`: Story phase anime illustrations.
- `public/assets/audio/`: Pre-rendered ElevenLabs MP3 narration files.
