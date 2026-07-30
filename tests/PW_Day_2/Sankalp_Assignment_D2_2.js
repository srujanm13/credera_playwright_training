function studentReport(marks){
if (marks < 0 || marks > 100) {
    return "Invalid marks Please enter marks between 0 and 100";
}
if (marks >= 90) {
    return "Good";
}else if(marks>=45){
return"Average";

}else{
return "Poor";

}


}


console.log(studentReport(95)); // Good
console.log(studentReport(50)); // Average
console.log(studentReport(30)); // Poor
console.log(studentReport(-10));