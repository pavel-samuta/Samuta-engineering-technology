import React from 'react';

export const Navbar: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-industrial-900/90 backdrop-blur-md border-b border-industrial-700">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="text-xl font-bold text-slate-100 tracking-tight">
          ENG<span className="text-industrial-gold">.CONSULT</span>
        </div>
        <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-300">
          <button onClick={() => scrollTo('approach')} className="hover:text-industrial-gold transition-colors">Подход</button>
          <button onClick={() => scrollTo('experience')} className="hover:text-industrial-gold transition-colors">Опыт</button>
          <button onClick={() => scrollTo('services')} className="hover:text-industrial-gold transition-colors">Услуги</button>
          <button onClick={() => scrollTo('pricing')} className="hover:text-industrial-gold transition-colors">Формат</button>
        </div>
        <button 
          onClick={() => scrollTo('contact')}
          className="bg-industrial-gold text-industrial-900 px-4 py-2 rounded font-semibold text-sm hover:bg-yellow-400 transition-colors"
        >
          Связаться
        </button>
      </div>
    </nav>
  );
};