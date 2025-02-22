/**
 * Computes the factorial of a given number.
 *
 * @param n - The non-negative number to compute the factorial for.
 * @returns The factorial of `n` (non-negative).
 * @throws When parameter conditios are not meet.
 */
export function factorial(n: number): bigint {
  if (n < 0)
    throw new Error(
      `factorial(n) is defined for non-negative values of n, but n = ${n} was given.`,
    );

  let result = 1n;

  for (let i = 2n; i <= BigInt(n); i++) {
    result *= i;
  }

  return result;
}

// -----------------------------------------------------------------------------
// Combinations

/**
 * Computes the binomial coefficient, also known as "n choose k".
 *
 * @param n - The total number of items (non-negative).
 * @param k - The number of items to choose (non-negative).
 * @returns The number of ways to choose `k` items from `n` when items repetition is not allowed.
 * @throws When parameter conditios are not meet.
 */
export function choose(n: number, k: number): bigint {
  if (n < 0)
    throw new Error(
      `choose(n, k) is defined for non-negative values of n, but n = ${n} was given.`,
    );
  if (k < 0)
    throw new Error(
      `choose(n, k) is defined for non-negative values of k, but k = ${k} was given.`,
    );

  if (n < k) return 0n;

  return factorial(n) / (factorial(k) * factorial(n - k));
}

// -----------------------------------------------------------------------------
// Stars and bars
// @see {@link https://en.wikipedia.org/wiki/Stars_and_bars_(combinatorics)} Further up reading.

/**
 * Count number of ways `n` things can be put into `k` bins, constrained by modulus `m`.
 *
 * @param n - The number of things (non-negative).
 * @param k - The number of bins (positive).
 * @param m - The modulus (≥ 2).
 * @returns Number of configurations.
 *
 * @example
 * countStarsAndBars(4, 3, 3); // Returns 6
 *
 * // This is because for parameters n = 4, k = 3, m = 3, we have following configurations:
 * //
 * //  ||** **
 * //  *|*|**
 * //  *|**|*
 * //  **||**
 * //  **|*|*
 * //  **|**|
 */
export function countStarsAndBars(n: number, k: number, m: number): bigint {
  if (n < 0)
    throw new Error(
      `countCompositions(n, k, m) is defined for non-negative values of n, but n = ${n} was given.`,
    );
  if (k < 1)
    throw new Error(
      `countCompositions(n, k, m) is defined for positive values of k, but k = ${k} was given.`,
    );
  if (m < 2)
    throw new Error(
      `countCompositions(n, k, m) is defined for m ≥ 2, but m = ${m} was given.`,
    );

  let result = 0n;
  let sign = 1n;

  for (let i = 0; i <= Math.floor(n / m); i++) {
    result += sign * choose(k, i) * choose(n + k - i * m - 1, k - 1);
    sign *= -1n;
  }

  return result;
}
