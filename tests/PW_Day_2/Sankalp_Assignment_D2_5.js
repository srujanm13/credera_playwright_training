const employee = {
name : "John",
age : 30,
department : "QA"
};
for(const[key,value] of Object.entries(employee)){
    console.log(`${key}: ${value}`);


}