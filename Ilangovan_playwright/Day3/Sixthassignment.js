/*6.	Convert a JavaScript object to JSON and verify if “key “ department is coming in the response , then convert it back to an object.
 const employee = {
  		  id: 101,
   		 name: "John",
    		department: "QA"
};
*/

 const employee = {
  		  id: 101,
   		 name: "John",
    		department: "QA"
};

let jsondata= JSON.stringify(employee);
console.log(jsondata);

if(jsondata.includes("department")){

    console.log("department is present");
}

let empobj=JSON.parse(jsondata);
console.log(empobj)
