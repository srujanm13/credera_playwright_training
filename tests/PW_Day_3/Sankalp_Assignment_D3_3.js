const str = "I love javascript";
const result = str.split(" ").map(word => word.split(" ").reverse().join(" ")).join(" ");
console.log(result);