import { range } from "../../utils";

export default function isPrime(n: number): object {
  const startTime = new Date();
  const isPrime = findIsPrime(n);
  const endTime = new Date();

  return {
    number: n,
    isPrime,
    duration: endTime.getTime() - startTime.getTime(),
  };
}

// very slow implementation
function findIsPrime(n: number): boolean {
  for (let i = 3; i < n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}

// to test: http://localhost:4000/isprime?number=2147483647
// this takes about 5 seconds to run and if isn't running in its own child process it will block other requests
