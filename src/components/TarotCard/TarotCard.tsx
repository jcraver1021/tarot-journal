import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import './TarotCard.css';

export type TarotCardProps = {
  isReversed?: boolean;
  uprightText?: string;
  reversedText?: string;
  image?: string;
};

// TODO: Get out of the boolean trap, define all of the display options
// This includes show as a drawing, show as an encyclopedia entry, how to show the other text, etc.

export default function TarotCard(props: TarotCardProps) {
  return (
    <div className="tarotCard">
      <Card>
        <CardMedia
          className="tarotCardImage"
          component="img"
          data-testid={
            props.isReversed
              ? 'tarot-card-image-reversed'
              : 'tarot-card-image-upright'
          }
          image={props.image}
          sx={props.isReversed ? {transform: 'rotate(180deg)'} : {}}
        />
        <CardContent>
          <Typography
            className="tarotCardText"
            variant="body2"
            color="text.secondary"
          >
            {props.isReversed ? props.reversedText : props.uprightText}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
