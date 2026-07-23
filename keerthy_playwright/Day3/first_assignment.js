// Function to count the number of vowels in a given string
function countVowels(str) {

    // String containing all vowels (both lowercase and uppercase)
    const vowels = 'aeiouAEIOU';

    // Variable to keep track of the vowel count
    let count = 0;

    // Loop through each character in the input string
    for (let char of str) {

        // Check if the current character is a vowel
        if (vowels.includes(char)) {

            // Increment the count if a vowel is found
            count++;
        }
    }

    // Return the total number of vowels found
    return count;
}

// Call the function with the string "Playwright"
const result = countVowels("Playwright");

// Display the result in the console
console.log(`Number of vowels in "Playwright": ${result}`);