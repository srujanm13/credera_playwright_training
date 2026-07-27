//Create a function to calculate the total bill. If tax is not provided, use 18%.
function calculateTotalBill(amount, tax = 0.18) {
    return amount + (amount * tax);
}
let billAmount = 1000;
let totalBill = calculateTotalBill(billAmount);
console.log("The total bill is: " + totalBill); 
