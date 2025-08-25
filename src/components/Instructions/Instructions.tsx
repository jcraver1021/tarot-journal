import {Typography} from '@mui/material';

import './Instructions.css';

export type InstructionsProps = {
  title: string;
  content: string;
};

function Instructions(props: InstructionsProps) {
  const {title, content} = props;
  return (
    <div>
      <Typography className="instructionsTitle" variant="h6">
        {title}
      </Typography>
      <Typography className="instructionsText" variant="body1">
        {content}
      </Typography>
    </div>
  );
}

export default Instructions;
