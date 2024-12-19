'use client';

export const STORAGE_KEYS = {
  HISTORY: 'translationHistory',
  FAVORITES: 'favorites',
  THEME: 'theme'
};

export function saveTranslation(translation) {
  try {
    const history = getHistory();
    const newHistory = [translation, ...history];
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(newHistory));
    return true;
  } catch (error) {
    console.error('Error saving translation:', error);
    return false;
  }
}

export function getHistory() {
  try {
    const history = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error getting history:', error);
    return [];
  }
}

export function toggleFavorite(id) {
  try {
    const history = getHistory();
    const item = history.find(item => item.id === id);
    if (!item) return false;

    item.isFavorite = !item.isFavorite;
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
    return true;
  } catch (error) {
    console.error('Error toggling favorite:', error);
    return false;
  }
}

export function clearHistory() {
  try {
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
    return true;
  } catch (error) {
    console.error('Error clearing history:', error);
    return false;
  }
}

// Helper functions
export function getFavorites() {
  try {
    const history = getHistory();
    return history.filter(item => item.isFavorite);
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
}

export function deleteTranslation(id) {
  try {
    const history = getHistory();
    const newHistory = history.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(newHistory));
    return true;
  } catch (error) {
    console.error('Error deleting translation:', error);
    return false;
  }
} 