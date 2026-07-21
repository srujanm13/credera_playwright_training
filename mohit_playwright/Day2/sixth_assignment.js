var isPrime = function(number){
    if(number<=1){
        return false;
    }
    else{
        let i =2 ;
        while(number>i){
            if(number%i==0){
                return false;
            }
            i++
        }
        return true;

    }
}

console.log(isPrime(29));