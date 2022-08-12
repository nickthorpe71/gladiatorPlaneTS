import Chromosome, { cloneChromosome } from "../types/Chromosome";
import { shuffle, random } from "lodash";

/**
 * Applies a bitwise XOR to all genes or with a specified probability (p) of genes in a chromosome. Simple and effective but only applies to binary genotypes.
 * @param chromosome - chromosome to mutate
 * @returns mutated chromosome
 */
function bitFlip(
    chromosome: Chromosome<number>,
    p: number = 1
): Chromosome<number> {
    const chromosomeClone: Chromosome<number> =
        cloneChromosome<number>(chromosome);
    const newGenes =
        p === 1
            ? chromosome.genes.map((gene) => gene ^ 1)
            : chromosome.genes.map((gene) =>
                  Math.random() < p ? gene ^ 1 : gene
              );
    chromosomeClone.genes = newGenes;
    return chromosomeClone;
}

/**
 * Shuffles all genes in a chromosome. Can apply to most genotypes and preserves the size and permutation of a chromosome.
 * @param chromosome - chromosome to mutate
 * @returns mutated chromosome
 */
function scramble<T>(chromosome: Chromosome<T>): Chromosome<T> {
    const chromosomeClone: Chromosome<T> = cloneChromosome<T>(chromosome);
    const newGenes = shuffle(chromosomeClone.genes);
    chromosomeClone.genes = newGenes;
    return chromosomeClone;
}

export const mutationStrategy = {
    scramble,
    bitFlip,
};
