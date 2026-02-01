import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProblemSolution } from './components/ProblemSolution';
import { Experience } from './components/Experience';
import { Services } from './components/Services';
import { Pricing } from './components/Pricing';
import { Contact } from './components/Contact';
import { ChatWidget } from './components/ChatWidget';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-industrial-900 text-slate-200 font-sans selection:bg-industrial-gold selection:text-industrial-900">
      <Navbar />
      
      <main className="container mx-auto px-4 md:px-6 lg:px-8 space-y-24 pb-24">
        <section id="hero" className="pt-24 min-h-[90vh] flex items-center">
          <Hero />
        </section>

        <section id="approach">
          <ProblemSolution />
        </section>

        <section id="experience">
          <Experience />
        </section>

        <section id="services">
          <Services />
        </section>

        <section id="pricing">
          <Pricing />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </main>

      <ChatWidget />
    </div>
  );
};

export default App;