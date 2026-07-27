//Create an object representing a calculator with an add() method 
const calculator = {
    add: function(a, b) {
        return a + b;
    }
};
let sum = calculator.add(5, 10);
console.log("The sum is: " + sum);
