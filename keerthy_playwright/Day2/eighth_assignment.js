// Function to find the highest mark using the Rest Parameter (...) and Math.max()
function getHighestMark(...marks) {

// Spread the marks array into individual arguments for Math.max()
    return Math.max(...marks);
}

// Test case: Find the highest mark among the given values
// Expected output: 92
console.log(getHighestMark(85, 92, 78, 88));

// Test case: Find the highest mark from multiple values
// Expected output: 95
console.log(getHighestMark(95, 87, 91, 89, 93));

// Test case: Only one mark is provided
// Expected output: 76
console.log(getHighestMark(76));