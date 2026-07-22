// 7. Default Parameters
// Create a function to calculate the total bill. 
// If tax is not provided, use 18%. 

var x = function (a, b){
    console.log("total bill is "+((a*b) + (a))); // calculation total bill + 18 %tax 
}
x(500,0.18)


//or using callback

function h(i){
i(750,0.18)}
h(function bill(a,b){
    console.log("total bill is "+ ((a*b) + (a))); // calculation total bill + 18 %tax 
})
