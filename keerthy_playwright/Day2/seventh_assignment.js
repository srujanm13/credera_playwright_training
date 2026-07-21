// Function to calculate the total bill amount including tax
function calculateTotalBill(amount, tax = 18) {
    // Add the tax amount to the original bill amount
    // If no tax value is provided, the default tax rate of 18% is used
    return amount + (amount * tax) / 100;
}

//Calling the function with different bill amounts and logging the results
console.log(calculateTotalBill(100));

console.log(calculateTotalBill(100, 10));

console.log(calculateTotalBill(500, 5));