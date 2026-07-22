var totalBill =(amount, tax =18)=>amount+(amount*tax)/100;
console.log(totalBill(100));
console.log(totalBill(100,10));