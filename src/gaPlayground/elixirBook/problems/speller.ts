import { range, randInt } from "../../../utils/index";
import Maeve, {
    FrameworkOptions,
    HyperParameters,
    selectionStrategy,
    crossoverStrategy,
} from "../../Maeve";
import Problem from "../../Maeve/types/Problem";
import Chromosome, { cloneChromosome } from "../../Maeve/types/Chromosome";

const chromosomeLength = 34;

/**
 * Creates a random chromosome. This is a random binary string of length chromosomeLength.
 */
function genotype(): Chromosome<string> {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const genes = range(1, chromosomeLength).map(
        () => alphabet[Math.floor(Math.random() * alphabet.length)]
    );

    const newChromosome: Chromosome<string> = {
        genes,
        size: chromosomeLength,
        fitness: 0,
        age: 0,
    };

    return newChromosome;
}

/**
 * Determines the fitness of a chromosome. In this case, the fitness is how close to the goal word the chromosome is.
 */
function fitnessFunction(chromosome: Chromosome<string>): number {
    const goal = "Supercalifragilisticexpialidocious";
    const chromosomeGeneClone = chromosome.genes.slice(); // for immutability
    const numCorrectCharacters = chromosomeGeneClone
        .map((gene: string, i: number) => (gene === goal[i].toString() ? 1 : 0))
        .reduce((acc: number, curr: number) => acc + curr, 0);

    // divide by chromosome.size length to get 0 - 1 ratio.
    // AKA what percent match is this string to the goal string.
    return numCorrectCharacters / chromosome.size;
}

/**
 * Mutate chromosome by swapping a random letter from the gene with a random letter from the alphabet.
 */
function mutationFunction(chromosome: Chromosome<string>): Chromosome<string> {
    const chromosomeClone: Chromosome<string> =
        cloneChromosome<string>(chromosome);

    // swap a random pair of characters.
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    chromosomeClone.genes[randInt(0, chromosomeClone.size - 1)] =
        alphabet[randInt(0, alphabet.length - 1)];

    return chromosomeClone;
}

function terminationCriteria(
    chromosome: Chromosome<string>,
    generation: number
): boolean {
    return chromosome.fitness >= 0.95 || generation > 3000;
}

const problemDefinition: Problem<string> = {
    genotype,
    fitnessFunction,
    terminationCriteria,
};

const hyperParams: HyperParameters = {
    populationSize: 2000,
    mutationProbability: 0.15,
    coolingRate: 0.9,
};

const frameworkOptions: FrameworkOptions<string> = {
    showLogStream: true,
    hyperParams,
    crossoverFunction: (
        parent1: Chromosome<string>,
        parent2: Chromosome<string>
    ) => crossoverStrategy.uniform(parent1, parent2, 0.5),
    mutationFunction,
    selectionFunction: (
        population: Chromosome<string>[],
        selectionRate: number
    ) => selectionStrategy.tournament(population, selectionRate, 100),
    selectionRate: 0.4,
};

Maeve(problemDefinition, frameworkOptions);
