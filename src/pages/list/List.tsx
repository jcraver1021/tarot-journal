import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Card, useCards} from '../../hooks/cards/cards';
import './List.css';
import TarotCard, {DisplayModes} from '../../components/TarotCard/TarotCard';
import {Button, Grid, Typography} from '@mui/material';

// Constructs a map from card IDs to their indices in the cards array to allow ID-based access.
function constructMap(cards: Card[]): Record<string, number> {
  const map: Record<string, number> = {};
  cards.forEach((card, index) => {
    map[card.id] = index;
  });
  return map;
}

function List() {
  const {id} = useParams<{id: string}>();
  const cards = useCards();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardMap] = useState<Record<string, number>>(constructMap(cards));
  const totalCards = cards.length;

  useEffect(() => {
    if (id) {
      if (!isNaN(Number(id))) {
        const index = Number(id);
        if (index >= 0 && index < totalCards) {
          setCurrentIndex(index);
        } else {
          history.pushState(null, '', '/card/0');
        }
      } else {
        const index = cardMap[id];
        if (index !== undefined) {
          history.pushState(null, '', `/card/${index}`);
        } else {
          history.pushState(null, '', '/card/0');
        }
      }
    }
  }, [id, cards, cardMap, totalCards]);

  const currentCard = cards[currentIndex];

  return (
    <div className="listContainer">
      <Grid
        container
        direction="row"
        spacing={0}
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h4">
          {currentIndex + 1} / {totalCards}
        </Typography>
        <TarotCard
          displayMode={DisplayModes.DISPLAY}
          title={currentCard.name}
          image={currentCard.path}
          uprightText={currentCard.meaningUpright}
          reversedText={currentCard.meaningReversed}
        />
        <Button
          variant="contained"
          onClick={() => {
            const newIndex = (currentIndex - 1 + totalCards) % totalCards;
            setCurrentIndex(newIndex);
            history.pushState(null, '', `/card/${newIndex}`);
          }}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            const newIndex = (currentIndex + 1) % totalCards;
            setCurrentIndex(newIndex);
            history.pushState(null, '', `/card/${newIndex}`);
          }}
        >
          Next
        </Button>
      </Grid>
    </div>
  );
}

export default List;
