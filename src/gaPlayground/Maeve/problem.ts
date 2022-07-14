import { Chromosome } from "./types/Chromosome";

export interface Problem {
    genotype: () => Chromosome;
    fitnessFunction: (chromosome: Chromosome) => number;
    terminationCriteria: (population: Chromosome[]) => boolean;
}
