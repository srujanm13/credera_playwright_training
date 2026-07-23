const str = "Playwright";
let count = 0;
for (let i = 0; i < str.length; i++) {
  if ("aeiouAEIOU".includes(str[i])) {
    count++;
  }
}
console.log(count);
