import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { fmt } from '../../mathData.js';
import { playClick, playCashRegister, playVictoryFanfare, playWobbleWarn } from '../../utils/sfx.js';

/* =========================================================================
   STATION 3 — SOLO SOLVER (Real-World Applied Problem Lab)
   Inspired by Story Phase (Slide 7 Gym Plans, Slide 8 Lab Verification).
   Activities:
     A1 Metro City Taxi Ride     : Taxi meter ($3 start + $2/km = $15 total)
     A2 Gym Plan Showdown        : FitZone vs PowerGym break-even kiosk
     A3 Ancient Expedition Vault : 3-chamber cipher lock [3(x − 2) = 21]
   Features:
     - Interactive visual meters with slider & stepper controls
     - Grade 7 substitution feedback (nudges "too big" or "too small")
     - Live itemized receipt calculation
     - Web Audio tactile sound effects
   ========================================================================= */

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const evalSide = (side, x) => side.a * x + side.b;

/* ----------------------------- A1: Taxi Dashboard Visual ----------------------------- */
function TaxiVisual({ x, success }) {
  const km = clamp(Number.isFinite(x) ? x : 0, 0, 10);
  const fare = 2 * km + 3;
  const left = 38 + km * 34;

  return (
    <svg viewBox="0 0 420 160" className="w-full h-[clamp(120px,20vh,175px)] shrink-0 drop-shadow-[0_0_20px_rgba(250,204,21,0.35)]">
      {/* Sky & City Skyline Silhouette */}
      <rect x="0" y="0" width="420" height="160" rx="16" fill="#0f172a" />
      {/* City Buildings */}
      <rect x="20" y="38" width="45" height="52" fill="#1e293b" opacity="0.8" />
      <rect x="75" y="24" width="55" height="66" fill="#1e293b" opacity="0.6" />
      <rect x="140" y="44" width="60" height="46" fill="#1e293b" opacity="0.8" />
      <rect x="210" y="18" width="50" height="72" fill="#1e293b" opacity="0.6" />
      <rect x="270" y="36" width="65" height="54" fill="#1e293b" opacity="0.8" />
      <rect x="345" y="26" width="55" height="64" fill="#1e293b" opacity="0.7" />

      {/* Streetlamps */}
      <line x1="38" y1="58" x2="38" y2="92" stroke="#64748b" strokeWidth="2" />
      <circle cx="38" cy="56" r="4" fill="#fef08a" />
      <line x1="208" y1="58" x2="208" y2="92" stroke="#64748b" strokeWidth="2" />
      <circle cx="208" cy="56" r="4" fill="#fef08a" />
      <line x1="378" y1="58" x2="378" y2="92" stroke="#64748b" strokeWidth="2" />
      <circle cx="378" cy="56" r="4" fill="#fef08a" />

      {/* Asphalt Road */}
      <rect x="10" y="92" width="400" height="38" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="2" />
      {/* Dashed Center Road Stripe */}
      <line x1="16" y1="111" x2="404" y2="111" stroke="#facc15" strokeWidth="2.5" strokeDasharray="14 10" />

      {/* KM Milestones */}
      {Array.from({ length: 11 }).map((_, i) => (
        <g key={i}>
          <line x1={38 + i * 34} y1="130" x2={38 + i * 34} y2="138" stroke="#94a3b8" strokeWidth="2" />
          <text x={38 + i * 34} y="152" textAnchor="middle" fontSize="11" fontWeight="900" fill={i === 6 ? '#facc15' : '#cbd5e1'} fontFamily="Nunito, sans-serif">
            {i}
          </text>
        </g>
      ))}
      <text x="414" y="152" textAnchor="end" fontSize="10" fontWeight="900" fill="#94a3b8" fontFamily="Nunito, sans-serif">km</text>

      {/* Start Flag & Maya Destination Target at 6km */}
      <text x="24" y="86" fontSize="18">🏁</text>
      <g transform="translate(242, 62)">
        <rect x="-18" y="-12" width="36" height="18" rx="4" fill="#15803d" stroke="#4ade80" strokeWidth="1.5" />
        <text x="0" y="2" textAnchor="middle" fontSize="10" fontWeight="900" fill="#fff" fontFamily="Nunito, sans-serif">$15 Goal</text>
      </g>

      {/* Moving Taxi Cab + Digital Taximeter */}
      <g style={{ transform: `translate(${left}px, 0px)`, transition: 'transform 0.75s cubic-bezier(0.34,1.25,0.64,1)' }}>
        {/* Floating Digital Fare Box */}
        <g transform="translate(0, 16)">
          <rect x="-42" y="0" width="84" height="28" rx="8" fill="#090518" stroke={success ? '#4ade80' : '#facc15'} strokeWidth="2.5" />
          <text x="0" y="19" textAnchor="middle" fontSize="15" fontWeight="900" fill={success ? '#86efac' : '#fde047'} fontFamily="Nunito, sans-serif">
            ${fmt(fare)}
          </text>
        </g>
        <line x1="0" y1="44" x2="0" y2="60" stroke="#facc15" strokeWidth="2" strokeDasharray="3 3" />
        {/* Taxi Car Emoji */}
        <text x="0" y="96" textAnchor="middle" fontSize="38">🚕</text>
      </g>
    </svg>
  );
}

