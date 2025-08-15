import {describe, it, expect} from 'vitest';
import {validateEnumKey} from './enum';

// Example enum for testing
enum Color {
  Red = 'RED',
  Green = 'GREEN',
  Blue = 'BLUE',
}

describe('validateEnumKey', () => {
  it('should not throw for a valid string value', () => {
    expect(() => validateEnumKey(Color, 'RED')).not.toThrow();
    expect(() => validateEnumKey(Color, 'GREEN')).not.toThrow();
    expect(() => validateEnumKey(Color, 'BLUE')).not.toThrow();
  });

  it('should throw for an invalid string value', () => {
    expect(() => validateEnumKey(Color, 'YELLOW')).toThrow(/Invalid enum key/);
    expect(() => validateEnumKey(Color, '')).toThrow(/Invalid enum key/);
  });

  it('should not throw for a valid number value in a numeric enum', () => {
    enum Status {
      Pending,
      Approved,
      Rejected,
    }
    expect(() => validateEnumKey(Status, 0)).not.toThrow();
    expect(() => validateEnumKey(Status, 1)).not.toThrow();
    expect(() => validateEnumKey(Status, 2)).not.toThrow();
  });

  it('should throw for an invalid number value in a numeric enum', () => {
    enum Status {
      Pending,
      Approved,
      Rejected,
    }
    expect(() => validateEnumKey(Status, 3)).toThrow(/Invalid enum key/);
    expect(() => validateEnumKey(Status, -1)).toThrow(/Invalid enum key/);
  });

  it('should throw for a key of the wrong type', () => {
    expect(() => validateEnumKey(Color, 123)).toThrow(/Invalid enum key/);
    expect(() => validateEnumKey(Color, {} as number)).toThrow(
      /Invalid enum key/
    );
  });

  it('should include valid keys in the error message', () => {
    try {
      validateEnumKey(Color, 'YELLOW');
    } catch (e: unknown) {
      if (e instanceof Error) {
        expect(e.message).toContain('RED');
        expect(e.message).toContain('GREEN');
        expect(e.message).toContain('BLUE');
      } else {
        throw new Error('Expected an Error to be thrown');
      }
    }
  });
});
