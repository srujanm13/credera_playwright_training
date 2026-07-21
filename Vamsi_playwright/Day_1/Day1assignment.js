
//Create an array of five browser names and print the third browser. 
let browsers = ["Chrome", "Firefox", "Safari", "Edge", "Opera"];
console.log(browsers[2]);


//Compare two numbers and print which one is larger using the ternary operator.  
let num1 = 10, num2 = 20;
let largerNumber = (num1 > num2) ? num1 : num2;
console.log("The larger number is: " + largerNumber);

//Convert "99.99" to a number and add 0.01. 
let num = Number("99.99");
console.log("Result:",  num + 0.01);

//Given let value = "250kg";, extract the numeric part and multiply it by 2.  
let value = "250kg";
let numericPart = parseInt(value); 
console.log("Multiplied:" , numericPart * 2);

//Write a program that stores a user's age as a string, converts it to a number, checks whether the user is an adult, and prints an appropriate message. 
let ageString = "10";
if (ageString >= 18) {
    console.log("The user is an adult.");
}   else {
    console.log("The user is not an adult.");
}   


//Create an object representing a test case (id, title, status) and display it using console.table()
let testCase = {
    id: 1,
    title: "Login Test",
    status: "Passed"
};
console.table(testCase);

//Predict the output of: 
console.log(false == 0);  // true if false = 0 then (0 == 0) = true
console.log(false === 0);  

