'use client';

import { useState } from 'react';
import TranslationBox from './components/translation/TranslationBox';

export default function Home() {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card bg-base-200">
          <div className="card-body">
            <h2 className="card-title">English</h2>
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
            <h2 className="card-title">Korean</h2>
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
