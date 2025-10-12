import {render, screen} from '@testing-library/react';
import {describe, it, expect} from 'vitest';
import Instructions from './Instructions';

describe('Instructions', () => {
  it('displays the title and content given as input', () => {
    const instructionsTitle = 'Protip';
    const instructionsContent = 'You can take the ducks in the park home.';
    render(
      <Instructions title={instructionsTitle} content={instructionsContent} />
    );
    expect(screen.getByText(instructionsTitle)).toBeInTheDocument();
    expect(screen.getByText(instructionsContent)).toBeInTheDocument();
  });
});
