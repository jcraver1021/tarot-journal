import {Typography} from '@mui/material';

import './Note.css';

export type NoteProps = {
  text: string;
};

function Note(props: NoteProps) {
  const {text} = props;
  return (
    <div className="note">
      <Typography variant="body1">{text}</Typography>
    </div>
  );
}

export default Note;
