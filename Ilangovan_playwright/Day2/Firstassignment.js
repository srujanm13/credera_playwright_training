//.Declare variables for a product (name, price, inStock) and print them. 


let product={

name: "phone",
price:20000,
inStock:"no"

}



console.log(product.name);
console.log(product.price);
console.log(product.inStock);

for(let key in product){

    console.log(key+":"+product[key])
}

