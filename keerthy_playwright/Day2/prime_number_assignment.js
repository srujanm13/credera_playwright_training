// Define a function to check if a number is prime
function isPrime(num) {
    // Check if the number is less than or equal to 1, which are not prime numbers
    if (num <= 1) { 
        return false;
    }
    // Check if the number is 2, which is a prime number
    if (num === 2) {
        return true;
    }
    // Check if the number is even, which are not prime numbers (except for 2)  
    if (num % 2 === 0) {
        return false;
    }
    
    // Check for factors from 3 to the square root of the number, skipping even numbers
    for (let i = 3; ((i * i) <= num); i += 2) {
        if (num % i === 0) {
            return false;
        }
    }

    return true;
}


//Calling the function with different numbers to check if they are prime
console.log(isPrime(7));

console.log(isPrime(10));

console.log(isPrime(2));