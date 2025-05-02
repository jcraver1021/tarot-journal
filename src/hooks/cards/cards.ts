import {useState, useEffect} from 'react';
import {cards as RWCards} from '../../data/cards-rw';

const defaultReversalRate = 0.05;

export interface Card {
  id: string;
  name: string;
  category: string;
  path: string;
  meaning_upright: string;
  meaning_reversed: string;
  isReversed?: boolean; // Optional property to indicate if the card is reversed
}

export function useCards() {
  const [cards] = useState<Card[]>(RWCards);

  return cards;
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
  }, [cards]);

  return shuffledCards;
}
