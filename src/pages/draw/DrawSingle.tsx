import {Grid} from '@mui/material';
import {Card} from '../../hooks/cards/cards';
import TarotCard, {
  DisplayModes,
  Orientation,
} from '../../components/TarotCard/TarotCard';

import './Draw.css';

export type DrawSingleProps = {
  cards: Card[];
};

function DrawSingle({cards}: DrawSingleProps) {
  const card = cards[0];

  return (
    <div className="drawContainer">
      <Grid
        container
        direction="row"
        spacing={0}
        alignItems="center"
        justifyContent="center"
      >
        <div className="drawCard">
          <TarotCard
            displayMode={DisplayModes.DRAW_SINGLE}
            orientation={
              card.isReversed ? Orientation.REVERSED : Orientation.UPRIGHT
            }
            title={card.name}
            image={card.path}
            uprightText={card.meaningUpright}
            reversedText={card.meaningReversed}
          />
        </div>
      </Grid>
    </div>
  );
}

export default DrawSingle;