/* ----------------------------- A2: Gym Plan Comparison Visual ----------------------------- */
function PlansVisual({ x, rhsLabel }) {
  const v = clamp(Number.isFinite(x) ? x : 0, 0, 12);
  const A = 4 * v + 5; // Plan A: $5 + $4x
  const B = 2 * v + 15; // Plan B: $15 + $2x
  const max = 45;
  const hA = clamp((A / max) * 92, 10, 96);
  const hB = clamp((B / max) * 92, 10, 96);
  const equal = A === B;

  return (
    <svg viewBox="0 0 420 160" className="w-full h-[clamp(120px,20vh,175px)] drop-shadow-[0_0_20px_rgba(250,204,21,0.35)]">
      <rect x="0" y="0" width="420" height="160" rx="16" fill="#0f172a" />
      {/* Ground Baseline */}
      <line x1="24" y1="130" x2="396" y2="130" stroke="#475569" strokeWidth="2" />

      {/* Plan A Bar (FitZone) */}
      <g>
        <rect x="85" y={130 - hA} width="88" height={hA} rx="10"
          fill={equal ? '#4ade80' : '#f59e0b'}
          stroke={equal ? '#86efac' : '#fde68a'} strokeWidth="2"
          style={{ transition: 'all 0.65s cubic-bezier(0.34,1.25,0.64,1)' }} />
        {/* Price Tag */}
        <text x="129" y={130 - hA - 10} textAnchor="middle" fontSize="16" fontWeight="900" fill="#fff" fontFamily="Nunito, sans-serif">
          ${fmt(A)}
        </text>
        <text x="129" y="148" textAnchor="middle" fontSize="12" fontWeight="900" fill="#fde047" fontFamily="Nunito, sans-serif">
          FitZone (Plan A)
        </text>
      </g>

      {/* Plan B Bar (PowerGym) */}
      <g>
        <rect x="245" y={130 - hB} width="88" height={hB} rx="10"
          fill={equal ? '#4ade80' : '#38bdf8'}
          stroke={equal ? '#86efac' : '#bae6fd'} strokeWidth="2"
          style={{ transition: 'all 0.65s cubic-bezier(0.34,1.25,0.64,1)' }} />
        {/* Price Tag */}
        <text x="289" y={130 - hB - 10} textAnchor="middle" fontSize="16" fontWeight="900" fill="#fff" fontFamily="Nunito, sans-serif">
          ${fmt(B)}
        </text>
        <text x="289" y="148" textAnchor="middle" fontSize="12" fontWeight="900" fill="#7dd3fc" fontFamily="Nunito, sans-serif">
          PowerGym (Plan B)
        </text>
      </g>

      {/* Center Equality / Comparison Gauge */}
      <g transform="translate(209, 78)">
        <circle cx="0" cy="0" r="22" fill="#1e1b4b" stroke={equal ? '#4ade80' : '#f43f5e'} strokeWidth="2.5" />
        <text x="0" y="8" textAnchor="middle" fontSize="24" fontWeight="900"
          fill={equal ? '#4ade80' : '#fb7185'} fontFamily="Nunito, sans-serif">
          {equal ? '=' : A > B ? '>' : '<'}
        </text>
      </g>

      {/* Header Metric */}
      <text x="210" y="24" textAnchor="middle" fontSize="13" fontWeight="900" fill={equal ? '#4ade80' : '#cbd5e1'} fontFamily="Nunito, sans-serif">
        {equal ? '🎉 Break-Even at 5 Visits ($25 each)!' : `Comparing cost after ${fmt(v)} visit${v === 1 ? '' : 's'}`}
      </text>
    </svg>
  );
}

