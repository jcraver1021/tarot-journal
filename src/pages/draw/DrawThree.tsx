import {Stack} from '@mui/material';
import {Card} from '../../hooks/cards/cards';
import Instructions from '../../components/Instructions/Instructions';
import TarotCard, {
  DisplayModes,
  Orientation,
} from '../../components/TarotCard/TarotCard';

import './Draw.css';

export type DrawThreeProps = {
  card1: Card;
  card2: Card;
  card3: Card;
};

function DrawThree({card1, card2, card3}: DrawThreeProps) {
  const instructions = `
Focus on the meaning and order of these cards, and find an appropriate triple for them.
Is it Past Present Future? Morning, Afternoon, Evening? Decision, Pros, Cons?
Whatever your choice is, choose it before looking at the cards.
  `;

  return (
    <div className="drawContainer">
      <Stack>
        <Instructions title="Three Cards" content={instructions.trim()} />
        <Stack direction="row" spacing={2} className="drawCards">
          <div className="drawCard">
            <TarotCard
              displayMode={DisplayModes.DRAW_SINGLE}
              orientation={
                card1.isReversed ? Orientation.REVERSED : Orientation.UPRIGHT
              }
              title={card1.name}
              image={card1.path}
              uprightText={card1.meaningUpright}
              reversedText={card1.meaningReversed}
            />
          </div>
          <div className="drawCard">
            <TarotCard
              displayMode={DisplayModes.DRAW_SINGLE}
              orientation={
                card2.isReversed ? Orientation.REVERSED : Orientation.UPRIGHT
              }
              title={card2.name}
              image={card2.path}
              uprightText={card2.meaningUpright}
              reversedText={card2.meaningReversed}
            />
          </div>
          <div className="drawCard">
            <TarotCard
              displayMode={DisplayModes.DRAW_SINGLE}
              orientation={
                card3.isReversed ? Orientation.REVERSED : Orientation.UPRIGHT
              }
              title={card3.name}
              image={card3.path}
              uprightText={card3.meaningUpright}
              reversedText={card3.meaningReversed}
            />
          </div>
        </Stack>
      </Stack>
    </div>
  );
}

export default DrawThree;
