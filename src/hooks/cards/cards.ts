import {useState, useEffect, createContext, useContext} from 'react';
import {cards as DMCards} from '../../data/cards-dm';
import {cards as FPCards} from '../../data/cards-fp';
import {cards as RWCards} from '../../data/cards-rw';
import {cards as KYCards} from '../../data/cards-ky';

const defaultReversalRate = 0.05;

export interface CardSet {
  id: string;
  name: string;
  cards: Card[];
}

export const CardSets: CardSet[] = [
  {id: 'RW', name: 'Rider-Waite', cards: RWCards},
  {id: 'DM', name: 'Deck of Many', cards: DMCards},
  {id: 'FP', name: 'Fyodor Pavlov', cards: FPCards},
  {id: 'KY', name: 'The King in Yellow', cards: KYCards},
];

export const CardSetContext = createContext<CardSet>(CardSets[0]);

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
  const CardSet = useContext(CardSetContext);
  const [cards] = useState<Card[]>(CardSet.cards);

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
