import {CardSet} from './decks';

const DB_NAME = 'tarot-journal-db';
const DB_VERSION = 1;
const DECKS_STORE = 'custom-decks';
const ACTIVE_DECK_KEY = 'tarot-journal-active-deck';

/**
 * Open IndexedDB connection
 */
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = event => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(DECKS_STORE)) {
        db.createObjectStore(DECKS_STORE, {keyPath: 'id'});
      }
    };
  });
}

/**
 * Load all custom decks from IndexedDB
 */
export async function loadCustomDecks(): Promise<CardSet[]> {
  try {
    const db = await openDB();
    const transaction = db.transaction(DECKS_STORE, 'readonly');
    const store = transaction.objectStore(DECKS_STORE);
    const request = store.getAll();

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        const decks = request.result as CardSet[];
        resolve(
          decks.map(deck => ({
            ...deck,
            source: 'custom' as const,
          }))
        );
      };
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('Failed to load custom decks:', error);
    return [];
  }
}

/**
 * Add a new custom deck to IndexedDB
 */
export async function addCustomDeck(deck: CardSet): Promise<void> {
  try {
    const db = await openDB();
    const transaction = db.transaction(DECKS_STORE, 'readwrite');
    const store = transaction.objectStore(DECKS_STORE);
    const request = store.add({...deck, source: 'custom'});

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve();
      request.onerror = () =>
        reject(new Error('Failed to save deck. Storage may be full.'));
    });
  } catch (error) {
    console.error('Failed to add custom deck:', error);
    throw new Error('Failed to save deck. Storage may be full.');
  }
}

/**
 * Delete a custom deck by ID
 */
export async function deleteCustomDeck(deckId: string): Promise<void> {
  try {
    const db = await openDB();
    const transaction = db.transaction(DECKS_STORE, 'readwrite');
    const store = transaction.objectStore(DECKS_STORE);
    const request = store.delete(deckId);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error('Failed to delete custom deck:', error);
    throw error;
  }
}

/**
 * Update an existing custom deck
 */
export async function updateCustomDeck(
  deckId: string,
  updates: Partial<CardSet>
): Promise<void> {
  try {
    const db = await openDB();
    const transaction = db.transaction(DECKS_STORE, 'readwrite');
    const store = transaction.objectStore(DECKS_STORE);

    // Get existing deck
    const getRequest = store.get(deckId);

    return new Promise((resolve, reject) => {
      getRequest.onsuccess = () => {
        const existingDeck = getRequest.result as CardSet;
        if (!existingDeck) {
          reject(new Error('Deck not found'));
          return;
        }

        const updatedDeck = {...existingDeck, ...updates};
        const putRequest = store.put(updatedDeck);

        putRequest.onsuccess = () => resolve();
        putRequest.onerror = () => reject(putRequest.error);
      };
      getRequest.onerror = () => reject(getRequest.error);
    });
  } catch (error) {
    console.error('Failed to update custom deck:', error);
    throw error;
  }
}

/**
 * Load the active deck ID (still uses LocalStorage for simplicity)
 */
export async function loadActiveDeckId(): Promise<string | null> {
  try {
    return localStorage.getItem(ACTIVE_DECK_KEY);
  } catch (error) {
    console.error('Failed to load active deck ID:', error);
    return null;
  }
}

/**
 * Save the active deck ID (still uses LocalStorage for simplicity)
 */
export async function saveActiveDeckId(deckId: string): Promise<void> {
  try {
    localStorage.setItem(ACTIVE_DECK_KEY, deckId);
  } catch (error) {
    console.error('Failed to save active deck ID:', error);
  }
}

/**
 * Convert an image file to a data URI for storage
 */
export function fileToDataUri(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to read file as data URI'));
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
