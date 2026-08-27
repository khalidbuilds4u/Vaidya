"use client";

import { useState, useEffect } from "react";
import { MessageCircle, Send, Link as LinkIcon, Check } from "lucide-react";

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

interface ShareButtonsProps {
  whatsappText: string;
  telegramText: string;
  facebookText: string;
  copyText: string;
  doctorName: string;
}

export function ShareButtons({
  whatsappText,
  telegramText,
  facebookText,
  copyText,
  doctorName,
}: ShareButtonsProps) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const encodedUrl = encodeURIComponent(url);
  const encodedMessage = encodeURIComponent(`Check out Dr. ${doctorName}'s profile on Asad Healthcare: ${url}`);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  if (!url) {
    return <div className="space-y-3 opacity-50 pointer-events-none">
      <button className="w-full flex items-center justify-center gap-2 bg-green-50 text-green-600 font-bold py-3 rounded-xl text-sm border border-green-100">
        <MessageCircle className="w-4 h-4" /> {whatsappText}
      </button>
      <button className="w-full flex items-center justify-center gap-2 bg-blue-50 text-blue-600 font-bold py-3 rounded-xl text-sm border border-blue-100">
        <Send className="w-4 h-4" /> {telegramText}
      </button>
      <button className="w-full flex items-center justify-center gap-2 bg-indigo-50 text-indigo-600 font-bold py-3 rounded-xl text-sm border border-indigo-100">
        <FacebookIcon className="w-4 h-4" /> {facebookText}
      </button>
      <button className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white font-bold py-3 rounded-xl text-sm mt-2 shadow-md">
        <LinkIcon className="w-4 h-4" /> {copyText}
      </button>
    </div>;
  }

  return (
    <div className="space-y-3">
      <a 
        href={`https://wa.me/?text=${encodedMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2 bg-green-50 text-green-600 font-bold py-3 rounded-xl hover:bg-green-100 transition-colors text-sm border border-green-100"
      >
        <MessageCircle className="w-4 h-4" /> {whatsappText}
      </a>
      
      <a 
        href={`https://t.me/share/url?url=${encodedUrl}&text=${encodeURIComponent(`Check out Dr. ${doctorName}'s profile`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2 bg-blue-50 text-blue-600 font-bold py-3 rounded-xl hover:bg-blue-100 transition-colors text-sm border border-blue-100"
      >
        <Send className="w-4 h-4" /> {telegramText}
      </a>
      
      <a 
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2 bg-indigo-50 text-indigo-600 font-bold py-3 rounded-xl hover:bg-indigo-100 transition-colors text-sm border border-indigo-100"
      >
        <FacebookIcon className="w-4 h-4" /> {facebookText}
      </a>
      
      <button 
        onClick={handleCopy}
        className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-colors text-sm mt-2 shadow-md"
      >
        {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <LinkIcon className="w-4 h-4" />} 
        {copied ? "Copied!" : copyText}
      </button>
    </div>
  );
}
