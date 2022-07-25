import { range } from "../../../utils";
import Maeve, {
    FrameworkOptions,
    HyperParameters,
} from "../../Maeve/gaFramework_v1";
import logger from "../../../utils/logger";
import Problem from "../../Maeve/types/Problem";
import Chromosome, { cloneChromosome } from "../../Maeve/types/Chromosome";
const reader = require("readline-sync");

const chromosomeLength = 1000;

/**
 * Creates a random chromosome. This is a random binary string of length chromosomeLength.
 */
function randomChromosome(): Chromosome<number> {
    const newChromosome: Chromosome<number> = {
        genes: range(1, chromosomeLength).map(() =>
            Math.random() < 0.5 ? 0 : 1
        ),
        size: chromosomeLength,
        fitness: 0,
        age: 0,
    };

    return newChromosome;
}

/**
 * Determines the fitness of a chromosome. In this case, the fitness is the number of 1's in the chromosome, 1000 1s being the best.
 */
function fitnessFunction(chromosome: Chromosome<number>): number {
    console.log(chromosome);
    const rating = reader.question("Rate from 1 to 10 ");
    return rating;
}

/**
 * Crossover chromosome by randomly choosing a point to split the chromosome.
 */
function crossoverFunction(
    parentA: Chromosome<number>,
    parentB: Chromosome<number>
): Chromosome<number> {
    const child: Chromosome<number> = cloneChromosome<number>(parentA);
    child.fitness = 0;
    child.age = 0;
    const crossoverPoint = Math.floor(Math.random() * parentA.size);
    for (let i = crossoverPoint; i < chromosomeLength; i++) {
        child.genes[i] = parentB.genes[i];
    }
    return child;
}

/**
 * Mutate chromosome by shuffling its bits. This preserves it's fitness.
 */
function mutationFunction(chromosome: Chromosome<number>): Chromosome<number> {
    const chromosomeClone: Chromosome<number> =
        cloneChromosome<number>(chromosome);
    let currentIndex = chromosomeClone.size;
    let randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [
            chromosomeClone.genes[currentIndex],
            chromosomeClone.genes[randomIndex],
        ] = [
            chromosomeClone.genes[randomIndex],
            chromosomeClone.genes[currentIndex],
        ];
    }

    return chromosomeClone;
}

function terminationCriteria(
    chromosome: Chromosome<number>,
    generation: number
): boolean {
    return chromosome.fitness > 650;
}

const problemDefinition: Problem<number> = {
    genotype: randomChromosome,
    fitnessFunction,
    terminationCriteria,
};

const hyperParams: HyperParameters = {
    populationSize: 10,
    mutationProbability: 0.05,
    coolingRate: 0.8,
};

const frameworkOptions: FrameworkOptions<number> = {
    hyperParams,
    crossoverFunction,
    mutationFunction,
};

Maeve(problemDefinition, frameworkOptions);
