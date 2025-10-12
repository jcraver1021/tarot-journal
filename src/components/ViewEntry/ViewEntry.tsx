import {Stack, TextField} from '@mui/material';
import {Card} from '../../hooks/cards/cards';
import {JournalEntry} from '../../data/journal';

import './ViewEntry.css';

export type ViewEntryProps = {
  entry: JournalEntry;
};

function describeCard(card: Card): string {
  return `${card.name}${card.isReversed ? ' (R)' : ''}`;
}

function ViewEntry({entry}: ViewEntryProps) {
  return (
    <div>
      <Stack spacing={2} className="viewEntry">
        <TextField
          label="Name"
          variant="outlined"
          value={entry.profileId}
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
        />
        <TextField
          label="Date"
          variant="outlined"
          value={new Date(entry.date).toLocaleString()}
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
        />
        <TextField
          label="Spread"
          variant="outlined"
          value={entry.spread}
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
        />
        <TextField
          label="Cards"
          variant="outlined"
          value={entry.cards.map(describeCard).join(', ')}
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
        />
        <TextField
          label="Journal Entry"
          multiline
          rows={4}
          value={entry.notes}
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
        />
      </Stack>
    </div>
  );
}

export default ViewEntry;
