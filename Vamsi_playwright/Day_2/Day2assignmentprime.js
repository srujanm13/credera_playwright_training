
//Write a function that checks whether a number is prime. 

function isPrime(num) {
   if (num <= 1) return false; // 0 and 1 are not prime numbers, So taking return false for them
   for (let i = 2; i <= num / 2; i++) {
       if (num % i === 0) {  // if remainder is 0 then number is not prime, So taking return false for that
           return false;
       }
   }
   return true;
}
console.log(isPrime(7)); 
console.log(isPrime(10)); 