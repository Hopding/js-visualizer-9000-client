export default [
{
  name: 'Naive Primes',
  value: `
function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}

function computePrimes(onPrime, startAt = 1) {
  let currNum;
  for (currNum = startAt; true; currNum++) {
    if (isPrime(currNum)) onPrime(currNum);
  }
}

computePrimes(prime => {
  console.log(prime);
});
`.trim(),
},
{
  name: 'Primes with Tasks',
  value: `
function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}

function computePrimes(onPrime, startAt = 1) {
  let currNum;
  for (currNum = startAt; currNum % 5 !== 0; currNum++) {
    if (isPrime(currNum)) onPrime(currNum);
  }
  setTimeout(() => {
    computePrimes(onPrime, currNum + 1);
  }, 0);
}

computePrimes(prime => {
  console.log(prime);
});
`.trim(),
},
{
  name: 'Primes with Microtasks',
  value: `
function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}

function computePrimes(onPrime, startAt = 1) {
  let currNum;
  for (currNum = startAt; currNum % 5 !== 0; currNum++) {
    if (isPrime(currNum)) onPrime(currNum);
  }
  Promise.resolve().then(() => {
    computePrimes(onPrime, currNum + 1);
  });
}

computePrimes(prime => {
  console.log(prime);
});
`.trim(),
},
];
