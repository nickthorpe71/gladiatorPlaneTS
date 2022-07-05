import {range, sleep} from "../../utils/index";
import logger from "../../utils/logger";
import Maeve, {FrameworkSpec, HyperParameters} from "../gaFramework_v1";


const chromosomeLength = 1000;

/**
 * Creates a random chromosome. This is a random binary string of length chromosomeLength.
 */
function randomChromosome(): number[] {
    return range(1, chromosomeLength).map(() => Math.random() < 0.5 ? 0 : 1);
}

/**
 * Determines the fitness of a chromosome. In this case, the fitness is the number of 1's in the chromosome, 1000 1s being the best.
 */
function fitnessFunction(chromosome: number[]): number {
  const chromosomeClone = chromosome.slice();
  return chromosomeClone.reduce((acc, curr) => acc + curr, 0);
}

/**
 * Crossover chromosome by randomly choosing a point to split the chromosome.
 */
function crossoverFunction(parentA: number[], parentB: number[]): number[] {
  const child = parentA.slice();
  const crossoverPoint = Math.floor(Math.random() * chromosomeLength);
  for (let i = crossoverPoint; i < chromosomeLength; i++) {
    child[i] = parentB[i];
  }
  return child;
}

/**
 * Mutate chromosome by shuffling its bits. This preserves it's fitness.
 */
function mutationFunction(chromosome: number[]): number[] {
  let currentIndex = chromosome.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [chromosome[currentIndex], chromosome[randomIndex]] = [
      chromosome[randomIndex], chromosome[currentIndex]];
  }

  return chromosome;
}

function terminationCriteria(fitnessScore: number): boolean {
  return fitnessScore > 650;
}

const hyperParams: HyperParameters = {
  populationSize: 100,
  mutationProbability: 0.05,
}

const frameworkSpec: FrameworkSpec = {
  hyperParams,
  fitnessFunction,
  terminationCriteria,
  genotype: randomChromosome,
  crossoverFunction,
  mutationFunction,
}

Maeve(frameworkSpec);
