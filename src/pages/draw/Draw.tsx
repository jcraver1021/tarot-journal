import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {Typography} from '@mui/material';
import {Spread} from '../../data/journal';
import {useGetShuffledCards} from '../../hooks/cards/cards';
import Journal from '../../components/Journal/Journal';
import DrawSingle from './DrawSingle';

import './Draw.css';

const defaultSpread = Spread.Single;

function getSpread(spread: string | undefined): Spread {
  if (spread && spread in Spread) {
    return Spread[spread as keyof typeof Spread];
  }

  return defaultSpread;
}

function Draw() {
  const {spread} = useParams<{spread: string}>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!spread) {
      // If no spread is specified, redirect to the default draw method
      navigate('/draw/single');
    }
  }, [spread, navigate]);

  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const reversalRate = urlParams.get('r');
  const shuffledCards = useGetShuffledCards(
    reversalRate ? parseFloat(reversalRate) : undefined
  );

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

  const getLayout = () => {
    if (shuffledCards.length === 0) {
      return <Typography>Shuffling...</Typography>;
    }

    switch (getSpread(spread)) {
      case Spread.Single:
        return <DrawSingle card={shuffledCards[0]} />;
      default:
        throw new Error(`Unknown spread type: ${spread}`);
    }
  };

  return (
    <div className="drawContainer">
      {getLayout()}
      <Journal spread={getSpread(spread)} cards={[shuffledCards[0]]} />
    </div>
  );
}

export default Draw;
