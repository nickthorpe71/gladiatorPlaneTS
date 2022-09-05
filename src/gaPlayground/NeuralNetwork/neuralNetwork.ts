import { range, sum } from "lodash";

export interface NeuralNetwork {
    inputLayers: number;
    inputLayerSize: number;
    hiddenLayers: number;
    hiddenLayerSize: number;
    outputLayers: number;
    outputLayerSize: number;
    weights: number[][];
}

export function createNeuralNetwork(
    inputLayers: number,
    inputLayerSize: number,
    hiddenLayers: number,
    hiddenLayerSize: number,
    outputLayers: number,
    outputLayerSize: number
): NeuralNetwork {
    const weights = range(0, hiddenLayers + 1).map((_) =>
        range(0, hiddenLayerSize).map((_) => Math.random())
    );

    return {
        inputLayers,
        inputLayerSize,
        hiddenLayers,
        hiddenLayerSize,
        outputLayers,
        outputLayerSize,
        weights,
    };
}

export function forwardPropagate(
    input: number[],
    nn: NeuralNetwork,
    activation: (x: number) => number
): number[] {
    const preOutput = nn.weights.reduce((acc, curr): number[] => {
        return curr.map((currentWeight) =>
            sum(acc.map((prevValue) => activation(prevValue * currentWeight)))
        );
    }, input);

    console.log("preOutput", preOutput);
    return range(0, nn.outputLayerSize).map((_) =>
        sum(
            nn.weights[nn.weights.length - 1].map((weight, i) =>
                activation(weight * preOutput[i])
            )
        )
    );
}

export function cloneNeuralNetwork() {}

export function sigmoid(z: number): number {
    return 1 / (1 + Math.exp(-z));
}

const nn = createNeuralNetwork(1, 2, 1, 3, 1, 1);

console.log(forwardPropagate([1, 2], nn, sigmoid));
