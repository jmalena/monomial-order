import { test, fc } from "@fast-check/jest";

test.prop([fc.integer(), fc.integer()])('a + b = b + a', (a: number, b: number) => {
  expect(a + b).toBe(b + a);
});
