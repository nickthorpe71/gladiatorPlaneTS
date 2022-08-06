import Chromosome from "../types/Chromosome";

/**
 * Preserves permutation of genes.
 */
function orderOne<T>(
    population: Chromosome<T>[],
    numToSelect: number
): Chromosome<T>[] {
    return population.slice(0, numToSelect);
}

export const crossoverStrategy = {
    orderOne,
};
