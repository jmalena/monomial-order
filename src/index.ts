type KTuple<K extends number, T> = K extends K
  ? readonly [...(Array<K> extends { length: K } ? T[] : never)]
  : never;

/**
 * Finds the rank of the `k`-tuple `u` within the given monomial ordering.
 * The rank is the position of `k`-tuple `u` in the monomial ordering of all possible `k`-tuples.
 *
 * @param k - The length of the tuple `u`.
 * @param u - The `k`-tuple whose rank is being found.
 * @returns The 1-based rank of the `k`-tuple `u`.
 */
export function rank<K extends number>(_k: K, _u: KTuple<K, number>): bigint {
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
export function unrank<K extends number>(
  _k: K,
  _rank: bigint,
): KTuple<K, number> {
  throw new Error("Function not yet implemented.");
}
