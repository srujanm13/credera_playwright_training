// 5. for...in
// Print all employee details in the format

let person = {
    name : "John Doe",
    age : 33,
    departmet : "QA"
}

for (let y in person){                      // for in loop
    console.log(y + " : " + person[y])
}

//Write a function that checks whether a number is prime.
function checkPrimeNumber(num){
for(let i = 2; i<  num; i++ ){          
    if(num % i === 0 )                //prime number logic
       return false
}
return true

}

console.log(checkPrimeNumber(7));   // prime number
console.log(checkPrimeNumber(10));  // not a prime number 