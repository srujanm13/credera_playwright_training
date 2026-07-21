// Array containing marks of students
const marks = [75, 80, 65, 90, 88];

// Variable to store the total sum of marks
let total = 0;

// Loop through each mark in the array
for (const mark of marks) {

    // Add the current mark to the total
    total += mark;
}

// Display the total marks
console.log("Total Marks:", total);