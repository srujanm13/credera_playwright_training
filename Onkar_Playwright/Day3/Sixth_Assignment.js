//Convert a JavaScript object to JSON and verify if “key“ department is coming in the response ,
// then convert it back to an object. 
 const employee = { 
	id: 101, 
	name: "John", 
	department: "QA" 
};
var newEmp = JSON.stringify(employee)  // converting into json file
console.log(newEmp)
console.log(newEmp.includes("department"));
const object = JSON.parse(newEmp); // converting back to object
console.log(object);