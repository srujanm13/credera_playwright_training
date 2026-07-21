// Declare an object to represent an employee
const employee = {
    name: "John",
    age: 30,
    department: "QA"
};

// Define a function to print employee details
function printEmployeeDetails(employee) {
    for (let key in employee) {
        console.log(`${key} : ${employee[key]}`);
    }
}

// Call the function to print employee details
printEmployeeDetails(employee);