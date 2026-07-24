//Count the number of vowels in a string “Playwright” 
let str = "Playwright";
let vowelCount = 0;
for (let char of str.toLowerCase()) {
    if ("aeiou".includes(char)) {
        vowelCount++;
    }
}
console.log("The number of vowels in '" + str + "' is: " + vowelCount);