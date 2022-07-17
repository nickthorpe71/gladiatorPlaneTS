import Chromosome from "./Chromosome";

export default interface Problem<T> {
    genotype: () => Chromosome<T>;
    fitnessFunction: (chromosome: Chromosome<T>) => number;
    terminationCriteria: (
        population: Chromosome<T>,
        generation: number
    ) => boolean;
}
