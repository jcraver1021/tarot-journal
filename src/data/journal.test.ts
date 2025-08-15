import {describe, it, expect} from 'vitest';
import {entryToHref, nameJournal, Spread, JournalEntry} from './journal';

describe('entryToHref', () => {
  const mockEntry: JournalEntry = {
    spread: Spread.Single,
    cards: [
      {
        id: 'MAJ00',
        name: 'The Fool',
        category: 'Major Arcana',
        path: '/card/rw/00-TheFool.png',
        meaningUpright: 'New beginnings, spontaneity, free spirit',
        meaningReversed: 'Recklessness, risk-taking, foolishness',
        isReversed: false,
      },
    ],
    date: '2024-06-10',
    notes: 'Test entry',
    profileId: 'user123',
  };

  it('should return a data URL with JSON content', () => {
    const href = entryToHref(mockEntry);
    expect(href.startsWith('data:application/json;charset=utf-8,')).toBe(true);
    const encoded = href.replace('data:application/json;charset=utf-8,', '');
    const decoded = decodeURIComponent(encoded);
    expect(JSON.parse(decoded)).toEqual(mockEntry);
  });

  it('should pretty-print JSON with 2 spaces indentation', () => {
    const href = entryToHref(mockEntry);
    const encoded = href.replace('data:application/json;charset=utf-8,', '');
    const decoded = decodeURIComponent(encoded);
    expect(decoded).toContain('\n  ');
  });
});

describe('nameJournal', () => {
  it('should use the provided name and date', () => {
    const result = nameJournal('My Journal', '2024-06-10');
    expect(result).toBe('my-journal-2024-06-10.json');
  });

  it('should use the default name if name is undefined', () => {
    const result = nameJournal(undefined, '2024-06-10');
    expect(result).toBe('journal-2024-06-10.json');
  });

  it('should trim and lowercase the name, replacing spaces with hyphens', () => {
    const result = nameJournal('  Tarot Journal  ', '2024-06-10');
    expect(result).toBe('tarot-journal-2024-06-10.json');
  });

  it('should handle names with multiple spaces', () => {
    const result = nameJournal('Tarot    Journal', '2024-06-10');
    expect(result).toBe('tarot-journal-2024-06-10.json');
  });
});
