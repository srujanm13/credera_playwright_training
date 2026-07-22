// 4. for...of
// Given an array of marks, calculate the total marks. 

const marks = [75, 80, 65, 90, 88]; 
let total = 0;
for (let x of marks){
    total = total + x;
}
console.log("Total marks are " + total)