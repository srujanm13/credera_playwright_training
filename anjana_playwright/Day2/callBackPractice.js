function greet(name , callback){
console.log("Hello"+ name)
callback()
}

function text(){
    console.log("Good morning")

}

greet("Anjana", text)