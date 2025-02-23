/**
 * @file Monomial lexicographic order operations on k-tuples modulo m.
 * @see {@link https://en.wikipedia.org/wiki/Monomial_order#Lexicographic_order} Further up reading.
 */

import { Ordering } from "/~/orders";

/**
 * Computes the lexicographic order rank from `k`-tuple `u` modulo `m`.
 *
 * @param k - The dimension of `u`.
 * @param m - The modulo of `u`.
 * @param u - `k`-tuple `u` for which rank we are searching for.
 * @returns Rank of the `k`-tuple `u` (1-based).
 */
export function rankLex(k: number, m: number, u: number[]): bigint {
  if (u.length !== k)
    throw new Error(`Expected dimension ${k}, but got ${u.length}`);
  if (m < 2)
    throw new Error(`Modulo must be greater than or equal to 2, but got ${m}`);
  if (u.some((num) => num < 0 || num >= m))
    throw new Error(
      `Each element of the ${k}-tuple u=${u} must be within the range [0, ${m - 1}].`,
    );

  let rank = 0n;
  for (let i = 0; i < k; i++) {
    rank = rank * BigInt(m) + BigInt(u[i]);
  }

  return 1n + rank;
}

/**
 * Computes the `k`-tuple `u` modulo `m` for given `rank`.
 *
 * @param k - The dimension of `u`.
 * @param m - The modulo of `u`.
 * @param rank - The rank of the searched `k`-tuple (1-based).
 * @returns `k`-tuple for given `rank`.
 */
export function unrankLex(k: number, m: number, rank: bigint): number[] {
  if (m < 2)
    throw new Error(`Modulo must be greater than or equal to 2, but got ${m}`);
  if (rank < 1n || rank > maxLexRank(k, m))
    throw new Error(
      `A ${k}-tuple modulo ${m} does not exist for a rank of ${rank}`,
    );

  const u = Array(k).fill(0);
  let r = rank - 1n;

  for (let i = k - 1; r > 0n; i--) {
    const num = Number(r % BigInt(m));
    u[i] = num;
    r /= BigInt(m);
  }

  return u;
}

/**
 * Maximal rank of `k`-tuples modulo `m` in lexicographic order.
 *
 * @param k - The tuple dimension.
 * @param m - The tuple modulus.
 * @returns Maximal rank given parameters.
 */
export function maxLexRank(k: number, m: number): bigint {
  if (k < 0)
    throw new Error(`Tuple dimension must be non-negative, but got ${k}`);
  if (m < 2)
    throw new Error(`Modulo must be greater than or equal to 2, but got ${m}`);

  return BigInt(m) ** BigInt(k);
}

/**
 * Generates a random lex rank for valid `k`-tuple `u` modulo `m`.
 *
 * @param k - The dimension of `u`.
 * @param m - The modulo.
 * @returns A random valid rank for given parameters.
 */
export function randomLexRank(k: number, m: number): bigint {
  // TODO: this will not work with large numbers…
  return 1n + BigInt(Math.floor(Math.random() * Number(maxLexRank(k, m))));
}

/**
 * Lexicographic order `k`-tuple comparison.
 *
 * @param u - `k`-tuple `u` of lhs.
 * @param v - `k`-tuple `v` of rhs.
 * @returns Comparison result.
 */
export function compareLex(u: number[], v: number[]): Ordering {
  if (u.length !== v.length)
    throw new Error(`Tuples ${u} and ${v} must have same length.`);

  for (let i = 0; i < u.length; i++) {
    if (u[i] < v[i]) return Ordering.LT;
    if (u[i] > v[i]) return Ordering.GT;
  }

  return Ordering.EQ;
}
