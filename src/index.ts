import { rankLex, unrankLex } from "/~/orderings/lex";
import { rankGrlex, unrankGrlex } from "/~/orderings/grlex";

/**
 * Supported monomial orderings:
 *   `lex`: Lexicographical ordering, where the rank is determined in a dictionary-like manner.
 *   `grlex`: Graded lexicographical ordering, where the rank is based on the degree first, then lexicographically.
 */
type Ordering = "lex" | "grlex";

/**
 * Constraints for ordering operations. This affect the monomial ranks.
 * @interface
 */
interface OrderingConstraints {
  /**
   * Constraint for the tuple given length.
   */
  length: number;

  /**
   * Constraint on the exponent upper range. This represents the modulus value.
   */
  mod: number;

  /**
   * Constraint monomials with exact degree.
   * TODO: add support and uncomment related section in the README.md after
   */
  // deg: number;
}

/**
 * Returns the rank (1-based) of the `k`-tuple `u` within the given monomial ordering under constraints `c`.
 *
 * @param ordering - The monomial ordering.
 * @param k - The length of the tuple `u`.
 * @param u - The `k`-tuple whose rank is being requested.
 * @param c - The constraints applied on the monomial ordering.
 * @returns The 1-based rank of the `k`-tuple `u`.
 */
export function rank(
  ordering: Ordering,
  u: number[],
  c: OrderingConstraints,
): bigint {
  if (ordering === "lex") {
    return rankLex(c.length, c.mod, u);
  } else if (ordering === "grlex") {
    return rankGrlex(c.length, c.mod, u);
  }

  throw new Error(
    `Unsupported or unknwon monomial ordering "${ordering}" given.`,
  );
}

/**
 * Returns the `k`-tuple `u` corresponding to a given `rank` (1-based) within the given monomial ordering under constraints `c`.
 *
 * @param ordering - The monomial ordering.
 * @param rank - The 1-based rank of the `k`-tuple `u`.
 * @param c - The constraints applied on the monomial ordering.
 * @returns The `k`-tuple corresponding to the `rank` in the given monomial ordering.
 */
export function unrank(
  ordering: Ordering,
  rank: bigint,
  c: OrderingConstraints,
): number[] {
  if (ordering === "lex") {
    return unrankLex(c.length, c.mod, rank);
  } else if (ordering === "grlex") {
    return unrankGrlex(c.length, c.mod, rank);
  }

  throw new Error(
    `Unsupported or unknwon monomial ordering "${ordering}" given.`,
  );
}
