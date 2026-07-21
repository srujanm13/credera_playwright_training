// Function to calculate the total bill amount including tax
function calculateTotalBill(amount, tax = 18) {

    // Add the tax amount to the original bill amount
    // If no tax value is provided, the default tax rate of 18% is used
    return amount + (amount * tax) / 100;
}

// Test case: Amount = 100, using default tax rate (18%)
// Expected output: 118
console.log(calculateTotalBill(100));

// Test case: Amount = 100, tax rate = 10%
// Expected output: 110
console.log(calculateTotalBill(100, 10));

// Test case: Amount = 500, tax rate = 5%
// Expected output: 525
console.log(calculateTotalBill(500, 5));

// Test case: Amount = 1000, using default tax rate (18%)
// Expected output: 1180
console.log(calculateTotalBill(1000));