import {render, screen, fireEvent} from '@testing-library/react';
import Journal from './Journal';
import {describe, it, expect} from 'vitest';
import '@testing-library/jest-dom';

const mockSpread = {name: 'Test Spread'} as any;
const mockCards = [{id: 1, name: 'Card 1'}] as any[];

describe('Journal', () => {
  it('renders input fields and save button', () => {
    render(<Journal spread={mockSpread} cards={mockCards} />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/journal entry/i)).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /save/i})).toBeInTheDocument();
  });

  it('save button is disabled when fields are empty', () => {
    render(<Journal spread={mockSpread} cards={mockCards} />);
    const button = screen.getByRole('button', {name: /save/i});
    expect((button as HTMLButtonElement).disabled).toBe(true);
  });

  it('save button is enabled when both fields have values', () => {
    render(<Journal spread={mockSpread} cards={mockCards} />);
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: {value: 'My Name'},
    });
    fireEvent.change(screen.getByLabelText(/journal entry/i), {
      target: {value: 'Some notes'},
    });
    expect(
      (screen.getByRole('button', {name: /save/i}) as HTMLButtonElement)
        .disabled
    ).toBe(false);
  });

  it('save button is disabled if only one field has value', () => {
    render(<Journal spread={mockSpread} cards={mockCards} />);
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: {value: 'My Name'},
    });
    expect(
      (screen.getByRole('button', {name: /save/i}) as HTMLButtonElement)
        .disabled
    ).toBe(true);

    fireEvent.change(screen.getByLabelText(/name/i), {target: {value: ''}});
    fireEvent.change(screen.getByLabelText(/journal entry/i), {
      target: {value: 'Some notes'},
    });
    expect(
      (screen.getByRole('button', {name: /save/i}) as HTMLButtonElement)
        .disabled
    ).toBe(true);
  });
});
