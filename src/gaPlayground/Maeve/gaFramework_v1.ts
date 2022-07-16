import { range, sleep } from "../../utils/index";
import logger from "../../utils/logger";

import Problem from "./types/Problem";
import Chromosome, { stringifyChromosome } from "./types/Chromosome";

// TODO
// fitnessFunction should always return a number
// handle uneven population sizes

/**
 * Creates a random population of chromosomes.
 */
function initialPopulation<T>(
    chromosome: Chromosome<T>,
    size: number
): Chromosome<T>[] {
    return range(1, size).map(() => chromosome);
}

/**
 * Process of evaluating the population.
 */
function evaluate<T>(
    population: Chromosome<T>[],
    fitnessFunction: Function
): Chromosome<T>[] {
    const populationClone = population.slice(); // for immutability
    return populationClone
        .map((chromosome: Chromosome<T>) => {
            chromosome.fitness = fitnessFunction(chromosome);
            chromosome.age = chromosome.age + 1;
            return chromosome;
        })
        .sort(
            (
                aChromosome: Chromosome<T>,
                bChromosome: Chromosome<T>
            ): number => {
                return bChromosome.fitness - aChromosome.fitness;
            }
        );
}

/**
 * Process of selecting the best parents to breed. In this case, selection is simply pairing adjacent parents.
 */
function selection<T>(population: Chromosome<T>[]): Chromosome<T>[][] {
    const populationSize = population.length;
    let populationClone = population.slice(); // for immutability
    let matchedPopulation: Chromosome<T>[][] = [];
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
function crossover<T>(
    matchedPopulation: Chromosome<T>[][],
    crossoverFunction: Function
): Chromosome<T>[] {
    const halfPopulationSize = matchedPopulation.length;
    let populationClone = matchedPopulation.slice(); // for immutability
    let newPopulation: Chromosome<T>[] = [];
    for (let i = 0; i < halfPopulationSize; i++) {
        const parentA: Chromosome<T> = populationClone[0][0];
        const parentB: Chromosome<T> = populationClone[0][1];
        const child1: Chromosome<T> = crossoverFunction(parentA, parentB);
        const child2: Chromosome<T> = crossoverFunction(parentA, parentB);
        newPopulation.push(child1);
        newPopulation.push(child2);
        populationClone.splice(0, 1);
    }
    return newPopulation;
}

/**
 * Process of mutating the population.
 */
function mutation<T>(
    population: Chromosome<T>[],
    mutationFunction: Function,
    mutationProbability: number
): Chromosome<T>[] {
    let populationClone = population.slice(); // for immutability
    return populationClone.map((chromosome) =>
        Math.random() < mutationProbability
            ? mutationFunction(chromosome)
            : chromosome
    );
}

/**
 * Evolves the population towards the best solution.
 */
async function evolve<T>(
    population: Chromosome<T>[],
    problem: Problem<T>,
    options: FrameworkOptions<T>,
    start: number
): Promise<Chromosome<T>> {
    const populationClone = population.slice(); // for immutability
    const evaluatedPopulation = evaluate<T>(
        populationClone,
        problem.fitnessFunction
    );
    const best = evaluatedPopulation[0];
    const bestScore = problem.fitnessFunction(best);

    if (options.showLogStream)
        logger.info(`Current best score is: ${bestScore}`);

    if (problem.terminationCriteria(best)) {
        const stop = Date.now();
        logger.info(`Time Taken to execute = ${(stop - start) / 1000} seconds`);
        logger.info(stringifyChromosome(best));
        return best;
    } else {
        // sleep 2ms to give JS heap time to reallocate memory
        await sleep(2);

        return evolve<T>(
            mutation<T>(
                crossover<T>(
                    selection<T>(evaluatedPopulation),
                    options.crossoverFunction
                ),
                options.mutationFunction,
                options.hyperParams.mutationProbability
            ),
            problem,
            options,
            start
        );
    }
}

/**
 * Initializes the population and evolves it.
 */
export default async function run<T>(
    problem: Problem<T>,
    options: FrameworkOptions<T>
): Promise<Chromosome<T>> {
    const startTime = Date.now();
    const population = initialPopulation<T>(
        problem.genotype(),
        options.hyperParams.populationSize
    );
    return await evolve<T>(population, problem, options, startTime);
}

export interface FrameworkOptions<T> {
    showLogStream?: boolean;
    hyperParams: HyperParameters;
    crossoverFunction: (
        parentA: Chromosome<T>,
        parentB: Chromosome<T>
    ) => Chromosome<T>;
    mutationFunction: (chromosome: Chromosome<T>) => Chromosome<T>;
}

export interface HyperParameters {
    populationSize: number;
    mutationProbability: number;
}
