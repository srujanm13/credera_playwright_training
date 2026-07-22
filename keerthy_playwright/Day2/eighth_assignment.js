// Function to find the highest mark from a list of marks
function getHighestMark(...marks) {
    // Use Math.max() to find the highest mark among the provided values
    return Math.max(...marks);
}

// Calling the function with different sets of marks and logging the results
console.log(getHighestMark(85, 92, 78, 88));

console.log(getHighestMark(95, 87, 91, 89, 93));

console.log(getHighestMark(76, 44));