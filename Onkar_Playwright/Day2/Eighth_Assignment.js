// 8. Rest Parameters
// Write a function that accepts any number of marks and returns the highest mark. 

// function marks(...numbers) {
//     return Math.max(...numbers);
// }
// console.log(marks(15,25,36,85));

function Highestmarks(arr) {
let max = 0;
for (let i = 0; i < arr.length; i++) {
if (arr[i] > max) max = arr[i];
}
return max;
}
console.log(Highestmarks([445, 12, 8, 130, 44])); 