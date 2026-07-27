//Given an array of marks const marks = [75, 80, 65, 90, 88];, calculate the total marks using for...for
const marks = [75, 80, 65, 90, 88]; 
let totalMarks = 0;
for (let i = 0; i < marks.length; i++) {
    totalMarks += marks[i]; 
}
console.log("The total marks are: " + totalMarks);
