//Write a function that accepts any number of marks and returns the highest mark.

function gethighmarks(...marks){


let highest=marks[0];

for(let mark of marks){
if(mark>highest){

    highest=mark;
}

}

return highest;


}



let highmark=gethighmarks(50,77,55,90,86,96,72);

console.log(highmark);