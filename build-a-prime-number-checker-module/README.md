# Build a Prime Number Checker Module
A project about building a npm modules to create a prime-checker module from scratch

## VERSION
v1.0.0

## USAGE
```
const { isPrime } = require('prime-checker');

// Check prime numbers
console.log(isPrime(2));  // true
console.log(isPrime(11)); // true

// Check non-prime numbers
console.log(isPrime(1));  // false
console.log(isPrime(9));  // false
```

## HOW IT WORKS?
The function validates prime numbers using the square root principle:
1. Eliminates numbers less than or equal to 1
2. Loops from 2 up to the square root of the number (i * i <= num)
3. If a divisor is found, it immediately returns false
4. If no divisors are found, it returns true

## LICENSE
MIT