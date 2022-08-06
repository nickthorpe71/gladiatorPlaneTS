import { sleep, chunkEvery } from "../../utils/index";
import { range } from "lodash";
import logger from "../../utils/logger";

import Problem from "./types/Problem";
import Chromosome, { stringifyChromosome } from "./types/Chromosome";

/**
 * Creates a random population of chromosomes.
 */
function initialPopulation<T>(
    chromosome: Chromosome<T>,
    size: number
): Chromosome<T>[] {
    return range(0, size - 1).map(() => chromosome);
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
function selection<T>(
    population: Chromosome<T>[],
    selectionFunction: (
        population: Chromosome<T>[],
        numToSelect: number
    ) => Chromosome<T>[],
    selectionRate: number
): { parents: Chromosome<T>[][]; leftovers: Chromosome<T>[] } {
    const populationSize = population.length;
    let populationClone = population.slice(); // for immutability

    const roundedPopulationSize = Math.round(populationSize * selectionRate);
    // Make sure we have enough parents to make pairs
    const numParents =
        roundedPopulationSize % 2 === 0
            ? roundedPopulationSize
            : roundedPopulationSize + 1;

    const selectedParents = selectionFunction(populationClone, numParents);
    const parents = chunkEvery(selectedParents, 2);
    const leftovers = populationClone.splice(numParents);

    return { parents, leftovers };
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
    generation: number,
    lastMaxFitness: number,
    temperature: number,
    options: FrameworkOptions<T>,
    start: number
): Promise<Chromosome<T>> {
    const populationClone = population.slice(); // for immutability
    const evaluatedPopulation = evaluate<T>(
        populationClone,
        problem.fitnessFunction
    );
    const best = evaluatedPopulation[0];
    const bestFitness = problem.fitnessFunction(best);
    const newTemperature =
        (1 - options.hyperParams.coolingRate) *
        (temperature + (bestFitness - lastMaxFitness));

    if (options.showLogStream)
        logger.info(`Current best fitness is: ${bestFitness}`);

    if (problem.terminationCriteria(best, generation, newTemperature)) {
        const stop = Date.now();
        logger.info(`Time Taken to execute = ${(stop - start) / 1000} seconds`);
        logger.info(stringifyChromosome(best));
        return best;
    } else {
        await sleep(0.001); // sleep 1 microsecond to give JS heap time to reallocate memory / prevent max call stack error

        const { parents, leftovers } = selection<T>(
            populationClone,
            options.selectionFunction,
            options.selectionRate
        );

        const children = crossover<T>(parents, options.crossoverFunction);
        const newPopulation = children.concat(leftovers);

        return evolve<T>(
            mutation<T>(
                newPopulation,
                options.mutationFunction,
                options.hyperParams.mutationProbability
            ),
            problem,
            generation + 1,
            bestFitness,
            newTemperature,
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
    const generation = 0;
    const lastMaxFitness = 0;
    const temperature = 0;
    return await evolve<T>(
        population,
        problem,
        generation,
        lastMaxFitness,
        temperature,
        options,
        startTime
    );
}

export interface FrameworkOptions<T> {
    showLogStream?: boolean;
    hyperParams: HyperParameters;
    crossoverFunction: (
        parentA: Chromosome<T>,
        parentB: Chromosome<T>
    ) => Chromosome<T>;
    mutationFunction: (chromosome: Chromosome<T>) => Chromosome<T>;
    selectionFunction: (
        population: Chromosome<T>[],
        numToSelect: number,
        tournamentSize?: number
    ) => Chromosome<T>[];
    selectionRate: number;
}

export interface HyperParameters {
    populationSize: number;
    mutationProbability: number;
    coolingRate: number;
}

export { selectionStrategy } from "./toolbox/selection";
