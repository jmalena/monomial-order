import { test, fc } from "@fast-check/jest";
import {
  rankLex,
  unrankLex,
  maxLexRank,
  randomLexRank,
  compareLex,
} from "/~/orders/lex";
import { Ordering } from "/~/orders";
import { range, permutationRep } from "/~/utils/array";

describe("Lexicographical monomial order of k-tuples modulo m", () => {
  /**
   * Enumerate all `k`-tuples modulo `m` in lexicographic order.
   */
  function enumerateLex(k: number, m: number): number[][] {
    return permutationRep(range(m), k).sort((u, v) => compareLex(u, v));
  }

  /*
   * NOTE: This test is doing exhaustive check on specific parameters `k` and `m`. Be careful with the max value of `k` since it can eat lot of time or memory.
   */
  test.prop([fc.integer({ min: 1, max: 4 }), fc.integer({ min: 2, max: 16 })])(
    "rankLex(u; k, m) is bijective on codomain {1, 2, …, m^k}",
    (k, m) => {
      const maxRank = Number(maxLexRank(k, m));
      const tuples = enumerateLex(k, m);
      const ranks = tuples.map((u) => rankLex(k, m, u));

      // check all ranks are within the codomain
      for (const rank of ranks) {
        expect(typeof rank).toBe("bigint");
        expect(rank).toBeGreaterThanOrEqual(1n);
        expect(rank).toBeLessThanOrEqual(BigInt(maxRank));
      }

      // check for bijectivity
      const dedupRanks = new Set(ranks);
      expect(dedupRanks.size).toBe(Number(maxRank));
    },
  );

  test.prop([fc.integer({ min: 1, max: 8 }), fc.integer({ min: 2, max: 16 })])(
    "unrankLex(rank; k, m) maintains lexicographic order",
    (k, m) => {
      const rank1 = randomLexRank(k, m);
      const rank2 = randomLexRank(k, m);
      const u = unrankLex(k, m, rank1);
      const v = unrankLex(k, m, rank2);

      expect(rank1 <= rank2).toBe(compareLex(u, v) <= 0);
    },
  );

  /*
   * NOTE: This test is doing exhaustive check on specific parameters `k` and `m`. Be careful with the max value of `k` since it can eat lot of time or memory.
   */
  test.prop([fc.integer({ min: 1, max: 4 }), fc.integer({ min: 2, max: 16 })])(
    "unrankLex(rank; k, m) is bijective on codomain of all `k`-tuples modulo `m`",
    (k, m) => {
      const maxRank = Number(maxLexRank(k, m));
      const tuples = range(1, maxRank + 1).map((rank) =>
        unrankLex(k, m, BigInt(rank)),
      );

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

  test.prop([fc.integer({ min: 1, max: 20 }), fc.integer({ min: 2, max: 16 })])(
    "unrankLex(rank; k, m) is left inverse of rankLex(u; k, m)",
    (k, m) => {
      const rank = randomLexRank(k, m);
      expect(rankLex(k, m, unrankLex(k, m, rank))).toBe(rank);
    },
  );

  /*
   * NOTE: This test is doing exhaustive check on specific parameters `k` and `m`. Be careful with the max value of `k` since it can eat lot of time or memory.
   */
  test.prop([
    fc.integer({ min: 1, max: 4 }),
    fc.integer({ min: 1, max: 16 }), // be careful with the max value, can eat up lot of time/memory
  ])(
    "unrankLex(rank; d, k, m) is strictly monotone (has lexicographic order)",
    (k, m) => {
      const tuples = enumerateLex(k, m);

      for (let rank = 2; rank < tuples.length; rank++) {
        const u = unrankLex(k, m, BigInt(rank - 1));
        const v = unrankLex(k, m, BigInt(rank));
        expect(compareLex(u, v)).toBe(Ordering.LT);
      }
    },
  );

  test.skip("rankLex(u; d, k, m) is strictly monotone (has lexicographic order)", () => {
    // TODO: If unrankLex(rank; d, k, m) is strictly monotone and bijective, then rankLex(u; d, k, m) is strictly monotone
  });

  test.skip("maxLexRank(k, m)", () => {
    // TODO
  });

  test.skip("randomDlexRank(k, m)", () => {
    // TODO: test is withing range
  });

  test.skip("compareLex(u, v)", () => {
    // TODO
  });
});
