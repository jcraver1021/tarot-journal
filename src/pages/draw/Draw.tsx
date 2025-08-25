import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {Typography} from '@mui/material';
import {getSpread, Spread} from '../../data/journal';
import {useGetShuffledCards} from '../../hooks/cards/cards';
import Journal from '../../components/Journal/Journal';
import DrawSingle from './DrawSingle';

import './Draw.css';

const defaultSpread = Spread.Single;

function Draw() {
  const {spread} = useParams<{spread: string}>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!spread) {
      // If no spread is specified, redirect to the default draw method
      navigate(`/draw/${defaultSpread}`);
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
    if (!spread || shuffledCards.length === 0) {
      return <Typography>Shuffling...</Typography>;
    }

    switch (getSpread(spread)) {
      case Spread.Single:
        return <DrawSingle card={shuffledCards[0]} />;
      default:
        throw new Error(
          `Unknown spread type: ${spread}, resolved to ${getSpread(spread)}`
        );
    }
  };

  const getJournal = () => {
    if (spread && shuffledCards.length > 0) {
      let cards = [];
      const spreadType = getSpread(spread);
      switch (spreadType) {
        case Spread.Single:
          cards = [shuffledCards[0]];
          break;
        default:
          throw new Error(
            `Unknown spread type: ${spread}, resolved to ${spreadType}`
          );
      }

      return <Journal spread={spreadType} cards={cards} />;
    }
    return null;
  };

  return (
    <div className="drawContainer">
      {getLayout()}
      {getJournal()}
    </div>
  );
}

export default Draw;
