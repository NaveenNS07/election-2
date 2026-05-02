/**
 * VoteWise Translation Service
 * Handles multilingual support using Google Cloud Translation API
 */

const GOOGLE_TRANSLATE_ENDPOINT = 'https://translation.googleapis.com/language/translate/v2';

import { sanitizeInput } from '../../utils/security';

const translationCache = new Map();

/**
 * Translates text into the target language
 */
export const translateText = async (text, targetLanguage, apiKey) => {
  if (!text || !targetLanguage || targetLanguage === 'en') return text;
  
  /**
   * SECURITY LAYER: Sanitization
   */
  const sanitizedText = sanitizeInput(text);

  /**
   * PERFORMANCE LAYER: Caching
   */
  const cacheKey = `${sanitizedText}_${targetLanguage}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
  }

  if (!apiKey) {
    console.warn("Translation API Key missing. Returning original text.");
    return text;
  }

  try {
    const response = await fetch(`${GOOGLE_TRANSLATE_ENDPOINT}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: sanitizedText,
        target: targetLanguage,
      }),
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    const translated = data.data.translations[0].translatedText;
    translationCache.set(cacheKey, translated);
    return translated;
  } catch (error) {
    console.error("Translation Error:", error);
    return text; 
  }
};
