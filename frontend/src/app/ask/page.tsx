'use client';

import React, { useState, useEffect } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { apiClient } from '@/lib/api-client';
import { AIResponse } from '@/types';
import { LogoMark } from '@/components/brand/Logo';
import { useLanguage } from '@/context/LanguageContext';
import { Sparkles, Send, ShieldCheck, User, ArrowRight } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  confidence?: string;
  grounded_data?: Record<string, any>;
  followups?: string[];
  timestamp: string;
}

export default function AskIntelligencePage() {
  const { t, lang } = useLanguage();

  const suggestedQuestions = lang === 'fr' ? [
    "Que devons-nous corriger en priorité ?",
    "Pourquoi la consommation d'énergie est-elle élevée ?",
    "Combien pourrions-nous économiser ?",
    "Que s'est-il passé avec la consommation d'eau ?",
    "Quelle opportunité a le retour sur investissement le plus rapide ?"
  ] : [
    "What should we fix first?",
    "Why is energy consumption high?",
    "How much could we save?",
    "What happened to water consumption?",
    "Which opportunity has the fastest payback?"
  ];

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Reset initial welcome message based on active language
    setMessages([
      {
        id: 'welcome',
        sender: 'assistant',
        text: t.ask.welcome_message,
        timestamp: 'Just now',
        followups: suggestedQuestions
      }
    ]);
  }, [lang]);

  const handleSend = async (queryText?: string) => {
    const q = queryText || input;
    if (!q.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await apiClient.askAI(q, lang);
      const assistantMsg: ChatMessage = {
        id: String(Date.now() + 1),
        sender: 'assistant',
        text: response.answer,
        confidence: response.confidence,
        grounded_data: response.grounded_data,
        followups: response.suggested_followups,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      {/* Page Title (Section 10: Ask Resyntel) */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#0B1F33] tracking-tight flex items-center gap-2.5">
          <Sparkles className="w-7 h-7 text-[#087E8B]" />
          <span>{t.ask.page_title}</span>
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-1">
          {t.ask.page_subtitle}
        </p>
      </div>

      {/* Main Chat Interface */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm flex flex-col h-[700px] overflow-hidden">
        {/* Chat Messages Log */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3.5 max-w-3xl ${
                msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                  msg.sender === 'user'
                    ? 'bg-[#0B1F33] text-white'
                    : 'bg-[#0B1F33] text-white shadow-2xs'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <LogoMark size={22} />}
              </div>

              {/* Message Content */}
              <div className="space-y-2">
                <div
                  className={`p-4 rounded-xl text-xs md:text-sm leading-relaxed shadow-2xs ${
                    msg.sender === 'user'
                      ? 'bg-[#0B1F33] text-white rounded-tr-none'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'
                  }`}
                >
                  <div className="whitespace-pre-line font-normal">{msg.text}</div>

                  {msg.confidence && (
                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[10px] text-slate-400 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{msg.confidence}</span>
                    </div>
                  )}
                </div>

                {/* Grounded Followup suggestions */}
                {msg.followups && msg.followups.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {msg.followups.map((f, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(f)}
                        className="text-[11px] bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 px-3 py-1 rounded-full font-medium transition-colors shadow-2xs flex items-center gap-1 text-left"
                      >
                        <span>{f}</span>
                        <ArrowRight className="w-3 h-3 text-[#087E8B]" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3.5 max-w-xl mr-auto">
              <div className="w-8 h-8 rounded-full bg-[#0B1F33] text-white flex items-center justify-center text-xs">
                <LogoMark size={20} />
              </div>
              <div className="bg-white border border-slate-200 p-3.5 rounded-xl text-xs text-slate-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#087E8B] animate-ping" />
                <span>{t.ask.thinking}</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.ask.placeholder}
              className="flex-1 bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-xs md:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#087E8B] focus:border-transparent placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-4 py-2.5 bg-[#087E8B] hover:bg-[#076a75] disabled:opacity-50 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <span>{t.ask.btn_send}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </AppShell>
  );
}
