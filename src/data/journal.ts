import {Card} from '../hooks/cards/cards';

export enum Spread {
  Single = 'single',
}

export type JournalEntry = {
  spread: Spread;
  cards: Card[];
  date: string;
  notes: string;
  profileId: string;
};
