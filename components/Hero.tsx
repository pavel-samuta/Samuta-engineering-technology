import React from 'react';
import { APP_CONTENT } from '../constants';

export const Hero: React.FC = () => {
  return (
    <div className="w-full grid lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-8">
        <div className="inline-block px-3 py-1 border border-industrial-gold/30 rounded-full text-industrial-gold text-xs font-semibold tracking-wide uppercase">
          Инженерный Консалтинг
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
          {APP_CONTENT.hero.title}
        </h1>
        <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
          {APP_CONTENT.hero.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <a 
            href={APP_CONTENT.hero.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex justify-center items-center px-8 py-4 bg-industrial-gold text-industrial-900 font-bold rounded hover:bg-yellow-400 transition-all transform hover:-translate-y-1"
          >
            {APP_CONTENT.hero.cta}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
          <button 
             onClick={() => document.getElementById('chat-input')?.focus()}
             className="inline-flex justify-center items-center px-8 py-4 border border-slate-600 text-slate-300 font-bold rounded hover:bg-slate-800 transition-all"
          >
            Задать вопрос ИИ
          </button>
        </div>
      </div>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-tr from-industrial-gold/20 to-transparent rounded-2xl blur-2xl -z-10"></div>
        <div className="bg-industrial-800 border border-slate-700 p-8 rounded-2xl shadow-2xl relative z-10">
          <p className="text-slate-300 italic mb-6 text-lg font-light">
            "Моя практика — это не теоретические модели и не презентационные расчёты. Это решения, доведённые до реальной эксплуатации, серийного производства и измеримого экономического эффекта."
          </p>
          <div className="grid grid-cols-3 gap-4 border-t border-slate-700 pt-6">
            {APP_CONTENT.stats.map((stat, idx) => (
              <div key={idx}>
                <div className="text-2xl md:text-3xl font-bold text-industrial-gold">{stat.value}</div>
                <div className="text-xs text-slate-500 uppercase mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};