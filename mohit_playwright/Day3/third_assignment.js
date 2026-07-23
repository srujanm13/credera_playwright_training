const str ="I love javascript";
let reverseString="";
let arr = str.split(" ");
for(let i =0; i<arr.length;i++){
    let rev="";   
    for(let j= arr[i].length-1; j>=0;j--){
        rev+=arr[i][j];
    }
    reverseString= reverseString+rev+" ";
}
let outputstr = reverseString.trim();
console.log(outputstr); 