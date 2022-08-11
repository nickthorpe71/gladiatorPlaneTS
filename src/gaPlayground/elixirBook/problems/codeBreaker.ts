import { range, sum, flatten, uniq } from "lodash";
import Maeve, {
    FrameworkOptions,
    HyperParameters,
    genotype,
    selectionStrategy,
    crossoverStrategy,
} from "../../Maeve/gaFramework_v1";
import Problem from "../../Maeve/types/Problem";
import Chromosome, { cloneChromosome } from "../../Maeve/types/Chromosome";

/**
 * Determines the fitness of a chromosome.
 */
function fitnessFunction(chromosome: Chromosome<number>): number {
    const chromosomeGeneClone = chromosome.genes.slice();
    const target = "ILoveGeneticAlgorithms";
    // encrypted is the binary version of "LIjs`B`k`qlfDibjwlqmhv"
    const encrypted = [
        "1001100",
        "1001001",
        "1101010",
        "1110011",
        "1100000",
        "1000010",
        "1100000",
        "1101011",
        "1100000",
        "1110001",
        "1101100",
        "1100110",
        "1000100",
        "1101001",
        "1100010",
        "1101010",
        "1110111",
        "1101100",
        "1110001",
        "1101101",
        "1101000",
        "1110110",
    ];
    const cipher = (encryptedWord: string[], key: string) =>
        encryptedWord.map((bitChar: string) =>
            bitChar
                .split("")
                .map((bit: string, i: number) => Number(bit) ^ Number(key[i]))
                .join("")
        );
    const key = chromosome.genes.toString();
    const decrypted = cipher(encrypted, key)
        .map((bitChar: string) =>
            String.fromCharCode(Number(parseInt(bitChar, 2).toString(10)))
        )
        .join("");
    return jaroDistance(decrypted, target);
}

// TODO: extract when creating fitness function strategy library
function jaroDistance(s1: string, s2: string) {
    // If the strings are equal
    if (s1 == s2) return 1.0;

    // Length of two strings
    var len1 = s1.length,
        len2 = s2.length;

    // Maximum distance upto which matching
    // is allowed
    var max_dist = Math.floor(Math.max(len1, len2) / 2) - 1;

    // Count of matches
    var match = 0;

    // Hash for matches
    var hashS1 = Array(s1.length).fill(0);
    var hashS2 = Array(s1.length).fill(0);

    // Traverse through the first string
    for (var i = 0; i < len1; i++) {
        // Check if there is any matches
        for (
            var j = Math.max(0, i - max_dist);
            j < Math.min(len2, i + max_dist + 1);
            j++
        )
            // If there is a match
            if (s1[i] == s2[j] && hashS2[j] == 0) {
                hashS1[i] = 1;
                hashS2[j] = 1;
                match++;
                break;
            }
    }

    // If there is no match
    if (match == 0) return 0.0;

    // Number of transpositions
    var t = 0;

    var point = 0;

    // Count number of occurrences
    // where two characters match but
    // there is a third matched character
    // in between the indices
    for (var i = 0; i < len1; i++)
        if (hashS1[i]) {
            // Find the next matched character
            // in second string
            while (hashS2[point] == 0) point++;

            if (s1[i] != s2[point++]) t++;
        }

    t /= 2;

    // Return the Jaro Similarity
    return (match / len1 + match / len2 + (match - t) / match) / 3.0;
}

function mutationFunction(chromosome: Chromosome<number>): Chromosome<number> {
    const chromosomeClone: Chromosome<number> =
        cloneChromosome<number>(chromosome);
    let currentIndex = chromosomeClone.size;
    let randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [
            chromosomeClone.genes[currentIndex],
            chromosomeClone.genes[randomIndex],
        ] = [
            chromosomeClone.genes[randomIndex],
            chromosomeClone.genes[currentIndex],
        ];
    }
    return chromosomeClone;
}

function terminationCriteria(bestFitness: Chromosome<number>): boolean {
    return bestFitness.fitness === 1;
}

const chromosomeLength = 7;

const problemDefinition: Problem<number> = {
    genotype: () => genotype.binary(chromosomeLength),
    fitnessFunction,
    terminationCriteria,
};

const hyperParams: HyperParameters = {
    populationSize: 100,
    mutationProbability: 0.05,
    coolingRate: 0.8,
};

const frameworkOptions: FrameworkOptions<number> = {
    showLogStream: true,
    hyperParams,
    crossoverFunction: crossoverStrategy.singlePoint,
    mutationFunction,
    selectionFunction: selectionStrategy.elitism,
    selectionRate: 0.8,
};

Maeve(problemDefinition, frameworkOptions);
