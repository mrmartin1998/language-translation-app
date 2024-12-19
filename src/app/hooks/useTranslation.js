'use client';

import { useState } from 'react';

export function useTranslation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const translate = async (text, sourceLang, targetLang) => {
    try {
      setLoading(true);
      setError(null);

      console.log('Translation request:', {
        text,
        sourceLang,
        targetLang
      });

      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          source: sourceLang,
          target: targetLang
        })
      });

      console.log('Raw response:', response);
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Translation failed');
      }

      return data.translatedText;

    } catch (err) {
      console.error('Translation error:', err);
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    translate,
    loading,
    error
  };
}