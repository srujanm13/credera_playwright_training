//Assignment 1: Count the number of vowels in a string “Playwright"
let str = "Playwright";
let vowels = "aeiouAEIOU";
let count = 0;
for (let char of str) {
    if (vowels.includes(char)) {
        count++;
    }
}
console.log("Assignment 1 - Number of vowels in 'Playwright':", count);

//Assignment 2: Print all even numbers from an array using forEach(). 
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let evenNumbers = [];

numbers.forEach(num => {
    if (num % 2 === 0) {
        evenNumbers.push(num);
    }
});
console.log("Assignment 2 - Even numbers:", evenNumbers);

//Assignment 3: Reverse each character in the string “I love javascript” output “I evol tpircsavaj”     
let str3 = "I love javascript";
let reversedStr = str3.split("").reverse().join("");
console.log("Assignment 3 - Reversed string:", reversedStr);

//Assignment 4: Store employee information and print a formatted sentence.”John aged 30 works in QA”
let employee = {
    name: "John",
    age: 30,
    department: "QA"
};
console.log(`Assignment 4 - Employee Information: ${employee.name} aged ${employee.age} works in ${employee.department}`);  

//Assignment 5: Create an object representing a calculator with an add() method 
let calculator = {
    add: function(a, b) {
        return a + b;
    }
};
console.log("Assignment 5 - Calculator Result:", calculator.add(90, 910));

//Assignment 6: Convert a JavaScript object to JSON and verify if “key “ department is coming in the response , then convert it back to an object. 
const employeeObj = {
    id: 101, 
    name: "John", 
    department: "QA"
};
const jsonString = JSON.stringify(employeeObj);
console.log("Assignment 6 - JSON String:", jsonString);

//Assignment 7: Convert below Object to any array  

const emp = { 

    name: "John", 
    age: 30, 
   	department: "QA" 

};
const employeeArray = Object.values(emp);
console.log("Assignment 7 - Employee Array:", employeeArray);