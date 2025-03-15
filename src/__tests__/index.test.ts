import { rank, unrank } from "/~/index";

describe("Monomial ordering ranking", () => {
  test("rank(ordering, u, c) throws error when given `ordering` is unsupported", () => {
    // @ts-expect-error Disable type checking to simulate environment without Typescript
    expect(() => rank("chaos", [0], { length: 1, mod: 2 })).toThrow(
      'Unsupported or unknwon monomial ordering "chaos" given.',
    );
  });

  test("rank('lex', u, c) is valid for small subset of values", () => {
    // Lex ordering enumeration for k=3 and m=2:
    //
    // [0, 0, 0]
    // [0, 0, 1]
    // [0, 1, 0]
    // [0, 1, 1]
    // [1, 0, 0]
    // …

    expect(rank("lex", [0, 0, 0], { length: 3, mod: 2 })).toBe(1n);
    expect(rank("lex", [0, 0, 1], { length: 3, mod: 2 })).toBe(2n);
    expect(rank("lex", [0, 1, 0], { length: 3, mod: 2 })).toBe(3n);
    expect(rank("lex", [0, 1, 1], { length: 3, mod: 2 })).toBe(4n);
    expect(rank("lex", [1, 0, 0], { length: 3, mod: 2 })).toBe(5n);
  });

  test("rank('grlex', u, c) is valid for small subset of values", () => {
    // Grlex ordering enumeration for k=3 and m=2:
    //
    // [0, 0, 0]
    // [0, 0, 1]
    // [0, 1, 0]
    // [1, 0, 0]
    // [0, 1, 1]
    // …

    expect(rank("grlex", [0, 0, 0], { length: 3, mod: 2 })).toBe(1n);
    expect(rank("grlex", [0, 0, 1], { length: 3, mod: 2 })).toBe(2n);
    expect(rank("grlex", [0, 1, 0], { length: 3, mod: 2 })).toBe(3n);
    expect(rank("grlex", [1, 0, 0], { length: 3, mod: 2 })).toBe(4n);
    expect(rank("grlex", [0, 1, 1], { length: 3, mod: 2 })).toBe(5n);
  });
});
describe("Monomial ordering unranking", () => {
  test("unrank(ordering, rank, c) throws error when given `ordering` is unsupported", () => {
    // @ts-expect-error Disable type checking to simulate environment without Typescript
    expect(() => unrank("chaos", 1n, { length: 2, mod: 2 })).toThrow(
      'Unsupported or unknwon monomial ordering "chaos" given.',
    );
  });

  test("unrank('lex', rank, c) is valid for small subset of values", () => {
    // Lex ordering enumeration for k=3 and m=2:
    //
    // [0, 0, 0]
    // [0, 0, 1]
    // [0, 1, 0]
    // [0, 1, 1]
    // [1, 0, 0]
    // …

    expect(unrank("lex", 1n, { length: 3, mod: 2 })).toEqual([0, 0, 0]);
    expect(unrank("lex", 2n, { length: 3, mod: 2 })).toEqual([0, 0, 1]);
    expect(unrank("lex", 3n, { length: 3, mod: 2 })).toEqual([0, 1, 0]);
    expect(unrank("lex", 4n, { length: 3, mod: 2 })).toEqual([0, 1, 1]);
    expect(unrank("lex", 5n, { length: 3, mod: 2 })).toEqual([1, 0, 0]);
  });

  test("unrank('grlex', rank, c) is valid for small subset of values", () => {
    // Grlex ordering enumeration for k=3 and m=2:
    //
    // [0, 0, 0]
    // [0, 0, 1]
    // [0, 1, 0]
    // [1, 0, 0]
    // [0, 1, 1]
    // …

    expect(unrank("grlex", 1n, { length: 3, mod: 2 })).toEqual([0, 0, 0]);
    expect(unrank("grlex", 2n, { length: 3, mod: 2 })).toEqual([0, 0, 1]);
    expect(unrank("grlex", 3n, { length: 3, mod: 2 })).toEqual([0, 1, 0]);
    expect(unrank("grlex", 4n, { length: 3, mod: 2 })).toEqual([1, 0, 0]);
    expect(unrank("grlex", 5n, { length: 3, mod: 2 })).toEqual([0, 1, 1]);
  });
});
