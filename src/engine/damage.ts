// Stat and damage formulas. All Pokémon are level 50, perfect IVs (31), no EVs, neutral nature.
// Rule for this game: floor (round down) after every step, and no random damage roll.

export const LEVEL = 50;

/** HP stat:     floor((2 × base + 31) × level / 100) + level + 10 */
export function calcHP(base: number): number {
  // TODO
  return 0;
}

/** Other stats: floor((2 × base + 31) × level / 100) + 5 */
export function calcStat(base: number): number {
  // TODO
  return 0;
}

export interface DamageInput {
  power: number; // the move's basePower, e.g. 90
  attack: number; // attacker's Attack (physical move) or Sp. Atk (special move), already calculated
  defense: number; // defender's Defense or Sp. Def, already calculated
  stab: boolean; // "same type attack bonus": move type matches one of the attacker's types
  typeMultiplier: number; // 0, 0.25, 0.5, 1, 2 or 4
}

/**
 * 1. base   = floor(floor(floor(2 × level / 5 + 2) × power × attack / defense) / 50) + 2
 * 2. if stab: base = floor(base × 1.5)
 * 3. damage = floor(base × typeMultiplier)
 */
export function calcDamage(input: DamageInput): number {
  // TODO
  return 0;
}
