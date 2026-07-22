// This code takes a string, splits it into words, reverses each word, and then joins the reversed words back into a sentence.
const str = "I love javascript";

// Split the string into words using space as the separator
const words = str.split(" ");

// Use map() to process each word in the array
const reversedWords = words.map(word => {

    // Reverse the characters of each word:
    // 1. Convert word to an array of characters using split("")
    // 2. Reverse the array using reverse()
    // 3. Join the characters back into a string using join("")
    return word.split("").reverse().join("");
});

// Join the reversed words back into a sentence with spaces
const result = reversedWords.join(" ");

// Print the output
console.log(result);