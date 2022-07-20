import { range } from "../../../utils/index";
import Maeve, {
    FrameworkOptions,
    HyperParameters,
} from "../../Maeve/gaFramework_v1";
import Problem from "../../Maeve/types/Problem";
import Chromosome, { cloneChromosome } from "../../Maeve/types/Chromosome";

const chromosomeLength = 10;

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
 * Determines the fitness of a chromosome. In this case, the fitness is the total profit of the cargo.
 */
function fitnessFunction(chromosome: Chromosome<number>): number {
    const chromosomeGeneClone = chromosome.genes.slice(); // for immutability

    const cargoProfits = [6, 5, 8, 9, 6, 7, 3, 1, 2, 6];
    const cargoWeights = [10, 6, 8, 7, 10, 9, 7, 11, 6, 8];
    const weightLimit = 40;

    const totalCargoProfit = chromosomeGeneClone
        .map((gene, i) => cargoProfits[i] * gene)
        .reduce((acc, curr) => acc + curr, 0);

    const totalCargoWeight = chromosomeGeneClone
        .map((gene, index) => gene * cargoWeights[index])
        .reduce((acc, curr) => acc + curr, 0);

    return totalCargoWeight > weightLimit ? 0 : totalCargoProfit;
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
    bestFitness: Chromosome<number>,
    generation: number
): boolean {
    return generation === 1000;
}

const problemDefinition: Problem<number> = {
    genotype: randomChromosome,
    fitnessFunction,
    terminationCriteria,
};

const hyperParams: HyperParameters = {
    populationSize: 1500,
    mutationProbability: 0.05,
    coolingRate: 0.8,
};

const frameworkOptions: FrameworkOptions<number> = {
    showLogStream: true,
    hyperParams,
    crossoverFunction,
    mutationFunction,
};

async function getBestSolution() {
    const bestSolution = await Maeve(problemDefinition, frameworkOptions);
    const cargoWeights = [10, 6, 8, 7, 10, 9, 7, 11, 6, 8];
    const totalCargoWeight = bestSolution.genes
        .map((gene, index) => gene * cargoWeights[index])
        .reduce((acc, curr) => acc + curr, 0);
    console.log("Weight is:", totalCargoWeight);
}

getBestSolution();

Maeve(problemDefinition, frameworkOptions);
