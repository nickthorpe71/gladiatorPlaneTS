const nameGen = require("./nameGen");

function nameGenCreatesARandomString() {
    const res = nameGen(2, 6);
    console.log(`nameGen creates a random string: ${typeof res === 'string'}`);
}

function nameGenCreatesAStringWithinLengthRange() {
    const res = nameGen(2, 6);
    console.log(`nameGen creates a string within given length: ${res.length >= 2 && res.length <=6}`);
}

module.exports = { 
    nameGenCreatesARandomString,
    nameGenCreatesAStringWithinLengthRange
}