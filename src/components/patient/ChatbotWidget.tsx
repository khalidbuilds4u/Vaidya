"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, User, Bot, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Step = 'greeting' | 'faqs' | 'askFollowUp' | 'askName' | 'askContact' | 'thankYou';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  options?: { id: string; label: string }[];
}

export function ChatbotWidget() {
  const t = useTranslations('ChatbotWidget');
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>('greeting');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [userName, setUserName] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize greeting message on mount
  useEffect(() => {
    setMessages([
      {
        id: '1',
        sender: 'bot',
        text: t('greeting'),
        options: [
          { id: 'treatment', label: t('options.treatment') },
          { id: 'quote', label: t('options.quote') },
          { id: 'faqs', label: t('options.faqs') },
          { id: 'speakToDoctor', label: t('options.speakToDoctor') },
        ],
      },
    ]);
  }, [t]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleOptionClick = (optionId: string, optionLabel: string) => {
    // Add user message
    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: optionLabel };
    
    // Disable previous options by removing them from the last bot message
    setMessages((prev) => {
      const updated = [...prev];
      if (updated.length > 0) {
        const lastBotIndex = updated.map(m => m.sender).lastIndexOf('bot');
        if (lastBotIndex >= 0 && updated[lastBotIndex].options) {
           updated[lastBotIndex] = { ...updated[lastBotIndex], options: [] };
        }
      }
      return [...updated, userMsg];
    });

    setTimeout(() => {
      if (step === 'greeting') {
        if (optionId === 'faqs') {
          setMessages((prev) => [
            ...prev,
            { 
              id: Date.now().toString(), 
              sender: 'bot', 
              text: t('faqsTitle'),
              options: [
                { id: 'visa', label: t('faqOptions.visa') },
                { id: 'pickup', label: t('faqOptions.pickup') },
                { id: 'hospitals', label: t('faqOptions.hospitals') },
                { id: 'back', label: t('faqOptions.back') },
              ]
            },
          ]);
          setStep('faqs');
        } else {
          // It was treatment, quote, or speakToDoctor
          setMessages((prev) => [
            ...prev,
            { id: Date.now().toString(), sender: 'bot', text: t('askName') },
          ]);
          setStep('askName');
        }
      } else if (step === 'faqs') {
        if (optionId === 'back') {
          setMessages((prev) => [
            ...prev,
            { 
              id: Date.now().toString(), 
              sender: 'bot', 
              text: t('greeting'),
              options: [
                { id: 'treatment', label: t('options.treatment') },
                { id: 'quote', label: t('options.quote') },
                { id: 'faqs', label: t('options.faqs') },
                { id: 'speakToDoctor', label: t('options.speakToDoctor') },
              ]
            },
          ]);
          setStep('greeting');
        } else {
          // An FAQ was clicked. Show the answer, then ask for follow up quote
          setMessages((prev) => [
            ...prev,
            { id: Date.now().toString() + 'ans', sender: 'bot', text: t(`faqAnswers.${optionId}`) },
          ]);
          setTimeout(() => {
            setMessages((prev) => [
              ...prev,
              { 
                id: Date.now().toString() + 'fup', 
                sender: 'bot', 
                text: t('followUpQuote'),
                options: [
                  { id: 'yes', label: t('followUpOptions.yes') },
                  { id: 'no', label: t('followUpOptions.no') }
                ]
              },
            ]);
            setStep('askFollowUp');
          }, 800);
        }
      } else if (step === 'askFollowUp') {
        if (optionId === 'yes') {
          setMessages((prev) => [
            ...prev,
            { id: Date.now().toString(), sender: 'bot', text: t('askName') },
          ]);
          setStep('askName');
        } else {
          setMessages((prev) => [
            ...prev,
            { id: Date.now().toString(), sender: 'bot', text: "No problem! Feel free to close this chat or click the WhatsApp button to talk to a human." },
          ]);
          setStep('thankYou');
        }
      }
    }, 600);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: inputValue.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');

    if (step === 'askName') {
      const name = inputValue.trim();
      setUserName(name);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { id: Date.now().toString(), sender: 'bot', text: t('askContact', { name }) },
        ]);
        setStep('askContact');
      }, 600);
    } else if (step === 'askContact') {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { id: Date.now().toString(), sender: 'bot', text: t('thankYou', { name: userName }) },
        ]);
        setStep('thankYou');
      }, 600);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed right-0 top-[calc(50%+7.5rem)] md:top-[calc(50%+3.5rem)] z-50 p-2 sm:p-4 pointer-events-auto flex items-center justify-end group"
          >
            <div className="flex items-center bg-gradient-to-br from-indigo-500/90 to-blue-600/90 hover:from-indigo-600 hover:to-blue-700 backdrop-blur-md text-white rounded-full shadow-[0_8px_25px_rgba(79,70,229,0.35)] border border-indigo-400/40 transition-all duration-300 transform hover:scale-105 hover:-translate-x-1">
              <span className="max-w-0 overflow-hidden group-hover:max-w-[100px] transition-all duration-300 ease-in-out whitespace-nowrap opacity-0 group-hover:opacity-100 font-semibold text-xs pl-0 group-hover:pl-4 hidden sm:block tracking-wide">
                Chat
              </span>
              <div className="p-3 relative">
                <Bot className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border border-white rounded-full animate-pulse"></span>
              </div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 w-[calc(100vw-3rem)] sm:w-[380px] h-[550px] max-h-[80vh] flex flex-col bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-slate-200 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-teal-500 p-4 sm:p-5 flex justify-between items-center text-white shrink-0 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3"></div>
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shrink-0 shadow-inner">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[15px] leading-tight">{t('title')}</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-[11px] font-medium text-teal-50 opacity-90">{t('subtitle')}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 text-white transition-colors relative z-10 shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 bg-slate-50/50 flex flex-col gap-4 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'} animate-in slide-in-from-bottom-2 duration-300`}>
                  
                  {msg.sender === 'bot' && (
                    <div className="w-7 h-7 rounded-full bg-teal-100 flex items-center justify-center shrink-0 mr-2 mt-auto mb-1">
                      <Sparkles className="w-4 h-4 text-teal-600" />
                    </div>
                  )}

                  <div className="flex flex-col max-w-[80%]">
                    <div className={`p-3.5 rounded-2xl text-[13px] sm:text-sm leading-relaxed shadow-sm ${
                      msg.sender === 'bot' 
                        ? 'bg-white border border-slate-200 text-slate-700 rounded-bl-sm' 
                        : 'bg-primary text-white rounded-br-sm'
                    }`}>
                      {msg.text}
                    </div>
                    
                    {/* Render Options if any */}
                    {msg.options && msg.options.length > 0 && (
                      <div className="flex flex-col gap-2 mt-3">
                        {msg.options.map(opt => (
                          <button
                            key={opt.id}
                            onClick={() => handleOptionClick(opt.id, opt.label)}
                            className="bg-white border border-teal-200 hover:border-primary text-teal-700 hover:text-primary text-[13px] font-semibold py-2 px-3 rounded-xl text-left transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            {step !== 'greeting' && step !== 'faqs' && step !== 'askFollowUp' && step !== 'thankYou' && (
              <div className="p-3 sm:p-4 bg-white border-t border-slate-100 shrink-0">
                <div className="relative flex items-center gap-2">
                  <Input 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={step === 'askName' ? t('placeholderName') : t('placeholderContact')}
                    className="pr-12 rounded-xl border-slate-200 focus-visible:ring-primary shadow-sm bg-slate-50 text-[13px] sm:text-sm h-11"
                  />
                  <Button 
                    size="icon"
                    onClick={handleSend}
                    disabled={!inputValue.trim()}
                    className="absolute right-1 w-9 h-9 rounded-lg bg-primary hover:bg-primary/90 text-white shrink-0 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
            
            {step === 'thankYou' && (
              <div className="p-4 bg-teal-50 border-t border-teal-100 text-center text-teal-700 text-xs font-semibold shrink-0">
                This chat is completed. You can safely close this window.
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
