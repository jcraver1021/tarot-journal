import {Grid, Stack} from '@mui/material';
import Instructions from '../../components/Instructions/Instructions';
import TarotCard, {
  DisplayModes,
  Orientation,
} from '../../components/TarotCard/TarotCard';
import {Card} from '../../hooks/cards/cards';

import './Draw.css';

export type DrawCelticCrossProps = {
  cards: Card[];
};

function DrawCelticCross({cards}: DrawCelticCrossProps) {
  if (cards.length !== 10) {
    throw new Error(`Celtic Cross requires 10 cards, got ${cards.length}`);
  }

  const instructions = `
Center: The Self, and the Cover. If aligned, it is a Shield. Otherwise, a Mask. Regardless, the Cover is what you show the world.
Below: The underlying background energy. What is internal to you.
Above: The overarching energy. What is external to you.
Left: The past. What has been. How you got here.
Right: The immediate future. What is coming. The way things are going based on the current trajectory.
One: Your strengths and power. What you will use to push forward, or what will hold you back.
Two: Others involved in the situation. Their influence, support, or opposition.
Three: Need to know. A warning, blessing, or message from a higher power.
Four: The outcome. If you succeed, this is the best possible result. If you fail, this is the conclusion. Hope for the best, prepare for the worst.
`;

  const renderCard = (card: Card) => (
    <TarotCard
      displayMode={DisplayModes.DRAW_HOVER}
      orientation={card.isReversed ? Orientation.REVERSED : Orientation.UPRIGHT}
      title={card.name}
      image={card.path}
      uprightText={card.meaningUpright}
      reversedText={card.meaningReversed}
    />
  );

  return (
    <div className="drawContainer">
      <Stack>
        <Instructions title="Celtic Cross" content={instructions.trim()} />
        <Grid container spacing={2}>
          <Grid size={4} />
          <Grid size={4}>{renderCard(cards[3])}</Grid>
          <Grid size={4} />
          <Grid size={4}>{renderCard(cards[4])}</Grid>
          <Grid size={4}>
            <Stack direction="row">
              {renderCard(cards[0])}
              {renderCard(cards[1])}
            </Stack>
          </Grid>
          <Grid size={4}>{renderCard(cards[5])}</Grid>
          <Grid size={4} />
          <Grid size={4}>{renderCard(cards[2])}</Grid>
          <Grid size={4} />
          <Grid size={3}>{renderCard(cards[6])}</Grid>
          <Grid size={3}>{renderCard(cards[7])}</Grid>
          <Grid size={3}>{renderCard(cards[8])}</Grid>
          <Grid size={3}>{renderCard(cards[9])}</Grid>
        </Grid>
      </Stack>
    </div>
  );
}

export default DrawCelticCross;
