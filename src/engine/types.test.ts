import { expect, test } from "vitest";
import { typeMultiplier } from "./types";

test("super effective: Electric vs Water", () => expect(typeMultiplier("Electric", ["Water"])).toBe(2));
test("not very effective: Fire vs Water", () => expect(typeMultiplier("Fire", ["Water"])).toBe(0.5));
test("neutral (not in the chart): Normal vs Fire", () => expect(typeMultiplier("Normal", ["Fire"])).toBe(1));
test("immune: Electric vs Ground", () => expect(typeMultiplier("Electric", ["Ground"])).toBe(0));

test("dual type 2 × 2 = 4: Electric vs Water/Flying", () =>
  expect(typeMultiplier("Electric", ["Water", "Flying"])).toBe(4));
test("dual type 0.5 × 0.5 = 0.25: Ice vs Water/Ice", () =>
  expect(typeMultiplier("Ice", ["Water", "Ice"])).toBe(0.25));
test("dual type 2 × 0.5 = 1: Grass vs Water/Flying", () =>
  expect(typeMultiplier("Grass", ["Water", "Flying"])).toBe(1));
test("dual type with immunity 2 × 0 = 0: Ground vs Water/Flying", () =>
  expect(typeMultiplier("Ground", ["Water", "Flying"])).toBe(0));
