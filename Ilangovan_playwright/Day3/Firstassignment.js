//1.	Count the number of vowels in a string “Playwright”



function getvowelscount(str){
    let count = 0;

    for(letters of str.toLowerCase()){
         if("aeiou".includes(letters)){
                   count++;

         }

    }
return count;

}

console.log(getvowelscount("Playwright"));