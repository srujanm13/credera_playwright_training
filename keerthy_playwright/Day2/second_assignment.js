//Define a function to determine a student's result based on marks obtained
function checkStudentStatus(marksObtained) {
    // If marks obtained are 90 or above, student gets Distinction
    if (marksObtained >= 90) {
        return "Distinction";
    } else if (marksObtained >= 40) { // If marks obtained are between 40 and above and below 90, student has Passed
        return "Passed";
    } else { // If marks are below 40, student has Failed
        return "Failed";
    }
}

//Calling the function with different marks obtained and logging the results
console.log(checkStudentStatus(95));

console.log(checkStudentStatus(55));

console.log(checkStudentStatus(35));