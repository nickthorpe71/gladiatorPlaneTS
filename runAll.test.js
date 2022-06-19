const nameGenTests = require("./nameGen.test");
const utilsTests = require("./utils.test");

console.log("=== nameGen tests ===");
nameGenTests.nameGenCreatesARandomString();
nameGenTests.nameGenCreatesAStringWithinLengthRange();

console.log("=== utils tests ===");
utilsTests.randIntReturnsANumberBetweenRangeInclusive();
utilsTests.rangeReturnsCorrectRange();
utilsTests.rangeIsInclusive();