const str = "Playwright";
const vowelCount = (str.match(/[aeiou]/gi) || []).length;
console.log(vowelCount);