import {Grid} from '@mui/material';
import {Card} from '../../hooks/cards/cards';
import Instructions from '../../components/Instructions/Instructions';
import TarotCard, {
  DisplayModes,
  Orientation,
} from '../../components/TarotCard/TarotCard';

import './Draw.css';

export type DrawSingleProps = {
  card: Card;
};

function DrawSingle({card}: DrawSingleProps) {
  return (
    <div className="drawContainer">
      <Grid
        container
        direction="row"
        spacing={0}
        alignItems="center"
        justifyContent="center"
      >
        <Instructions
          title="Single Card"
          content="Focus on the meaning of this card. Does it represent today? Or does it represent what you're thinking about most at this moment? Or something else entirely! Write your thoughts in the journal below."
        />
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
