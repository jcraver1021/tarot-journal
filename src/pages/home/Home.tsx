import {Button, Stack} from '@mui/material';
import Banner from '../../components/Banner/Banner';

import './Home.css';

function Home() {
  return (
    <div className="home">
      <Stack>
        <Banner text="Tarot Journal" level={1} />
        <Stack direction="row" spacing={2}>
          <Stack>
            <Banner text="Draw" level={2} />
            <Button variant="contained" href="/draw/single">
              One Card
            </Button>
            <Button variant="contained" href="/draw/three">
              Three Cards
            </Button>
            <Button variant="contained" href="/draw/celtic-cross">
              Celtic Cross
            </Button>
          </Stack>
          <Stack>
            <Banner text="Review" level={2} />
            <Button variant="contained" href="/read">
              Read your Journal
            </Button>
          </Stack>
          <Stack>
            <Banner text="Explore" level={2} />
            <Button variant="contained" href="/card/0">
              View Cards
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
}

export default Home;
