import { range } from "../../../utils/index";
import Maeve, {
    FrameworkOptions,
    HyperParameters,
    selectionStrategy,
} from "../../Maeve/gaFramework_v1";
import Problem from "../../Maeve/types/Problem";
import Chromosome, { cloneChromosome } from "../../Maeve/types/Chromosome";

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
    const chromosomeGeneClone = chromosome.genes.slice(); // for immutability
    return chromosomeGeneClone.reduce((acc, curr) => acc + curr, 0);
}

/**
 * Crossover chromosome by randomly choosing a point to split the chromosome.
 */
function crossoverFunction(
    parentA: Chromosome<number>,
    parentB: Chromosome<number>
): Chromosome<number>[] {
    const child1: Chromosome<number> = cloneChromosome<number>(parentA);
    child1.fitness = 0;
    child1.age = 0;
    const child2: Chromosome<number> = cloneChromosome<number>(parentB);
    child2.fitness = 0;
    child2.age = 0;
    const crossoverPoint = Math.floor(Math.random() * parentA.size);

    for (let i = crossoverPoint; i < chromosomeLength; i++) {
        child1.genes[i] = parentB.genes[i];
        child2.genes[i] = parentA.genes[i];
    }

    return [child1, child2];
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
    return chromosome.fitness > 900;
}

const problemDefinition: Problem<number> = {
    genotype: randomChromosome,
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
    showLogStream: true,
    crossoverFunction,
    mutationFunction,
    selectionFunction: selectionStrategy.elitism,
    selectionRate: 0.8,
};

Maeve(problemDefinition, frameworkOptions);
