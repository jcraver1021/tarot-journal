import {render, screen} from '@testing-library/react';
import {describe, it, expect} from 'vitest';
import Note from './Note';

describe('Note', () => {
  it('displays the text given as input', () => {
    const noteText = 'You can take the ducks in the park home.';
    render(<Note text={noteText} />);
    expect(screen.getByText(noteText)).toBeInTheDocument();
  });
});
