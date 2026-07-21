// Print employee details using for...in loop
const employee = {
    name: "John",
    age: 30,
    department: "QA"
};

function printEmployeeDetails(emp) {
    for (let key in emp) {
        console.log(`${key} : ${emp[key]}`);
    }
}

printEmployeeDetails(employee);

// Function to check if a number is prime
function isPrime(num) {
    if (num <= 1) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    
    for (let i = 3; i * i <= num; i += 2) {
        if (num % i === 0) return false;
    }
    return true;
}

// Test the prime function
console.log(isPrime(7));    // true
console.log(isPrime(10));   // false
console.log(isPrime(2));    // true

function isPrime(num) {
    if (num <= 1) {
        return false;
    }

    for (let i = 2; i < num; i++) {
        if (num % i === 0) {
            return false;
        }
    }

    return true;
}

console.log(isPrime(7));  // true
console.log(isPrime(10)); // false

