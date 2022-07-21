import { range, randInt } from "../../../utils/index";
import Maeve, {
    FrameworkOptions,
    HyperParameters,
} from "../../Maeve/gaFramework_v1";
import Problem from "../../Maeve/types/Problem";
import Chromosome, { cloneChromosome } from "../../Maeve/types/Chromosome";

const chromosomeLength = 10;

/**
 * Creates a random chromosome. This is a random binary string of length chromosomeLength.
 */
function genotype(): Chromosome<[number, number]> {
    const newChromosome: Chromosome<[number, number]> = {
        genes: range(1, chromosomeLength).map(() => [
            randInt(0, 10),
            randInt(0, 10),
        ]),
        size: chromosomeLength,
        fitness: 0,
        age: 0,
    };

    return newChromosome;
}

/**
 * Determines the fitness of a chromosome.
 */
function fitnessFunction(chromosome: Chromosome<[number, number]>): number {
    // TODO
    return 0;
}

/**
 * Crossover chromosome by randomly choosing a point to split the chromosome.
 */
function crossoverFunction(
    parentA: Chromosome<[number, number]>,
    parentB: Chromosome<[number, number]>
): Chromosome<[number, number]> {
    const child: Chromosome<[number, number]> =
        cloneChromosome<[number, number]>(parentA);
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
function mutationFunction(
    chromosome: Chromosome<[number, number]>
): Chromosome<[number, number]> {
    const chromosomeClone: Chromosome<[number, number]> =
        cloneChromosome<[number, number]>(chromosome);
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
    bestFitness: Chromosome<[number, number]>,
    generation: number
): boolean {
    return bestFitness.fitness === 180;
}

const problemDefinition: Problem<[number, number]> = {
    genotype,
    fitnessFunction,
    terminationCriteria,
};

const hyperParams: HyperParameters = {
    populationSize: 1500,
    mutationProbability: 0.05,
    coolingRate: 0.8,
};

const frameworkOptions: FrameworkOptions<[number, number]> = {
    showLogStream: true,
    hyperParams,
    crossoverFunction,
    mutationFunction,
};

Maeve(problemDefinition, frameworkOptions);
