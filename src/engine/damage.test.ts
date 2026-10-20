import { describe, expect, test } from "vitest";
import { calcDamage, calcHP, calcStat } from "./damage";

describe("stats at level 50", () => {
  test("Pikachu HP (base 35)", () => expect(calcHP(35)).toBe(110));
  test("Gyarados HP (base 95)", () => expect(calcHP(95)).toBe(170));
  test("Pikachu Speed (base 90)", () => expect(calcStat(90)).toBe(110));
  test("Pikachu Sp. Atk (base 50)", () => expect(calcStat(50)).toBe(70));
  test("Gyarados Sp. Def (base 100)", () => expect(calcStat(100)).toBe(120));
});

describe("damage", () => {
  test("Pikachu Thunderbolt vs Gyarados: STAB and 4x super effective", () => {
    expect(calcDamage({ power: 90, attack: 70, defense: 120, stab: true, typeMultiplier: 4 })).toBe(148);
  });

  test("Pikachu Thunderbolt vs Snorlax (Sp. Def 130): STAB, neutral", () => {
    expect(calcDamage({ power: 90, attack: 70, defense: 130, stab: true, typeMultiplier: 1 })).toBe(34);
  });

  test("no STAB, neutral", () => {
    expect(calcDamage({ power: 90, attack: 70, defense: 130, stab: false, typeMultiplier: 1 })).toBe(23);
  });

  test("Electric move vs Ground type does nothing", () => {
    expect(calcDamage({ power: 90, attack: 70, defense: 120, stab: true, typeMultiplier: 0 })).toBe(0);
  });
});
