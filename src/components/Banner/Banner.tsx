import {Card, CardContent, Typography} from '@mui/material';
import './Banner.css';

export type BannerProps = {
  text: string;
};

function Banner(props: BannerProps) {
  const {text} = props;
  return (
    <div className="banner">
      <Card className="bannerCard">
        <CardContent>
          <Typography variant="h1" className="bannerText">
            {text}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Banner;
