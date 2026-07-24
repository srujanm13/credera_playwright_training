//Convert a JavaScript object to JSON and verify if “key “ department is coming in the response , then convert it back to an object. 
const employee = { 

  		  id: 101, 

   		 name: "John", 

    		department: "QA" 

};
const employeeJSON = JSON.stringify(employee);
console.log(employeeJSON);

if (employeeJSON.includes("department")) {
    const employeeObj = JSON.parse(employeeJSON);
    console.log(employeeObj);
}
