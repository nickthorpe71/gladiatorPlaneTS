import Chromosome from "../types/Chromosome";
import { shuffleArray } from "../../../utils/index";

function elitism<T>(
    population: Chromosome<T>[],
    numToSelect: number
): Chromosome<T>[] {
    return population.slice(0, numToSelect);
}

function random<T>(
    population: Chromosome<T>[],
    numToSelect: number
): Chromosome<T>[] {
    const shuffledPopulation = shuffleArray(population);
    return shuffledPopulation.slice(0, numToSelect);
}

function tournament<T>(
    population: Chromosome<T>[],
    numToSelect: number
): Chromosome<T>[] {
    return population;
}

function roulette<T>(
    population: Chromosome<T>[],
    numToSelect: number
): Chromosome<T>[] {
    return population;
}

export enum SelectionType {
    ELITISM,
    RANDOM,
    TOURNAMENT,
    ROULETTE,
}

export const selectionFunctions = {
    [SelectionType.ELITISM]: elitism,
    [SelectionType.RANDOM]: random,
    [SelectionType.TOURNAMENT]: tournament,
    [SelectionType.ROULETTE]: roulette,
};
