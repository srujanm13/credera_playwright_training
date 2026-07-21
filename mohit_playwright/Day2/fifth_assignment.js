const employee = { 
 name: "John", 
 age: 30, 
 department: "QA" 
};
for(let key in employee){
    console.log(`${key}:${employee[key]}`);
} 