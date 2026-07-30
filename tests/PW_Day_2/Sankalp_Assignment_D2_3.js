function getFactorial(number) {
if (number < 0) return "Error";
let result = 1;
for (let i = number; i > 1; i--) {
    result *= i;
}
return result;
}
const num = 5;
console.log(`Factorial of ${num} is: ${getFactorial(num)}`);