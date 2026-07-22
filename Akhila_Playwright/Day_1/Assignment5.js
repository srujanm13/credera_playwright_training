//Write a program that stores a user's age as a string, converts it to a number, checks whether the user is an adult, and prints an appropriate message. 
let userAge = "15";
let ageNumber = parseInt(userAge);
if (ageNumber >= 18) {
    console.log("You are an adult.");           
} else {
    console.log("You are not an adult.");
}   