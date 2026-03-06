// Product list
let products = [
{
name: "Laptop",
price: 800,
image: "images/laptop.jpg"
},
{
name: "Phone",
price: 500,
image: "images/phone.jpg"
},
{
name: "Headphones",
price: 100,
image: "images/headphones.jpg"
}
];

// Cart
let cart = [];

// Productlarni chiqarish
let productContainer = document.getElementById("products");

products.forEach((product,index)=>{

productContainer.innerHTML += `
<div class="col-md-4 mb-4">
<div class="card p-3">

<img src="${product.image}" class="card-img-top">

<h4 class="mt-2">${product.name}</h4>

<p>$${product.price}</p>

<button onclick="addToCart(${index})"
class="btn btn-primary">
Add to cart
</button>

</div>
</div>
`;

});

// Add to cart
function addToCart(index){

let product = products[index];

let existing = cart.find(item => item.name === product.name);

if(existing){

existing.quantity++;

}else{

cart.push({
...product,
quantity:1
});

}

renderCart();

}

// Cartni chiqarish
function renderCart(){

let cartList = document.getElementById("cart");

cartList.innerHTML = "";

let total = 0;

cart.forEach((item,index)=>{

cartList.innerHTML += `
<li class="mb-2">

${item.name} - $${item.price}

<button onclick="decrease(${index})"
class="btn btn-sm btn-danger ms-2">-</button>

<span class="mx-2">${item.quantity}</span>

<button onclick="increase(${index})"
class="btn btn-sm btn-success">+</button>

</li>
`;

total += item.price * item.quantity;

});

document.getElementById("total").innerText = total;

}

// Quantity oshirish
function increase(index){

cart[index].quantity++;

renderCart();

}

// Quantity kamaytirish
function decrease(index){

cart[index].quantity--;

if(cart[index].quantity <= 0){

cart.splice(index,1);

}

renderCart();

}