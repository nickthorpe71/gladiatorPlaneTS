import { range, shuffleArray } from "../../../utils/index";
import Maeve, {
    FrameworkOptions,
    HyperParameters,
    selectionFunctions,
    SelectionType,
} from "../../Maeve/gaFramework_v1";
import Problem from "../../Maeve/types/Problem";
import Chromosome, { cloneChromosome } from "../../Maeve/types/Chromosome";

const chromosomeLength = 7;

/**
 * Creates a random chromosome. This is a permutation genotype.
 */
function genotype(): Chromosome<number> {
    const newChromosome: Chromosome<number> = {
        genes: shuffleArray(range(0, chromosomeLength)),
        size: chromosomeLength,
        fitness: 0,
        age: 0,
    };

    return newChromosome;
}

/**
 * Determines the fitness of a chromosome..
 */
function fitnessFunction(chromosome: Chromosome<number>): number {
    const chromosomeGeneClone = chromosome.genes.slice(); // for immutability
    return chromosomeGeneClone.reduce((acc, curr) => acc + curr, 0);
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
    genotype,
    fitnessFunction,
    terminationCriteria,
};

const hyperParams: HyperParameters = {
    populationSize: 100,
    mutationProbability: 0.05,
    coolingRate: 0.8,
};

const frameworkOptions: FrameworkOptions<number> = {
    hyperParams,
    crossoverFunction,
    mutationFunction,
    selectionFunction: selectionFunctions[SelectionType.ELITISM],
    selectionRate: 0.8,
};

Maeve(problemDefinition, frameworkOptions);
