//Define a function to calculate the factorial of a given number
function factorial(num) {
    //Check if the number is negative
    if (num < 0) {
        return "Factorial is not defined for negative numbers";
    }

    //Initialize result to 1 since factorial multiplication starts from 1
    let result = 1;

    //Multiply result by each number from num down to 2
    for (let i = num; i > 1; i--) {
        result *= i;
    }

    return result;
}

//Calling the function with different numbers and logging the results
console.log("5! = " + factorial(5));

console.log("0! = " + factorial(0));

console.log("10! = " + factorial(10));