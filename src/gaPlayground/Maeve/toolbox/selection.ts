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

function tournamentNoDuplicates<T>(
    population: Chromosome<T>[],
    numToSelect: number,
    tournamentSize: number
): Chromosome<T>[] {
    let selected: Set<Chromosome<T>> = new Set();
    return Array.from(
        tournamentHelper(population, numToSelect, tournamentSize, selected)
    );
}

function tournamentHelper<T>(
    population: Chromosome<T>[],
    numToSelect: number,
    tournamentSize: number,
    selected: Set<Chromosome<T>>
): Set<Chromosome<T>> {
    if (selected.size === numToSelect) {
        return selected;
    }
    const selectedClone = new Set(selected); // for immutability
    const tournament: Chromosome<T>[] = shuffleArray<Chromosome<T>>(
        population
    ).slice(0, tournamentSize);
    const chosen = maxBy(
        tournament,
        (chromosome) => chromosome.fitness
    ) as Chromosome<T>;
    return tournamentHelper(
        population,
        numToSelect,
        tournamentSize,
        selectedClone.add(chosen)
    );
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
    TOURNAMENT_NO_DUPLICATES,
    ROULETTE,
}

export const selectionFunctions = {
    [SelectionType.ELITISM]: elitism,
    [SelectionType.RANDOM]: random,
    [SelectionType.TOURNAMENT]: tournament,
    [SelectionType.TOURNAMENT_NO_DUPLICATES]: tournamentNoDuplicates,
    [SelectionType.ROULETTE]: roulette,
};
