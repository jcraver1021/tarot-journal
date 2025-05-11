// page reqs:
// button left and right
// scroll wheel to go through the list
// show card i based on state

import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Card, useCards} from '../../hooks/cards/cards';
import {Button} from '@mui/material';
import './List.css';

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
    <div className="list-container">
      <div className="card-display">
        {currentCard ? (
          <div className="card">
            <h2>{currentCard.name}</h2>
            <h3>{currentCard.category}</h3>
            <h3>
              {currentIndex + 1}/{totalCards}
            </h3>
            <img src={currentCard.path} alt={currentCard.name} />
            <p>{currentCard.meaningUpright}</p>
            <p>{currentCard.meaningReversed}</p>
          </div>
        ) : (
          <p>No card found</p>
        )}
      </div>
      <div className="navigation-buttons">
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
      </div>
    </div>
  );
}

export default List;
