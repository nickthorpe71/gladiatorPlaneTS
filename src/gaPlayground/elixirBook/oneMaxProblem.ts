import {range} from "../../utils/index";
import logger from "../../utils/logger";

const populationSize = 100;
const chromosomeLength = 1000;

function initialPopulation(size: number): number[][] {
  return range(1, size).map(() => randomChromosome(chromosomeLength));
}

function randomChromosome(length: number): number[] {
    return range(1, length).map(() => Math.random() < 0.5 ? 0 : 1);
}

function fitness(chromosome: number[]): number {
  return chromosome.reduce((acc, curr) => acc + curr, 0);
}

function algorithm(population: number[][]): number[] {
  const populationClone = population.slice();
  const best = populationClone.sort(
    (aChromosome: number[], bChromosome: number[]): number => {
    return fitness(aChromosome) - fitness(bChromosome);
  })[0];
  logger.info(`Current best is ${best}`);
  return fitness(best) === 1000 ? best : algorithm(populationClone);
}


algorithm(initialPopulation(populationSize));