'use client';

import { LANGUAGES } from '@/app/lib/constants';

export default function LanguageSelector({
  sourceLang,
  targetLang,
  onSwap,
  onSourceChange,
  onTargetChange
}) {
  return (
    <div className="flex items-center gap-2 justify-center my-4">
      <select 
        value={sourceLang}
        onChange={(e) => onSourceChange(e.target.value)}
        className="select select-bordered w-32"
      >
        {Object.values(LANGUAGES).map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>

      <button 
        onClick={onSwap}
        className="btn btn-circle btn-ghost"
        aria-label="Swap languages"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 16V4M7 4L3 8M7 4L11 8M17 8V20M17 20L21 16M17 20L13 16"/>
        </svg>
      </button>

      <select
        value={targetLang}
        onChange={(e) => onTargetChange(e.target.value)}
        className="select select-bordered w-32"
      >
        {Object.values(LANGUAGES).map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
} 