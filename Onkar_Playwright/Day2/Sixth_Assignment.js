// 6. Arrow Functions 
// Write an arrow function that returns the cube of a number. 
 
var cube =  (y) => {
    console.log("the cube is = " + y*y*y)
}
cube(5)

//or

function h(i){
    i(2);
}
h((a)=>{  
    console.log("the cube is = " + a*a*a)
   })