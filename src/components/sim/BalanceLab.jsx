import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { expr, fmt } from '../../mathData.js';
import { playScaleBalance, playScaleClack, playWobbleWarn, playClick, playVictoryFanfare } from '../../utils/sfx.js';

/* =========================================================================
   STATION 1 — BALANCE SCALE (Real-World Market & Bakery Lab)
   Inspired by Story Phase (Slide 1 see-saw/scale, Slide 2 & 3 Golden Rule).
   Features:
     - Authentic Victorian Brass Market Scale with physical spring needle gauge
     - Realistic items: Wooden Market Crates (x), Glossy Fresh Apples, Sacks, Weights
     - Real-World Market View vs Algebra Cubes View toggle
     - "Test Golden Rule" toggle (Left-only vs Both sides) with tilt alarm
     - Real-World Market Stall Ledger with live check validation
     - Grade 7 intuitive hints and step undo
   ========================================================================= */

const PIVOT = { x: 300, y: 68 };
const HALF = 215;
const PLATE_Y = 104;
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

const opLabel = (op, unitName = 'cubes') => {
  if (op.kind === 'add') {
    const val = Math.abs(op.n);
    return op.n > 0 
      ? { sym: `+ ${val}`, txt: `Add ${val} ${unitName}` } 
      : { sym: `− ${val}`, txt: `Remove ${val} ${unitName}` };
  }
  if (op.kind === 'mul') return { sym: `× ${op.k}`, txt: `Multiply by ${op.k}` };
  return { sym: `÷ ${op.k}`, txt: `Split into ${op.k} groups` };
};

const applyOp = (side, op) => {
  if (op.kind === 'add') return { x: side.x, n: side.n + op.n };
  if (op.kind === 'mul') return { x: side.x * op.k, n: side.n * op.k };
  return { x: side.x / op.k, n: side.n / op.k };
};

const canApply = (side, op) => op.kind !== 'div' || (side.x % op.k === 0 && side.n % op.k === 0);
const value = (side, xVal) => side.x * xVal + side.n;

