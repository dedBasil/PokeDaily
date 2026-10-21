# Move priorities

Generated from `data/raw/moves.json` (Showdown). The 900+ moves not listed here have priority **0**.
Higher priority always acts first; speed only decides between equal priorities.

✅ = plain damaging move, safe for v1. ⚠️ = needs special logic the engine doesn't have yet.

## +5 to +4: status only (not in v1)
Helping Hand (+5) · Protect, Detect, Endure, Baneful Bunker, Burning Bulwark, Silk Trap, Spiky Shield (+4)

## +3
| Move | Type | Cat. | Power | v1 |
|---|---|---|---|---|
| Fake Out | Normal | Physical | 40 | ⚠️ only works on the first turn out, flinches |
| Upper Hand | Fighting | Physical | 65 | ⚠️ only works if the target uses a priority move |

## +2
| Move | Type | Cat. | Power | v1 |
|---|---|---|---|---|
| Extreme Speed | Normal | Physical | 80 | ✅ |
| First Impression | Bug | Physical | 90 | ⚠️ only works on the first turn out |
| Feint | Normal | Physical | 30 | ⚠️ breaks Protect |

## +1
| Move | Type | Cat. | Power | v1 |
|---|---|---|---|---|
| Quick Attack | Normal | Physical | 40 | ✅ |
| Accelerock | Rock | Physical | 40 | ✅ |
| Aqua Jet | Water | Physical | 40 | ✅ |
| Bullet Punch | Steel | Physical | 40 | ✅ |
| Ice Shard | Ice | Physical | 40 | ✅ |
| Mach Punch | Fighting | Physical | 40 | ✅ |
| Shadow Sneak | Ghost | Physical | 40 | ✅ |
| Jet Punch | Water | Physical | 60 | ✅ |
| Vacuum Wave | Fighting | Special | 40 | ✅ |
| Sucker Punch | Dark | Physical | 70 | ⚠️ fails unless the target is attacking |
| Thunderclap | Electric | Special | 70 | ⚠️ fails unless the target is attacking |
| Water Shuriken | Water | Special | 15 | ⚠️ hits 2–5 times |

## Negative: always act last
| Priority | Move | Type | Cat. | Power | v1 |
|---|---|---|---|---|---|
| −3 | Focus Punch | Fighting | Physical | 150 | ⚠️ fails if hit first |
| −3 | Beak Blast | Flying | Physical | 100 | ⚠️ burns attackers while charging |
| −4 | Avalanche | Ice | Physical | 60 | ⚠️ double power if hit first |
| −5 | Counter / Mirror Coat | Fighting / Psychic | Phys. / Spec. | — | ⚠️ returns double the damage taken |
| −6 | Dragon Tail / Circle Throw | Dragon / Fighting | Physical | 60 | ⚠️ forces a switch |
| −6 | Roar, Whirlwind, Teleport | | Status | — | not in v1 |
| −7 | Trick Room | Psychic | Status | — | not in v1 |

## For v1
Only the ✅ moves: **Extreme Speed (+2)** and the nine **+1** moves. Everything else is priority 0.
They matter for puzzles: a weak priority move can finish off a faster enemy before it acts.
