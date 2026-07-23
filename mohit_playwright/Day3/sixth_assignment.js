 const employee = { 
    id: 101, 
   	name: "John", 
    department: "QA" 
}; 
const jsonString = JSON.stringify(employee);
console.log(jsonString);
console.log(jsonString.includes("department"));
const object = JSON.parse(jsonString);
console.log(object);