import {range} from "../../utils/index";

const populationSize = 100;
const chromosomeLength = 1000;

function initialPopulation(size: number): number[][] {
  return range(1, size).map(() => randomChromosome(chromosomeLength));
}

function randomChromosome(length: number): number[] {
    return range(1, length).map(() => Math.random() < 0.5 ? 0 : 1);
}


console.log(initialPopulation(populationSize));