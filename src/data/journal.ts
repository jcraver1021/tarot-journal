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

const indentation = 2;

export function entryToHref(entry: JournalEntry) {
  const href = `data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(entry, null, indentation))}`;
  return href;
}

const defaultJournalName = 'journal';

export function nameJournal(name: string | undefined, date: string) {
  if (!name) {
    name = defaultJournalName;
  }
  return `${name.trim().toLowerCase().replace(/\s+/g, '-')}-${date}.json`;
}
