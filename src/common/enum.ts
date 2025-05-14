// This file contains utility functions for working with enums in TypeScript.
export function validateEnumKey(enumObj: object, key: number | string) {
  if (!Object.values(enumObj).includes(key)) {
    throw new Error(
      `Invalid enum key: ${key}. Valid keys are: ${Object.values(enumObj).join(', ')}`
    );
  }
}
