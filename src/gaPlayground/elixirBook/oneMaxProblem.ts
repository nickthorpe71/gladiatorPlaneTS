import {range, sleep} from "../../utils/index";
import logger from "../../utils/logger";

const populationSize = 100;
const chromosomeLength = 1000;

/**
 * Creates a random population of chromosomes.
 */
function initialPopulation(size: number): number[][] {
  return range(1, size).map(() => randomChromosome(chromosomeLength));
}

/**
 * Creates a random chromosome. This is a random binary string of length chromosomeLength.
 */
function randomChromosome(length: number): number[] {
    return range(1, length).map(() => Math.random() < 0.5 ? 0 : 1);
}

/**
 * Determines the fitness of a chromosome. In this case, the fitness is the number of 1's in the chromosome, 1000 1s being the best.
 */
function fitness(chromosome: number[]): number {
  const chromosomeClone = chromosome.slice();
  return chromosomeClone.reduce((acc, curr) => acc + curr, 0);
}

/**
 * Process of evaluating the population.
 */
function evaluate(population: number[][]): number[][] {
  const populationClone = population.slice();
  return populationClone.sort(
    (aChromosome: number[], bChromosome: number[]): number => {
    return  fitness(bChromosome) - fitness(aChromosome);
  });
}

/**
 * Process of selecting the best parents to breed. In this case, selection is simply pairing adjacent parents.
 */
function selection(population: number[][]): number[][][] {
  let populationClone = population.slice();
  let matchedPopulation: number[][][] = [];
  for (let i = 0; i < populationSize / 2; i++) {
    const parentA = populationClone[0];
    const parentB = populationClone[1];
    matchedPopulation.push([parentA, parentB]);
    populationClone.splice(0, 2);
  }
  return matchedPopulation;
}

/**
 * Process of breeding (crossover) the population. Two parents create two children to preserve population size.
 */
function crossover(matchedPopulation: number[][][]): number[][] {
  let populationClone = matchedPopulation.slice();
  let newPopulation: number[][] = [];
  for (let i = 0; i < populationSize / 2; i++) {
    const parentA = populationClone[0][0];
    const parentB = populationClone[0][1];
    const child1 = crossoverChromosome(parentA, parentB);
    const child2 = crossoverChromosome(parentA, parentB);
    newPopulation.push(child1);
    newPopulation.push(child2);
    populationClone.splice(0, 1);
  }
  return newPopulation;
}

/**
 * Crossover chromosome by randomly choosing a point to split the chromosome.
 */
function crossoverChromosome(parentA: number[], parentB: number[]): number[] {
  const child = parentA.slice();
  const crossoverPoint = Math.floor(Math.random() * chromosomeLength);
  for (let i = crossoverPoint; i < chromosomeLength; i++) {
    child[i] = parentB[i];
  }
  return child;
}

/**
 * Process of mutating the population.
 */
function mutation(population: number[][]): number[][] {
  const mutationProbability = 0.10; // 10% chance of mutation
  let populationClone = population.slice();
  return populationClone.map(chromosome => Math.random() < mutationProbability ? mutate(chromosome) : chromosome);
}

/**
 * Mutate chromosome by shuffling its bits. This preserves it's fitness.
 */
function mutate(chromosome: number[]): number[] {
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

/**
 * Driving algorithm to evolve the population towards the best solution.
 */
async function algorithm(population: number[][]): Promise<number[]> {
  const populationClone = population.slice();
  const evaluatedPopulation = evaluate(populationClone);
  const best = evaluatedPopulation[0];
  const bestEval = fitness(best);
  logger.info(`Current best is: ${bestEval}`);
  
  if (bestEval === 1000) {
    const stop = Date.now();
    logger.info(`Solution: ${best}`);
    logger.info(`Time Taken to execute = ${(stop - start)/1000} seconds`);
    return best;
  }
  else 
  {
    // sleep 2ms to give time for JS heap to reallocate memory
    await sleep(2); 
    return algorithm(mutation(crossover(selection(evaluatedPopulation))));
  }
}

const start = Date.now();
algorithm(initialPopulation(populationSize));
