import {useCallback} from 'react';
import {Typography} from '@mui/material';
import {Card} from '../../hooks/cards/cards';
import TarotCard, {
  DisplayModes,
  Orientation,
} from '../../components/TarotCard/TarotCard';

import './DrawCelticCross.css';

export type DrawCelticCrossProps = {
  cards: Card[];
};

const positionMeanings = [
  {position: 0, label: 'Self', meaning: 'Heart of the matter'},
  {position: 1, label: 'Challenge', meaning: 'What crosses you'},
  {position: 2, label: 'Foundation', meaning: 'What grounds you'},
  {position: 3, label: 'Recent Past', meaning: 'What is passing away'},
  {position: 4, label: 'Crown', meaning: 'Highest aspiration'},
  {position: 5, label: 'Near Future', meaning: 'What approaches'},
  {position: 6, label: 'Your Approach', meaning: 'How you see yourself'},
  {position: 7, label: 'External Forces', meaning: 'Environment & others'},
  {position: 8, label: 'Hopes & Fears', meaning: 'Inner conflicts'},
  {position: 9, label: 'Outcome', meaning: 'Where this leads'},
];

function DrawCelticCross({cards}: DrawCelticCrossProps) {
  if (cards.length !== 10) {
    throw new Error(`Celtic Cross requires 10 cards, got ${cards.length}`);
  }

  const renderCard = useCallback(
    (cardIndex: number) => {
      const card = cards[cardIndex];
      const position = positionMeanings[cardIndex];
      const roleText = `${position.position + 1}. ${position.label}: ${position.meaning}`;

      return (
        <TarotCard
          displayMode={DisplayModes.DRAW_SINGLE}
          orientation={
            card.isReversed ? Orientation.REVERSED : Orientation.UPRIGHT
          }
          title={card.name}
          image={card.path}
          uprightText={card.meaningUpright}
          reversedText={card.meaningReversed}
          roleText={roleText}
        />
      );
    },
    [cards]
  );

  return (
    <div className="celticCrossContainer">
      <Typography variant="h4" className="celticCrossTitle">
        Celtic Cross
      </Typography>
      <Typography variant="body1" className="celticCrossIntro">
        A ten-card spread exploring a situation from all angles. The cross
        reveals context; the staff shows progression.
      </Typography>
      <div className="celticCrossLayout">
        <div className="celticCrossMain">
          {/* Top - Crown */}
          <div className="ccPosition ccTop">{renderCard(4)}</div>

          {/* Middle row - Past, Center Cross, Future */}
          <div className="ccMiddleRow">
            <div className="ccPosition ccLeft">{renderCard(3)}</div>

            <div className="ccCenter">
              <div className="ccCenterSelf">{renderCard(0)}</div>
              <div className="ccCenterChallenge">{renderCard(1)}</div>
            </div>

            <div className="ccPosition ccRight">{renderCard(5)}</div>
          </div>

          {/* Bottom - Foundation */}
          <div className="ccPosition ccBottom">{renderCard(2)}</div>
        </div>

        {/* Right side - The Staff */}
        <div className="celticCrossStaff">
          <div className="ccStaffCard">{renderCard(6)}</div>
          <div className="ccStaffCard">{renderCard(7)}</div>
          <div className="ccStaffCard">{renderCard(8)}</div>
          <div className="ccStaffCard">{renderCard(9)}</div>
        </div>
      </div>
    </div>
  );
}

export default DrawCelticCross;
