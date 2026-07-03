import {Button, Stack} from '@mui/material';
import Banner from '../../components/Banner/Banner';

import './Home.css';

function Home() {
  return (
    <div className="home">
      <Stack spacing={5} className="homeContent">
        <Banner text="Tarot Journal" level={1} />

        <Stack spacing={3} className="homeSection">
          <Banner text="Draw Cards" level={2} />
          <Stack spacing={2} className="buttonGroup">
            <Button variant="outlined" href="/draw/single">
              One Card
            </Button>
            <Button variant="outlined" href="/draw/three">
              Three Cards
            </Button>
            <Button variant="outlined" href="/draw/celtic-cross">
              Celtic Cross
            </Button>
          </Stack>
        </Stack>

        <Stack spacing={3} className="homeSection">
          <Banner text="Review & Explore" level={2} />
          <Stack spacing={2} className="buttonGroup">
            <Button variant="outlined" href="/read">
              Read your Journal
            </Button>
            <Button variant="outlined" href="/card/0">
              View All Cards
            </Button>
            <Button variant="outlined" href="/decks">
              Manage Decks
            </Button>
          </Stack>
        </Stack>

        <Stack spacing={2} className="disclaimerSection">
          <Button variant="text" href="/disclaimer" className="disclaimerLink">
            Disclaimer & Terms of Use
          </Button>
        </Stack>
      </Stack>
    </div>
  );
}

export default Home;
