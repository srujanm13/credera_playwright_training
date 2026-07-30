const employee = {
id : 101,
name : "John",
age : 30,
department : "QA"

};
const employeeJSON = JSON.stringify(employee);
console.log(employeeJSON);
const hasDepartment = JSON.stringify("department");
console.log(hasDepartment);
const backToObject = JSON.parse(employeeJSON);
console.log(backToObject);