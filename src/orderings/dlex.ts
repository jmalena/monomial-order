/**
 * @file Monomial lexicographic ordering operations on k-tuples modulo m with degree d.
 */

import { compareLex } from "/~/orderings/lex";
import { Ordering } from "/~/orderings";
import { degree } from "/~/math/tuple";
import { countStarsAndBars } from "/~/math/combinatorics";

/**
 * Computes the rank from `k`-tuple `u` modulo `m`. The ordering is constrained by the degree `d`.
 *
 * Example:
 *   Let rank(x) = rankLexBaseDeg(u; d, k, m), where u = (u_1, u_2, u_3), d = 2 (degree), k = 3 (dimension), and
 *   m = 3 (base). We can rank all tuples satisfying this conditions as follows:
 *
 *     rank((0, 0, 2)) = 1
 *     rank((0, 1, 1)) = 2
 *     rank((0, 2, 0)) = 3
 *     rank((1, 0, 1)) = 4
 *     rank((1, 1, 0)) = 5
 *     rank((2, 0, 0)) = 6
 *
 *   Notice d = u_1 + u_2 + u_3. Also notice when `u` is lexicographically smaller than `v`, then rank(`u`) < rank(`v`).
 *
 * @see {@link https://math.stackexchange.com/questions/4186930/get-the-index-of-combination-by-its-value} Reference.
 *
 * @param d - The degree of `u`.
 * @param k - The dimension of `u`.
 * @param m - The modulo of `u`.
 * @param u - The valid `k`-tuple.
 * @returns Rank of the `k`-tuple `u` (1-based).
 */
export function rankDlex(d: number, k: number, m: number, u: number[]): bigint {
  if (maxDlexRank(d, k, m) === 0n)
    throw new Error(
      `No ${k}-tuple modulo ${m} and degree ${d} can be constructed`,
    );
  if (u.length !== k)
    throw new Error(`Expected ${k}-tuple, but got ${u.length}-tuple.`);
  if (degree(u) !== d)
    throw new Error(`Expected degree ${d}, but got ${degree(u)}.`);
  if (m < 2)
    throw new Error(`Modulo must be greater than or equal to 2, but got ${m}`);
  if (u.some((num) => num < 0 || num >= m))
    throw new Error(
      `Each element of the ${k}-tuple u=${u} must be within the range [0, ${m - 1}].`,
    );

  let rank = 1n;
  let sum = d;

  for (let i = 0; i < k - 1; i++) {
    for (let j = 0; j < u[i]; j++) {
      const count = countStarsAndBars(sum - j, k - i - 1, m);
      rank += count;
    }

    sum -= u[i];
  }

  return rank;
}

/**
 * Computes the `k`-tuple `u` modulo `m` from given lexicographic ordering `rank`. The ordering only contains `k`-tuples of degree `d`.
 *
 * @param d - The degree of `u`.
 * @param k - The dimension of `u`.
 * @param m - The modulo of `u`.
 * @param rank - The rank of the searched `k`-tuple `u` (1-based).
 * @returns `k`-tuple `u` within the given `rank`.
 */
export function unrankDlex(
  d: number,
  k: number,
  m: number,
  rank: bigint,
): number[] {
  const maxRank = maxDlexRank(d, k, m);

  if (maxRank === 0n)
    throw new Error(
      `No ${k}-tuple modulo ${m} and degree ${d} can be constructed`,
    );
  if (m < 2)
    throw new Error(`Modulo must be greater than or equal to 2, but got ${m}`);
  if (rank < 1n || rank > maxRank)
    throw new Error(
      `A ${k}-tuple modulo ${m} does not exist for a rank of ${rank}`,
    );

  const u = [];
  let sum = d;

  for (let i = 0; i < k - 1; i++) {
    for (let j = 0; j < m; j++) {
      const count = countStarsAndBars(sum - j, k - i - 1, m);

      if (rank <= count) {
        u.push(j);
        sum -= j;
        break;
      }

      rank -= count;
    }
  }

  u.push(sum);

  return u;
}

/**
 * Maximal lexicographic ordering rank of `k`-tuples modulo `m` with degree `d`.
 *
 * @param d - The degree constraint.
 * @param k - The tuple dimension.
 * @param m - The tuple modulus.
 * @returns Maximal possible rank.
 */
export function maxDlexRank(d: number, k: number, m: number): bigint {
  return countStarsAndBars(d, k, m);
}

export function randomDlexRank(d: number, k: number, m: number): bigint {
  // TODO: this will not work with large numbers…
  return 1n + BigInt(Math.floor(Math.random() * Number(maxDlexRank(d, k, m))));
}

/**
 * Lexicographic ordering `k`-tuple comparison.
 *
 * @param u - `k`-tuple `u` of lhs.
 * @param v - `k`-tuple `v` of rhs.
 * @returns Comparison result.
 */
export function compareDlex(u: number[], v: number[]): Ordering {
  if (degree(u) !== degree(v))
    throw new Error(`Tuples ${u} and ${v} must have same degree.`);

  return compareLex(u, v);
}
