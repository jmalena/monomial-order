import { product, permutationRep } from "/~/utils/array";

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
