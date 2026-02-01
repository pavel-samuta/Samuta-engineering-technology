import React, { useState, useRef, useEffect } from 'react';
import { generateResponse, speakText } from '../services/geminiService';
import { ChatMode, Message, ChatState } from '../types';

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [state, setState] = useState<ChatState>({
    messages: [
      { id: '1', role: 'model', text: 'Здравствуйте. Я цифровой ассистент. Готов ответить на вопросы о моем опыте, методах работы или обсудить ваш проект.' }
    ],
    isLoading: false,
    mode: ChatMode.STANDARD
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || state.isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: input };
    
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMsg],
      isLoading: true
    }));
    setInput('');

    // Convert messages for API history
    const history = state.messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const responseText = await generateResponse(input, state.mode, history);

    const modelMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      isThinking: state.mode === ChatMode.THINKING
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, modelMsg],
      isLoading: false
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTTS = async (text: string) => {
    await speakText(text);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 ${isOpen ? 'bg-slate-700 rotate-45' : 'bg-industrial-gold hover:scale-110'}`}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-industrial-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[90vw] md:w-[400px] h-[600px] bg-industrial-900 border border-slate-700 rounded-2xl shadow-2xl z-40 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-4 bg-industrial-800 border-b border-slate-700 flex justify-between items-center">
            <h3 className="font-bold text-white">AI Consultant</h3>
            <div className="flex gap-2 text-xs">
               <button 
                onClick={() => setState(prev => ({...prev, mode: ChatMode.FAST}))}
                className={`px-2 py-1 rounded transition-colors ${state.mode === ChatMode.FAST ? 'bg-green-600 text-white' : 'bg-slate-700 text-slate-400'}`}
                title="Gemini Flash Lite (Fast)"
              >
                Fast
              </button>
              <button 
                onClick={() => setState(prev => ({...prev, mode: ChatMode.STANDARD}))}
                className={`px-2 py-1 rounded transition-colors ${state.mode === ChatMode.STANDARD ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-400'}`}
                title="Gemini Pro (Standard)"
              >
                Std
              </button>
              <button 
                onClick={() => setState(prev => ({...prev, mode: ChatMode.THINKING}))}
                className={`px-2 py-1 rounded transition-colors ${state.mode === ChatMode.THINKING ? 'bg-purple-600 text-white' : 'bg-slate-700 text-slate-400'}`}
                title="Gemini Pro + Thinking (Complex)"
              >
                Deep
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50">
            {state.messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-lg p-3 ${
                  msg.role === 'user' 
                    ? 'bg-industrial-gold text-industrial-900 rounded-tr-none' 
                    : 'bg-industrial-800 text-slate-200 border border-slate-700 rounded-tl-none'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                  {msg.isThinking && <div className="mt-2 text-xs text-purple-400 italic flex items-center gap-1">
                    <svg className="w-3 h-3 animate-pulse" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>
                    Deep Reasoning used
                  </div>}
                  {msg.role === 'model' && (
                    <button 
                      onClick={() => handleTTS(msg.text)}
                      className="mt-2 text-slate-500 hover:text-industrial-gold transition-colors flex items-center gap-1 text-xs"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      </svg>
                      Listen
                    </button>
                  )}
                </div>
              </div>
            ))}
            {state.isLoading && (
              <div className="flex justify-start">
                <div className="bg-industrial-800 border border-slate-700 rounded-lg p-3 rounded-tl-none">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-industrial-800 border-t border-slate-700">
            <div className="flex gap-2">
              <input
                id="chat-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Спросите об аудите или проектах..."
                className="flex-1 bg-slate-900 text-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-industrial-gold border border-slate-700"
                disabled={state.isLoading}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || state.isLoading}
                className="bg-industrial-gold text-industrial-900 rounded-lg px-4 hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
            <div className="mt-2 text-[10px] text-slate-500 text-center">
              AI может ошибаться. Проверяйте важную информацию.
            </div>
          </div>
        </div>
      )}
    </>
  );
};