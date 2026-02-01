import React from 'react';
import { APP_CONTENT } from '../constants';

export const Experience: React.FC = () => {
  return (
    <div className="space-y-16">
      <div className="bg-gradient-to-r from-industrial-800 to-industrial-900 rounded-2xl border border-industrial-700 overflow-hidden">
        <div className="p-8 md:p-12 grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-industrial-gold font-bold tracking-widest text-sm uppercase">Ключевое достижение</h3>
            <h2 className="text-3xl font-bold text-white">{APP_CONTENT.caseStudy.title}</h2>
            <p className="text-lg text-slate-300">
              {APP_CONTENT.caseStudy.description}
            </p>
            <div className="inline-block bg-emerald-900/30 border border-emerald-800/50 rounded-lg p-4">
              <p className="text-emerald-400 font-bold text-xl">
                → {APP_CONTENT.caseStudy.result}
              </p>
            </div>
          </div>
          <div className="bg-slate-900/50 rounded-xl p-8 border border-slate-700/50">
             <h4 className="text-xl font-semibold text-white mb-6">Редкая комбинация навыков</h4>
             <ul className="space-y-4">
               {APP_CONTENT.skills.map((skill, idx) => (
                 <li key={idx} className="flex items-start">
                   <div className="flex-shrink-0 w-6 h-6 rounded-full bg-industrial-gold/10 flex items-center justify-center mt-1 mr-4">
                     <span className="text-industrial-gold text-xs">★</span>
                   </div>
                   <span className="text-slate-300">{skill}</span>
                 </li>
               ))}
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
};