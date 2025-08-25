import {useState, useEffect} from 'react';
import {cards as RWCards} from '../../data/cards-rw';

const defaultReversalRate = 0.05;

export interface CardSet {
  id: string;
  name: string;
  cards: Card[];
}

export const CardSets: CardSet[] = [
  {id: 'RW', name: 'Rider-Waite', cards: RWCards},
];

export interface Card {
  id: string;
  name: string;
  category: string;
  path: string;
  meaningUpright: string;
  meaningReversed: string;
  isReversed?: boolean; // Optional property to indicate if the card is reversed
}

export function useCards() {
  const [cards] = useState<Card[]>(CardSets[0].cards);

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
  }, [cards, reversalRate]);

  return shuffledCards;
}
