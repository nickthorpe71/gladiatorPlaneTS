const {range, randInt} = require('./utils');

function nameGen(min, max) {
    const length = randInt(min, max);
    const cons = 'bcdfghjklmnpqrstvwxyz';
    const vowels = 'aeiou';

    const newName = 
        range(1, length)
        .map(charSlot => { 
            const nextChar = (charSlot % 2 === 0) 
            ? cons[randInt(0, cons.length - 1)]
            : vowels[randInt(0, vowels.length - 1)];

            return charSlot == 1 
            ? nextChar.toUpperCase()
            : nextChar;
        })
        .join('');

    return newName;
}


module.exports = nameGen;