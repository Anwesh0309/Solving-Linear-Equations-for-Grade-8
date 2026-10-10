import React, { useState, useEffect } from 'react';
import { BgSymbols } from '../components/TopNav.jsx';
import { STATIONS, STATION_ACTIVITIES } from '../simData.js';
import { narrate, stopNarration } from '../utils/audio.js';
import {
  simulateActivityNarration, simulateSuccessNarration, simulateRetryNarration
} from '../utils/narration.js';
import { BalanceLab } from '../components/sim/BalanceLab.jsx';
import { UndoMachine, StepSorter, MistakeDetective } from '../components/sim/UndoLab.jsx';
import { SoloSolver } from '../components/sim/SoloSolver.jsx';
import { playClick } from '../utils/sfx.js';

// 3 interactive simulation activities per station (Grade 8 equation solving)
export function SimulatePhase({ muted, onNext }) {
  const [station, setStation] = useState(1);
  const [actIdx, setActIdx] = useState(0);

  const currentActivity = STATION_ACTIVITIES[station][actIdx];

  useEffect(() => {
    narrate(simulateActivityNarration(station, actIdx), !muted);
    return () => stopNarration();
  }, [station, actIdx, muted]);

  const handleSolved = () => narrate(simulateSuccessNarration(station), !muted);
  const handleRetry = () => narrate(simulateRetryNarration(), !muted);

  const nextActivity = () => {
    stopNarration();
    playClick(750);
    if (actIdx < 2) {
      setActIdx(i => i + 1);
    } else if (station < 3) {
      setStation(s => s + 1);
      setActIdx(0);
    } else {
      onNext();
    }
  };

  const prevActivity = () => {
    stopNarration();
    playClick(650);
    if (actIdx > 0) {
      setActIdx(i => i - 1);
    } else if (station > 1) {
      setStation(s => s - 1);
      setActIdx(2);
    }
  };

  const renderActivity = () => {
    const key = `${station}-${actIdx}`;
    switch (currentActivity.type) {
      case 'balance':   return <BalanceLab key={key} activity={currentActivity} onSolved={handleSolved} />;
      case 'machine':   return <UndoMachine key={key} activity={currentActivity} onSolved={handleSolved} />;
      case 'sorter':    return <StepSorter key={key} activity={currentActivity} onSolved={handleSolved} />;
      case 'detective': return <MistakeDetective key={key} activity={currentActivity} onSolved={handleSolved} />;
      default:          return <SoloSolver key={key} activity={currentActivity} onSolved={handleSolved} onRetry={handleRetry} />;
    }
  };

  return (
    <div className="flex-1 min-h-0 flex flex-col items-center justify-center p-3 sm:p-5 relative overflow-hidden select-none z-10">
      <BgSymbols />

      {/* Main Simulation Stations Glass Card Container */}
      <div className="w-full max-w-6xl max-h-[94vh] bg-[#160b36]/95 border-2 border-purple-400/40 rounded-3xl p-5 sm:p-7 shadow-2xl backdrop-blur-md flex flex-col items-center fade-in-up z-20 my-auto overflow-hidden sim-card">
        {/* Cyan Accent Bar */}
        <div className="w-24 h-2 bg-cyan-400 rounded-full mb-2.5 shadow-[0_0_18px_rgba(56,189,248,0.85)] shrink-0" />

        {/* Card Header Title */}
        <h2 className="font-display font-900 text-2xl sm:text-3xl text-white flex items-center gap-3 mb-3.5 shrink-0 sim-h2">
          <span className="text-3xl sm:text-4xl">🧪</span>
          <span>Simulation Stations</span>
        </h2>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-7 w-full items-stretch flex-1 min-h-0 overflow-hidden">
          {/* Left Column: Station Sidebar Tabs */}
          <div className="md:col-span-4 flex flex-col justify-between gap-3 shrink-0">
            <div className="flex flex-col gap-3.5">
              {STATIONS.map(st => (
                <button
                  key={st.id}
                  onClick={() => {
                    stopNarration();
                    playClick(800);
                    setStation(st.id);
                    setActIdx(0);
                  }}
                  className={`p-4 sm:p-5 rounded-2xl border-2 flex items-center justify-between text-left transition-all duration-200 cursor-pointer ${
                    station === st.id
                      ? 'border-cyan-400 bg-[#1e2852] text-white shadow-[0_0_22px_rgba(56,189,248,0.4)] scale-[1.02]'
                      : 'border-purple-500/25 bg-[#13082b]/80 text-slate-300 hover:border-cyan-400/50'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-bold shrink-0 ${
                      station === st.id ? 'bg-cyan-500/30 text-cyan-300' : 'bg-white/10 text-white'
                    }`}>
                      {st.icon}
                    </div>
                    <div>
                      <p className="font-display font-900 text-base sm:text-lg leading-tight">{st.name}</p>
                      <p className="text-xs font-extrabold text-slate-300 mt-0.5">{st.sub}</p>
                    </div>
                  </div>
                  <span className="text-base">🔓</span>
                </button>
              ))}
            </div>

            {/* Bottom Left CTA Button */}
            <button
              onClick={onNext}
              className="btn-gold font-display font-900 text-base sm:text-lg py-4 px-6 shadow-[0_0_25px_rgba(250,204,21,0.65)] hover:scale-105 transition mt-2 w-full flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <span>Go to Practice Phase!</span>
              <span>→</span>
            </button>
          </div>

          {/* Right Column: Interactive Simulation Box */}
          <div className="md:col-span-8 bg-[#13092e]/95 border-2 border-purple-400/35 rounded-3xl p-5 sm:p-6 flex flex-col justify-between shadow-inner flex-1 min-h-0 overflow-hidden sim-box">
            <div className="flex flex-col flex-1 min-h-0 gap-3 sim-stack">
              {/* Header Row */}
              <div className="flex items-center justify-between border-b border-white/15 pb-3 shrink-0 sim-head">
                <h3 className="font-display font-900 text-2xl sm:text-3xl text-cyan-300 flex items-center gap-3 sim-act-title">
                  <span className="text-3xl sm:text-4xl">{currentActivity.icon}</span>
                  <span>{currentActivity.title}</span>
                </h3>
                <span className="font-display font-900 text-xs sm:text-sm text-slate-200 bg-white/10 px-4 py-1 rounded-full border border-white/15">
                  Activity {actIdx + 1} of 3
                </span>
              </div>

              {/* Activity Description */}
              <p className="text-slate-100 text-base sm:text-lg leading-relaxed font-extrabold shrink-0 sim-desc">
                {currentActivity.desc}
              </p>

              {/* Interactive activity */}
              {renderActivity()}
            </div>

            {/* Bottom Activity Step Buttons */}
            <div className="flex items-center justify-between border-t border-white/15 pt-4 mt-3 shrink-0 sim-nav">
              <button
                onClick={prevActivity}
                disabled={station === 1 && actIdx === 0}
                className="bg-[#1c0d3a]/90 hover:bg-[#2c1859] border-2 border-white/25 text-white font-display font-900 text-sm sm:text-base px-6 py-2.5 rounded-full cursor-pointer transition disabled:opacity-30 disabled:cursor-not-allowed shadow-md"
              >
                ← Previous Activity
              </button>

              <button
                onClick={nextActivity}
                className="btn-gold text-sm sm:text-base font-900 px-8 py-2.5 rounded-full flex items-center gap-2 shadow-lg hover:scale-105 transition cursor-pointer"
              >
                <span>{station === 3 && actIdx === 2 ? 'Go to Practice Phase' : 'Next Activity'}</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
