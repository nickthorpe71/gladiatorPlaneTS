import Maeve, { genotype, Chromosome, Problem } from "maeve";

const chromosomeLength = 100;

const problemDefinition: Problem<number> = {
    genotype: () => genotype.binary(chromosomeLength),
    fitnessFunction: (chromosome: Chromosome<number>) =>
        chromosome.genes.reduce((acc, curr) => acc + curr, 0) /
        chromosomeLength,
    terminationCriteria: (bestFitnessChromosome: Chromosome<number>) =>
        bestFitnessChromosome.fitness >= 0.6,
};

Maeve(problemDefinition, {
    showLogStream: true,
    hyperParams: {
        populationSize: 200,
        mutationProbability: 0.05,
    },
});
