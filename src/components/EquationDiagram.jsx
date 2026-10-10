import React from 'react';

function Chip({ x, y, text, fill, stroke, color }) {
  const w = Math.min(136, Math.max(54, text.length * 11 + 26));
  return (
    <g>
      <rect x={x - w / 2} y={y - 17} width={w} height={34} rx={17} fill={fill} stroke={stroke} strokeWidth="2.5" />
      <text x={x} y={y + 6} fill={color} fontSize="18" fontWeight="900" textAnchor="middle" fontFamily="Nunito, sans-serif">{text}</text>
    </g>
  );
}

/** Mini balance-scale diagram used in the practice quiz */
export function EquationDiagram({ diagramData, size = 210 }) {
  if (!diagramData) return null;
  const { left = "", right = "", mode = "balance", icon, letX } = diagramData;

  if (mode === 'word') {
    return (
      <div className="flex flex-col items-center justify-center my-2 gap-2">
        <div
          className="rounded-full flex items-center justify-center bg-[#1e1342] border-2 border-amber-400/60 shadow-[0_0_24px_rgba(250,204,21,0.35)]"
          style={{ width: size * 0.5, height: size * 0.5, fontSize: size * 0.28 }}
        >
          {icon}
        </div>
        <div className="bg-amber-400/15 border-2 border-amber-400/50 text-amber-300 font-display font-900 text-sm sm:text-base px-5 py-1.5 rounded-full">
          Let x = {letX}
        </div>
      </div>
    );
  }

  const h = size * 0.62;
  return (
    <div className="flex flex-col items-center justify-center my-2">
      <svg width={size * 1.7} height={h} viewBox="0 0 360 190" className="drop-shadow-[0_0_18px_rgba(250,204,21,0.3)]">
        {/* stand */}
        <polygon points="150,176 210,176 196,150 164,150" fill="#4c1d95" stroke="#a78bfa" strokeWidth="2" />
        <rect x="175" y="52" width="10" height="100" rx="4" fill="#7c3aed" />
        {/* beam */}
        <rect x="30" y="46" width="300" height="10" rx="5" fill="#facc15" />
        <circle cx="180" cy="51" r="9" fill="#fde047" stroke="#b45309" strokeWidth="2" />
        {/* left pan */}
        <line x1="70" y1="56" x2="16" y2="126" stroke="#c4b5fd" strokeWidth="2" />
        <line x1="70" y1="56" x2="124" y2="126" stroke="#c4b5fd" strokeWidth="2" />
        <rect x="10" y="124" width="120" height="9" rx="4.5" fill="#a78bfa" />
        {/* right pan */}
        <line x1="290" y1="56" x2="236" y2="126" stroke="#c4b5fd" strokeWidth="2" />
        <line x1="290" y1="56" x2="344" y2="126" stroke="#c4b5fd" strokeWidth="2" />
        <rect x="230" y="124" width="120" height="9" rx="4.5" fill="#a78bfa" />
        {/* chips */}
        <Chip x={70} y={98} text={left} fill="rgba(250,204,21,0.18)" stroke="#facc15" color="#fde047" />
        <Chip x={290} y={98} text={right} fill="rgba(56,189,248,0.18)" stroke="#38bdf8" color="#7dd3fc" />
        <text x="180" y="30" fill="#ffffff" fontSize="26" fontWeight="900" textAnchor="middle" fontFamily="Nunito, sans-serif">=</text>
      </svg>
      {mode === 'verify' && (
        <span className="font-display font-900 text-rose-300 text-sm -mt-1">x = ?</span>
      )}
    </div>
  );
}
