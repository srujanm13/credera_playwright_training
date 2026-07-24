// Program to Print all employee details in the format: name : John age : 30 department : QA
let employee = {
    name: "John",
    age: 30,
    department: "QA"
};
console.log("name : " + employee.name + " age : " + employee.age + " department : " + employee.department);



// Write a function that checks whether a number is prime.
function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }   
    return true;
}

let numberToCheck = 7;  
console.log(numberToCheck + " is prime: " + isPrime(numberToCheck));






