function randInt(min, max) {
    return Math.floor(Math.random() * max + min);
}

function range(start, end) {
    let newRange = [];
    for(let i = start; i<= end; i++) {
        newRange.push(i);
    }
    return newRange;
}

module.exports = {
    randInt,
    range,
}