/* ---------- Realistic Render Tokens on Pan ---------- */
function PanItems({ side, label, viewMode, realWorld }) {
  const els = [];
  let top = PLATE_Y - 4;
  const isMarket = viewMode === 'market';

  // 1. Render Unknown Variable(s)
  if (side.x > 0) {
    const bw = isMarket ? 44 : 38;
    const boxGap = 8;
    const total = side.x * bw + (side.x - 1) * boxGap;

    for (let i = 0; i < side.x; i++) {
      const bx = -total / 2 + i * (bw + boxGap);
      if (isMarket) {
        // Realistic Wooden Produce Crate with metal brackets & wax seal
        els.push(
          <g key={`crate_${i}`} className="transition-all duration-300">
            {/* Crate body */}
            <rect x={bx} y={top - bw} width={bw} height={bw} rx="6" fill="#854d0e" stroke="#451a03" strokeWidth="2" />
            {/* Wooden slats */}
            <line x1={bx + 2} y1={top - bw + 14} x2={bx + bw - 2} y2={top - bw + 14} stroke="#713f12" strokeWidth="2" />
            <line x1={bx + 2} y1={top - bw + 28} x2={bx + bw - 2} y2={top - bw + 28} stroke="#713f12" strokeWidth="2" />
            {/* Corner brass brackets */}
            <rect x={bx} y={top - bw} width="8" height="8" rx="2" fill="#eab308" />
            <rect x={bx + bw - 8} y={top - bw} width="8" height="8" rx="2" fill="#eab308" />
            <rect x={bx} y={top - 8} width="8" height="8" rx="2" fill="#eab308" />
            <rect x={bx + bw - 8} y={top - 8} width="8" height="8" rx="2" fill="#eab308" />
            {/* Wax Seal Stamp */}
            <circle cx={bx + bw / 2} cy={top - bw / 2} r="11" fill="#dc2626" stroke="#991b1b" strokeWidth="1.5" />
            <text x={bx + bw / 2} y={top - bw / 2 + 5} textAnchor="middle" fontSize="13" fontWeight="900" fill="#fef08a" fontFamily="Nunito, sans-serif">
              {label}
            </text>
          </g>
        );
      } else {
        // High-tech glowing crystal box
        els.push(
          <g key={`cube_${i}`}>
            <rect x={bx} y={top - bw} width={bw} height={bw} rx="8" fill="url(#boxGrad)" stroke="#fde047" strokeWidth="2.5" />
            <text x={bx + bw / 2} y={top - bw / 2 + 7} textAnchor="middle" fontSize="22" fontWeight="900" fill="#fff" fontFamily="Nunito, sans-serif">{label}</text>
          </g>
        );
      }
    }
    top -= bw + 6;
  }

  // 2. Render Units / Loose Constants
  const n = Math.abs(side.n);
  if (n > 0) {
    const neg = side.n < 0;
    const cw = isMarket ? 18 : 15;
    const cg = 4;
    const perRow = 8;

    if (n > 16) {
      // Stacking badge for large counts
      for (let i = 0; i < 8; i++) {
        const cx = -70 + i * 18;
        if (isMarket) {
          els.push(
            <g key={`large_apple_${i}`}>
              <circle cx={cx + cw / 2} cy={top - cw / 2} r={cw / 2} fill="#ef4444" stroke="#991b1b" strokeWidth="1.5" />
              <path d={`M ${cx + cw / 2} ${top - cw} Q ${cx + cw / 2 + 4} ${top - cw - 4} ${cx + cw / 2 + 6} ${top - cw - 2}`} stroke="#15803d" strokeWidth="1.5" fill="none" />
            </g>
          );
        } else {
          els.push(<rect key={`s${i}`} x={cx} y={top - cw} width={cw} height={cw} rx="3" fill={neg ? 'rgba(244,63,94,0.15)' : '#38bdf8'} stroke={neg ? '#fb7185' : '#e0f2fe'} strokeWidth="1.5" />);
        }
      }
      els.push(
        <text key="cnt" x="0" y={top - cw - 8} textAnchor="middle" fontSize="15" fontWeight="900" fill={neg ? '#fda4af' : isMarket ? '#facc15' : '#7dd3fc'} fontFamily="Nunito, sans-serif">
          {neg ? '−' : ''}{n} {realWorld ? realWorld.unitName : 'items'}
        </text>
      );
    } else {
      for (let i = 0; i < n; i++) {
        const row = Math.floor(i / perRow);
        const inRow = Math.min(perRow, n - row * perRow);
        const col = i % perRow;
        const rowW = inRow * (cw + cg) - cg;
        const cx = -rowW / 2 + col * (cw + cg);
        const cy = top - cw - row * (cw + cg);

        if (isMarket) {
          // Glossy red organic apple with green leaf & highlight
          els.push(
            <g key={`apple_${i}`}>
              <circle cx={cx + cw / 2} cy={cy + cw / 2 + 1} r={cw / 2 - 1} fill="#ef4444" stroke="#b91c1c" strokeWidth="1.2" />
              {/* Highlight */}
              <ellipse cx={cx + cw / 2 - 3} cy={cy + cw / 2 - 2} rx="2" ry="1.2" fill="#fca5a5" opacity="0.8" />
              {/* Leaf */}
              <path d={`M ${cx + cw / 2} ${cy + 2} Q ${cx + cw / 2 + 4} ${cy - 3} ${cx + cw / 2 + 6} ${cy}`} stroke="#15803d" strokeWidth="1.4" fill="#22c55e" />
              {neg && <text x={cx + cw / 2} y={cy + cw - 2} textAnchor="middle" fontSize="11" fontWeight="900" fill="#fff">−</text>}
            </g>
          );
        } else {
          els.push(
            <g key={`c${i}`}>
              <rect x={cx} y={cy} width={cw} height={cw} rx="3"
                fill={neg ? 'rgba(244,63,94,0.15)' : '#38bdf8'}
                stroke={neg ? '#fb7185' : '#e0f2fe'} strokeWidth="1.6" strokeDasharray={neg ? '3 2' : '0'} />
              {neg && <text x={cx + cw / 2} y={cy + cw - 3.5} textAnchor="middle" fontSize="13" fontWeight="900" fill="#fda4af">−</text>}
            </g>
          );
        }
      }
    }
  }
  return <g>{els}</g>;
}

