import { range, sum } from "lodash";
import Rayleigh, {
    FrameworkOptions,
    HyperParameters,
    genotype,
    selectionStrategy,
    crossoverStrategy,
    mutationStrategy,
    Chromosome,
    Problem,
} from "rayleigh";

// NN Setup
const inputLayers = 1;
const inputLayerSize = 784;
const hiddenLayers = 3;
const hiddenLayerSize = 100;
const outputLayers = 1;
const outputLayerSize = 10;

export interface NeuralNetwork {
    inputLayers: number;
    inputLayerSize: number;
    hiddenLayers: number;
    hiddenLayerSize: number;
    outputLayers: number;
    outputLayerSize: number;
    weights: number[][];
}

export function forwardPropagate(
    input: number[],
    nn: NeuralNetwork,
    activation: (x: number) => number
): number[] {
    return nn.weights.reduce(
        (accumulatingLayers, currentWeights, i): number[] => {
            const nextLayerSize =
                i === nn.weights.length - 1
                    ? nn.outputLayerSize
                    : nn.hiddenLayerSize;
            return range(0, nextLayerSize).map((j) =>
                activation(
                    sum(
                        accumulatingLayers.map(
                            (prevValue) => prevValue * currentWeights[j]
                        )
                    )
                )
            );
        },
        input
    );
}

export function sigmoid(z: number): number {
    return 1 / (1 + Math.exp(-z));
}

// GA Framework
function fitnessFunction(chromosome: Chromosome<number>): number {
    // implement fitness function
    return 0;
}

function terminationCriteria(
    bestFitnessChromosome: Chromosome<number>
): boolean {
    return bestFitnessChromosome.fitness >= 0.75;
}

const problemDefinition: Problem<number> = {
    genotype: () =>
        genotype.weights((hiddenLayers + outputLayers) * hiddenLayerSize),
    fitnessFunction,
    terminationCriteria,
};

const hyperParams: HyperParameters = {
    populationSize: 200,
    mutationProbability: 0.05,
};

const options: FrameworkOptions<number> = {
    showLogStream: true,
    hyperParams,
    crossoverFunction: (
        parent1: Chromosome<number>,
        parent2: Chromosome<number>
    ) => crossoverStrategy.uniform(parent1, parent2, 0.5),
    mutationFunction: mutationStrategy.scramble,
    selectionFunction: (
        population: Chromosome<number>[],
        selectionRate: number
    ) => selectionStrategy.tournament(population, selectionRate, 10),
    selectionRate: 0.8,
};

Rayleigh(problemDefinition, options);

// Data Utils
function normalizeData(data) {
    return data.map((e) => (e / 255) * 0.99 + 0.01);
}

async function loadData(path: string, type: string) {
    try {
        const result = await fetch(path, {
            mode: "no-cors",
        });

        switch (type) {
            case "CSV":
                return await result.text();
            case "JSON":
                return await result.json();
            default:
                return false;
        }
    } catch {
        return false;
    }
}

function prepareData(rawData, target, labels) {
    rawData = rawData.split("\n"); // create an array where each element correspondents to one line in the CSV file
    rawData.pop(); // remove the last element which is empty because it refers to a last blank line in the CSV file

    rawData.forEach((current) => {
        let sample = current.split(",").map((x) => +x); // create an array where each element has a grey color value

        labels.push(sample[0]); // extract the first element of the sample which is (mis)used as the label
        sample.shift(); // remove the first element

        sample = normalizeData(sample);

        target.push(sample);
    });
}
