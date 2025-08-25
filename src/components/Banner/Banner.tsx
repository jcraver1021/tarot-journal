import {Typography} from '@mui/material';

import './Banner.css';

export type BannerProps = {
  text: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
};

function Banner(props: BannerProps) {
  const {text, level} = props;
  return (
    <div>
      <Typography variant={`h${level}`}>{text}</Typography>
    </div>
  );
}

export default Banner;
