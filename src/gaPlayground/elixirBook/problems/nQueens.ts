import { range, sum, flatten, uniq } from "lodash";
import Maeve, {
    FrameworkOptions,
    HyperParameters,
    genotype,
    selectionStrategy,
    crossoverStrategy,
    mutationStrategy,
} from "../../Maeve";
import Problem from "../../Maeve/types/Problem";
import Chromosome from "../../Maeve/types/Chromosome";

const chromosomeLength = 24;

/**
 * Determines the fitness of a chromosome. For N-Queens the fitness is calculated by checking how many queens are attacking each other.
 * This function returns the number of non-conflicts.
 */
function fitnessFunction(chromosome: Chromosome<number>): number {
    const chromosomeGeneClone = chromosome.genes.slice();
    const diagonalClashes = range(0, chromosome.size).map((i) => {
        return range(0, chromosome.size).map((j) => {
            if (i === j) return 0;
            const dx = Math.abs(i - j);
            const dy = Math.abs(
                chromosomeGeneClone[i] - chromosomeGeneClone[j]
            );
            if (dx == dy) return 1;
            return 0;
        });
    });
    // filter out duplicates in gene because these represent row clashes
    return uniq(chromosomeGeneClone).length - sum(flatten(diagonalClashes));
}

function terminationCriteria(bestFitness: Chromosome<number>): boolean {
    return bestFitness.fitness === chromosomeLength;
}

const problemDefinition: Problem<number> = {
    genotype: () =>
        genotype.permutation<number>(
            chromosomeLength,
            range(0, chromosomeLength)
        ),
    fitnessFunction,
    terminationCriteria,
};

const hyperParams: HyperParameters = {
    populationSize: 1500,
    mutationProbability: 0.15,
    coolingRate: 0.8,
};

const frameworkOptions: FrameworkOptions<number> = {
    showLogStream: true,
    hyperParams,
    crossoverFunction: crossoverStrategy.orderOne,
    mutationFunction: mutationStrategy.scramble,
    selectionFunction: (
        population: Chromosome<number>[],
        selectionRate: number
    ) => selectionStrategy.tournament(population, selectionRate, 30),
    selectionRate: 0.8,
};

Maeve(problemDefinition, frameworkOptions);
