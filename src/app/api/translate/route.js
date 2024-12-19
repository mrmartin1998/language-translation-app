import { NextResponse } from 'next/server';
import { validateInput, handleTranslationError } from '../../lib/utils/translation';

// Changed API endpoint to a more reliable instance
const LIBRE_TRANSLATE_API = 'https://api.mymemory.translated.net';
const SUPPORTED_LANGUAGES = ['en', 'ko'];

// Rate limiting setup
const REQUESTS_PER_HOUR = 50;
const rateLimit = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const hourAgo = now - 3600000;
  
  if (!rateLimit.has(ip)) {
    rateLimit.set(ip, [now]);
    return false;
  }

  const requests = rateLimit.get(ip).filter(time => time > hourAgo);
  requests.push(now);
  rateLimit.set(ip, requests);

  return requests.length > REQUESTS_PER_HOUR;
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Enhanced request validation
    const validationError = validateInput(body);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const { q, source, target } = body;

    // Rate limiting check
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (isRateLimited(ip)) {
      const resetTime = new Date(Date.now() + 3600000).toISOString();
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded',
          resetAt: resetTime,
          maxRequests: REQUESTS_PER_HOUR
        },
        { 
          status: 429,
          headers: {
            'Retry-After': '3600',
            'X-RateLimit-Reset': resetTime
          }
        }
      );
    }

    // MyMemory API has a different endpoint structure
    const response = await fetch(
      `${LIBRE_TRANSLATE_API}/get?q=${encodeURIComponent(q)}&langpair=${source}|${target}`,
      { method: 'GET' }
    );

    if (!response.ok) {
      throw await handleTranslationError(response);
    }

    const data = await response.json();
    
    return NextResponse.json({
      translatedText: data.responseData.translatedText,
      source,
      target,
      timestamp: new Date().toISOString(),
      characterCount: q.length
    });

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