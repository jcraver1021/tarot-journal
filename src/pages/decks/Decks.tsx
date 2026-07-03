import {useState, useEffect} from 'react';
import {
  Button,
  Stack,
  Typography,
  Card,
  CardContent,
  Dialog,
} from '@mui/material';
import {useActiveDeck, CardSet} from '../../hooks/decks/decks';
import {deleteCustomDeck, loadCustomDecks} from '../../hooks/decks/storage';
import {cards as RWCards} from '../../data/cards-rw';
import UploadDeck from '../../components/UploadDeck/UploadDeck';

import './Decks.css';

const BUILTIN_DECKS: CardSet[] = [
  {
    id: 'builtin-rw',
    name: 'Rider-Waite',
    source: 'builtin',
    cards: RWCards,
  },
];

function Decks() {
  const {activeDeck, setActiveDeckById} = useActiveDeck();
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [customDecks, setCustomDecks] = useState<CardSet[]>([]);
  const [localActiveDeckId, setLocalActiveDeckId] = useState<string | null>(
    activeDeck?.id || null
  );

  const allDecks = [...BUILTIN_DECKS, ...customDecks];

  // Load custom decks
  useEffect(() => {
    loadCustomDecks().then(setCustomDecks);
  }, []);

  // Sync local active deck with hook
  useEffect(() => {
    setLocalActiveDeckId(activeDeck?.id || null);
  }, [activeDeck]);

  const handleSelectDeck = (deckId: string) => {
    setActiveDeckById(deckId);
    setLocalActiveDeckId(deckId);
  };

  const refreshDecks = async () => {
    const decks = await loadCustomDecks();
    setCustomDecks(decks);
  };

  const handleDeleteDeck = async (deckId: string) => {
    await deleteCustomDeck(deckId);
    setDeleteConfirm(null);
    // If we deleted the active deck, switch to the first available
    if (activeDeck?.id === deckId && allDecks.length > 0) {
      setActiveDeckById(allDecks[0].id);
    }
    await refreshDecks();
  };

  const handleUploadComplete = async () => {
    await refreshDecks();
  };

  return (
    <div className="decksContainer">
      <Stack spacing={4}>
        <div className="decksHeader">
          <Typography variant="h4" className="decksTitle">
            Manage Decks
          </Typography>
          <Typography variant="body1" className="decksIntro">
            Select a deck to use for readings, or upload your own custom deck.
          </Typography>
          <Typography variant="body2" className="decksDisclaimer">
            Custom decks are stored locally in your browser and never uploaded
            to any server. You are responsible for ensuring you have the right
            to use any images you upload.
          </Typography>
        </div>

        <Stack spacing={3}>
          {allDecks.map(deck => (
            <Card
              key={deck.id}
              className={`deckCard ${localActiveDeckId === deck.id ? 'active' : ''}`}
            >
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center">
                  <div className="deckInfo">
                    <Typography variant="h6">{deck.name}</Typography>
                    <Typography variant="body2" className="deckMeta">
                      {deck.source === 'builtin' ? 'Built-in' : 'Custom'} •{' '}
                      {deck.cards.length} cards
                    </Typography>
                  </div>
                  <div className="deckActions">
                    {localActiveDeckId === deck.id ? (
                      <Typography variant="body2" className="activeBadge">
                        Active
                      </Typography>
                    ) : (
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleSelectDeck(deck.id)}
                      >
                        Select
                      </Button>
                    )}
                    {deck.source === 'custom' && (
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        onClick={() => setDeleteConfirm(deck.id)}
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>

        <Button
          variant="contained"
          onClick={() => setUploadDialogOpen(true)}
          className="uploadButton"
        >
          Upload Custom Deck
        </Button>

        <Button variant="outlined" href="/" className="backButton">
          Back to Home
        </Button>
      </Stack>

      {/* Upload dialog */}
      <Dialog
        open={uploadDialogOpen}
        onClose={() => setUploadDialogOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          className: 'uploadDialogPaper',
        }}
      >
        <UploadDeck
          onClose={() => setUploadDialogOpen(false)}
          onUploadComplete={handleUploadComplete}
        />
      </Dialog>

      {/* Delete confirmation dialog */}
      <Dialog
        open={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        PaperProps={{
          className: 'deleteConfirmPaper',
        }}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Delete Custom Deck?
          </Typography>
          <Typography variant="body2" gutterBottom>
            This will permanently remove this deck from your browser. This
            action cannot be undone.
          </Typography>
          <Stack direction="row" spacing={2} style={{marginTop: '16px'}}>
            <Button variant="outlined" onClick={() => setDeleteConfirm(null)}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => deleteConfirm && handleDeleteDeck(deleteConfirm)}
            >
              Delete
            </Button>
          </Stack>
        </CardContent>
      </Dialog>
    </div>
  );
}

export default Decks;
