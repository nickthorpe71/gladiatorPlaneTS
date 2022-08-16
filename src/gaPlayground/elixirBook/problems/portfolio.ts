import { range, randInt } from "../../../utils/index";
import Maeve, {
    FrameworkOptions,
    HyperParameters,
    selectionStrategy,
    crossoverStrategy,
} from "../../Maeve";
import Problem from "../../Maeve/modules/Problem";
import Chromosome, { cloneChromosome } from "../../Maeve/modules/Chromosome";

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
 * Determines the fitness of a chromosome. In this instance this is the weighted sum of the RoI minus risk.
 * More specifically, the RoI is twice as important as the risk in this situation.
 */
function fitnessFunction(chromosome: Chromosome<[number, number]>): number {
    return chromosome.genes
        .map(([roi, risk]) => 2 * roi - risk)
        .reduce((a, b) => a + b);
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
    bestFitness: Chromosome<[number, number]>
): boolean {
    return bestFitness.fitness === 180;
}

const problemDefinition: Problem<[number, number]> = {
    genotype,
    fitnessFunction,
    terminationCriteria,
};

const hyperParams: HyperParameters = {
    populationSize: 500,
    mutationProbability: 0.07,
    coolingRate: 1,
};

const frameworkOptions: FrameworkOptions<[number, number]> = {
    showLogStream: true,
    hyperParams,
    crossoverFunction: (
        parent1: Chromosome<[number, number]>,
        parent2: Chromosome<[number, number]>
    ) => crossoverStrategy.uniform(parent1, parent2, 0.5),
    mutationFunction,
    selectionFunction: (
        population: Chromosome<[number, number]>[],
        selectionRate: number
    ) => selectionStrategy.tournament(population, selectionRate, 20),
    selectionRate: 1,
};

Maeve(problemDefinition, frameworkOptions);
