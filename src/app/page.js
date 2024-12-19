'use client';

import { useState } from 'react';
import TranslationBox from './components/translation/TranslationBox';
import LanguageSelector from './components/translation/LanguageSelector';

export default function Home() {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('ko');

  const handleSwapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      <LanguageSelector
        sourceLang={sourceLang}
        targetLang={targetLang}
        onSwap={handleSwapLanguages}
        onSourceChange={setSourceLang}
        onTargetChange={setTargetLang}
      />

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card bg-base-200">
          <div className="card-body">
            <h2 className="card-title">
              {sourceLang === 'en' ? 'English' : '한국어'}
            </h2>
            <TranslationBox
              value={sourceText}
              onChange={setSourceText}
              placeholder="Enter text to translate..."
              direction="source"
            />
          </div>
        </div>
        
        <div className="card bg-base-200">
          <div className="card-body">
            <h2 className="card-title">
              {targetLang === 'en' ? 'English' : '한국어'}
            </h2>
            <TranslationBox
              value={translatedText}
              onChange={setTranslatedText}
              placeholder="Translation will appear here..."
              direction="target"
            />
          </div>
        </div>
      </section>
      
      <div className="flex justify-center">
        <button className="btn btn-primary">
          Translate
        </button>
      </div>
    </div>
  );
}