/* ----------------------------- A3: Expedition Vault Lock Visual ----------------------------- */
function ChestVisual({ x, open, shake }) {
  const code = Number.isFinite(x) ? String(Math.abs(Math.round(x))).slice(0, 2) : '';

  return (
    <svg viewBox="0 0 240 160" className={`h-[clamp(120px,20vh,175px)] w-auto drop-shadow-[0_0_24px_rgba(245,158,11,0.55)] ${shake ? 'animate-shake' : ''}`}>
      {/* Treasure Glow when Open */}
      {open && (
        <g className="fade-in-up">
          <circle cx="120" cy="76" r="50" fill="rgba(250,204,21,0.3)" />
          {[ [88,70],[110,54],[134,64],[152,76],[102,82],[126,84],[110,92] ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="8.5" fill="#facc15" stroke="#b45309" strokeWidth="2" />
          ))}
          <text x="120" y="50" textAnchor="middle" fontSize="28">💎</text>
        </g>
      )}

      {/* Heavy Expedition Iron Body */}
      <rect x="45" y="84" width="150" height="64" rx="10" fill="#78350f" stroke="#451a03" strokeWidth="4" />
      <rect x="45" y="102" width="150" height="9" fill="#451a03" opacity="0.6" />
      <rect x="68" y="84" width="12" height="64" fill="#d97706" stroke="#78350f" strokeWidth="1" />
      <rect x="160" y="84" width="12" height="64" fill="#d97706" stroke="#78350f" strokeWidth="1" />

      {/* Rotating Vault Lid */}
      <g style={{ transform: `rotate(${open ? -42 : 0}deg)`, transformOrigin: '45px 84px', transition: 'transform 0.75s cubic-bezier(0.34,1.35,0.64,1)' }}>
        <path d="M 45 84 L 45 60 Q 120 18 195 60 L 195 84 Z" fill="#92400e" stroke="#451a03" strokeWidth="4" />
        <rect x="68" y="42" width="12" height="42" fill="#f59e0b" opacity="0.9" />
        <rect x="160" y="42" width="12" height="42" fill="#f59e0b" opacity="0.9" />
      </g>

      {/* 3 Mechanical Tumbler Latch */}
      {!open && (
        <g transform="translate(120, 94)">
          <rect x="-24" y="-14" width="48" height="34" rx="8" fill="#fde047" stroke="#b45309" strokeWidth="3" />
          {/* Keyhole */}
          <circle cx="0" cy="0" r="4.5" fill="#78350f" />
          <polygon points="-2.5,0 2.5,0 4,9 -4,9" fill="#78350f" />
          <text x="0" y="26" textAnchor="middle" fontSize="13" fontWeight="900" fill="#78350f" fontFamily="Nunito, sans-serif">
            {code ? `CODE: ${code}` : 'LOCKED'}
          </text>
        </g>
      )}
    </svg>
  );
}

