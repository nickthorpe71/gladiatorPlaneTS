const utils = require("./utils")

function randIntReturnsANumberBetweenRangeInclusive() {
    for (let i = 1; i <= 5; i++) {
        const min = -i * 20;
        const max = i * 20;
        const res = utils.randInt(min,max);
        console.log(`randInt produces a number between ${min} and ${max} inclusive: ${res >= min && res <= max}`);
    }
    
}

function rangeReturnsCorrectRange() {
    // Assemble
    const positiveRange = utils.range(0,4);
    const nagetiveRange = utils.range(-4,0);
    const crossoverRange = utils.range(-2,2);

    const positiveMatch = [0,1,2,3,4];
    const negativeMatch = [-4,-3,-2,-1,0];
    const corssoverMatch = [-2,-1,0,1,2];

    // Act
    const positiveRangeMatch = positiveRange.map((n,i) => n === positiveMatch[i]).reduce((prev, curr) => prev === true || curr == true, false);
    const negativeRangeMatch = nagetiveRange.map((n,i) => n === negativeMatch[i]).reduce((prev, curr) => prev === true || curr == true, false);
    const crossoverRangeMatch = crossoverRange.map((n,i) => n === corssoverMatch[i]).reduce((prev, curr) => prev === true || curr == true, false);

    // Assert
    console.log(`range produces a list of positive ints: ${positiveRangeMatch}`);
    console.log(`range produces a list of negative ints: ${negativeRangeMatch}`);
    console.log(`range produces a list of ints that cross from negative to positive: ${crossoverRangeMatch}`);
}

function rangeIsInclusive() {
    // Assemble
    const min = -132;
    const max = 312;

    // Act
    const newRange = utils.range(min, max);
    const isInclusive = newRange[0] === min && newRange[newRange.length - 1] === max;

    // Assert
    console.log(`range produces an inclusive range: ${isInclusive}`);
}

module.exports = {
    randIntReturnsANumberBetweenRangeInclusive,
    rangeReturnsCorrectRange,
    rangeIsInclusive
}