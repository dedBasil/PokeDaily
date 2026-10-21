import { calcDamage, calcHP, calcStat } from "./damage";
import { typeMultiplier } from "./types";

export interface Move {
  name: string;
  type: string;
  category: "Physical" | "Special";
  power: number;
  priority: number; // usually 0; Quick Attack is +1
}

/** A Pokémon with its level-50 stats already calculated. This never changes during a battle. */
export interface Pokemon {
  name: string;
  types: string[];
  maxHp: number;
  atk: number;
  def: number;
  spa: number;
  spd: number;
  spe: number;
  moves: Move[];
}

/** The two fixed teams. Index 0 leads; when one faints, the next index comes in. */
export interface Puzzle {
  player: Pokemon[];
  enemy: Pokemon[];
}

/**
 * Everything that changes during a battle, and nothing else. Kept small on purpose:
 * the solver will create and compare millions of these.
 */
export interface BattleState {
  playerHp: number[]; // current HP of each player Pokémon, same order as puzzle.player
  enemyHp: number[];
  player: number; // index of the player's active Pokémon (= team length when all fainted)
  enemy: number;
  turn: number;
}

export function makePokemon(
  name: string,
  types: string[],
  base: { hp: number; atk: number; def: number; spa: number; spd: number; spe: number },
  moves: Move[],
): Pokemon {
  return {
    name,
    types,
    maxHp: calcHP(base.hp),
    atk: calcStat(base.atk),
    def: calcStat(base.def),
    spa: calcStat(base.spa),
    spd: calcStat(base.spd),
    spe: calcStat(base.spe),
    moves,
  };
}

export function startState(puzzle: Puzzle): BattleState {
  return {
    playerHp: puzzle.player.map((p) => p.maxHp),
    enemyHp: puzzle.enemy.map((p) => p.maxHp),
    player: 0,
    enemy: 0,
    turn: 0,
  };
}

/**
 * TASK 1: how much damage `attacker` does to `defender` with `move`.
 * - Physical moves use attacker.atk vs defender.def; Special moves use attacker.spa vs defender.spd
 * - STAB if the move's type is one of the attacker's types (hint: array.includes(x))
 * - then use calcDamage() and typeMultiplier()
 */
export function attack(attacker: Pokemon, defender: Pokemon, move: Move): number {
  const physical = move.category === "Physical";
  return calcDamage({
    power: move.power,
    attack: physical ? attacker.atk : attacker.spa,
    defense: physical ? defender.def : defender.spd,
    stab: attacker.types.includes(move.type),
    typeMultiplier: typeMultiplier(move.type, defender.types),
  });
}

/**
 * TASK 2: does `a` act before `b` this turn?
 * - higher move priority goes first
 * - same priority: higher speed (spe) goes first
 * - exact tie: `a` goes first (a is always the player, so ties favour the player)
 */
export function goesFirst(a: Pokemon, b: Pokemon, moveA: Move, moveB: Move): boolean {
  if (moveA.priority !== moveB.priority) return moveA.priority > moveB.priority;
  return a.spe >= b.spe;
}

/**
 * TASK 3: play one turn and return the NEW state. Never change `state` itself.
 * 1. Work out who goes first (goesFirst).
 * 2. The first one attacks. Subtract damage from the defender's HP, but never below 0.
 * 3. If the defender hit 0 HP: it fainted. Move that side's active index to the next Pokémon.
 *    It does NOT attack back this turn.
 * 4. Otherwise the second one attacks the first, same rules.
 * 5. turn + 1.
 */
export function step(puzzle: Puzzle, state: BattleState, playerMove: number, enemyMove: number): BattleState {
  // TODO
  return state;
}
