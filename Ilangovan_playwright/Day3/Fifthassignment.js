//5.	Create an object representing a calculator with an add() method

const calculator={

brand:"Casio",

add: function (...numbers){

  let result=0;
  for (let num of numbers){

    result=result+num;
  }
  return result;
}

}

console.log(calculator.add(10,20,30,40,50));