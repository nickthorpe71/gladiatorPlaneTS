import Chromosome, { cloneChromosome } from "../types/Chromosome";
import { shuffle } from "lodash";

function randomShuffle(chromosome: Chromosome<number>): Chromosome<number> {
    const chromosomeClone: Chromosome<number> =
        cloneChromosome<number>(chromosome);
    const newGenes = shuffle(chromosomeClone.genes);
    chromosomeClone.genes = newGenes;
    return chromosomeClone;
}

export const mutationStrategy = {
    randomShuffle,
};
