import Chromosome from "../types/Chromosome";

function elitism<T>(populationFraction: Chromosome<T>[]): Chromosome<T>[] {
    return populationFraction;
}

function random<T>(populationFraction: Chromosome<T>[]): Chromosome<T>[] {
    return populationFraction;
}

function tournament<T>(populationFraction: Chromosome<T>[]): Chromosome<T>[] {
    return populationFraction;
}

function roulette<T>(populationFraction: Chromosome<T>[]): Chromosome<T>[] {
    return populationFraction;
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
