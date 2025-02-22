import { test, fc } from "@fast-check/jest";
import { factorial, choose, countStarsAndBars } from "/~/math/combinatorics";
import { sum, permutationRep } from "/~/utils/array";

describe("factorial(n)", () => {
  test("throws error for n < 0", () => {
    expect(() => factorial(-1)).toThrow();
  });

  test("calculates factorial of 0", () => {
    expect(factorial(0)).toBe(1n);
  });

  test("calculates factorial of 1", () => {
    expect(factorial(1)).toBe(1n);
  });

  test("calculates small number", () => {
    expect(factorial(5)).toBe(120n);
  });

  test("calculates big number", () => {
    expect(factorial(30)).toBe(265252859812191058636308480000000n);
  });
});

describe("choose(n, k)", () => {
  test("throws error for n < 0", () => {
    expect(() => choose(-1, 0)).toThrow();
  });

  test("throws error for k < 0", () => {
    expect(() => choose(0, -1)).toThrow();
  });

  test("calculates n < k", () => {
    expect(choose(3, 5)).toBe(0n);
  });

  test("calculates n=k", () => {
    expect(choose(5, 5)).toBe(1n);
  });

  test("calculates small number", () => {
    expect(choose(10, 3)).toBe(120n);
  });

  test("calculates big number", () => {
    expect(choose(100, 50)).toBe(100891344545564193334812497256n);
  });
});

describe("countStarsAndBars", () => {
  function bruteforce(n: number, k: number, m: number): number {
    const numerals = [...Array(m).keys()];
    return permutationRep(numerals, k).filter((num) => sum(num) === n).length;
  }

  test.prop([
    fc.integer({ min: 0, max: 20 }),
    fc.integer({ min: 1, max: 5 }), // be careful with the max value, can eat up lot of time and memory
    fc.integer({ min: 2, max: 16 }),
  ])(
    "countStarsAndBars(d, k, m) comply the bruteforce implementation",
    (d, k, m) => {
      expect(countStarsAndBars(d, k, m)).toBe(BigInt(bruteforce(d, k, m)));
    },
  );
});
