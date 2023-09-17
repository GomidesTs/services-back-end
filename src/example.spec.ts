import { expect, test } from "vitest";

const input = Math.sqrt(4);
const inputs = Math.sqrt(9);

test("sqrt to 4 and 2", () => {
  expect(input).to.equal(2);
  expect(input).toBe(2);
});

test("sqrt to 9 and 3", () => {
  expect(inputs).to.equal(3);
  expect(inputs).toBe(3);
});
