import nameGen from "../utils/nameGen";
import { randInt, randFloat } from "../utils";

export interface Warrior {
  firstName: string;
  lastName: string;
  nickname: string;
  age: number;
  height: number;
  weight: number;
  mutationFactor: number;
  alive: boolean;
  kills: number;
  wins: number;
  losses: number;
  totalDamageDone: number;
  ambition: number;
  intelligence: number;
  maxHealth: number;
  maxEndurance: number;
  enduranceFactor: number;
  flexibility: number;
  strength: number;
  accuracy: number;
  dexterity: number;
  reflex: number;
  speed: number;
  power: number;
  toughness: number;
}

export default function createWarrior(): Warrior {
  const firstName = nameGen(2, 7);
  const lastName = nameGen(3, 10);
  const nickname = nameGen(3, 10);
  const age = randInt(10, 150);
  const height = randInt(65, 250) + randFloat(0, 1);
  const weight = randInt(70, 400) + height / 5 + randFloat(0, 1);
  const mutationFactor = randFloat(0, 1);
  const alive = true;
  const kills = 0;
  const wins = 0;
  const losses = 0;
  const totalDamageDone = 0;
  const ambition = randInt(10, 100);
  const intelligence = randInt(10, 100);
  const maxHealth = randInt(100, 1000) + height / 5 + weight / 5;
  const enduranceFactor =
    (randInt(1, 100) -
      weight * randFloat(0, 0.075) -
      height * randFloat(0, 0.1)) *
      randFloat(0.85, 1.15) +
    25;
  const maxEndurance = enduranceFactor * 10 * randFloat(0.85, 1.15);
  const flexibility = randInt(5, 75) - weight * randFloat(0, 0.075) + 25;
  const strength =
    (randInt(2, 50) + weight / 40 + height / 8) * randFloat(0.85, 1.15);
  const accuracy = (randInt(5, 75) + intelligence / 4) * randFloat(0.85, 1.15);
  const dexterity = randInt(5, 75) + (accuracy / 4) * randFloat(0.85, 1.15);
  const reflex =
    randInt(20, 30) +
    flexibility / 4 +
    dexterity / 4 -
    weight * randFloat(0, 0.075) -
    height * randFloat(0, 0.1);
  const speed =
    randInt(25, 100) -
    weight * randFloat(0, 0.075) -
    height * randFloat(0, 0.1);
  const power = (strength + speed) / 2;
  const toughness = (strength + ambition) / 2;

  return {
    firstName,
    lastName,
    nickname,
    age,
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
    maxEndurance,
    enduranceFactor,
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
