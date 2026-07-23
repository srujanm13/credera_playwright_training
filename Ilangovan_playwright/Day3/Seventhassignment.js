/*Convert below Object to any array 
1.	const employee = {
   	 name: "John",
    	age: 30,
    	department: "QA"
};
*/

const employee = {
   	 name: "John",
    	age: 30,
    	department: "QA"
};


//let arr1=Object.values(employee);
//let arr2=Object.keys(employee);
let arr3=Object.entries(employee);

console.log(arr3);