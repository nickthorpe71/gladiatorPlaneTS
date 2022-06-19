const nameGen = require("./nameGen");
const { randInt } = require("./utils");

function createWarrior() {
    const firstName = nameGen(2, 7);
    const lastName = nameGen(3, 10);
    const nickname = nameGen(3, 10);
    const age = randInt(10, 150);
    const reproductionSide = randInt(1,2) === 1 ? "A" : "B";
    const height = randInt(65, 250) + randFloat(0, 1); 
    const weight = randInt(70, 400) + randFloat(0, 1);
    const mutation_factor = randFloat(0, 1);
    const alive = true;
    const kills = 0;
    const wins = 0;
    const losses = 0;
    const total_damage_done = 0.0;
    const ambition = randInt(1, 100);
    const intelligence = randInt(1,100);
    const max_health = max_health,
    const current_health = max_health,
    const max_endurance = max_endurance,
    const current_endurance = max_endurance,
    const endurance = randInt(1, 75) - weight * randFloat(0, 0.075) - height * randFloat(0, 0.1) + 25;
    const flexibility = flexibility,
    const strength = (randInt(1, 50) + weight / 40 + height / 8) * randFloat(0.85, 1.15),
    const accuracy = accuracy,
    const dexterity = dexterity,
    const reflex = randInt(1, 50) + flexibility / 4 + dexterity / 4 - weight * randFloat(0, 0.075) - height * randFloat(0, 0.1);
    const speed = randInt(1, 100) - weight * randFloat(0, 0.075) - height * randFloat(0, 0.1)

    endurance =
      

    intelligence = 
    accuracy = (randInt(1, 75) + intelligence / 4) * randFloat(0.85, 1.15)
    flexibility = randInt(1, 75) - weight * randFloat(0, 0.075) + 25
    dexterity = randInt(1, 75) + accuracy / 4 * randFloat(0.85, 1.15)

    max_health = randInt(100, 1000)
    max_endurance = endurance * 9 * randFloat(0.85, 1.15) + 100

    return ({
        firstName,
        lastName
    });
}

console.log(createWarrior());