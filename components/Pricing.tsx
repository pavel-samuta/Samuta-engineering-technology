import React from 'react';
import { APP_CONTENT } from '../constants';

export const Pricing: React.FC = () => {
  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Формат работы</h2>
        <p className="text-slate-400">Прозрачные условия без почасовой оплаты.</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {APP_CONTENT.pricing.map((tier, idx) => (
          <div key={idx} className={`relative flex flex-col p-8 rounded-xl border ${idx === 1 ? 'bg-industrial-800 border-industrial-gold shadow-lg shadow-industrial-gold/10' : 'bg-industrial-900 border-industrial-700'}`}>
            {idx === 1 && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-industrial-gold text-industrial-900 text-xs font-bold px-3 py-1 rounded-full uppercase">
                Популярный
              </div>
            )}
            <h3 className="text-lg font-bold text-slate-100 mb-2">{tier.title}</h3>
            <div className="text-3xl font-bold text-industrial-gold mb-4">{tier.price}</div>
            <p className="text-slate-400 text-sm flex-grow">{tier.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
};