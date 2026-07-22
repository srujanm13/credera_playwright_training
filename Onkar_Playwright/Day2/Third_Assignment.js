//3.Loops (for)
// Write a program to calculate the factorial of a number. 
function getFactorial(num){
    let result = 1;

    for (let i = 1; i<= num ; i++){
        result = result * i;
    }
    return result;
}
console.log(getFactorial(5))