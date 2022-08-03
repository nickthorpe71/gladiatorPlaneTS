import Chromosome from "../types/Chromosome";
import { shuffleArray, range } from "../../../utils/index";
import { maxBy } from "lodash";

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
    numToSelect: number,
    tournamentSize: number
): Chromosome<T>[] {
    return range(1, numToSelect).map(() => {
        const tournament: Chromosome<T>[] = shuffleArray<Chromosome<T>>(
            population
        ).slice(0, tournamentSize);
        return maxBy(
            tournament,
            (chromosome) => chromosome.fitness
        ) as Chromosome<T>;
    });
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
