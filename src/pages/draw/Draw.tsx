import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {Typography} from '@mui/material';
import {useGetShuffledCards} from '../../hooks/cards/cards';
import DrawSingle from './DrawSingle';

import './Draw.css';

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

    switch (spread) {
      case 'single':
        return <DrawSingle cards={shuffledCards} />;
      default:
        return <DrawSingle cards={shuffledCards} />;
    }
  };

  return <div className="drawContainer">{getLayout()}</div>;
}

export default Draw;
