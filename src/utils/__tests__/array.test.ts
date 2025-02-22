import { range, product, permutationRep } from "/~/utils/array";

describe("range", () => {
  test("should generate a ..5 sequence", () => {
    expect(range(5)).toEqual([0, 1, 2, 3, 4]);
  });

  test("should generate a 2..6 sequence", () => {
    expect(range(2, 6)).toEqual([2, 3, 4, 5]);
  });

  test("should generate a 2,4..10 sequence", () => {
    expect(range(2, 10, 2)).toEqual([2, 4, 6, 8]);
  });

  test("should generate a 10,8..2", () => {
    expect(range(10, 2, -2)).toEqual([10, 8, 6, 4]);
  });

  test("shouldn't generate a 5..5 sequence", () => {
    expect(range(5, 5)).toEqual([]);
  });

  test("shouldn't generate a 5,4..10 sequence", () => {
    expect(range(5, 10, -1)).toEqual([]);
  });

  test("shouldn't generate a 10,11..5 sequence", () => {
    expect(range(10, 5, 1)).toEqual([]);
  });

  test("should throw on sequence with zero step", () => {
    expect(() => range(1, 10, 0)).toThrow("Step cannot be zero.");
  });
});

describe("product", () => {
  test("should handle no input", () => {
    expect(product()).toEqual([]);
  });

  test("should handle empty dimension", () => {
    expect(product([0, 1], [])).toEqual([]);
  });

  test("should handle multiple dimensions", () => {
    expect(product([0, 1], [0, 2], [3, 4])).toEqual([
      [0, 0, 3],
      [0, 0, 4],
      [0, 2, 3],
      [0, 2, 4],
      [1, 0, 3],
      [1, 0, 4],
      [1, 2, 3],
      [1, 2, 4],
    ]);
  });
});

describe("permutationRep", () => {
  test("should handle no input", () => {
    expect(permutationRep([], 2)).toEqual([]);
  });

  test("should handle empty dimension", () => {
    expect(permutationRep([0, 1], 0)).toEqual([]);
  });

  test("should enumerate permutations", () => {
    expect(permutationRep([0, 1], 2)).toEqual([
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ]);
  });
});