/* ---------- Brass Scale with Physical Dial Gauge ---------- */
function Scale({ L, R, xVal, solved, viewMode, realWorld }) {
  const diff = value(L, xVal) - value(R, xVal);
  const deg = clamp(-diff * 3.2, -14, 14);
  const needleDeg = clamp(diff * 5.5, -45, 45);
  const rad = (deg * Math.PI) / 180;
  const lx = PIVOT.x - HALF * Math.cos(rad), ly = PIVOT.y - HALF * Math.sin(rad);
  const rx = PIVOT.x + HALF * Math.cos(rad), ry = PIVOT.y + HALF * Math.sin(rad);
  const ease = 'transform 0.75s cubic-bezier(0.34, 1.35, 0.64, 1)';

  const pan = (px, py, side, label) => (
    <g style={{ transform: `translate(${px}px, ${py}px)`, transition: ease }}>
      {/* Brass suspension chains */}
      <line x1="0" y1="0" x2="-86" y2={PLATE_Y} stroke="#fbbf24" strokeWidth="2.5" strokeDasharray="3 3" />
      <line x1="0" y1="0" x2="86" y2={PLATE_Y} stroke="#fbbf24" strokeWidth="2.5" strokeDasharray="3 3" />
      <circle cx="0" cy="0" r="5" fill="#fde047" stroke="#b45309" strokeWidth="1.5" />
      {/* Heavy brass weighing pan dish */}
      <path d={`M -92 ${PLATE_Y} Q 0 ${PLATE_Y + 18} 92 ${PLATE_Y} Z`} fill="#d97706" stroke="#b45309" strokeWidth="2" />
      <rect x="-90" y={PLATE_Y - 2} width="180" height="6" rx="3" fill="#fde047" stroke="#b45309" strokeWidth="1.5" />
      <g transform="translate(0,0)">
        <PanItems side={side} label={label} viewMode={viewMode} realWorld={realWorld} />
      </g>
    </g>
  );

  return (
    <svg viewBox="0 0 600 310" className="w-full h-[clamp(95px,19vh,185px)] max-h-[190px] mx-auto my-0.5 shrink-0" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="boxGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a855f7" /><stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <radialGradient id="brassPlate" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fef08a" /><stop offset="70%" stopColor="#eab308" /><stop offset="100%" stopColor="#a16207" />
        </radialGradient>
      </defs>

      {/* Ornate Victorian Base Stand */}
      <polygon points="210,296 390,296 356,270 244,270" fill="#78350f" stroke="#451a03" strokeWidth="3" />
      <rect x="238" y="278" width="124" height="12" rx="3" fill="#b45309" />
      {/* Vertical Brass Pillar */}
      <rect x="290" y={PIVOT.y + 12} width="20" height="202" rx="6" fill="url(#brassPlate)" stroke="#78350f" strokeWidth="2" />
      <circle cx="300" cy="180" r="14" fill="#ca8a04" stroke="#713f12" strokeWidth="2" />

      {/* Beam Pivot */}
      <g style={{ transform: `rotate(${deg}deg)`, transformOrigin: `${PIVOT.x}px ${PIVOT.y}px`, transition: ease }}>
        {/* Horizontal Beam with filigree scrollwork */}
        <rect x={PIVOT.x - HALF - 10} y={PIVOT.y - 8} width={HALF * 2 + 20} height="16" rx="8" fill="url(#brassPlate)" stroke="#78350f" strokeWidth="2.5" />
        <circle cx={PIVOT.x - HALF} cy={PIVOT.y} r="7" fill="#fde047" stroke="#78350f" strokeWidth="2" />
        <circle cx={PIVOT.x + HALF} cy={PIVOT.y} r="7" fill="#fde047" stroke="#78350f" strokeWidth="2" />
      </g>

      {/* Center Pivot Dial Gauge with Spring Needle */}
      <g transform={`translate(${PIVOT.x}, ${PIVOT.y - 34})`}>
        {/* Dial Face */}
        <circle cx="0" cy="0" r="28" fill="#1e1b4b" stroke="#facc15" strokeWidth="3" />
        {/* Dial markings */}
        <line x1="-18" y1="0" x2="-14" y2="0" stroke="#f87171" strokeWidth="2" />
        <line x1="0" y1="-18" x2="0" y2="-13" stroke="#4ade80" strokeWidth="2.5" />
        <line x1="18" y1="0" x2="14" y2="0" stroke="#f87171" strokeWidth="2" />
        {/* Dial Needle */}
        <g style={{ transform: `rotate(${needleDeg}deg)`, transition: ease }}>
          <line x1="0" y1="6" x2="0" y2="-20" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="0" cy="0" r="3.5" fill="#facc15" />
        </g>
        {/* Status Light LED */}
        <circle cx="0" cy="18" r="4.5" fill={diff === 0 ? '#22c55e' : '#ef4444'} stroke="#fff" strokeWidth="1" />
      </g>

      {/* Pans */}
      {pan(lx, ly, L, solved ? fmt(xVal) : 'x')}
      {pan(rx, ry, R, 'x')}

      {/* Equilibrium Badge */}
      <g transform="translate(300, 18)">
        <rect x="-105" y="-14" width="210" height="28" rx="14"
          fill={diff === 0 ? 'rgba(34,197,94,0.25)' : 'rgba(239,68,68,0.25)'}
          stroke={diff === 0 ? '#4ade80' : '#f87171'} strokeWidth="2" />
        <text x="0" y="5" textAnchor="middle" fontSize="14" fontWeight="900" fill={diff === 0 ? '#86efac' : '#fca5a5'} fontFamily="Nunito, sans-serif">
          {diff === 0 ? '⚖️ PERFECTLY BALANCED (=)' : '⚠️ UNBALANCED (≠)'}
        </text>
      </g>
    </svg>
  );
}

