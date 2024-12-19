'use client';

import { useState } from 'react';
import TranslationBox from './components/translation/TranslationBox';
import TranslationResult from './components/translation/TranslationResult';
import LanguageSelector from './components/translation/LanguageSelector';

export default function Home() {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('ko');
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleSwapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    // We'll implement the actual favorite functionality later
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
            <TranslationResult
              text={translatedText}
              loading={loading}
              onFavorite={handleFavorite}
              isFavorite={isFavorite}
            />
          </div>
        </div>
      </section>
      
      <div className="flex justify-center">
        <button className="btn btn-primary" disabled={loading || !sourceText}>
          {loading ? <span className="loading loading-spinner"></span> : 'Translate'}
        </button>
      </div>
    </div>
  );
}
