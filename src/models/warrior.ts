import nameGen from "../utils/nameGen";
import { randInt } from "../utils";

function createWarrior() {
  const firstName = nameGen(2, 7);
  const lastName = nameGen(3, 10);
  const nickname = nameGen(3, 10);
  const age = 0;
  const reproductionSide = 0;
  const weight = 0;
  const mutationFactor = 0;
  const alive = 0;
  const kills = 0;
  const wins = 0;
  const losses = 0;
  const totalDamageDone = 0;
  const ambition = 0;
  const intelligence = 0;
  const maxHealth = 0;
  const currentHealth = 0;
  const maxEndurance = 0;
  const currentEndurance = 0;
  const endurance = 0;
  const flexibility = 0;
  const strength = 0;
  const accuracy = 0;
  const dexterity = 0;
  const reflex = 0;
  const height = 0;
  const speed = 0;
  const power = 0;
  const toughness = 0;

  return {
    firstName,
    lastName,
    nickname,
    age,
    reproductionSide,
    weight,
    mutationFactor,
    alive,
    kills,
    wins,
    losses,
    totalDamageDone,
    ambition,
    intelligence,
    maxHealth,
    currentHealth,
    maxEndurance,
    currentEndurance,
    endurance,
    flexibility,
    strength,
    accuracy,
    dexterity,
    reflex,
    height,
    speed,
    power,
    toughness,
  };
}