/* ---------- Main Component ---------- */
export function BalanceLab({ activity, onSolved }) {
  const { start, xVal, ops, best, hint, realWorld, grade7Tip } = activity;
  const [state, setState] = useState({ L: { ...start.L }, R: { ...start.R } });
  const [history, setHistory] = useState([]);
  const [mode, setMode] = useState('both'); // 'both' | 'left'
  const [viewMode, setViewMode] = useState('market'); // 'market' | 'cubes'
  const [msg, setMsg] = useState({ type: 'info', text: 'Pick a move below. To keep the scale balanced, do the SAME to BOTH sides!' });
  const [moves, setMoves] = useState(0);
  const [showGrade7Tip, setShowGrade7Tip] = useState(false);
  const solvedRef = useRef(false);

  const { L, R } = state;
  const balanced = value(L, xVal) === value(R, xVal);
  const solved = L.x === 1 && L.n === 0 && R.x === 0 && balanced;

  useEffect(() => {
    if (solved && !solvedRef.current) {
      solvedRef.current = true;
      playVictoryFanfare();
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
      if (onSolved) onSolved();
    }
  }, [solved]);

  const handleOp = op => {
    if (solved) return;
    playClick(750);
    const targets = mode === 'both' ? [L, R] : [L];

    if (!targets.every(s => canApply(s, op))) {
      playWobbleWarn();
      setMsg({ type: 'warn', text: `Can't split evenly! The ${realWorld ? realWorld.unitName : 'items'} can't be shared into ${op.k} equal groups yet. Remove loose items first!` });
      return;
    }

    const next = { L: applyOp(L, op), R: mode === 'both' ? applyOp(R, op) : R };
    const { txt } = opLabel(op, realWorld ? realWorld.unitName : 'cubes');

    setHistory(h => [
      ...h,
      {
        state,
        label: `${txt} ${mode === 'both' ? 'on both pans' : 'on LEFT pan only'}`,
        eq: `${expr(next.L.x, next.L.n)} = ${expr(next.R.x, next.R.n)}`
      }
    ]);
    setState(next);
    setMoves(m => m + 1);

    const nowBal = value(next.L, xVal) === value(next.R, xVal);
    if (!nowBal) {
      playWobbleWarn();
      setMsg({ type: 'bad', text: '⚠️ The scale tipped! You changed only ONE side. Press Undo, then apply moves to BOTH sides.' });
    } else {
      playScaleClack();
      if (next.L.x === 1 && next.L.n === 0 && next.R.x === 0) {
        playScaleBalance();
        setMsg({ type: 'good', text: '' });
      } else {
        setMsg({ type: 'info', text: 'Still balanced! Keep going until the mystery box is completely alone on one side.' });
      }
    }
  };

  const undo = () => {
    if (!history.length) return;
    playClick(600);
    const last = history[history.length - 1];
    setState(last.state);
    setHistory(h => h.slice(0, -1));
    setMoves(m => Math.max(0, m - 1));
    setMsg({ type: 'info', text: 'Move undone. Try again!' });
  };

  const reset = () => {
    playClick(500);
    setState({ L: { ...start.L }, R: { ...start.R } });
    setHistory([]);
    setMoves(0);
    setMode('both');
    solvedRef.current = false;
    setMsg({ type: 'info', text: 'Fresh start! Pick a move below.' });
  };

  const msgStyle = {
    info: 'text-slate-200 border-white/15 bg-white/5',
    warn: 'text-amber-200 border-amber-400/50 bg-amber-950/60',
    bad: 'text-rose-200 border-rose-400/60 bg-rose-950/70',
    good: 'text-emerald-200 border-emerald-400/60 bg-emerald-950/70'
  }[msg.type];

  return (
    <div className="flex flex-col items-center gap-1.5 sm:gap-2 bg-[#1e1342]/95 border-2 border-cyan-400/40 rounded-xl sm:rounded-2xl p-2 sm:p-2.5 shadow-xl flex-1 min-h-0 overflow-y-auto w-full">
      {/* Top Header: Real-World Context Badge & Live Equation */}
      <div className="flex items-center justify-between w-full shrink-0 flex-wrap gap-1.5 sm:gap-2">
        {/* Real-World Context Pill */}
        <div className="flex items-center gap-1.5 bg-[#14082c] border border-amber-400/40 px-2.5 py-0.5 rounded-lg">
          <span className="text-lg">{realWorld ? realWorld.itemIcon : '⚖️'}</span>
          <div className="text-left">
            <p className="text-[9px] text-amber-300 font-bold uppercase tracking-wider">{realWorld ? realWorld.context : 'Science Lab'}</p>
            <p className="font-display font-900 text-xs sm:text-sm text-white leading-tight">{realWorld ? realWorld.propName : 'Mystery Box'} (x)</p>
          </div>
        </div>

        {/* Live Equation */}
        <div className="font-display font-900 text-base sm:text-xl text-amber-300 bg-[#14082c] border border-amber-400/40 rounded-lg px-3 py-0.5">
          {expr(L.x, L.n)} <span className="text-white">=</span> {expr(R.x, R.n)}
        </div>

        {/* Move Counter & Mode Switch */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => { playClick(); setViewMode(v => v === 'market' ? 'cubes' : 'market'); }}
            className="text-[11px] font-black bg-purple-900/80 hover:bg-purple-800 border border-purple-400/50 text-purple-200 px-2.5 py-0.5 rounded-lg transition cursor-pointer"
            title="Switch between Real Market Items and Algebra Cubes"
          >
            {viewMode === 'market' ? '🍎 Real Items' : '⚡ Cubes'}
          </button>
          <span className="font-display font-900 text-[11px] sm:text-xs text-slate-200 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15">
            Moves: {moves}
          </span>
        </div>
      </div>

      {/* Realistic Scale View */}
      <Scale L={L} R={R} xVal={xVal} solved={solved} viewMode={viewMode} realWorld={realWorld} />

      {/* Status & Victory Banner */}
      {solved ? (
        <div className="w-full bg-emerald-950/80 border-2 border-emerald-400/60 rounded-xl px-3 py-1.5 text-center fade-in-up shrink-0">
          <p className="font-display font-900 text-emerald-300 text-sm sm:text-base">
            🎉 Solved! One {realWorld ? realWorld.propName : 'Box'} weighs exactly x = {fmt(xVal)} {realWorld ? realWorld.unitName : 'cubes'}!
          </p>
          <p className="font-extrabold text-emerald-100 text-[11px] sm:text-xs">
            Verification: {expr(start.L.x, start.L.n)} → {start.L.x > 1 ? `${start.L.x}(${xVal})` : `${xVal}`} + {start.L.n} = {fmt(value(start.L, xVal))} ✓ Matches right pan!
          </p>
        </div>
      ) : (
        <div className={`w-full border-2 rounded-xl px-3 py-1 text-center text-[11px] sm:text-xs font-extrabold shrink-0 ${msgStyle}`}>
          {msg.text}
        </div>
      )}

      {/* Grade 7 Detective Hint Accordion */}
      {showGrade7Tip && (
        <div className="w-full bg-amber-950/80 border-2 border-amber-400/60 rounded-xl p-2 text-amber-200 text-xs font-bold text-left shrink-0 fade-in-up">
          💡 <span className="text-amber-300 font-black">Grade 7 Tip:</span> {grade7Tip || hint}
        </div>
      )}

      {/* Controls: Golden Rule Mode + Action Helpers */}
      <div className="flex items-center justify-between gap-1.5 w-full flex-wrap shrink-0">
        <div className="flex items-center gap-1.5 bg-[#14082c] px-2 py-0.5 rounded-xl border border-cyan-400/30">
          <span className="text-[10px] font-extrabold text-slate-300 pl-0.5">Apply to:</span>
          <button
            onClick={() => { playClick(); setMode('both'); }}
            className={`px-2.5 py-0.5 rounded-lg text-[11px] font-black cursor-pointer transition ${mode === 'both' ? 'bg-emerald-400 text-slate-950 shadow-md scale-102' : 'bg-white/10 text-white hover:bg-white/20'}`}
          >
            ⚖️ Both pans
          </button>
          <button
            onClick={() => { playClick(); setMode('left'); }}
            className={`px-2.5 py-0.5 rounded-lg text-[11px] font-black cursor-pointer transition ${mode === 'left' ? 'bg-rose-400 text-slate-950 shadow-md scale-102' : 'bg-white/10 text-white hover:bg-white/20'}`}
            title="Demonstrates what happens when you violate the Golden Rule"
          >
            ⚠️ Left only
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={undo}
            disabled={!history.length}
            className="bg-purple-900/80 hover:bg-purple-800 border border-purple-400/50 text-purple-100 font-display font-900 text-xs px-2.5 py-1 rounded-lg transition cursor-pointer disabled:opacity-35 disabled:cursor-not-allowed"
          >
            ↩ Undo
          </button>
          <button
            onClick={reset}
            className="bg-purple-900/80 hover:bg-purple-800 border border-purple-400/50 text-purple-100 font-display font-900 text-xs px-2.5 py-1 rounded-lg transition cursor-pointer"
          >
            🔄 Reset
          </button>
          <button
            onClick={() => { playClick(); setShowGrade7Tip(s => !s); }}
            className="bg-purple-900/80 hover:bg-purple-800 border border-purple-400/50 text-purple-200 font-display font-900 text-xs px-2.5 py-1 rounded-lg transition cursor-pointer"
          >
            💡 Hint
          </button>
        </div>
      </div>

      {/* Operation Move Buttons */}
      <div className="grid grid-cols-4 gap-1.5 sm:gap-2 w-full shrink-0">
        {ops.map((op, i) => {
          const { sym, txt } = opLabel(op, realWorld ? realWorld.unitName : 'items');
          return (
            <button
              key={i}
              onClick={() => handleOp(op)}
              disabled={solved}
              className="bg-gradient-to-b from-cyan-500/25 to-cyan-700/20 hover:from-cyan-400/40 border-2 border-cyan-400/50 rounded-xl py-1 sm:py-1.5 px-1 flex flex-col items-center cursor-pointer transition hover:scale-[1.02] disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              <span className="font-display font-900 text-base sm:text-lg text-white leading-none">{sym}</span>
              <span className="text-[9px] sm:text-[10px] font-extrabold text-cyan-200 mt-0.5 text-center leading-tight">{txt}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
