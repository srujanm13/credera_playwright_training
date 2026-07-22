const employee = {
    name: "John",
    age: 30,
    department: "QA"
};


for( const emp in employee){

    console.log(emp+":"+employee[emp]);
}


//Write a function that checks whether a number is prime.


function checkprime(num){

    if(num<=1){P
        return false;

    }

    for(i=2;i<num;i++){
        if(num%i===0){
            return false;
        }

    }
return true;
}

console.log(checkprime(5));
console.log(checkprime(4));