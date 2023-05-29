/* eslint-disable @typescript-eslint/no-unused-vars */
export const findObjectWithHighestValue = <T>(
  arr: T[],
  field: keyof T,
): T | undefined => {
  let maxValue: number | undefined = undefined;
  let maxObject: T | undefined = undefined;

  for (const obj of arr) {
    const value = obj[field] as unknown as number;

    if (typeof value !== 'number') {
      throw new Error(`Field '${String(field)}' is not a number.`);
    }

    if (maxValue === undefined || value > maxValue) {
      maxValue = value;
      maxObject = obj;
    }
  }

  return maxObject;
};
