import Chromosome from "../types/Chromosome";
import { random } from "lodash";

/**
 * Preserves permutation of genes.
 */
// function orderOne<T>(
//     parentA: Chromosome<T>,
//     parentB: Chromosome<T>
// ): Chromosome<T>[] {
//     const limit = parentA.genes.length - 1;

//     // get random range
//     const [i1, i2] = [random(limit), random(limit)].sort((a, b) => a - b);

//     const parentBContribution = parentB.genes.slice();
// }

function orderOneTest(
    parentA: { genes: number[] },
    parentB: { genes: number[] }
) {
    const limit = parentA.genes.length - 1;

    // get random range
    const [i1, i2] = [random(limit), random(limit)].sort((a, b) => a - b);
    const parentBContribution = parentB.genes.slice(i1, i2);

    // determine which parent 1 genes are not in parent 2 contribution
    const parentARemainder = parentA.genes.filter(
        (gene) => parentBContribution.indexOf(gene) === -1
    );

    const child1Genes: Array<number> = new Array(parentA.genes.length);

    console.log(i1, i2);
    console.log(parentBContribution);
    console.log(parentARemainder);
}

// TODO: once implemented it needs to be reapplied to all old problems
function singlePoint() {}

// export const crossoverStrategy = {
//     orderOne,
// };

const parentA = {
    genes: [1, 2, 6, 8, 5, 3, 7, 9, 4, 10],
};

const parentB = {
    genes: [5, 9, 3, 7, 1, 6, 8, 2, 10, 4],
};

console.log(orderOneTest(parentA, parentB));
