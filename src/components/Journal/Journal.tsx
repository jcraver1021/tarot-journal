import {Button, Stack, TextField} from '@mui/material';
import './Journal.css';
import {useEffect, useRef, useState} from 'react';
import {JournalEntry, Spread} from '../../data/journal';
import {Card} from '../../hooks/cards/cards';

export type JournalProps = {
  spread: Spread;
  cards: Card[];
};

const indentation = 4;
const defaultJournalName = 'journal';

function nameJournal(name: string) {
  return name.trim().toLowerCase().replace(/\s+/g, '-');
}

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
    const entry: JournalEntry = {
      spread: spread,
      cards: cards,
      date: new Date().toISOString(),
      notes: journalRef.current?.value || '',
      profileId: nameRef.current?.value || '',
    };
    // TODO: Downloader should first check for existing entries using the same filename and, if found, append this entry.
    // If the file is not found, this is a new entry (and should be stored as a list of entries).
    // If the file does not parse successfully, the downloader should show an error message.
    const link = document.createElement('a');
    link.href =
      'data:application/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(entry, null, indentation));
    link.download = `${nameJournal(nameRef.current?.value || defaultJournalName)}.json`;
    link.click();
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
