const employee = {
    name: "Alan",
    age: 30,
    department: "QA"
}
for (const key in employee) {
    console.log(key + " : " + employee[key])
}