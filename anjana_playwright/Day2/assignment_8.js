function calculateBill(amount, tax = 18) {
    return amount + (amount * tax / 100)
}
console.log(calculateBill(1000));
console.log(calculateBill(1000, 10))