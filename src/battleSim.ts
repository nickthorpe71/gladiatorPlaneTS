import { Warrior } from "./models/warrior";

export default function runBattleSim(
  warrior1: Warrior,
  warrior2: Warrior,
  battleLength: number
) {
  const initialState = initBattleState(warrior1, warrior2, battleLength);
}

function initBattleState(
  warrior1: Warrior,
  warrior2: Warrior,
  battleLength: number
): BattleState {
  return {
    elapsedTime: 0,
    battleLength,
    warrior1: {
      baseStats: warrior1,
      battleStats: initWarriorBattleStats(warrior1),
    },
    warrior2: {
      baseStats: warrior2,
      battleStats: initWarriorBattleStats(warrior2),
    },
    winner: {},
    loser: {},
  };
}

function initWarriorBattleStats(warrior: Warrior): WarriorBattleStats {
  return {
    nextAction: 0,
    currentHealth: warrior.maxHealth,
    currentEndurance: warrior.maxEndurance,
    damageDone: 0,
    totalAttacks: 0,
    numberOfHits: 0,
    numberOfMisses: 0,
    numberOfCrits: 0,
    score: 0,
  };
}

function battleSim(warrior1: Warrior, warrior2: Warrior, battleLength: number) {
  // going to call itself recursively until
}

interface WarriorState {
  baseStats: Warrior;
  battleStats: WarriorBattleStats;
}

interface BattleState {
  elapsedTime: number;
  battleLength: number;
  warrior1: WarriorState;
  warrior2: WarriorState;
  winner?: object;
  loser?: object;
}

interface WarriorBattleStats {
  nextAction: number;
  currentHealth: number;
  currentEndurance: number;
  damageDone: number;
  totalAttacks: number;
  numberOfHits: number;
  numberOfMisses: number;
  numberOfCrits: number;
  score: number;
}
