// Assignment_1 1.	Create an array of five browser names and print the third browser. 
let browsers = ["Chrome", "Firefox", "Safari", "Edge"]
console.log("Assignment 1 - Third Browser:", browsers[2]);

//Assignment#2: Compare two numbers and print which one is larger using the ternary operator.
let num1 = 19;
let num2 = 40;
let larger = (num1 > num2) ? num1 : num2;
console.log("Assignment-2 - The larger number is:", larger);

//Assignment#3: Convert "99.99" to a number and add 0.01.
let price = "99.99";
let total = Number(price) + 0.01;
console.log("Assignment-3 - Total is:", total);

//Assignment#4: Given let value = "250kg";, extract the numeric part and multiply it by 2.
let value = "250kg";
let numericValue = parseFloat(value);
let result = numericValue * 2;
console.log("Assignment-4 - Result is:", result);

//Assignment#5: 5.	Write a program that stores a user's age as a string, converts it to a number, checks whether the user is an adult, and prints an appropriate message.
let age = "20";
let ageNumber = Number(age);
if (ageNumber >= 18) {
    console.log("Assignment-5 - The user is an adult.");
} else {
    console.log("Assignment-5 - The user is not an adult.");
}

//Assignment#6: 6.	Create an object representing a test case (id, title, status) and display it using console.table().
const testCase = {
    id: 101,
    title: "Verify Login Functionality",
    status: "Passed"
};
console.log("Assignment-6 - Test Case Details:");
console.table(testCase);

//Assignment#7: 7.	Compare the boolean value false with the number 0 using both == and === operators, and print the results.
console.log("Assignment-7 - false == 0:", false == 0);
console.log("Assignment-7 - false === 0:", false === 0);
