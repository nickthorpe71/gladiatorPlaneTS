import { range } from "./src/utils";
import { sum, flatten, uniq } from "lodash";

function fitnessFunction(chromosome: any) {
    const chromosomeGeneClone = chromosome.genes.slice();
    const diagonalClashes = range(0, chromosome.size).map((i) => {
        return range(0, chromosome.size).map((j) => {
            if (i === j) return 0;
            const dx = Math.abs(i - j);
            const dy = Math.abs(
                chromosomeGeneClone[i] - chromosomeGeneClone[j]
            );
            if (dx == dy) return 1;
            return 0;
        });
    });
    // filter out duplicates in gene because these represent row clashes
    return uniq(chromosomeGeneClone).length - sum(flatten(diagonalClashes));
}

console.log(fitnessFunction({ size: 8, genes: [4, 1, 3, 6, 2, 7, 5, 0] }));
console.log(fitnessFunction({ size: 8, genes: [0, 2, 1, 3, 6, 4, 7, 5] }));
