import {Typography, Stack, Button} from '@mui/material';
import Banner from '../../components/Banner/Banner';

import './Disclaimer.css';

function Disclaimer() {
  return (
    <div className="disclaimerContainer">
      <Stack spacing={4} className="disclaimerContent">
        <Banner text="Disclaimer" level={1} />

        <Stack spacing={3} className="disclaimerBody">
          <Typography variant="body1" className="disclaimerIntro">
            This application is designed solely as a reflection tool that uses
            randomness and symbolic imagery to prompt personal contemplation,
            not to provide supernatural guidance, predict the future, or make
            decisions on your behalf.
          </Typography>

          <Typography variant="h6" className="disclaimerSubheading">
            Personal Philosophy
          </Typography>

          <Typography variant="body1">
            The author of this application does not believe that tarot cards
            have any magical powers or supernatural connections. For instance,
            drawing "Death" would not make me think I'm about to die, but it
            would prompt me to think about what is ending, beginning, or
            changing in my life today. Any card I draw would find something in
            my life to connect to, and I welcome that directing of my attention
            even though it may have no ultimate "meaning".
          </Typography>

          <Typography variant="h6" className="disclaimerSubheading">
            Terms of Use
          </Typography>

          <Typography variant="body1" className="disclaimerStrong">
            By using this application, you acknowledge and agree that:
          </Typography>

          <ol className="disclaimerList">
            <li>
              Tarot cards have no supernatural power, magical properties, or
              ability to predict or influence future events.
            </li>
            <li>
              Any perceived connection to supernatural forces is a product of
              your own interpretation, not a feature or claim of this
              application.
            </li>
            <li>
              This tool is intended solely for personal reflection and
              contemplation, not as a basis for making life decisions.
            </li>
            <li>
              The author bears no responsibility for any decisions, actions, or
              beliefs you adopt based on your use of this application.
            </li>
          </ol>

          <Typography variant="body1" className="disclaimerWarning">
            If you do not accept these terms, do not use this application.
          </Typography>
        </Stack>

        <Button variant="outlined" href="/" className="backButton">
          Back to Home
        </Button>
      </Stack>
    </div>
  );
}

export default Disclaimer;
