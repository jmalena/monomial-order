import { rankLex, unrankLex } from "/~/orders/lex";
import { rankGrlex, unrankGrlex } from "/~/orders/grlex";

/**
 * Supported monomial orders:
 *   `lex`: Lexicographical order, where the rank is determined in a dictionary-like manner.
 *   `grlex`: Graded lexicographical order, where the rank is based on the degree first, then lexicographically.
 */
type Order = "lex" | "grlex";

/**
 * Constraints for order operations. This affect the monomial ranks.
 * @interface
 */
interface OrderConstraints {
  /**
   * Constraint for the tuple length.
   */
  length: number;

  /**
   * Constraint on the exponent upper range. This represents the modulus value.
   */
  mod: number;
}

/**
 * Returns the rank (1-based) of the `k`-tuple `u` within the given monomial order under constraints `c`.
 *
 * @param order - The monomial order.
 * @param k - The length of the tuple `u`.
 * @param u - The `k`-tuple whose rank is being requested.
 * @param c - The constraints applied on the monomial order.
 * @returns The 1-based rank of the `k`-tuple `u`.
 */
export function rank(order: Order, u: number[], c: OrderConstraints): bigint {
  if (order === "lex") {
    return rankLex(c.length, c.mod, u);
  } else if (order === "grlex") {
    return rankGrlex(c.length, c.mod, u);
  }

  throw new Error(`Unsupported or unknwon monomial order "${order}" given.`);
}

/**
 * Returns the `k`-tuple `u` corresponding to a given `rank` (1-based) within the given monomial order under constraints `c`.
 *
 * @param order - The monomial order.
 * @param rank - The 1-based rank of the `k`-tuple `u`.
 * @param c - The constraints applied on the monomial order.
 * @returns The `k`-tuple corresponding to the `rank` in the given monomial order.
 */
export function unrank(
  order: Order,
  rank: bigint,
  c: OrderConstraints,
): number[] {
  if (order === "lex") {
    return unrankLex(c.length, c.mod, rank);
  } else if (order === "grlex") {
    return unrankGrlex(c.length, c.mod, rank);
  }

  throw new Error(`Unsupported or unknwon monomial order "${order}" given.`);
}
