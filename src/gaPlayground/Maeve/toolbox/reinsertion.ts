import Chromosome from "../types/Chromosome";
import { random, range } from "lodash";

function pure<T>(
    _parents: Chromosome<T>[],
    children: Chromosome<T>[],
    mutants: Chromosome<T>[],
    _leftovers: Chromosome<T>[],
    populationSize: number
): Chromosome<T>[] {
    return preservePopulationSize(
        children.concat(mutants),
        children,
        populationSize
    );
}

function preservePopulationSize<T>(
    population: Chromosome<T>[],
    fillWith: Chromosome<T>[],
    populationSize: number
): Chromosome<T>[] {
    const numToAdjustBy: number = populationSize - population.length;

    if (numToAdjustBy === 0) return population;
    if (numToAdjustBy < 0) return population.slice(0, populationSize);

    return population.concat(
        range(0, numToAdjustBy).map(
            (): Chromosome<T> => fillWith[random(0, fillWith.length - 1)]
        )
    );
}

export const reinsertionStrategy = {
    pure,
};
