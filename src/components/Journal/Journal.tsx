import {Button, Stack, TextField} from '@mui/material';
import './Journal.css';
import {useEffect, useRef, useState} from 'react';
import {
  entryToHref,
  JournalEntry,
  nameJournal,
  Spread,
} from '../../data/journal';
import {Card} from '../../hooks/cards/cards';

export type JournalProps = {
  spread: Spread;
  cards: Card[];
};

function setEmptyIfChange(
  current: boolean,
  setter: React.Dispatch<React.SetStateAction<boolean>>,
  input: string
) {
  if (current && input.trim().length > 0) {
    setter(false);
  } else if (!current && input.trim().length === 0) {
    setter(true);
  }
}

function Journal({spread, cards}: JournalProps) {
  const [nameEmpty, setNameEmpty] = useState(true);
  const [journalEmpty, setJournalEmpty] = useState(true);
  const [canDownload, setCanDownload] = useState(false);

  useEffect(() => {
    setCanDownload(!nameEmpty && !journalEmpty);
  }, [nameEmpty, journalEmpty]);

  const nameRef = useRef<HTMLInputElement>(null);
  const journalRef = useRef<HTMLTextAreaElement>(null);

  const download = () => {
    const date = new Date().toISOString();
    const entry: JournalEntry = {
      spread: spread,
      cards: cards,
      date: date,
      notes: journalRef.current?.value || '',
      profileId: nameRef.current?.value || '',
    };
    const link = document.createElement('a');
    link.href = entryToHref(entry);
    link.download = nameJournal(nameRef.current?.value, date);
    link.click();
    link.remove();
  };

  return (
    <div className="journalContainer">
      <Stack>
        <TextField
          inputRef={nameRef}
          label=" Name"
          variant="outlined"
          onChange={e => {
            setEmptyIfChange(nameEmpty, setNameEmpty, e.target.value);
          }}
        />
        <TextField
          inputRef={journalRef}
          label="Journal Entry"
          multiline
          rows={4}
          onChange={e => {
            setEmptyIfChange(journalEmpty, setJournalEmpty, e.target.value);
          }}
        />
        <Button variant="outlined" disabled={!canDownload} onClick={download}>
          Save
        </Button>
      </Stack>
    </div>
  );
}

export default Journal;
