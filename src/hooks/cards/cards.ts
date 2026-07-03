import {useState, useEffect} from 'react';
import {useActiveDeck, Card, CardSet} from '../decks/decks';

const defaultReversalRate = 0.05;

// Re-export types for backward compatibility
export type {Card, CardSet};

/**
 * Get cards from the currently active deck
 * Works with both built-in and custom uploaded decks
 */
export function useCards() {
  const {activeDeck} = useActiveDeck();
  return activeDeck?.cards || [];
}

export function useGetShuffledCards(
  reversalRate: number = defaultReversalRate
) {
  if (reversalRate < 0 || reversalRate > 1) {
    throw new Error('Reversal Rate must be between 0 and 1');
  }
  const cards = useCards();
  const [shuffledCards, setShuffledCards] = useState<Card[]>([]);

  useEffect(() => {
    if (cards.length > 0) {
      const shuffled = cards
        .map(card => ({
          ...card,
          isReversed: Math.random() < reversalRate, // Randomly assign reversed state
        }))
        .sort(() => Math.random() - 0.5); // Yes, a Fisher-Yates shuffle would be faster, but this is simpler for now
      setShuffledCards(shuffled);
    }
  }, [cards, reversalRate]);

  return shuffledCards;
}
