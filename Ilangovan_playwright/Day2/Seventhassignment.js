//Create a function to calculate the total bill.
//If tax is not provided, use 18%.


function billing(mrp,tax=18){

billamount=mrp+(mrp*tax/100)

return billamount;

}
let finalamount=billing(500);

console.log(finalamount);

console.log(billing(1000,8))