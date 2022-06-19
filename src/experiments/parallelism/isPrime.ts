interface IsPrimeMessage {
  number: number;
}

// Since this module is spawned as a child process the "process" object refers
// to that child process and not the global node process object.
// This is why we can send messages back on this process (not allowed on regular node process object).
process.on("message", (message: IsPrimeMessage) => {
  const jsonResponse = isPrime(message.number);

  // send the response back to the parent
  (<any>process).send(jsonResponse);
  process.exit(); // to prevent memory leak
});

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

// very slow implementation of finding if a number is prime
function findIsPrime(n: number): boolean {
  for (let i = 3; i < n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}

// to test: http://localhost:4000/isPrime?number=2147483647
// this takes about 5 seconds to run and if isn't running in its own child process it will block other requests
