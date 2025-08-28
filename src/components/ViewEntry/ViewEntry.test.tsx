import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {Spread, type JournalEntry} from '../../data/journal';
import type {Card} from '../../hooks/cards/cards';
import ViewEntry from './ViewEntry';

const mockCards: Card[] = [
  {
    id: 'MAJ00',
    name: 'The Fool',
    category: 'Major Arcana',
    path: '/card/rw/00-TheFool.png',
    meaningUpright: 'New beginnings, spontaneity, free spirit',
    meaningReversed: 'Recklessness, risk-taking, foolishness',
  },
  {
    id: 'MAJ01',
    name: 'The Magician',
    category: 'Major Arcana',
    path: '/card/rw/01-TheMagician.png',
    meaningUpright: 'Manifestation, resourcefulness, power',
    meaningReversed: 'Manipulation, poor planning, untapped talents',
  },
  {
    id: 'MAJ02',
    name: 'The High Priestess',
    category: 'Major Arcana',
    path: '/card/rw/02-TheHighPriestess.png',
    meaningUpright: 'Intuition, mystery, subconscious mind',
    meaningReversed: 'Secrets, disconnected from intuition, withdrawal',
  },
];

const mockEntry: JournalEntry = {
  profileId: 'user123',
  date: '2024-06-10T12:00:00Z',
  spread: Spread.Three,
  cards: mockCards,
  notes: 'It looks like I forgot to shuffle the cards.',
};

describe('ViewEntry', () => {
  it('renders all fields correctly', () => {
    render(<ViewEntry entry={mockEntry} />);

    // Check name
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toHaveValue('user123');

    // Check date
    const dateField = screen.getByLabelText(/Date/i) as HTMLInputElement;
    expect(dateField.value).toContain('2024');

    // Check spread
    const spreadField = screen.getByLabelText(/Spread/i) as HTMLInputElement;
    expect(spreadField.value).toContain(
      `${Spread.Three}: The Fool, The Magician, The High Priestess`
    );

    // Check journal entry
    expect(screen.getByLabelText(/Journal Entry/i)).toHaveValue(
      'It looks like I forgot to shuffle the cards.'
    );
  });

  it('renders all fields correctly when cards reversed', () => {
    render(
      <ViewEntry
        entry={{
          ...mockEntry,
          cards: mockCards.map(card => ({...card, isReversed: true})),
        }}
      />
    );

    // Check name
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toHaveValue('user123');

    // Check date
    const dateField = screen.getByLabelText(/Date/i) as HTMLInputElement;
    expect(dateField.value).toContain('2024');

    // Check spread
    const spreadField = screen.getByLabelText(/Spread/i) as HTMLInputElement;
    expect(spreadField.value).toContain(
      `${Spread.Three}: The Fool (R), The Magician (R), The High Priestess (R)`
    );

    // Check journal entry
    expect(screen.getByLabelText(/Journal Entry/i)).toHaveValue(
      'It looks like I forgot to shuffle the cards.'
    );
  });
});
