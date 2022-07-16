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

export function stringifyChromosome<T>(chromosome: Chromosome<T>): string {
    return `\nChromosome:\n - Genes: ${chromosome.genes}\n - Size: ${chromosome.size}\n - Fitness: ${chromosome.fitness}\n - Age: ${chromosome.age}`;
}
