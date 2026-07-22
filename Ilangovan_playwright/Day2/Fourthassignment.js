//Given an array of marks, calculate the total marks.

const marks = [75, 80, 65, 90, 88];

let total=0;
for(const mark of marks){

    total=total+mark;

}

console.log(total);