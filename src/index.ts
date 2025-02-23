type Order = "lex" | "grlex";

/**
 * Finds the rank (1-based) of the `k`-tuple `u` within the given monomial ordering.
 * The rank is the position of `k`-tuple `u` in the monomial ordering of all possible `k`-tuples.
 *
 * @param k - The length of the searched `k`-tuple `u`.
 * @param u - The `k`-tuple whose rank is being searched.
 * @returns The 1-based rank of the `k`-tuple `u`.
 */
export function rank(order: Order, k: number, u: number[]): bigint {
  throw new Error("Function not yet implemented.");
}

/**
 * Finds the `k`-tuple `u` corresponding to a given rank within the specified monomial ordering.
 * The rank is the position of `k`-tuple `u` in the monomial ordering of all possible `k`-tuples.
 *
 * @param k - The length of the generated `k`-tuple `u`.
 * @param rank - The 1-based rank of the `k`-tuple.
 * @returns The `k`-tuple corresponding to the given rank in the monomial ordering.
 */
export function unrank(order: Order, k: number, rank: bigint): number[] {
  throw new Error("Function not yet implemented.");
}
