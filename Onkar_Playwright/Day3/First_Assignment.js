//Count the number of vowels in a string “Playwright” 

var Str = "Playwright";
var vowels = Str.match(/[aeiou]/gi);
console.log(vowels); 
console.log("no. of vowels "+vowels.length); 