import {render, screen, cleanup, waitFor} from '@testing-library/react';
import {userEvent} from '@testing-library/user-event';
import TarotCard, {DisplayModes, Orientation} from './TarotCard';
import {describe, it, expect, afterEach} from 'vitest';

describe('TarotCard Component', () => {
  afterEach(() => {
    cleanup();
  });

  describe('Card Display', () => {
    describe('Single Card Display', () => {
      it('renders the card fully', () => {
        render(
          <TarotCard
            displayMode={DisplayModes.DISPLAY}
            title="The Pineapple"
            image="pineapple.jpg"
            uprightText="Delicious"
            reversedText="Doesn't fit"
          />
        );

        const title = screen.getByTestId('tarot-card-title');
        const image = screen.getByTestId('tarot-card-image');
        const uprightText = screen.getByText('Upright: Delicious');
        const reversedText = screen.getByText("Reversed: Doesn't fit");
        expect(title.textContent).toMatch('The Pineapple');
        expect(image).toHaveProperty(
          'src',
          expect.stringContaining('pineapple.jpg')
        );
        expect(uprightText).toBeTruthy();
        expect(reversedText).toBeTruthy();
      });

      it('renders the card the same with upright orientation', () => {
        render(
          <TarotCard
            displayMode={DisplayModes.DISPLAY}
            orientation={Orientation.UPRIGHT}
            title="The Pineapple"
            image="pineapple.jpg"
            uprightText="Delicious"
            reversedText="Doesn't fit"
          />
        );

        const title = screen.getByTestId('tarot-card-title');
        const image = screen.getByTestId('tarot-card-image');
        const uprightText = screen.getByText('Upright: Delicious');
        const reversedText = screen.getByText("Reversed: Doesn't fit");
        expect(title.textContent).toMatch('The Pineapple');
        expect(image).toHaveProperty(
          'src',
          expect.stringContaining('pineapple.jpg')
        );
        expect(uprightText).toBeTruthy();
        expect(reversedText).toBeTruthy();
      });

      it('renders the card the same with reversed orientation', () => {
        render(
          <TarotCard
            displayMode={DisplayModes.DISPLAY}
            orientation={Orientation.REVERSED}
            title="The Pineapple"
            image="pineapple.jpg"
            uprightText="Delicious"
            reversedText="Doesn't fit"
          />
        );

        const title = screen.getByTestId('tarot-card-title');
        const image = screen.getByTestId('tarot-card-image');
        const uprightText = screen.getByText('Upright: Delicious');
        const reversedText = screen.getByText("Reversed: Doesn't fit");
        expect(title.textContent).toMatch('The Pineapple');
        expect(image).toHaveProperty(
          'src',
          expect.stringContaining('pineapple.jpg')
        );
        expect(uprightText).toBeTruthy();
        expect(reversedText).toBeTruthy();
      });
    });

    describe('Single Card Drawing', () => {
      it('renders the card with upright orientation', () => {
        render(
          <TarotCard
            displayMode={DisplayModes.DRAW_SINGLE}
            orientation={Orientation.UPRIGHT}
            title="The Arrow"
            image="arrow.jpg"
            uprightText="Up"
            reversedText="Down"
          />
        );

        const uprightImage = screen.getByTestId('tarot-card-image-upright');
        const reversedImage = screen.queryByTestId('tarot-card-image-reversed');
        const uprightText = screen.getByText('Up');
        const reversedText = screen.queryByText('Down');
        const roleText = screen.queryByText('Your Doom');

        expect(uprightImage).toHaveProperty(
          'src',
          expect.stringContaining('arrow.jpg')
        );
        expect(reversedImage).toBeFalsy();
        expect(uprightText).toBeTruthy();
        expect(reversedText).toBeFalsy();
        expect(roleText).toBeFalsy();
      });

      it('renders the card with reversed orientation', () => {
        render(
          <TarotCard
            displayMode={DisplayModes.DRAW_SINGLE}
            orientation={Orientation.REVERSED}
            title="The Arrow"
            image="arrow.jpg"
            uprightText="Up"
            reversedText="Down"
          />
        );

        const uprightImage = screen.queryByTestId('tarot-card-image-upright');
        const reversedImage = screen.getByTestId('tarot-card-image-reversed');
        const uprightText = screen.queryByText('Up');
        const reversedText = screen.getByText('Down');
        const roleText = screen.queryByText('Your Doom');

        expect(uprightImage).toBeFalsy();
        expect(reversedImage).toHaveProperty(
          'src',
          expect.stringContaining('arrow.jpg')
        );
        expect(uprightText).toBeFalsy();
        expect(reversedText).toBeTruthy();
        expect(roleText).toBeFalsy();
      });

      it('renders the card with role text', () => {
        render(
          <TarotCard
            displayMode={DisplayModes.DRAW_SINGLE}
            orientation={Orientation.UPRIGHT}
            title="The Arrow"
            image="arrow.jpg"
            uprightText="Up"
            reversedText="Down"
            roleText="Your Doom"
          />
        );

        const uprightImage = screen.getByTestId('tarot-card-image-upright');
        const reversedImage = screen.queryByTestId('tarot-card-image-reversed');
        const uprightText = screen.getByText('Up');
        const reversedText = screen.queryByText('Down');
        const roleText = screen.getByText('Your Doom');

        expect(uprightImage).toHaveProperty(
          'src',
          expect.stringContaining('arrow.jpg')
        );
        expect(reversedImage).toBeFalsy();
        expect(uprightText).toBeTruthy();
        expect(reversedText).toBeFalsy();
        expect(roleText).toBeTruthy();
      });
    });

    describe('Single Card with Hover', () => {
      it('renders the card with upright orientation', async () => {
        render(
          <TarotCard
            displayMode={DisplayModes.DRAW_HOVER}
            orientation={Orientation.UPRIGHT}
            title="The Arrow"
            image="arrow.jpg"
            uprightText="Up"
            reversedText="Down"
          />
        );

        const uprightImage = screen.getByTestId('tarot-card-image-upright');
        const reversedImage = screen.queryByTestId('tarot-card-image-reversed');
        const roleText = screen.queryByText('Your Doom');

        expect(uprightImage).toHaveProperty(
          'src',
          expect.stringContaining('arrow.jpg')
        );
        expect(reversedImage).toBeFalsy();
        expect(roleText).toBeFalsy();

        await userEvent.hover(uprightImage);
        await waitFor(() => {
          expect(screen.getByRole('tooltip')).toBeVisible();
        });
      });

      it('renders the card with reversed orientation', async () => {
        render(
          <TarotCard
            displayMode={DisplayModes.DRAW_HOVER}
            orientation={Orientation.REVERSED}
            title="The Arrow"
            image="arrow.jpg"
            uprightText="Up"
            reversedText="Down"
          />
        );

        const uprightImage = screen.queryByTestId('tarot-card-image-upright');
        const reversedImage = screen.getByTestId('tarot-card-image-reversed');
        const roleText = screen.queryByText('Your Doom');

        expect(uprightImage).toBeFalsy();
        expect(reversedImage).toHaveProperty(
          'src',
          expect.stringContaining('arrow.jpg')
        );
        expect(roleText).toBeFalsy();

        await userEvent.hover(reversedImage);
        await waitFor(() => {
          expect(screen.getByRole('tooltip')).toBeVisible();
        });
      });

      it('renders the card with role text', async () => {
        render(
          <TarotCard
            displayMode={DisplayModes.DRAW_HOVER}
            orientation={Orientation.REVERSED}
            title="The Arrow"
            image="arrow.jpg"
            uprightText="Up"
            reversedText="Down"
            roleText="Your Doom"
          />
        );

        const uprightImage = screen.queryByTestId('tarot-card-image-upright');
        const reversedImage = screen.getByTestId('tarot-card-image-reversed');
        const roleText = screen.getByText('Your Doom');

        expect(uprightImage).toBeFalsy();
        expect(reversedImage).toHaveProperty(
          'src',
          expect.stringContaining('arrow.jpg')
        );
        expect(roleText).toBeTruthy();

        await userEvent.hover(reversedImage);
        await waitFor(() => {
          expect(screen.getByRole('tooltip')).toBeVisible();
        });
      });
    });
  });
});
