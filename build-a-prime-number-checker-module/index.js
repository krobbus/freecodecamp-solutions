function isPrime(num){
    if (num <= 1) return false;
    for(let i = 2; i * i <= num; i++){
        if(num % i === 0) {
            return false;
        }
    }
    return true;
}
console.log("Prime Numbers:");
console.log(isPrime(2));
console.log(isPrime(3));
console.log(isPrime(5));
console.log(isPrime(7));
console.log(isPrime(11));

console.log("Non-Prime Numbers:");
console.log(isPrime(1));
console.log(isPrime(4));
console.log(isPrime(6));
console.log(isPrime(8));
console.log(isPrime(9));

module.exports = {isPrime};