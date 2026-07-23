
//Count the number of vowels in a string “Playwright” 
let str = "Playwright";
let vowels = "aeiouAEIOU";
let count = 0;

for (let x of str) {
    if (vowels.includes(x)) {
        count++;
    }
}

console.log("No of vowels is:", count); 

//2.Print all even numbers from an array using forEach(). 
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
numbers.forEach((num) => {
    if (num % 2 === 0) {
        console.log("Even numbers are:", num);
    }
});

//3.Reverse each character in the string “I love javascript” output “I evol tpircsavaj” 
 str = "I love javascript";  // Let already used on 1st assignment on top, so removing here
let reversed = str.split(" ").map((char) =>  char.split("").reverse().join("")).join(" ");

console.log("Reversed string is:", reversed);

//4.Store employee information and print a formatted sentence.”John aged 30 works in QA”  
// const employee = { 
//    	 name: "John", 
//     	age: 30, 
//     	department: "QA" 
// }; 

let  employee = {
    name: "John",
    age: 30,
    department: "QA"
};      
console.log(`${employee.name} age is ${employee.age} and works in ${employee.department}`); // backticks used before "dollar", If is not used then output won't get printed properly.


//5. Create an object representing a calculator with an add() method 
let calculator = {
    add: function(X, Y) {
        return X + Y;
    }
};      
console.log(calculator.add(20, 10));


//6.  Convert a JavaScript object to JSON and verify if “key “ department is coming in the response , then convert it back to an object. 
// const employee = { 
//   		  id: 101, 
//    		 name: "John", 
//     		department: "QA" 
// }; 

let employee1 = {
    id: 101,
    name: "John",
    department: "QA"
};      
let jsonString = JSON.stringify(employee1);
console.log(jsonString);

if (jsonString.includes("department")) {
    let employeeObj = JSON.parse(jsonString);
    console.log("Converted Object:", employeeObj);
}

// 7.Convert below Object to any array  
// const employee = { 
//    	 name: "John", 
//     	age: 30, 
//     	department: "QA" 
// };

let employee2 = {
    name: "John",
    age: 30,    
department: "QA"
};      
let Array = Object.entries(employee2);
console.log("Converted Array:", Array);
