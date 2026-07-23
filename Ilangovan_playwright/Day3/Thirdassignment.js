//3.	Reverse each character in the string “I love javascript” output “I evol tpircsavaj”



let str="I love Javascript";

let rev= str.split(" ").map(function(word){
              return word.split("").reverse().join("")


}).join(" ");

console.log(rev);



