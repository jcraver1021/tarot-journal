import {render, screen, cleanup} from '@testing-library/react';
import TarotCard from './TarotCard';
import {describe, it, expect, afterEach} from 'vitest';

describe('TarotCard Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders the natural card text and image correctly', () => {
    render(
      <TarotCard
        isReversed={false}
        uprightText="Upright Meaning"
        reversedText="Reversed Meaning"
        image="normal-image.jpg"
      />
    );

    const image = screen.getByTestId('tarot-card-image-upright');
    const nonImage = screen.queryByTestId('tarot-card-image-reversed');
    const text = screen.getByText('Upright Meaning');

    expect(image).toHaveProperty(
      'src',
      expect.stringContaining('normal-image.jpg')
    );
    expect(nonImage).toBeFalsy();
    expect(text).toBeTruthy();
  });

  it('renders the reversed card text and rotates the image', () => {
    render(
      <TarotCard
        isReversed={true}
        uprightText="Upright Meaning"
        reversedText="Reversed Meaning"
        image="reversed-image.jpg"
      />
    );

    const image = screen.getByTestId('tarot-card-image-reversed');
    const nonImage = screen.queryByTestId('tarot-card-image-upright');
    const text = screen.getByText('Reversed Meaning');

    expect(image).toHaveProperty(
      'src',
      expect.stringContaining('reversed-image.jpg')
    );
    expect(nonImage).toBeFalsy();
    expect(text).toBeTruthy();
  });
});
