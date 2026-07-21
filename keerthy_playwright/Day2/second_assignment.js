// Function to determine a student's result based on marks obtained
function checkStudentStatus(marks) {

    // If marks are 70 or above, student gets Distinction
    if (marks >= 70) {
        return "Distinction";

    // If marks are between 40 and 69, student has Passed
    } else if (marks >= 40) {
        return "Passed";

    // If marks are below 40, student has Failed
    } else {
        return "Failed";
    }
}

// Test case: Marks = 85, expected result -> Distinction
console.log(checkStudentStatus(85));

// Test case: Marks = 55, expected result -> Passed
console.log(checkStudentStatus(55));

// Test case: Marks = 30, expected result -> Failed
console.log(checkStudentStatus(30));