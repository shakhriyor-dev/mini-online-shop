let products = [
{ name: "Laptop", price: 800 },
{ name: "Phone", price: 500 },
{ name: "Headphones", price: 100 }
];

let cart = [];
let total = 0;

let productContainer = document.getElementById("products");

products.forEach((product, index) => {

productContainer.innerHTML += `
<div class="col-md-4">
<div class="card p-3">
<h4>${product.name}</h4>
<p>$${product.price}</p>
<button onclick="addToCart(${index})"
class="btn btn-primary">
Add to cart
</button>
</div>
</div>
`;

});

function addToCart(index){

let product = products[index];

cart.push(product);

document.getElementById("cart").innerHTML +=
`<li>${product.name} - $${product.price}</li>`;

total += product.price;

document.getElementById("total").innerText = total;

}