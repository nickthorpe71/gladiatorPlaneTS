import Maeve, { genotype, Chromosome, Problem } from "maeve";

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

const problemDefinition: Problem<number> = {
    genotype: () => genotype.binary(10),
    fitnessFunction,
    terminationCriteria: (bestFitnessChromosome: Chromosome<number>) =>
        bestFitnessChromosome.fitness >= 0.5,
};

Maeve(problemDefinition, {
    hyperParams: {
        populationSize: 200,
        mutationProbability: 0.05,
    },
});
