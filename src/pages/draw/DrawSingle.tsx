import {useLocation} from 'react-router-dom';
import TarotCard from '../../components/TarotCard/TarotCard';
import {Card, useGetShuffledCards} from '../../hooks/cards/cards';
import {useEffect, useState} from 'react';
import {Typography} from '@mui/material';
import './Draw.css';

function DrawSingle() {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const reversalRate = urlParams.get('r');
  const shuffledCards = useGetShuffledCards(
    reversalRate ? parseFloat(reversalRate) : undefined
  );
  const [card, setCard] = useState<Card | null>(null);

  useEffect(() => {
    if (reversalRate) {
      const parsedReversalRate = parseFloat(reversalRate);
      if (
        isNaN(parsedReversalRate) ||
        parsedReversalRate < 0 ||
        parsedReversalRate > 1
      ) {
        console.error(
          'Invalid reversal rate. It must be a number between 0 and 1.'
        );
      }
    }
  }, [reversalRate, location]);

  useEffect(() => {
    if (shuffledCards.length > 0) {
      setCard(shuffledCards[0]);
    }
  }, [shuffledCards]);

  return (
    <div className="draw-container">
      {card ? (
        <TarotCard
          image={card?.path}
          uprightText={card?.meaningUpright}
          reversedText={card?.meaningReversed}
          isReversed={card?.isReversed}
        />
      ) : (
        <Typography variant="h6" color="text.secondary">
          Shuffling...
        </Typography>
      )}
    </div>
  );
}

export default DrawSingle;
