import React, { useState, useMemo, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { playClick, playSwooshShimmer, playStampThud, playVictoryFanfare, playWobbleWarn } from '../../utils/sfx.js';

/* =========================================================================
   STATION 2 — UNDO LAB (Real-World Reversal & Audit Station)
   Inspired by Story Phase (Slide 4 Undo Buttons, Slide 6 Gift Metaphor).
   Activities:
     A1 Arcade Vending Machine   : Rewind coin token through dispenser
     A2 Gift Unboxing Protocol    : Untie ribbon (+), open box flaps (÷)
     A3 Cafe Invoice Auditor      : Audit receipt errors with auditor stamps
   ========================================================================= */

const WRAP = "flex flex-col items-center gap-1.5 sm:gap-2.5 bg-[#1e1342]/95 border-2 border-cyan-400/40 rounded-xl sm:rounded-2xl p-2 sm:p-3 shadow-xl flex-1 min-h-0 overflow-y-auto w-full";

const SYM = { mul: '×', div: '÷', add: '+', sub: '−' };
const INVERSE = { mul: 'div', div: 'mul', add: 'sub', sub: 'add' };
const NAME = { mul: 'multiplying', div: 'dividing', add: 'adding', sub: 'subtracting' };
const run = (op, v, val) => (op === 'mul' ? val * v : op === 'div' ? val / v : op === 'add' ? val + v : val - v);

function useShake() {
  const [shake, setShake] = useState(null);
  const t = useRef(null);
  const trigger = id => {
    setShake(id);
    clearTimeout(t.current);
    t.current = setTimeout(() => setShake(null), 450);
  };
  useEffect(() => () => clearTimeout(t.current), []);
  return [shake, trigger];
}

function HintBar({ hint, grade7Tip, children }) {
  const [show, setShow] = useState(false);
  return (
    <div className="w-full flex flex-col items-center gap-1.5 shrink-0">
      <div className="flex items-center gap-2">
        {children}
        <button
          onClick={() => { playClick(); setShow(h => !h); }}
          className="bg-purple-900/80 hover:bg-purple-800 border border-purple-400/50 text-purple-200 font-display font-900 text-[11px] sm:text-xs px-3 py-1.5 rounded-lg sm:rounded-xl transition cursor-pointer"
        >
          💡 Hint
        </button>
      </div>
      {show && (
        <div className="p-2 sm:p-2.5 bg-amber-950/90 border border-amber-400/60 text-amber-200 rounded-lg sm:rounded-xl text-xs font-bold w-full text-left fade-in-up">
          <p className="font-black text-amber-300 mb-0.5">💡 Grade 7 Guide:</p>
          <p className="leading-snug">{grade7Tip || hint}</p>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- A1: Arcade Vending Machine */
export function UndoMachine({ activity, onSolved }) {
  const { stages, output, answer, hint, grade7Tip, realWorld } = activity;
  const n = stages.length;
  const [step, setStep] = useState(0);
  const [val, setVal] = useState(output);
  const [log, setLog] = useState([]);
  const [msg, setMsg] = useState('Start at the final printed total ($20) and undo the last dispenser stage first!');
  const [shake, trigger] = useShake();
  const done = step >= n;

  const palette = useMemo(() => {
    const seen = new Set(), list = [];
    stages.forEach(s => {
      [s.op, INVERSE[s.op]].forEach(op => {
        const k = `${op}${s.v}`;
        if (!seen.has(k)) { seen.add(k); list.push({ op, v: s.v }); }
      });
    });
    return list.sort((a, b) => 'mul div add sub'.indexOf(a.op) - 'mul div add sub'.indexOf(b.op));
  }, [stages]);

  const expected = done ? null : { op: INVERSE[stages[n - 1 - step].op], v: stages[n - 1 - step].v };

  const choose = (p, i) => {
    if (done) return;
    if (p.op === expected.op && p.v === expected.v) {
      playSwooshShimmer();
      const next = run(p.op, p.v, val);
      setLog(l => [...l, { ...p, from: val, to: next }]);
      setVal(next);
      const ns = step + 1;
      setStep(ns);
      if (ns >= n) {
        setMsg('');
        playVictoryFanfare();
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
        onSolved && onSolved();
      } else {
        setMsg(`✔ Stage undone! Now undo the step before that to reach Maya's original token.`);
      }
    } else {
      trigger(i);
      playWobbleWarn();
      const target = stages[n - 1 - step];
      setMsg(
        p.op === target.op
          ? `That repeats the stage instead of undoing it. The inverse of ${SYM[target.op]} ${target.v} is ${SYM[INVERSE[target.op]]} ${target.v}.`
          : `Not that one! To undo the machine's last stage (${SYM[target.op]} ${target.v}), use the inverse: ${SYM[INVERSE[target.op]]} ${target.v}.`
      );
    }
  };

  const restart = () => {
    playClick(500);
    setStep(0);
    setVal(output);
    setLog([]);
    setMsg('Start at the final output ($20) and undo the last dispenser stage first.');
  };

  return (
    <div className={WRAP}>
      {/* Real-World Kiosk Banner */}
      <div className="flex items-center justify-between w-full bg-[#14082c] border border-amber-400/40 rounded-lg sm:rounded-xl px-2.5 py-1 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-lg sm:text-xl">🕹️</span>
          <div>
            <p className="text-[9px] sm:text-[10px] text-amber-300 font-bold uppercase tracking-wider">{realWorld ? realWorld.context : 'Vending Machine'}</p>
            <p className="font-display font-900 text-xs sm:text-sm text-white">{realWorld ? realWorld.machineName : 'Token Dispenser'}</p>
          </div>
        </div>
        <span className="text-[10px] sm:text-[11px] font-mono bg-purple-900/60 px-2 py-0.5 rounded text-purple-200 border border-purple-400/30">
          Receipt: $20.00
        </span>
      </div>

      {/* Forward Machine Conveyor */}
      <div className="w-full bg-[#14082c] border-2 border-purple-400/40 rounded-xl sm:rounded-2xl p-2 sm:p-2.5 shrink-0">
        <p className="text-[11px] sm:text-xs font-black text-purple-300 uppercase tracking-wider mb-1.5 text-center flex items-center justify-center gap-1.5">
          <span>⚙️</span> Forward Dispenser: Token (x) → Multiplier → Fee Added → Printed $20
        </p>
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
          <div className="font-display font-900 text-base sm:text-lg bg-amber-400 text-slate-950 rounded-lg sm:rounded-xl px-3 py-1 sm:py-1.5 shadow-md flex items-center gap-1">
            <span>🪙</span> <span>x</span>
          </div>
          {stages.map((s, i) => (
            <React.Fragment key={i}>
              <span className="text-amber-300 font-black text-xs sm:text-sm">➔</span>
              <div className="font-display font-900 text-sm sm:text-base bg-gradient-to-b from-purple-500 to-purple-700 text-white rounded-lg sm:rounded-xl px-3 py-1 sm:py-1.5 border-2 border-white/30 shadow-md">
                {s.op === 'mul' ? `× ${s.v} (Bonus)` : `+ ${s.v} (Fee)`}
              </div>
            </React.Fragment>
          ))}
          <span className="text-amber-300 font-black text-xs sm:text-sm">➔</span>
          <div className="font-display font-900 text-base sm:text-lg bg-cyan-400 text-slate-950 rounded-lg sm:rounded-xl px-3 py-1 sm:py-1.5 shadow-md flex items-center gap-1">
            <span>🧾</span> <span>${output}</span>
          </div>
        </div>
      </div>

      {/* Reverse Machine Conveyor */}
      <div className="w-full bg-[#14082c] border-2 border-emerald-400/40 rounded-xl sm:rounded-2xl p-2 sm:p-2.5 shrink-0">
        <p className="text-[11px] sm:text-xs font-black text-emerald-300 uppercase tracking-wider mb-1.5 text-center flex items-center justify-center gap-1.5">
          <span>🔄</span> Reverse Run: Undo Last Stage First to Find Maya's Original Token!
        </p>
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
          <div className="font-display font-900 text-base sm:text-lg bg-cyan-400 text-slate-950 rounded-lg sm:rounded-xl px-3 py-1 sm:py-1.5">
            ${output}
          </div>
          {Array.from({ length: n }).map((_, i) => {
            const entry = log[i];
            return (
              <React.Fragment key={i}>
                <span className="text-emerald-300 font-black text-xs sm:text-sm">➔</span>
                <div className={`font-display font-900 text-sm sm:text-base rounded-lg sm:rounded-xl px-3 py-1 sm:py-1.5 min-w-[55px] text-center border-2 transition-all ${
                  entry ? 'bg-emerald-500 text-white border-emerald-200 shadow-[0_0_16px_rgba(52,211,153,0.6)]' : 'border-dashed border-emerald-400/60 text-emerald-300/60'
                }`}>
                  {entry ? `${SYM[entry.op]} ${entry.v}` : '?'}
                </div>
                <span className="text-emerald-300 font-black text-xs sm:text-sm">➔</span>
                <div className={`font-display font-900 text-sm sm:text-base rounded-lg sm:rounded-xl px-3 py-1 sm:py-1.5 min-w-[50px] text-center transition-all ${
                  entry ? 'bg-amber-400 text-slate-950 fade-in-up' : 'bg-white/10 text-white/40'
                }`}>
                  {entry ? (i === n - 1 ? `🪙 ${entry.to}` : `$${entry.to}`) : '?'}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Success / Status Message */}
      {done ? (
        <div className="w-full bg-emerald-950/80 border-2 border-emerald-400/60 rounded-xl px-3 py-1.5 text-center fade-in-up shrink-0">
          <p className="font-display font-900 text-emerald-300 text-sm sm:text-base">
            🎉 Mystery solved! Maya's original token was worth x = {answer} coins!
          </p>
          <p className="font-extrabold text-emerald-100 text-[11px] sm:text-xs">
            Forward verification: {answer} × 3 = 18, then + 2 = 20 ✓ Matches the printed receipt!
          </p>
        </div>
      ) : (
        <div className="w-full border-2 border-white/15 bg-white/5 rounded-xl px-3 py-1 text-center text-[11px] sm:text-xs font-extrabold text-slate-200 shrink-0">
          {msg}
        </div>
      )}

      {/* Undo Operation Buttons */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap shrink-0">
        {palette.map((p, i) => (
          <button
            key={i}
            disabled={done}
            onClick={() => choose(p, i)}
            className={`bg-gradient-to-b from-cyan-500/25 to-cyan-700/20 hover:from-cyan-400/40 border-2 border-cyan-400/50 rounded-xl px-3.5 sm:px-4 py-1 sm:py-1.5 font-display font-900 text-base sm:text-lg text-white cursor-pointer transition hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed ${
              shake === i ? 'animate-shake border-rose-400' : ''
            }`}
          >
            {SYM[p.op]} {p.v}
          </button>
        ))}
      </div>

      <HintBar hint={hint} grade7Tip={grade7Tip}>
        <button
          onClick={restart}
          className="bg-purple-900/80 hover:bg-purple-800 border border-purple-400/50 text-purple-100 font-display font-900 text-[11px] sm:text-xs px-3 py-1.5 rounded-lg sm:rounded-xl transition cursor-pointer"
        >
          🔄 Restart
        </button>
      </HintBar>
    </div>
  );
}

/* ---------------------------------------------------------------- A2: Gift Unboxing Protocol */
export function StepSorter({ activity, onSolved }) {
  const { cards, order, hint, grade7Tip, realWorld } = activity;
  const shuffled = useMemo(() => {
    const a = [...cards];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }, [cards]);

  const [placed, setPlaced] = useState([]);
  const [msg, setMsg] = useState('Untie the ribbon first! Tap the initial equation card to begin.');
  const [shake, trigger] = useShake();
  const done = placed.length === order.length;

  const tap = card => {
    if (done || placed.includes(card.id)) return;
    if (card.id === order[placed.length]) {
      playSwooshShimmer();
      const np = [...placed, card.id];
      setPlaced(np);
      if (np.length === order.length) {
        setMsg('');
        playVictoryFanfare();
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
        onSolved && onSolved();
      } else {
        setMsg('✔ Step completed! What action unboxes the next layer?');
      }
    } else {
      trigger(card.id);
      playWobbleWarn();
      setMsg(
        card.trap
          ? `🪤 Trap Step! ${card.trap}`
          : placed.length === 0
          ? 'Every solution begins with the original delivered parcel equation.'
          : 'Order matters! Remember Story Slide 6: untie the ribbon (+ / −) BEFORE dividing the box flaps (× / ÷).'
      );
    }
  };

  const restart = () => {
    playClick(500);
    setPlaced([]);
    setMsg('Untie the ribbon first! Tap the initial equation card to begin.');
  };

  return (
    <div className={WRAP}>
      {/* Real-World Parcel Label */}
      <div className="flex items-center justify-between w-full bg-[#14082c] border border-amber-400/40 rounded-lg sm:rounded-xl px-2.5 py-1 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-lg sm:text-xl">🎁</span>
          <div>
            <p className="text-[9px] sm:text-[10px] text-amber-300 font-bold uppercase tracking-wider">{realWorld ? realWorld.context : 'Gift Unboxing'}</p>
            <p className="font-display font-900 text-xs sm:text-sm text-white">Rule: Ribbon first (+6), then 4 flaps (÷4)</p>
          </div>
        </div>
        <span className="text-[10px] sm:text-[11px] font-mono bg-purple-900/60 px-2 py-0.5 rounded text-purple-200 border border-purple-400/30">
          Parcel: 4x − 6 = 18
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 w-full shrink-0">
        {/* Solution Column */}
        <div className="bg-[#14082c] border-2 border-emerald-400/40 rounded-xl sm:rounded-2xl p-2 sm:p-2.5 flex flex-col gap-1 sm:gap-1.5">
          <p className="text-[11px] sm:text-xs font-black text-emerald-300 uppercase tracking-wider text-center flex items-center justify-center gap-1.5">
            <span>🎀</span> Your Unboxing Protocol
          </p>
          {order.map((id, i) => {
            const c = cards.find(x => x.id === id);
            const filled = placed.length > i;
            return (
              <div
                key={id}
                className={`rounded-lg sm:rounded-xl px-2.5 py-1 flex items-center gap-2.5 border-2 min-h-[38px] transition-all ${
                  filled ? 'bg-emerald-600/25 border-emerald-300/70 fade-in-up' : 'border-dashed border-white/25 bg-white/5'
                }`}
              >
                <span className={`w-6 h-6 rounded-full font-display font-900 text-xs flex items-center justify-center shrink-0 ${
                  filled ? 'bg-emerald-400 text-slate-950' : 'bg-white/15 text-white/60'
                }`}>
                  {i + 1}
                </span>
                {filled ? (
                  <div className="text-left leading-tight">
                    <p className="font-display font-900 text-amber-300 text-sm sm:text-base">{c.line}</p>
                    <p className="text-[9px] sm:text-[10px] font-bold text-slate-300">{c.text}</p>
                  </div>
                ) : (
                  <span className="text-white/35 font-extrabold text-[11px] sm:text-xs">Unboxing Step {i + 1}…</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Card Pile */}
        <div className="bg-[#14082c] border-2 border-purple-400/40 rounded-xl sm:rounded-2xl p-2 sm:p-2.5 flex flex-col gap-1 sm:gap-1.5">
          <p className="text-[11px] sm:text-xs font-black text-purple-300 uppercase tracking-wider text-center flex items-center justify-center gap-1.5">
            <span>🏷️</span> Action Step Cards
          </p>
          {shuffled.map(c => {
            const used = placed.includes(c.id);
            return (
              <button
                key={c.id}
                disabled={used || done}
                onClick={() => tap(c)}
                className={`rounded-lg sm:rounded-xl px-2.5 py-1 sm:py-1.5 text-left font-display font-900 text-xs sm:text-sm border-2 transition cursor-pointer ${
                  used
                    ? 'opacity-25 border-white/10 bg-white/5 text-slate-400 line-through'
                    : 'bg-gradient-to-b from-purple-500/30 to-purple-800/30 border-purple-300/50 text-white hover:scale-[1.01] hover:border-cyan-300'
                } ${shake === c.id ? 'animate-shake border-rose-400' : ''}`}
              >
                <p className="leading-tight">{c.text}</p>
                {c.desc && <p className="text-[9px] sm:text-[10px] text-purple-200/80 font-normal mt-0.5">{c.desc}</p>}
              </button>
            );
          })}
        </div>
      </div>

      {done ? (
        <div className="w-full bg-emerald-950/80 border-2 border-emerald-400/60 rounded-xl px-3 py-1.5 text-center fade-in-up shrink-0">
          <p className="font-display font-900 text-emerald-300 text-sm sm:text-base">
            🎉 Parcel opened! The secret item inside is x = 6!
          </p>
          <p className="font-extrabold text-emerald-100 text-[11px] sm:text-xs">
            Check: 4(6) − 6 = 24 − 6 = 18 ✓ Matches the delivery manifest!
          </p>
        </div>
      ) : (
        <div className="w-full border-2 border-white/15 bg-white/5 rounded-xl px-3 py-1 text-center text-[11px] sm:text-xs font-extrabold text-slate-200 shrink-0">
          {msg}
        </div>
      )}

      <HintBar hint={hint} grade7Tip={grade7Tip}>
        <button
          onClick={restart}
          className="bg-purple-900/80 hover:bg-purple-800 border border-purple-400/50 text-purple-100 font-display font-900 text-[11px] sm:text-xs px-3 py-1.5 rounded-lg sm:rounded-xl transition cursor-pointer"
        >
          🔄 Restart
        </button>
      </HintBar>
    </div>
  );
}

/* ---------------------------------------------------------------- A3: Cafe Invoice Auditor */
export function MistakeDetective({ activity, onSolved }) {
  const { lines, wrongLine, fixes, fixedLines, hint, grade7Tip, realWorld } = activity;
  const [phase, setPhase] = useState('find'); // find -> fix -> done
  const [msg, setMsg] = useState('Inspect each line of the invoice. Tap the step where the cashier broke the Golden Rule!');
  const [shake, trigger] = useShake();

  const pickLine = i => {
    if (phase !== 'find') return;
    if (i === wrongLine) {
      playStampThud();
      setPhase('fix');
      setMsg('🔎 Calculation mistake flagged! Now choose the correct audit adjustment to fix the bill.');
    } else {
      trigger(`l${i}`);
      playWobbleWarn();
      setMsg(i === 0 ? 'That is the original customer bill. Inspect the steps below it!' : 'That line was calculated properly. Look for the sign error!');
    }
  };

  const pickFix = (f, i) => {
    if (phase !== 'fix') return;
    if (f.ok) {
      playStampThud();
      playVictoryFanfare();
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      setPhase('done');
      setMsg('');
      onSolved && onSolved();
    } else {
      trigger(`f${i}`);
      playWobbleWarn();
      setMsg('Not quite. To undo +6, we must SUBTRACT 6 from BOTH sides!');
    }
  };

  const restart = () => {
    playClick(500);
    setPhase('find');
    setMsg('Inspect each line of the invoice. Tap the step where the cashier broke the Golden Rule!');
  };

  return (
    <div className={WRAP}>
      {/* Real-World Clipboard Header */}
      <div className="flex items-center justify-between w-full bg-[#14082c] border border-amber-400/40 rounded-lg sm:rounded-xl px-2.5 py-1 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-lg sm:text-xl">☕</span>
          <div>
            <p className="text-[9px] sm:text-[10px] text-amber-300 font-bold uppercase tracking-wider">{realWorld ? realWorld.context : 'Receipt Audit'}</p>
            <p className="font-display font-900 text-xs sm:text-sm text-white">Item: 2 Mystery Sandwiches + $6 Tip = $14 Total</p>
          </div>
        </div>
        <span className="text-[10px] sm:text-[11px] font-mono bg-purple-900/60 px-2 py-0.5 rounded text-purple-200 border border-purple-400/30">
          {realWorld ? realWorld.invoiceNo : 'INVOICE #8812'}
        </span>
      </div>

      {/* Styled Invoice Ledger */}
      <div className="w-full bg-[#14082c] border-2 border-purple-400/40 rounded-xl sm:rounded-2xl p-2 sm:p-2.5 flex flex-col gap-1.5 shrink-0">
        <p className="text-[11px] sm:text-xs font-black text-purple-300 uppercase tracking-wider text-center flex items-center justify-center gap-1.5">
          <span>📋</span> Cashier Ledger Lines {phase === 'done' && '— (Audit Approved)'}
        </p>
        {lines.map((l, i) => {
          const isWrong = i === wrongLine;
          const fixed = phase === 'done';
          const flagged = phase !== 'find' && isWrong && !fixed;
          return (
            <button
              key={i}
              onClick={() => pickLine(i)}
              disabled={phase !== 'find'}
              className={`rounded-lg sm:rounded-xl px-3 py-1 sm:py-1.5 flex items-center justify-between border-2 transition ${
                fixed
                  ? 'bg-emerald-600/25 border-emerald-300/70'
                  : flagged
                  ? 'bg-rose-600/30 border-rose-400 shadow-[0_0_18px_rgba(244,63,94,0.6)]'
                  : 'bg-white/5 border-white/20 hover:border-cyan-300 hover:bg-white/10'
              } ${phase === 'find' ? 'cursor-pointer hover:scale-[1.01]' : 'cursor-default'} ${
                shake === `l${i}` ? 'animate-shake border-rose-400' : ''
              }`}
            >
              <span className="text-[11px] sm:text-xs font-extrabold text-slate-300 w-20 sm:w-24 text-left">{l.note}</span>
              <span className={`font-display font-900 text-base sm:text-lg ${flagged ? 'text-rose-200' : 'text-amber-300'}`}>
                {fixed ? fixedLines[i] : l.eq}
              </span>
              <span className="w-20 sm:w-24 text-right text-sm font-black">
                {fixed ? '✅ OK' : flagged ? '❌ ERROR' : '🔍'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Audit Correction Options */}
      {phase === 'fix' && (
        <div className="w-full grid grid-cols-1 gap-1.5 fade-in-up shrink-0">
          <p className="text-[11px] sm:text-xs font-black text-cyan-300 uppercase tracking-wider text-center">
            Select Auditor Correction:
          </p>
          {fixes.map((f, i) => (
            <button
              key={i}
              onClick={() => pickFix(f, i)}
              className={`rounded-lg sm:rounded-xl px-3 py-1.5 sm:py-2 text-left font-display font-900 text-xs sm:text-sm bg-gradient-to-b from-purple-500/30 to-purple-800/30 border-2 border-purple-300/50 text-white hover:scale-[1.01] hover:border-cyan-300 transition cursor-pointer ${
                shake === `f${i}` ? 'animate-shake border-rose-400' : ''
              }`}
            >
              <span className="text-amber-300 mr-1.5">{String.fromCharCode(65 + i)}.</span> {f.text}
            </button>
          ))}
        </div>
      )}

      {/* Audit Solved Banner */}
      {phase === 'done' ? (
        <div className="w-full bg-emerald-950/80 border-2 border-emerald-400/60 rounded-xl px-3 py-1.5 text-center fade-in-up shrink-0">
          <p className="font-display font-900 text-emerald-300 text-sm sm:text-base">
            🎉 Audit Approved! Each sandwich cost x = $4!
          </p>
          <p className="font-extrabold text-emerald-100 text-[11px] sm:text-xs">
            Bill check: 2($4) + $6 = $8 + $6 = $14 ✓ Everything balances!
          </p>
        </div>
      ) : (
        <div className="w-full border-2 border-white/15 bg-white/5 rounded-xl px-3 py-1 text-center text-[11px] sm:text-xs font-extrabold text-slate-200 shrink-0">
          {msg}
        </div>
      )}

      <HintBar hint={hint} grade7Tip={grade7Tip}>
        <button
          onClick={restart}
          className="bg-purple-900/80 hover:bg-purple-800 border border-purple-400/50 text-purple-100 font-display font-900 text-[11px] sm:text-xs px-3 py-1.5 rounded-lg sm:rounded-xl transition cursor-pointer"
        >
          🔄 Restart
        </button>
      </HintBar>
    </div>
  );
}
