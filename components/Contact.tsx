import React from 'react';
import { APP_CONTENT } from '../constants';

export const Contact: React.FC = () => {
  return (
    <div className="bg-industrial-800 rounded-3xl p-8 md:p-16 text-center border border-industrial-700">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
        Открыт для собственников и инвесторов
      </h2>
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {APP_CONTENT.targetAudience.map((item, idx) => (
          <span key={idx} className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-full text-slate-300 text-sm">
            {item}
          </span>
        ))}
      </div>
      <a 
        href={APP_CONTENT.hero.link}
        className="inline-block px-10 py-5 bg-industrial-gold text-industrial-900 font-bold text-lg rounded hover:bg-yellow-400 transition-all shadow-xl shadow-yellow-900/20"
      >
        Скачать презентацию и материалы
      </a>
    </div>
  );
};