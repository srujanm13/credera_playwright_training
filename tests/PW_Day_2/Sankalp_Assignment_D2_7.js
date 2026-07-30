function calculateTotalBill(subtotal, taxRate = 0.18, tipRate = 0.1) {
    const taxAmount = subtotal * taxRate;
    return subtotal + taxAmount;
}
console.log("Total with default tax: $" + calculateTotalBill(200).toFixed(2));
console.log("Total with custome tax: $" + calculateTotalBill(200, 0.10).toFixed(2));
