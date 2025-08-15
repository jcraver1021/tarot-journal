import {JSX, useEffect, useState} from 'react';
import {JournalEntry} from '../../data/journal';
import {Button, Stack, styled, TextField} from '@mui/material';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function Read() {
  const [files, setFiles] = useState<FileList | null>(null);
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [stack, setStack] = useState<JSX.Element[]>([]);

  useEffect(() => {
    if (files) {
      const promises: Promise<void>[] = [];
      const newEntries: JournalEntry[] = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(
          new Promise<void>((resolve, reject) => {
            const file = files[i];
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = event => {
              const contents = event.target?.result;
              if (typeof contents === 'string') {
                try {
                  const entry: JournalEntry = JSON.parse(contents);
                  newEntries.push(entry);
                } catch (error) {
                  console.error('Failed to parse journal entry:', error);
                  reject(error);
                }
              }
              resolve();
            };
            reader.onerror = error => {
              console.error('FileReader error:', error);
              reject(error);
            };
          })
        );
      }

      Promise.all(promises)
        .then(() => {
          console.log(
            `All files processed, total entries: ${newEntries.length}`
          );
          newEntries.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          );
          setEntries([...newEntries]);
        })
        .catch(error => {
          console.error('Error processing files:', error);
        });
    }
  }, [files]);

  useEffect(() => {
    setStack(
      entries.map((entry, index) => (
        <div key={index} className="journalEntry">
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
        </div>
      ))
    );
  }, [entries]);

  return (
    <div className="journalContainer">
      <Stack>{stack}</Stack>
      <Button component="label" variant="contained" tabIndex={-1}>
        Upload files
        <VisuallyHiddenInput
          type="file"
          onChange={event => {
            setFiles(event.target.files);
          }}
          multiple
        />
      </Button>
    </div>
  );
}

export default Read;
