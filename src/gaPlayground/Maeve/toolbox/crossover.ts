import Chromosome from "../types/Chromosome";
import { random } from "lodash";

/**
 * Preserves permutation of genes.
 */
function orderOne<T>(
    parent1: Chromosome<T>,
    parent2: Chromosome<T>
): Chromosome<T>[] {
    const limit = parent1.genes.length - 1;
    // get random range
    const [i1, i2] = [random(limit), random(limit)].sort((a, b) => a - b);
    const child1: Chromosome<T> = {
        genes: orderOneCreateChildHelper<T>(parent1, parent2, i1, i2),
        size: parent1.size,
        fitness: 0,
        age: 0,
    };
    const child2: Chromosome<T> = {
        genes: orderOneCreateChildHelper<T>(parent2, parent1, i1, i2),
        size: parent1.size,
        fitness: 0,
        age: 0,
    };
    return [child1, child2];
}
function orderOneCreateChildHelper<T>(
    parentA: Chromosome<T>,
    parentB: Chromosome<T>,
    i1: number,
    i2: number
) {
    // take a slice of the genes from parentB using predetermined random range
    const parentBContribution: T[] = parentB.genes.slice(i1, i2);

    // determine which parentA genes are not in parentB contribution (no duplicates)
    const parentAContribution: T[] = parentA.genes.filter(
        (gene) => parentBContribution.indexOf(gene) === -1
    );

    let parentASelector: number = 0;
    // create child genes using parentB slice and filling in remaining parentA genes in order
    const childGenes: Array<T> = Array(parentA.genes.length)
        .fill(null)
        .map((_, i) =>
            i >= i1 && i < i2
                ? parentBContribution[i - i1]
                : parentAContribution[parentASelector++]
        );

    return childGenes;
}

// TODO: once implemented it needs to be reapplied to all old problems
function singlePoint() {}

export const crossoverStrategy = {
    orderOne,
};
