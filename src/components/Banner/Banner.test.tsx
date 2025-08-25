import {render, screen} from '@testing-library/react';
import {describe, it, expect} from 'vitest';
import Banner from './Banner';

describe('Banner', () => {
  it('displays the text given as input', () => {
    const bannerText = 'I pooped today!';
    render(<Banner text={bannerText} level={1} />);
    console.log('here begins');
    console.log(screen.getByRole('heading', {level: 1}));
    console.log('here ends');
    expect(screen.getByRole('heading', {level: 1})).toHaveTextContent(
      bannerText
    );
  });

  it('displays the correct heading level', () => {
    const bannerText = 'I pooped today!';
    render(<Banner text={bannerText} level={3} />);
    expect(screen.getByRole('heading', {level: 3})).toBeInTheDocument();
  });
});