/* ----------------------------- Main SoloSolver Component ----------------------------- */
export function SoloSolver({ activity, onSolved, onRetry }) {
  const { type, ask, target, lhs, rhs, steps, hint, unit, grade7Tip, realWorld } = activity;
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [shake, setShake] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const num = parseFloat(answer);
  const success = feedback && feedback.success;

  const handleStepChange = delta => {
    playClick(700);
    const curr = Number.isFinite(num) ? num : 0;
    const next = Math.max(0, curr + delta);
    setAnswer(String(next));
    if (!success) setFeedback(null);
  };

  const check = () => {
    if (answer.trim() === '' || Number.isNaN(num)) {
      setFeedback({ success: false, text: 'Type a number for x first, or use the interactive stepper!' });
      return;
    }
    setAttempts(a => a + 1);
    const l = evalSide(lhs, num), r = evalSide(rhs, num);

    if (Math.abs(num - target) < 1e-9) {
      playCashRegister();
      playVictoryFanfare();
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
      setFeedback({
        success: true,
        text: `🎉 Verified! x = ${fmt(target)}${unit ? ' ' + unit : ''} solves the real-world problem!`,
        check: `Check: left side = ${fmt(l)}, right side = ${fmt(r)} ✓ Both sides match perfectly!`
      });
      onSolved && onSolved();
    } else {
      playWobbleWarn();
      const slope = lhs.a - rhs.a;
      const tooBig = (l - r) * slope > 0;
      setFeedback({
        success: false,
        text: `Not quite. With x = ${fmt(num)}: left side = ${fmt(l)}, right side = ${fmt(r)}. Your answer is a little too ${tooBig ? 'big' : 'small'}!`
      });
      setShake(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setShake(false), 450);
      onRetry && onRetry();
    }
  };

  const eqText = `${lhs.label} = ${rhs.label}`;

  return (
    <div className="flex flex-col items-center gap-2.5 bg-[#1e1342]/95 border-2 border-cyan-400/40 rounded-2xl p-3 sm:p-4 shadow-xl flex-1 min-h-0 overflow-y-auto w-full">
      {/* Header Context Banner */}
      <div className="flex items-center justify-between w-full bg-[#14082c] border border-amber-400/40 rounded-xl px-3 py-1.5 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xl">{type === 'taxi' ? '🚕' : type === 'plans' ? '🏋️' : '🗝️'}</span>
          <div className="text-left">
            <p className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">{realWorld ? realWorld.context : 'Real-World Application'}</p>
            <p className="font-display font-900 text-xs text-white">{activity.title}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono bg-purple-900/60 px-2 py-0.5 rounded text-amber-300 border border-purple-400/30">
            {eqText}
          </span>
        </div>
      </div>

      {/* Main Interactive Stage & Problem Data */}
      <div className="flex items-center justify-center gap-4 w-full flex-1 min-h-0 flex-wrap">
        <div className="flex-1 min-w-[260px] max-w-[480px] flex items-center justify-center">
          {type === 'taxi' && <TaxiVisual x={num} success={success} />}
          {type === 'plans' && <PlansVisual x={num} />}
          {type === 'chest' && <ChestVisual x={num} open={success} shake={shake} />}
        </div>

        {/* Real-World Breakdown Card */}
        <div className="text-left text-xs sm:text-sm font-extrabold text-slate-100 flex flex-col gap-1.5 bg-[#14082c] border border-purple-400/30 rounded-xl p-3 shrink-0 min-w-[220px]">
          <p className="text-amber-300 font-black text-xs uppercase tracking-wider mb-0.5">📊 Itemized Ledger:</p>
          <p>• Equation: <span className="text-cyan-300 font-mono font-black">{eqText}</span></p>
          <p>• Solve for: <span className="text-white font-900">{ask}</span></p>
          <p>• Left side: <span className="text-emerald-300">{Number.isFinite(num) ? evalSide(lhs, num) : '?'}</span></p>
          <p>• Right side: <span className="text-emerald-300">{evalSide(rhs, Number.isFinite(num) ? num : 0)}</span></p>
          <p className="text-[11px] text-slate-400">Attempts: {attempts}</p>
        </div>
      </div>

      {/* Interactive Value Controls (Stepper & Input) */}
      <div className="flex flex-col items-center gap-2 w-full shrink-0">
        <div className="flex items-center gap-2 justify-center flex-wrap">
          {/* Stepper Buttons for Grade 7 Ease */}
          <button
            onClick={() => handleStepChange(-1)}
            disabled={success}
            className="w-10 h-10 rounded-xl bg-purple-900/80 hover:bg-purple-800 border border-purple-400/50 text-white font-display font-900 text-lg flex items-center justify-center cursor-pointer transition disabled:opacity-40"
            title="Decrease x"
          >
            −
          </button>

          <input
            type="number"
            placeholder="Enter x"
            value={answer}
            onChange={e => { setAnswer(e.target.value); if (!success) setFeedback(null); }}
            onKeyDown={e => { if (e.key === 'Enter') check(); }}
            disabled={success}
            className="bg-[#14082c] border-2 border-cyan-400/70 rounded-xl px-4 py-2.5 text-white font-display font-900 text-base sm:text-lg text-center outline-none focus:border-amber-400 w-36 shadow-inner disabled:opacity-60"
          />

          <button
            onClick={() => handleStepChange(1)}
            disabled={success}
            className="w-10 h-10 rounded-xl bg-purple-900/80 hover:bg-purple-800 border border-purple-400/50 text-white font-display font-900 text-lg flex items-center justify-center cursor-pointer transition disabled:opacity-40"
            title="Increase x"
          >
            +
          </button>

          {/* Action Buttons */}
          <button
            onClick={check}
            disabled={success}
            className="btn-gold text-xs sm:text-sm font-900 px-6 py-2.5 shadow-lg hover:scale-105 transition cursor-pointer disabled:opacity-50 disabled:hover:scale-100"
          >
            Check Answer ✨
          </button>

          <button
            onClick={() => { playClick(); setShowHint(h => !h); }}
            className="bg-purple-900/80 hover:bg-purple-800 border border-purple-400/50 text-purple-200 font-display font-900 text-xs px-3.5 py-2.5 rounded-xl transition cursor-pointer"
          >
            💡 Hint
          </button>
        </div>

        {/* Quick Slider for Visual Exploration */}
        <div className="flex items-center gap-3 w-full max-w-md bg-[#14082c] border border-cyan-400/30 px-3 py-1 rounded-xl">
          <span className="text-[11px] font-bold text-slate-300">Test {ask}:</span>
          <input
            type="range"
            min="0"
            max="12"
            step="1"
            value={Number.isFinite(num) ? num : 0}
            onChange={e => { setAnswer(e.target.value); if (!success) setFeedback(null); }}
            disabled={success}
            className="flex-1 accent-amber-400 cursor-pointer"
          />
          <span className="text-xs font-mono text-amber-300 font-black min-w-[24px] text-right">
            {Number.isFinite(num) ? num : 0}
          </span>
        </div>
      </div>

      {/* Grade 7 Detective Hint */}
      {showHint && (
        <div className="p-3 bg-amber-950/90 border border-amber-400/50 text-amber-200 rounded-xl text-xs sm:text-sm font-bold w-full text-left fade-in-up shrink-0">
          <p className="font-black text-amber-300 mb-1">💡 Grade 7 Guide:</p>
          <p className="leading-relaxed">{grade7Tip || hint}</p>
        </div>
      )}

      {/* Feedback Banner */}
      {feedback && (
        <div className={`p-2.5 rounded-xl text-xs sm:text-sm font-900 w-full text-center shadow-xl shrink-0 fade-in-up ${
          feedback.success ? 'bg-emerald-950/90 text-emerald-300 border-2 border-emerald-400/60' : 'bg-rose-950/90 text-rose-300 border-2 border-rose-400/60'
        }`}>
          <p>{feedback.text}</p>
          {feedback.check && <p className="text-emerald-100 font-extrabold mt-0.5">{feedback.check}</p>}
        </div>
      )}
    </div>
  );
}
