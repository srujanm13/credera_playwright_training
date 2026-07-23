//Assigment-1 Declare variables for a product (name, price, inStock) and print them. 
let productName = "Laptop";
let productPrice = 999.99;
let productInStock = true;
console.log("Assignment-1" );
console.log("Product Name:", productName);
console.log("Product Price:", productPrice);
console.log("In Stock:", productInStock);

//Assignment-2: if, else or switch Write a program to check whether a student has Passed, Failed, or received a Distinction based on marks.

let marks = 100;
if (marks >= 75) {
    console.log("Assignment-2 Using if, else if - Distinction");  
} else if (marks >= 50 && marks < 75) {
    console.log("Assignment-2 Using if, else if - Passed");
} else {
    console.log("Assignment-2 Using if, else if - Failed");
}

let mark = 45;
switch (true) {
    case (mark >= 75): 
        console.log("Assignment-2 Using Switch Statement- Distinction");  
        break;
    case (mark >= 50 && mark < 75):
        console.log("Assignment-2 Using Switch Statement- Passed");
        break;
    default:
        console.log("Assignment-2 Using Switch Statement- Failed");
}

//Assignment-3: Loops (for) Write a program to calculate the factorial of a number.
// Example:
// 5! = 5 × 4 × 3 × 2 × 1 = 120
let number = 5;
let factorial = 1;
for (let i = 1; i <= number; i++) {
    factorial *= i;
}
console.log("Assignment-3 - Factorial of", number, "is:", factorial);

//Assignment-4: for...of Given an array of marks, calculate the total marks. const marks = [75, 80, 65, 90, 88];

const marks2 = [75, 80, 65, 90, 88];

let total = 0;

for (const mark of marks2) {
    total += mark;
}

console.log("Assignment-4 - Total Marks:", total);

//Assignment-5: for...in Given an object representing a student (name, age, grade), print each property and its value.
const employee = {
    name: "John",
    age: 30,
    department: "QA"
};
function isPrime(age) {
    if (age <= 1) {
        return false;
    }

    for (let i = 2; i <= Math.sqrt(age); i++) {
        if (age % i === 0) {
            return false;
        }
    }

    return true;
}
console.log("Assignment-5 - Employee Details:");
for (let key in employee) {
    console.log(`${key} : ${employee[key]}`);
}
console.log("Is Age Prime:", isPrime(employee.age));

//Assignment-6: . Arrow Functions Write an arrow function that returns the cube ofa number.
const getCube = (num) => num ** 3;
console.log("Assignment-6 - Cube of 5:", getCube(5));

//Assignment-7: . Create a function to calculate the total bill. If tax is not provided, use 18%.
const calculateTotalBill = (amount, tax = 0.18) => {
    return amount + (amount * tax);
};
console.log("Assignment-7 - Total Bill:", calculateTotalBill(10000));

//Assignment-8: Write a function that accepts any number of marks and returns the highest mark.
const getHighestMark = (...marks) => {
    return Math.max(...marks);
};
console.log("Assignment-8 - Highest Mark:", getHighestMark(90, 80, 100, 90, 88));

//Assignment-9: Merge two arrays of browser names and print the merged array.
const browsers1 = ["Chrome", "Firefox"];
const browsers2 = ["Edge", "Safari"];
const mergedBrowsers = [...browsers1, ...browsers2];
console.log("Assignment-9 - Merged Browsers:", mergedBrowsers);