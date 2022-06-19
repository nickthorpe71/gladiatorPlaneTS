import { range, randInt } from "./index";

export default function nameGen(min: number, max: number): string {
  const length = randInt(min, max);
  const cons = "bcdfghjklmnpqrstvwxyz";
  const vowels = "aeiou";

  const newName = range(1, length)
    .map((charSlot: number) => {
      const nextChar =
        charSlot % 2 === 0
          ? cons[randInt(0, cons.length - 1)]
          : vowels[randInt(0, vowels.length - 1)];

      return charSlot == 1 ? nextChar.toUpperCase() : nextChar;
    })
    .join("");

  return newName;
}
