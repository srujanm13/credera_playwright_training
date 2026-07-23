
//1.Declare variables for a product (name, price, inStock) and print them. 

let name = "Mobile Phone";
let price = 50000;
let inStock = true;
console.log(name, price, inStock);
//Output purpose added below lines 
console.log("Product Name: " + name);
console.log("Price: " + price);
console.log("In Stock: " + inStock);

//2.if, else or switch 
//Program 
//Write a program to check whether a student has Passed, Failed, or received a Distinction based on marks. 

let marks = 80;
if (marks >= 75) {
    console.log("Distinction");
} else if (marks >= 35) {
    console.log("pass");
 } else {
        console.log("Fail");
    }

//3.Loops (for) 
// Program 
// Write a program to calculate the factorial of a number. 
// Example: 
// 5! = 5 × 4 × 3 × 2 × 1 = 120

let num = 5;
let factorial = 1;
for (let i = 1; i <= num; i++) { 
 factorial = factorial *i;
}   
console.log("Factorial of " + num + " is: " + factorial);

//4. for...of 
//Program 
//Given an array of marks, calculate the total marks. 
//const marks = [75, 80, 65, 90, 88]; 

let marksArray = [75, 80, 65, 90, 88];
let totalMarks = 0; 
for (let mark of marksArray) {
    totalMarks = totalMarks + mark;
}                       
console.log("Total Marks: " + totalMarks);

// 5. for...in Program 
// Print all employee details in the format: 
// name : John 
// age : 30 
// department : QA 
// const employee = { 
// name: "John", 
// age: 30, 
// department: "QA" }; 

let employee = {
    name: "John",
    age: 30,
    department: "QA"
};  
for (let key in employee) {
    console.log(key + " : " + employee[key]);
}
 

// 6. Arrow Functions Program 
// Write an arrow function that returns the cube of a number. 

let cube = (num) => num * num * num; //const func = (num) => num * num * num;
console.log("Cube of 5 is: " + cube(5));    

// 7. Default Parameters Program 
// Create a function to calculate the total bill. 
// If tax is not provided, use 18%. 

function calculateBill(amount, tax = 0.18) {
    return amount + (amount * tax);   // Bill = amount + Tax,  TAX = amount * tax
}   
console.log(calculateBill(100)); // without tax, default tax 18%
console.log(calculateBill(100, 0.2)); // with tax

// 8. Rest Parameters Program 
// Write a function that accepts any number of marks and returns the highest mark. 

function Mark(...marks) {
    return Math.max(...marks);
}           
console.log(Mark(75, 80, 65, 90, 88)); 

// 9. Spread Operator Program 
// Merge two arrays of browser names and print the merged array. 
// const browsers1 = ["Chrome", "Firefox"]; 
// const browsers2 = ["Edge", "Safari"]; 

const browsers1 = ["Chrome", "Firefox"]; 
const browsers2 = ["Edge", "Safari"]; 
const browsers = [...browsers1, ...browsers2];
console.log(browsers);

