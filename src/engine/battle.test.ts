import { describe, expect, test } from "vitest";
import { attack, goesFirst, makePokemon, startState, step, type BattleState, type Move, type Puzzle } from "./battle";

const thunderbolt: Move = { name: "Thunderbolt", type: "Electric", category: "Special", power: 90, priority: 0 };
const quickAttack: Move = { name: "Quick Attack", type: "Normal", category: "Physical", power: 40, priority: 1 };
const waterfall: Move = { name: "Waterfall", type: "Water", category: "Physical", power: 80, priority: 0 };
const bodySlam: Move = { name: "Body Slam", type: "Normal", category: "Physical", power: 85, priority: 0 };

// Level-50 stats: Pikachu HP 110, Atk 75, Def 60, SpA 70, SpD 70, Spe 110
const pikachu = makePokemon("Pikachu", ["Electric"], { hp: 35, atk: 55, def: 40, spa: 50, spd: 50, spe: 90 }, [thunderbolt, quickAttack]);
// Gyarados HP 170, Atk 145, Def 99, SpA 80, SpD 120, Spe 101
const gyarados = makePokemon("Gyarados", ["Water", "Flying"], { hp: 95, atk: 125, def: 79, spa: 60, spd: 100, spe: 81 }, [waterfall]);
// Snorlax HP 235, Atk 130, Def 85, SpA 85, SpD 130, Spe 50
const snorlax = makePokemon("Snorlax", ["Normal"], { hp: 160, atk: 110, def: 65, spa: 65, spd: 110, spe: 30 }, [bodySlam, quickAttack]);

describe("TASK 1: attack", () => {
  test("Pikachu Thunderbolt vs Gyarados: special, STAB, 4x", () => expect(attack(pikachu, gyarados, thunderbolt)).toBe(148));
  test("Gyarados Waterfall vs Pikachu: physical, STAB", () => expect(attack(gyarados, pikachu, waterfall)).toBe(130));
  test("Snorlax Body Slam vs Gyarados: physical, STAB, neutral", () => expect(attack(snorlax, gyarados, bodySlam)).toBe(76));
  test("Pikachu Quick Attack vs Snorlax: physical, no STAB (uses Atk, not SpA)", () =>
    expect(attack(pikachu, snorlax, quickAttack)).toBe(17));
});

describe("TASK 2: goesFirst", () => {
  test("faster goes first: Pikachu (110) vs Gyarados (101)", () =>
    expect(goesFirst(pikachu, gyarados, thunderbolt, waterfall)).toBe(true));
  test("slower goes second: Snorlax (50) vs Pikachu (110)", () =>
    expect(goesFirst(snorlax, pikachu, bodySlam, thunderbolt)).toBe(false));
  test("priority beats speed: Snorlax Quick Attack vs Pikachu Thunderbolt", () =>
    expect(goesFirst(snorlax, pikachu, quickAttack, thunderbolt)).toBe(true));
  test("speed tie: the player (a) goes first", () => expect(goesFirst(pikachu, pikachu, thunderbolt, thunderbolt)).toBe(true));
});

describe("TASK 3: step", () => {
  const puzzle: Puzzle = { player: [pikachu], enemy: [gyarados, snorlax] };

  test("both attack: Gyarados survives Thunderbolt, then knocks Pikachu out", () => {
    const after = step(puzzle, startState(puzzle), 0, 0);
    expect(after).toEqual({ playerHp: [0], enemyHp: [22, 235], player: 1, enemy: 0, turn: 1 });
  });

  test("a knocked-out Pokémon doesn't attack back, and the next one comes in", () => {
    const before: BattleState = { playerHp: [110], enemyHp: [22, 235], player: 0, enemy: 0, turn: 1 };
    const after = step(puzzle, before, 0, 0);
    expect(after).toEqual({ playerHp: [110], enemyHp: [0, 235], player: 0, enemy: 1, turn: 2 });
  });

  test("step does not change the state you pass in", () => {
    const before = startState(puzzle);
    step(puzzle, before, 0, 0);
    expect(before).toEqual(startState(puzzle));
  });
});
