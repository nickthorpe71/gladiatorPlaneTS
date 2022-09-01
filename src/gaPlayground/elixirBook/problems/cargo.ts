import Maeve, {
    FrameworkOptions,
    HyperParameters,
    genotype,
    selectionStrategy,
    crossoverStrategy,
    mutationStrategy,
    Chromosome,
    Problem,
} from "maeve";

const itemValues = [6, 5, 8, 9, 6, 7, 3, 1, 2, 6];
const itemWeights = [10, 6, 8, 7, 10, 9, 7, 11, 6, 8];
const weightLimit = 40;

function fitnessFunction(chromosome: Chromosome<number>): number {
    const totalCargoProfit = chromosome.genes
        .map((gene, i) => itemValues[i] * gene)
        .reduce((acc, curr) => acc + curr, 0);

    const totalCargoWeight = chromosome.genes
        .map((gene, index) => gene * itemWeights[index])
        .reduce((acc, curr) => acc + curr, 0);

    return totalCargoWeight > weightLimit ? 0 : totalCargoProfit;
}

function terminationCriteria(
    _: Chromosome<number>,
    generation: number
): boolean {
    return generation >= 500;
}

const problemDefinition: Problem<number> = {
    genotype: () => genotype.binary(10),
    fitnessFunction,
    terminationCriteria,
};

const hyperParams: HyperParameters = {
    populationSize: 200,
    mutationProbability: 0.05,
};

// In options we can specify which strategies we want to use
// for each step in our genetic algorithm.
const options: FrameworkOptions<number> = {
    showLogStream: true,
    hyperParams,
    crossoverFunction: (
        parent1: Chromosome<number>,
        parent2: Chromosome<number>
    ) => crossoverStrategy.uniform(parent1, parent2, 0.5),
    mutationFunction: mutationStrategy.scramble,
    selectionFunction: (
        population: Chromosome<number>[],
        selectionRate: number
    ) => selectionStrategy.tournament(population, selectionRate, 10),
    selectionRate: 0.8,
};

async function main() {
    const result = await Maeve(problemDefinition, options);
    const cargoWeights = [10, 6, 8, 7, 10, 9, 7, 11, 6, 8];
    const bestSolution: Chromosome<number> = result.best as Chromosome<number>;
    const totalCargoWeight = bestSolution.genes
        .map((gene, index) => gene * cargoWeights[index])
        .reduce((acc, curr) => acc + curr, 0);
    console.log("Weight is:", totalCargoWeight);
    console.log("Stats:", Object.entries(result.stats).slice(0, 10));
}

main();
