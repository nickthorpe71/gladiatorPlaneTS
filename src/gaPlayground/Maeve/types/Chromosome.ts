export default interface Chromosome<T> {
    genes: T[];
    size: number;
    fitness: number;
    age: number;
}

export function cloneChromosome<T>(
    chromosome: Chromosome<T>,
    newGenes?: T[],
    newSize?: number,
    newFitness?: number,
    newAge?: number
): Chromosome<T> {
    return {
        genes: newGenes || chromosome.genes.slice(),
        size: newSize || chromosome.size,
        fitness: newFitness || chromosome.fitness,
        age: newAge || chromosome.age,
    };
}
