let str = "99.99";
let result = Number(str) + 0.01;
let cleanedResult = result.toFixed(2);

console.log("The result is: " + cleanedResult);