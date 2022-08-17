import Maeve, {
    FrameworkOptions,
    HyperParameters,
    genotype,
    selectionStrategy,
    crossoverStrategy,
    mutationStrategy,
    reinsertionStrategy,
} from "../../Maeve";
import { range, sum } from "lodash";
import Problem from "../../Maeve/modules/Problem";
import Chromosome from "../../Maeve/modules/Chromosome";

// score breakdown by index
// 0: size
// 1: swimming ability
// 2: fur color
// 3: fat stores
// 4: activity period
// 5: hunting ground size
// 6: fur thickness
// 7: tail length

const chromosomeLength = 8;
const environments = {
    tropics: { scores: [0, 3, 2, 1, 0.5, 1, -1, 0] },
    tundra: { scores: [1, 3, -2, -1, 0.5, 2, 1, 0] },
};
const testEnvironment = "tundra";
const currentEnvironment = environments[testEnvironment];
const maxScore = sum(currentEnvironment.scores);

/**
 * Determines the fitness of a chromosome.
 */
function fitnessFunction(chromosome: Chromosome<number>): number {
    const traits = chromosome.genes.slice();
    return sum(
        range(0, traits.length).map(
            (i) => traits[i] * currentEnvironment.scores[i]
        )
    );
}

function terminationCriteria(
    bestFitness: Chromosome<number>,
    generation: number
): boolean {
    return generation >= 1000 || bestFitness.fitness >= maxScore;
}

const problemDefinition: Problem<number> = {
    genotype: () => genotype.binary(chromosomeLength),
    fitnessFunction,
    terminationCriteria,
};

const hyperParams: HyperParameters = {
    populationSize: 500,
    mutationProbability: 0.05,
    coolingRate: 1,
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
    reinsertionFunction: (
        parents: Chromosome<number>[],
        children: Chromosome<number>[],
        mutants: Chromosome<number>[],
        leftovers: Chromosome<number>[],
        populationSize: number,
        survivalRate: number
    ) =>
        reinsertionStrategy.elitism(
            parents,
            children,
            mutants,
            leftovers,
            populationSize,
            survivalRate
        ),
};

async function main(): Promise<void> {
    const result = await Maeve(problemDefinition, frameworkOptions);
    console.log(result.stats);
}

main();
