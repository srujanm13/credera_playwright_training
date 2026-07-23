// Create an object named 'calculator'
const calculator = {

    // Define a method named 'add'
    // This method takes two numbers as parameters
    add: function(num1, num2) {

        // Return the sum of the two numbers
        return num1 + num2;
    }
};

// Call the add() method with two numbers (10 and 8)
// The method returns their sum
const result = calculator.add(10, 8);

// Print the result to the console
console.log("Sum:", result);