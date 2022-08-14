import Maeve, {
    FrameworkOptions,
    HyperParameters,
    genotype,
    selectionStrategy,
    crossoverStrategy,
    mutationStrategy,
} from "../../Maeve";
import { range, sum } from "lodash";
import Problem from "../../Maeve/types/Problem";
import Chromosome from "../../Maeve/types/Chromosome";

const chromosomeLength = 10;

/**
 * Determines the fitness of a chromosome. For a class schedule we want to weight difficulty, usefulness, and interest of each class equally and at the same time make sure we don't exceed 18 credit hours.
 */
function fitnessFunction(chromosome: Chromosome<number>): number {
    const schedule = chromosome.genes.slice();

    const fitness = sum(
        range(0, chromosomeLength).map(
            (i) =>
                schedule[i] *
                (0.3 * difficulty[i] + 0.3 * usefulness[i] + 0.3 * interest[i])
        )
    );

    const credit = sum(
        range(0, chromosomeLength).map((i) => schedule[i] * creditHours[i])
    );

    return credit > 18 ? -99999 : fitness;
}

const creditHours = [3, 3, 3, 4.5, 3, 3, 3, 3, 4.5, 1.5];
const difficulty = [8, 9, 4, 3, 5, 2, 4, 2, 6, 1];
const usefulness = [8, 9, 6, 2, 8, 9, 1, 2, 5, 1];
const interest = [8, 8, 5, 9, 7, 2, 8, 2, 7, 10];

function terminationCriteria(
    bestFitness: Chromosome<number>,
    generation: number
): boolean {
    return generation >= 1000;
}

const problemDefinition: Problem<number> = {
    genotype: () => genotype.binary(chromosomeLength),
    fitnessFunction,
    terminationCriteria,
};

const hyperParams: HyperParameters = {
    populationSize: 100,
    mutationProbability: 0.15,
    coolingRate: 0.8,
};

const frameworkOptions: FrameworkOptions<number> = {
    showLogStream: true,
    hyperParams,
    crossoverFunction: crossoverStrategy.uniform,
    mutationFunction: mutationStrategy.scramble,
    selectionFunction: (
        population: Chromosome<number>[],
        selectionRate: number
    ) => selectionStrategy.tournament(population, selectionRate, 10),
    selectionRate: 0.8,
};

Maeve(problemDefinition, frameworkOptions);
