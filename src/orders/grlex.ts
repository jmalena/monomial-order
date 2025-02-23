/**
 * @file Monomial graded lexicographic order operations on k-tuples modulo m.
 * @see {@link https://en.wikipedia.org/wiki/Monomial_order#Graded_lexicographic_order} Further up reading.
 */

import { Ordering } from "/~/orders";
import { compareLex } from "/~/orders/lex";
import { rankDlex, unrankDlex } from "/~/orders/dlex";
import { countStarsAndBars } from "/~/math/combinatorics";
import { degree } from "/~/math/tuple";

/**
 * Computes the graded lexicographic ordering rank from `k`-tuple `u` modulo `m`.
 *
 * @param k - The dimension of `u`.
 * @param m - The modulo of `u`.
 * @param u - `k`-tuple `u` for which rank we are searching for.
 * @returns Rank of the `k`-tuple `u` (1-based).
 */
export function rankGrlex(k: number, m: number, u: number[]): bigint {
  if (u.length !== k)
    throw new Error(`Expected dimension ${k}, but got ${u.length}`);
  if (m < 2)
    throw new Error(`Modulo must be greater than or equal to 2, but got ${m}`);
  if (u.some((num) => num < 0 || num >= m))
    throw new Error(
      `Each element of the ${k}-tuple u=${u} must be within the range [0, ${m - 1}].`,
    );

  const d = degree(u);

  let rank = 0n;

  // Calculate number of k-tuples before degree `d`.
  for (let i = 0; i < d; i++) {
    rank += countStarsAndBars(i, k, m);
  }

  // Calculate rank of tuple `u` within the degree `d`.
  rank += rankDlex(d, k, m, u);

  return rank;
}

/**
 * Computes the `k`-tuple `u` modulo `m` from given graded lexicographic ordering `rank`.
 *
 * @param k - The dimension of `u`.
 * @param m - The modulo of `u`.
 * @param rank - The rank of the searched `k`-tuple `u` (1-based).
 * @returns `k`-tuple within the given `rank`.
 */
export function unrankGrlex(k: number, m: number, rank: bigint): number[] {
  if (m < 2)
    throw new Error(`Modulo must be greater than or equal to 2, but got ${m}`);
  if (rank < 1n || rank > maxGrlexRank(k, m))
    throw new Error(
      `A ${k}-tuple modulo ${m} does not exist for a rank of ${rank}`,
    );

  let d = 0;

  // Calculate the degree `d` for a given `rank`.
  while (true) {
    const count = countStarsAndBars(d, k, m);

    if (rank <= count) {
      break;
    }

    d++;
    rank -= count;
  }

  // Calculate the `k`-tuple `u` within the degree `d`.
  return unrankDlex(d, k, m, rank);
}

/**
 * Maximal rank of `k`-tuples modulo `m` in graded lexicographic order.
 *
 * @param k - The tuple dimension.
 * @param m - The tuple modulus.
 * @returns Maximal rank.
 */
export function maxGrlexRank(k: number, m: number): bigint {
  if (k < 0)
    throw new Error(`k-tuple dimension must be non-negative, but got ${k}`);
  if (m < 2)
    throw new Error(`Modulo must be greater than or equal to 2, but got ${m}`);

  return BigInt(m) ** BigInt(k);
}

/**
 * Generates a random grlex rank for valid `k`-tuple `u` modulo `m`.
 *
 * @param k - The dimension of `u`.
 * @param m - The modulo.
 * @returns A random rank from the set {1, 2, …, m^k}.
 */
export function randomGrlexRank(k: number, m: number): bigint {
  // TODO: this will not work with large numbers…
  return 1n + BigInt(Math.floor(Math.random() * Number(maxGrlexRank(k, m))));
}

/**
 * Graded lexicographic order `k`-tuple comparison.
 *
 * @param u - `k`-tuple `u` of lhs.
 * @param v - `k`-tuple `v` of rhs.
 * @returns Comparison result.
 */
export function compareGrlex(u: number[], v: number[]): Ordering {
  if (u.length !== v.length)
    throw new Error(`Tuples ${u} and ${v} differ in length.`);

  if (degree(u) < degree(v)) return Ordering.LT;
  if (degree(u) > degree(v)) return Ordering.GT;

  return compareLex(u, v);
}
