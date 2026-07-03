import {useState} from 'react';
import {Typography, Button, Stack, Alert} from '@mui/material';
import {addCustomDeck, fileToDataUri} from '../../hooks/decks/storage';
import {Card} from '../../hooks/decks/decks';
import {cards as RWCards} from '../../data/cards-rw';

import './UploadDeck.css';

export type UploadDeckProps = {
  onClose: () => void;
  onUploadComplete?: () => void;
};

interface Manifest {
  name: string;
  cards: Record<string, string>; // Card ID → filename
}

function UploadDeck({onClose, onUploadComplete}: UploadDeckProps) {
  const [manifest, setManifest] = useState<Manifest | null>(null);
  const [filesMap, setFilesMap] = useState<Map<string, File>>(new Map());
  const [error, setError] = useState<string>('');
  const [uploading, setUploading] = useState(false);

  const handleFolderChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files) return;

    const fileArray = Array.from(files);

    // Find manifest.json
    const manifestFile = fileArray.find(
      f => f.name.toLowerCase() === 'manifest.json'
    );
    if (!manifestFile) {
      setError(
        'No manifest.json found in folder. Please include a manifest file.'
      );
      return;
    }

    try {
      const manifestText = await manifestFile.text();
      const parsedManifest: Manifest = JSON.parse(manifestText);

      // Validate manifest
      if (!parsedManifest.name || !parsedManifest.cards) {
        setError('Invalid manifest format. Must include "name" and "cards".');
        return;
      }

      setManifest(parsedManifest);

      // Build file map
      const newFilesMap = new Map<string, File>();
      for (const file of fileArray) {
        if (file.type.startsWith('image/')) {
          newFilesMap.set(file.name, file);
        }
      }
      setFilesMap(newFilesMap);
      setError('');
    } catch (err) {
      setError(
        'Failed to parse manifest.json: ' +
          (err instanceof Error ? err.message : 'Unknown error')
      );
    }
  };

  const handleUpload = async () => {
    if (!manifest) {
      setError('No manifest loaded');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const cards: Card[] = await Promise.all(
        RWCards.map(async templateCard => {
          const filename = manifest.cards[templateCard.id];
          if (!filename) {
            throw new Error(
              `Missing mapping for card: ${templateCard.name} (${templateCard.id})`
            );
          }

          const file = filesMap.get(filename);
          if (!file) {
            throw new Error(`File not found: ${filename}`);
          }

          const dataUri = await fileToDataUri(file);

          return {
            ...templateCard,
            path: dataUri,
          };
        })
      );

      const deckId = `custom-${Date.now()}`;
      await addCustomDeck({
        id: deckId,
        name: manifest.name,
        source: 'custom',
        cards,
      });

      onClose();
      if (onUploadComplete) {
        onUploadComplete();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload deck');
      setUploading(false);
    }
  };

  const matchedCards = manifest
    ? Object.keys(manifest.cards).filter(cardId =>
        filesMap.has(manifest.cards[cardId])
      ).length
    : 0;

  return (
    <Stack spacing={3} padding={3} className="uploadDeckDialog">
      <Typography variant="h5" className="uploadTitle">
        Upload Custom Deck
      </Typography>

      <Alert severity="warning">
        <strong>Copyright Notice:</strong> Only upload images you own or have
        permission to use. You are responsible for ensuring you have the rights
        to these images.
      </Alert>

      <Typography variant="body2" className="uploadInstructions">
        Select a folder containing your 78 tarot card images and a
        <strong> manifest.json</strong> file that maps card IDs to filenames.
        The deck name will be taken from the manifest.
      </Typography>

      <Alert severity="info">
        <Typography variant="body2" fontWeight="bold">
          Manifest format:
        </Typography>
        <pre style={{fontSize: '12px', margin: '8px 0'}}>
          {`{
  "name": "My Deck",
  "cards": {
    "MAJ00": "TheFool.jpg",
    "MINC01": "AceOfCups.png",
    ...
  }
}`}
        </pre>
      </Alert>

      {manifest && (
        <Typography variant="body2" className="deckNameDisplay">
          Deck: <strong>{manifest.name}</strong>
        </Typography>
      )}

      <Button variant="outlined" component="label" fullWidth>
        Select Folder with Manifest
        <input
          type="file"
          /* @ts-expect-error - webkitdirectory is a non-standard attribute used for folder selection */
          webkitdirectory=""
          directory=""
          multiple
          hidden
          onChange={handleFolderChange}
        />
      </Button>

      {manifest && (
        <Typography variant="body2" className="fileCount">
          {matchedCards} / 78 cards matched
          {matchedCards === 78 ? ' ✓' : ''}
        </Typography>
      )}

      {error && <Alert severity="error">{error}</Alert>}

      <Stack direction="row" spacing={2}>
        <Button
          variant="outlined"
          onClick={onClose}
          fullWidth
          disabled={uploading}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleUpload}
          fullWidth
          disabled={uploading || matchedCards !== 78}
        >
          {uploading ? 'Uploading...' : 'Upload Deck'}
        </Button>
      </Stack>
    </Stack>
  );
}

export default UploadDeck;
