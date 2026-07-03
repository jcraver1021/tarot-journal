import {useState, useEffect} from 'react';
import {cards as RWCards} from '../../data/cards-rw';
import {loadCustomDecks, saveActiveDeckId, loadActiveDeckId} from './storage';

export interface Card {
  id: string;
  name: string;
  category: string;
  path: string;
  meaningUpright: string;
  meaningReversed: string;
  isReversed?: boolean;
}

export interface CardSet {
  id: string;
  name: string;
  source: 'builtin' | 'custom';
  cards: Card[];
}

// Built-in decks (verified public domain only)
const BUILTIN_DECKS: CardSet[] = [
  {
    id: 'builtin-rw',
    name: 'Rider-Waite',
    source: 'builtin',
    cards: RWCards,
  },
];

/**
 * Hook to get all available decks (built-in + custom)
 */
export function useDecks(): CardSet[] {
  const [customDecks, setCustomDecks] = useState<CardSet[]>([]);

  useEffect(() => {
    loadCustomDecks().then(decks => {
      setCustomDecks(decks);
    });
  }, []);

  return [...BUILTIN_DECKS, ...customDecks];
}

/**
 * Hook to get and set the active deck
 */
export function useActiveDeck(): {
  activeDeck: CardSet | null;
  setActiveDeckById: (id: string) => void;
  allDecks: CardSet[];
} {
  const allDecks = useDecks();
  const [activeDeckId, setActiveDeckId] = useState<string | null>(null);

  // Load saved active deck ID on mount
  useEffect(() => {
    loadActiveDeckId().then(id => {
      if (id) {
        setActiveDeckId(id);
      } else if (allDecks.length > 0) {
        // Default to first deck if none saved
        setActiveDeckId(allDecks[0].id);
      }
    });
  }, [allDecks]);

  const activeDeck =
    allDecks.find(deck => deck.id === activeDeckId) || allDecks[0] || null;

  const setActiveDeckById = (id: string) => {
    setActiveDeckId(id);
    saveActiveDeckId(id);
  };

  return {activeDeck, setActiveDeckById, allDecks};
}

/**
 * Hook to get cards from the active deck
 * This replaces the old useCards() hook
 */
export function useActiveCards(): Card[] {
  const {activeDeck} = useActiveDeck();
  return activeDeck?.cards || [];
}
