import { NextResponse } from 'next/server';
import { validateInput, handleTranslationError } from '../../lib/utils/translation';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate the input
    const validationError = validateInput(body);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const { q, source, target } = body;

    // MyMemory API endpoint
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(q)}&langpair=${source}|${target}`;
    
    console.log('Sending request to:', url);

    const response = await fetch(url);
    const data = await response.json();

    console.log('MyMemory API response:', data);

    if (response.ok && data.responseStatus === 200) {
      return NextResponse.json({
        translatedText: data.responseData.translatedText,
        source,
        target,
        timestamp: new Date().toISOString(),
        characterCount: q.length
      });
    } else {
      throw new Error(data.responseMessage || 'Translation failed');
    }

  } catch (error) {
    console.error('Translation error:', error);
    
    return NextResponse.json(
      { 
        error: error.message || 'Internal server error',
        code: error.code,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: error.status || 500 }
    );
  }
} 