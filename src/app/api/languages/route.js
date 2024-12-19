import { NextResponse } from 'next/server';

export async function GET() {
  // For MyMemory API, we'll just return our supported languages directly
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ko', name: 'Korean' }
  ];

  return NextResponse.json(languages);
}