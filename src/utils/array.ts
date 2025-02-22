/**
 * Python like number range generator.
 *
 * @param start - The starting number of the sequence. If only one argument is provided, this is treated as `stop` and `start` defaults to 0.
 * @param stop - The end of the range (exclusive). If omitted, the function assumes `start` is actually `stop`, and `start` defaults to 0.
 * @param step - The step between numbers in the sequence. Can be negative for a descending range.
 * @returns An array containing the generated range of numbers.
 */
export function range(
  start: number,
  stop?: number,
  step: number = 1,
): number[] {
  if (stop === undefined) {
    stop = start;
    start = 0;
  }

  if (step === 0) {
    throw new Error("Step cannot be zero.");
  }

  const result: number[] = [];

  if (step > 0) {
    for (let i = start; i < stop; i += step) {
      result.push(i);
    }
  } else {
    for (let i = start; i > stop; i += step) {
      result.push(i);
    }
  }

  return result;
}

/**
 * Calculates the sum of an array of numbers.
 *
 * @param arr - An array of numbers to sum.
 * @returns The sum of all numbers in `arr`.
 */
export function sum(arr: number[]): number {
  return arr.reduce((acc, num) => acc + num);
}

/**
 * Cartesian product of multiple arrays.
 *
 * @param arr - The data of all dimensions.
 * @returns The Cartesian product.
 *
 * @example
 * product([0, 1], [0, 2]); // Returns [[0, 0], [0, 2], [1, 0], [1, 2]]
 */
export function product<T>(...arr: T[][]): T[][] {
  if (!arr.length) return [];
  return arr.reduce(
    (acc, curr) => acc.flatMap((item) => curr.map((el) => [...item, el])),
    [[]] as T[][],
  );
}

/**
 * Permutation with repetition of array.
 *
 * @param arr - The data of single dimension.
 * @param n - The resulting dimension.
 * @returns A permutatio with repetition of `arr` with `n` dimensions.
 *
 * @example
 * permutationRep([0, 1], 2); // Returns [[0, 0], [0, 1], [1, 0], [1, 1]]
 */
export function permutationRep<T>(arr: T[], n: number): T[][] {
  if (n <= 0) return [];
  return product(...Array(n).fill(arr));
}
