import { test, fc } from "@fast-check/jest";
import {
  rankGrlex,
  maxGrlexRank,
  unrankGrlex,
  randomGrlexRank,
  compareGrlex,
} from "/~/orderings/grlex";
import { Ordering } from "/~/orderings";
import { range, permutationRep } from "/~/utils/array";

describe("Graded lexicographical monomial ordering of k-tuples modulo m", () => {
  /**
   * Enumerate all `k`-tuples modulo `m` in graded lexicographic ordering.
   */
  function enumerateGrlex(k: number, m: number): number[][] {
    return permutationRep(range(m), k).sort((u, v) => compareGrlex(u, v));
  }

  /*
   * NOTE: This test is doing exhaustive check on specific parameters `k` and `m`. Be careful with the max value of `k` since it can eat lot of time or memory.
   */
  test.prop([fc.integer({ min: 1, max: 4 }), fc.integer({ min: 2, max: 16 })])(
    "rankGrlex(u; k, m) is bijective on codomain {1, 2, …, m^k}",
    (k, m) => {
      const maxRank = Number(maxGrlexRank(k, m));
      const tuples = enumerateGrlex(k, m);
      const ranks = tuples.map((u) => rankGrlex(k, m, u));

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
   * NOTE: This test is doing exhaustive check on specific parameters `k` and `m`. Be careful with the max value of `k` since it can eat lot of time or memory.
   */
  test.prop([fc.integer({ min: 1, max: 4 }), fc.integer({ min: 2, max: 16 })])(
    "unrankGrlex(u; k, m) is bijective on codomain of all `k`-tuples modulo `m`",
    (k, m) => {
      const maxRank = Number(maxGrlexRank(k, m));
      const ranks = range(1, maxRank + 1);
      const tuples = ranks.map((rank) => unrankGrlex(k, m, BigInt(rank)));

      // check all tuples are witin the codomain
      for (const u of tuples) {
        expect(u.length).toBe(k);
        expect(u.every((num) => num >= 0 && num < m)).toBeTruthy();
      }

      // check for bijectivity
      const dedupRanks = new Set(tuples);
      expect(dedupRanks.size).toBe(maxRank);
    },
  );

  test.prop([fc.integer({ min: 1, max: 4 }), fc.integer({ min: 2, max: 16 })])(
    "unrankGrlex(rank; k, m) is left inverse of rankGrlex(u; k, m)",
    (k, m) => {
      const rank = randomGrlexRank(k, m);
      expect(rankGrlex(k, m, unrankGrlex(k, m, rank))).toBe(rank);
    },
  );

  /**
   * Property `rank_1` < `rank_2` => unrankGrlex(rank1; k, m) <_grlex unrankGrlex(rank2; k, m).
   *
   * NOTE: This test is doing exhaustive check on specific parameters `k` and `m`. Be careful with the max value of `k` since it can eat lot of time or memory.
   */
  test.prop([fc.integer({ min: 1, max: 4 }), fc.integer({ min: 1, max: 16 })])(
    "unrankGrlex(rank; k, m) is strictly monotone (has graded lexicographic ordering)",
    (k, m) => {
      const tuples = enumerateGrlex(k, m);

      for (let rank = 2n; rank < tuples.length; rank++) {
        const u = unrankGrlex(k, m, rank - 1n);
        const v = unrankGrlex(k, m, rank);
        expect(compareGrlex(u, v)).toBe(Ordering.LT);
      }
    },
  );

  test.skip("rankGrlex(u; d, k, m) is strictly monotone (has graded lexicographic ordering)", () => {
    // TODO: If unrankLex(rank; d, k, m) is strictly monotone and bijective, then rankLex(u; d, k, m) is strictly monotone
  });

  test.skip("maxGrlexRank(k, m)", () => {
    // TODO
  });

  test.skip("randomGrlexRank(d, k, m)", () => {
    // TODO: test is withing range
  });

  test.skip("compareGrlex(u, v)", () => {
    // TODO
  });
});
