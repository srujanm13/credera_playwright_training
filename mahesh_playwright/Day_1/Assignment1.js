// Assignment_1 1.	Create an array of five browser names and print the third browser. 
let browsers = ["Chrome", "Firefox", "Safari", "Edge"]
console.log(browsers[2])

//Assignment#2: Compare two numbers and print which one is larger using the ternary operator.
let num1 = 19;
let num2 = 40;
let larger = (num1 > num2) ? num1 : num2;
console.log("The larger number is:", larger);

//Assignment#3: Convert "99.99" to a number and add 0.01.
let price = "99.99";
let total = Number(price) + 0.01;
console.log("Total is:", total);

//Assignment#4: Given let value = "250kg";, extract the numeric part and multiply it by 2.
let value = "250kg";
let numericValue = parseFloat(value);
let result = numericValue * 2;
console.log("Result is:", result);

//Assignment#5: 5.	Write a program that stores a user's age as a string, converts it to a number, checks whether the user is an adult, and prints an appropriate message.
let age = "20";
let ageNumber = Number(age);
if (ageNumber >= 18) {
    console.log("The user is an adult.");
} else {
    console.log("The user is not an adult.");
}

//Assignment#6: 6.	Create an object representing a test case (id, title, status) and display it using console.table().
let testCase = {
    id: 1, 
    title: "Test Case",
    status: "Pass"
}
console.table(testCase);

console.log(false == 0);
console.log(false === 0);
