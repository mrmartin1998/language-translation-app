const SUPPORTED_LANGUAGES = ['en', 'ko'];

export function formatTranslationRequest(text, sourceLang, targetLang) {
  return {
    q: text.trim(),
    source: sourceLang,
    target: targetLang,
    format: 'text'
  };
}

export function validateInput({ q, source, target }) {
  if (!q?.trim()) {
    return 'Text to translate is required';
  }

  if (!SUPPORTED_LANGUAGES.includes(source) || !SUPPORTED_LANGUAGES.includes(target)) {
    return 'Invalid language pair. Only English (en) and Korean (ko) are supported';
  }

  if (source === target) {
    return 'Source and target languages must be different';
  }

  if (q.length > 5000) {
    return 'Text exceeds maximum length of 5000 characters';
  }

  return null;
}

export async function handleTranslationError(response) {
  const error = new Error();
  error.status = response.status;

  try {
    const data = await response.json();
    
    switch (response.status) {
      case 400:
        error.message = data.error || 'Invalid request parameters';
        break;
      case 429:
        error.message = 'Rate limit exceeded. Please try again later.';
        error.code = 'RATE_LIMIT';
        break;
      case 503:
        error.message = 'Translation service is temporarily unavailable';
        error.code = 'SERVICE_UNAVAILABLE';
        break;
      default:
        error.message = data.error || 'An unexpected error occurred';
        error.code = 'UNKNOWN';
    }
  } catch {
    error.message = 'Failed to process translation request';
    error.code = 'PARSE_ERROR';
  }

  return error;
}

// Helper functions
export function isValidLanguagePair(source, target) {
  return (
    SUPPORTED_LANGUAGES.includes(source) &&
    SUPPORTED_LANGUAGES.includes(target) &&
    source !== target
  );
}

export function sanitizeText(text) {
  return text.trim().slice(0, 5000);
} 