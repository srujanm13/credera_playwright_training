// Create an object to store employee information
const employee = {
    id: 101,                
    name: "John",           
    department: "QA"        
};

// Convert the JavaScript object into a JSON string
const jsonData = JSON.stringify(employee);

// Print the JSON string
console.log("JSON String:", jsonData);

// Convert the JSON string back into a JavaScript object
const parsedObject = JSON.parse(jsonData);

// Check if the 'department' key exists in the converted object
if ("department" in parsedObject) {
    console.log("Department key exists in the response.");
    console.log("Department Value:", parsedObject.department);
} else {
    console.log("Department key does not exist in the response.");
}

// Print the converted object
console.log("Converted Back to Object:", parsedObject);