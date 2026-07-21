// Function to calculate the factorial of a given number
function Factorial(n) {

    // Check if the number is negative
    // Factorial is not defined for negative numbers
    if (n < 0) {
        return "Factorial is not defined for negative numbers";
    }

    // Initialize result to 1
    // Since factorial multiplication starts from 1
    let result = 1;

    // Multiply result by each number from n down to 2
    for (let i = n; i > 1; i--) {
        result *= i;
    }

    // Return the calculated factorial value
    return result;
}

// Test case: Factorial of 5 (5 × 4 × 3 × 2 × 1 = 120)
console.log("5! = " + Factorial(5));

// Test case: Factorial of 0 
console.log("0! = " + Factorial(0));

// Test case: Factorial of 10
console.log("10! = " + Factorial(10));