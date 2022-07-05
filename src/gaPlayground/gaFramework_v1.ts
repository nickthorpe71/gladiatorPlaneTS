import {range, sleep} from "../utils/index";
import logger from "../utils/logger";

// TODO
// fitnessFunction should always return a number
// handle uneven population sizes

/**
 * Creates a random population of chromosomes.
 */
function initialPopulation<T>(chromosome: Function, size: number): T[] {
  return range(1, size).map(() => chromosome());
}

/**
 * Process of evaluating the population.
 */
function evaluate<T>(population: T[], fitnessFunction: Function): T[] {
  const populationClone = population.slice(); // for immutability
  return populationClone.sort(
    (aChromosome: T, bChromosome: T): number => {
    return  fitnessFunction(bChromosome) - fitnessFunction(aChromosome);
  });
}

/**
 * Process of selecting the best parents to breed. In this case, selection is simply pairing adjacent parents.
 */
function selection<T>(population: T[]): T[][] {
  const populationSize = population.length;
  let populationClone = population.slice(); // for immutability
  let matchedPopulation: T[][] = [];
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
function crossover<T>(matchedPopulation: T[][], crossoverFunction: Function): T[] {
  const halfPopulationSize = matchedPopulation.length;
  let populationClone = matchedPopulation.slice(); // for immutability
  let newPopulation: T[] = [];
  for (let i = 0; i < halfPopulationSize; i++) {
    const parentA = populationClone[0][0];
    const parentB = populationClone[0][1];
    const child1 = crossoverFunction(parentA, parentB);
    const child2 = crossoverFunction(parentA, parentB);
    newPopulation.push(child1);
    newPopulation.push(child2);
    populationClone.splice(0, 1);
  }
  return newPopulation;
}

/**
 * Process of mutating the population.
 */
function mutation<T>(population: T[], mutationFunction: Function, mutationProbability: number): T[] {
  let populationClone = population.slice(); // for immutability
  return populationClone.map(chromosome => Math.random() < mutationProbability ? mutationFunction(chromosome) : chromosome);
}

/**
 * Evolves the population towards the best solution.
 */
async function evolve<T>(population: T[], fitnessFunction: Function, terminationCriteria: Function, genotype: Function, crossoverFunction: Function, mutationFunction: Function, mutationProbability: number, start: number): Promise<T> {
  const populationClone = population.slice(); // for immutability
  const evaluatedPopulation = evaluate<T>(populationClone, fitnessFunction);
  const best = evaluatedPopulation[0];
  const bestScore = fitnessFunction(best);
  logger.info(`Current best score is: ${bestScore}`);
  
  if (terminationCriteria(bestScore)) {
    const stop = Date.now();
    logger.info(`Solution: ${best}\nScore: ${bestScore}`);
    logger.info(`Time Taken to execute = ${(stop - start)/1000} seconds`);
    return best;
  }
  else 
  {
    // sleep 2ms to give time for JS heap to reallocate memory
    await sleep(2);

    return evolve<T>(
      mutation<T>(
        crossover<T>(
          selection<T>(
            evaluatedPopulation
          ), crossoverFunction
        ), mutationFunction, mutationProbability
      ), fitnessFunction, terminationCriteria, genotype, crossoverFunction, mutationFunction, mutationProbability, start
    );
  }
}

/**
 * Initializes the population and evolves it.
 */
export default async function run<T>(spec: FrameworkSpec): Promise<T> {
  const startTime = Date.now();
  const population = initialPopulation<T>(spec.genotype, spec.hyperParams.populationSize);
  return await evolve<T>(
    population,
    spec.fitnessFunction,
    spec.terminationCriteria,
    spec.genotype,
    spec.crossoverFunction,
    spec.mutationFunction,
    spec.hyperParams.mutationProbability,
    startTime
  );
}

export interface FrameworkSpec{
  hyperParams: HyperParameters,
  fitnessFunction: Function,
  terminationCriteria: Function,
  genotype: Function,
  crossoverFunction: Function,
  mutationFunction: Function
}

export interface HyperParameters{ 
  populationSize: number,
  mutationProbability: number,
}