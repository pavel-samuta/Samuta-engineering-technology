import React from 'react';
import { APP_CONTENT } from '../constants';

export const ProblemSolution: React.FC = () => {
  return (
    <div className="space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h2 className="text-3xl font-bold text-white">Когда я нужен, а когда — нет</h2>
        <p className="text-slate-400">Четкое понимание границ компетенций экономит ваше время и деньги.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Not Needed */}
        <div className="bg-slate-900/50 border border-red-900/30 rounded-xl p-8 hover:border-red-900/60 transition-colors">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-red-900/20 flex items-center justify-center text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-red-400">Когда я НЕ нужен</h3>
          </div>
          <ul className="space-y-4">
            {APP_CONTENT.notNeeded.map((item, idx) => (
              <li key={idx} className="flex items-start text-slate-400">
                <span className="mr-3 text-red-800 mt-1">✗</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Needed */}
        <div className="bg-industrial-800 border border-emerald-900/30 rounded-xl p-8 hover:border-emerald-700/60 transition-colors relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl"></div>
          <div className="flex items-center space-x-3 mb-6 relative z-10">
            <div className="w-10 h-10 rounded-full bg-emerald-900/20 flex items-center justify-center text-emerald-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-emerald-400">Когда я НУЖЕН</h3>
          </div>
          <ul className="space-y-4 relative z-10">
            {APP_CONTENT.needed.map((item, idx) => (
              <li key={idx} className="flex items-start text-slate-200">
                <span className="mr-3 text-emerald-500 mt-1">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};