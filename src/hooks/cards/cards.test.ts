import {renderHook} from '@testing-library/react';
import {useGetShuffledCards} from './cards';
import {describe, expect, it} from 'vitest';

describe('useCardShuffle', () => {
  it('should throw an error for invalid reversal rate', () => {
    expect(() => renderHook(() => useGetShuffledCards(-0.1))).toThrow(
      'Reversal Rate must be between 0 and 1'
    );
    expect(() => renderHook(() => useGetShuffledCards(1.1))).toThrow(
      'Reversal Rate must be between 0 and 1'
    );
  });
});
