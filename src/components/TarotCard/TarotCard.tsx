import {Card, CardContent, CardMedia, Tooltip, Typography} from '@mui/material';
import {validateEnumKey} from '../../common/enum';

import './TarotCard.css';

export const DisplayModes = Object.freeze({
  DISPLAY: 1,
  DRAW_SINGLE: 2,
  DRAW_HOVER: 3,
});

export const Orientation = Object.freeze({
  UPRIGHT: 1,
  REVERSED: 2,
});

export type TarotCardProps = {
  displayMode: number;
  orientation?: number;
  title?: string;
  image?: string;
  uprightText?: string;
  reversedText?: string;
};

export default function TarotCard({
  displayMode,
  orientation,
  title,
  image,
  uprightText,
  reversedText,
}: TarotCardProps) {
  if (!orientation) {
    orientation = Orientation.UPRIGHT;
  }
  validateEnumKey(DisplayModes, displayMode);
  validateEnumKey(Orientation, orientation);

  switch (displayMode) {
    case DisplayModes.DISPLAY:
      return (
        <div className="tarotCard">
          <Card>
            <CardContent className="tarotCardContent">
              <Typography
                variant="h5"
                component="div"
                data-testid="tarot-card-title"
              >
                {title}
              </Typography>
            </CardContent>
            <CardMedia
              className="tarotCardMedia"
              component="img"
              data-testid="tarot-card-image"
              image={image}
            />
            <CardContent className="tarotCardMeaning">
              <Typography variant="body2" color="text.secondary">
                {`Upright: ${uprightText}`}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {`Reversed: ${reversedText}`}
              </Typography>
            </CardContent>
          </Card>
        </div>
      );
    case DisplayModes.DRAW_SINGLE:
      return (
        <div className="tarotCard">
          <Card>
            <CardMedia
              className="tarotCardMedia"
              component="img"
              data-testid={
                orientation === Orientation.REVERSED
                  ? 'tarot-card-image-reversed'
                  : 'tarot-card-image-upright'
              }
              image={image}
              sx={
                orientation === Orientation.REVERSED
                  ? {transform: 'rotate(180deg)'}
                  : {}
              }
            />
            <CardContent className="tarotCardContent">
              <Typography variant="body2" color="text.secondary">
                {orientation === Orientation.REVERSED
                  ? reversedText
                  : uprightText}
              </Typography>
            </CardContent>
          </Card>
        </div>
      );
    case DisplayModes.DRAW_HOVER:
      return (
        <div className="tarotCard">
          <Tooltip
            title={
              orientation === Orientation.REVERSED ? reversedText : uprightText
            }
          >
            <Card>
              <CardMedia
                className="tarotCardMedia"
                component="img"
                data-testid={
                  orientation === Orientation.REVERSED
                    ? 'tarot-card-image-reversed'
                    : 'tarot-card-image-upright'
                }
                image={image}
                sx={
                  orientation === Orientation.REVERSED
                    ? {transform: 'rotate(180deg)'}
                    : {}
                }
              />
            </Card>
          </Tooltip>
        </div>
      );
    default:
      throw new Error('I have no idea how the fuck you got here');
  }
}
