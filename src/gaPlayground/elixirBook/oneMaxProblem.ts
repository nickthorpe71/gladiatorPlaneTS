import {range} from "../../utils/index";
import logger from "../../utils/logger";

const populationSize = 100;
const chromosomeLength = 1000;

function sleep(ms: number): any {
  return new Promise((resolve: Function) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

function initialPopulation(size: number): number[][] {
  return range(1, size).map(() => randomChromosome(chromosomeLength));
}

function randomChromosome(length: number): number[] {
    return range(1, length).map(() => Math.random() < 0.5 ? 0 : 1);
}

function fitness(chromosome: number[]): number {
  const chromosomeClone = chromosome.slice();
  return chromosomeClone.reduce((acc, curr) => acc + curr, 0);
}

function evaluate(population: number[][]): number[][] {
  const populationClone = population.slice();
  return populationClone.sort(
    (aChromosome: number[], bChromosome: number[]): number => {
    return  fitness(bChromosome) - fitness(aChromosome);
  });
}

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

function crossoverChromosome(parentA: number[], parentB: number[]): number[] {
  const child = parentA.slice();
  const crossoverPoint = Math.floor(Math.random() * chromosomeLength);
  for (let i = crossoverPoint; i < chromosomeLength; i++) {
    child[i] = parentB[i];
  }
  return child;
}

async function algorithm(population: number[][]): Promise<number[]> {
  const populationClone = population.slice();
  const evaluatedPopulation = evaluate(populationClone);
  const best = evaluatedPopulation[0];
  const bestEval = fitness(best);
  logger.info(`Current best is: ${bestEval}`);
  
  if (bestEval > 700) {
    return best;
  }
  else 
  {
    await sleep(2); // to give time for JS heap to reallocate memory
    return algorithm(crossover(selection(evaluatedPopulation)));
  }
}

logger.info(`Solution: ${algorithm(initialPopulation(populationSize))}`);
