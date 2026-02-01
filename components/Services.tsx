import React from 'react';
import { APP_CONTENT } from '../constants';

export const Services: React.FC = () => {
  return (
    <div className="space-y-12">
      <h2 className="text-3xl font-bold text-white text-center">Что я решаю</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {APP_CONTENT.services.map((service, idx) => (
          <div key={idx} className="bg-industrial-800 p-6 rounded-lg border border-industrial-700 hover:border-industrial-gold/50 transition-colors group">
            <div className="text-industrial-gold mb-4 group-hover:scale-110 transition-transform duration-300 origin-left">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="text-slate-200 font-medium">{service}</p>
          </div>
        ))}
      </div>
    </div>
  );
};