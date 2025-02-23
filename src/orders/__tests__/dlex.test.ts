import { test, fc } from "@fast-check/jest";
import {
  rankDlex,
  unrankDlex,
  maxDlexRank,
  randomDlexRank,
  compareDlex,
} from "/~/orders/dlex";
import { Ordering } from "/~/orders";
import { degree } from "/~/math/tuple";
import { range, permutationRep } from "/~/utils/array";

describe("Lexicographical monomial order of k-tuples u modulo m with degree d", () => {
  /**
   * Enumerate all `k`-tuples modulo `m` with degree `d` in lexicographic order.
   */
  function enumerateDlex(d: number, k: number, m: number): number[][] {
    return permutationRep(range(m), k)
      .filter((u) => degree(u) === d)
      .sort((u, v) => compareDlex(u, v));
  }

  /*
   * NOTE: This test is doing exhaustive check on specific parameters `d`, `k`, and `m`. Be careful with the max value of `k` since it can eat lot of time or memory.
   */
  test.prop([
    fc.integer({ min: 0, max: 12 }),
    fc.integer({ min: 1, max: 4 }),
    fc.integer({ min: 2, max: 16 }),
  ])(
    "rankDlex(u; d, k, m) is bijective on codomain {1, 2, …, n}, where `n` is number of all `k`-tuples modulo `m` with degree `d`",
    (d, k, m) => {
      fc.pre(maxDlexRank(d, k, m) > 0);

      const maxRank = Number(maxDlexRank(d, k, m));
      const tuples = enumerateDlex(d, k, m);
      const ranks = tuples.map((u) => rankDlex(d, k, m, u));

      // check all ranks are within the codomain
      for (const rank of ranks) {
        expect(typeof rank).toBe("bigint");
        expect(rank).toBeGreaterThanOrEqual(1n);
        expect(rank).toBeLessThanOrEqual(BigInt(maxRank));
      }

      // check for bijectivity
      const dedupRanks = new Set(ranks);
      expect(dedupRanks.size).toBe(maxRank);
    },
  );

  /*
   * NOTE: This test is doing exhaustive check on specific parameters `d`, `k`, and `m`. Be careful with the max value of `k` since it can eat lot of time or memory.
   */
  test.prop([
    fc.integer({ min: 1, max: 12 }),
    fc.integer({ min: 1, max: 4 }),
    fc.integer({ min: 2, max: 16 }),
  ])(
    "unrankDlex(rank; d, k, m) is bijective on codomain of all `k`-tuples modulo `m` with degree `d`",
    (d, k, m) => {
      fc.pre(maxDlexRank(d, k, m) > 0);

      const maxRank = Number(maxDlexRank(d, k, m));
      const tuples = range(1, maxRank + 1).map((rank) =>
        unrankDlex(d, k, m, BigInt(rank)),
      );

      // check all tuples are witin the codomain
      for (const u of tuples) {
        expect(degree(u)).toBe(d);
        expect(u.length).toBe(k);
        expect(u.every((num) => num >= 0 && num < m)).toBeTruthy();
      }

      // check for bijectivity
      const dedupTuples = new Set(tuples);
      expect(dedupTuples.size).toBe(maxRank);
    },
  );

  test.prop([
    fc.integer({ min: 1, max: 12 }),
    fc.integer({ min: 2, max: 4 }),
    fc.integer({ min: 2, max: 16 }),
  ])(
    "unrankDlex(rank; d, k, m) is left inverse of rankDlex(u; d, k, m)",
    (d, k, m) => {
      fc.pre(maxDlexRank(d, k, m) > 0);

      const rank = randomDlexRank(d, k, m);
      expect(rankDlex(d, k, m, unrankDlex(d, k, m, rank))).toBe(rank);
    },
  );

  /*
   * Property `rank_1` < `rank_2` => unrankDlex(rank1; d, k, m) <_dlex unrankDlex(rank2; d, k, m),
   *
   * NOTE: This test is doing exhaustive check on specific parameters `d`, `k`, and `m`. Be careful with the max value of `k` since it can eat lot of time or memory.
   */
  test.prop([
    fc.integer({ min: 1, max: 12 }),
    fc.integer({ min: 1, max: 4 }),
    fc.integer({ min: 2, max: 16 }),
  ])(
    "unrankDlex(rank; d, k, m) is strictly monotone (has lexicographic order)",
    (d, k, m) => {
      fc.pre(maxDlexRank(d, k, m) > 0);

      const tuples = enumerateDlex(d, k, m);

      for (let rank = 2; rank < tuples.length; rank++) {
        const u = unrankDlex(d, k, m, BigInt(rank - 1));
        const v = unrankDlex(d, k, m, BigInt(rank));
        expect(compareDlex(u, v)).toBe(Ordering.LT);
      }
    },
  );

  test.skip("unrankDlex(u; d, k, m) is strictly monotone (has lexicographic order)", () => {
    // TODO: If unrankDlex(rank; d, k, m) is strictly monotone and bijective, then rankDlex(u; d, k, m) is strictly monotone
  });

  test.skip("rankDlex(u; d, k, m) is strictly monotone (has lexicographic order)", () => {
    // TODO: If unrankDlex(rank; d, k, m) is strictly monotone and bijective, then rankDlex(u; d, k, m) is strictly monotone
  });

  test.skip("maxDlexRank(d, k, m)", () => {
    // TODO:
  });

  test.skip("randomDlexRank(d, k, m)", () => {
    // TODO: test is withing range
  });

  test.skip("compareDlex(u, v)", () => {
    // TODO
  });
});
