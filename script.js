// script.js

// 1. Ma'lumotlar
const products = [
    { id: 1, name: "iPhone 15", price: 1000 },
    { id: 2, name: "MacBook Air", price: 1300 },
    { id: 3, name: "Apple Watch", price: 400 },
    { id: 4, name: "AirPods Pro", price: 250 }
];

let cart = JSON.parse(localStorage.getItem('myCart')) || [];

// 2. Mahsulotlarni ekranga chiqarish
function displayProducts() {
    const productsDiv = document.getElementById('products');
    productsDiv.innerHTML = products.map(p => `
        <div class="product-card">
            <h3>${p.name}</h3>
            <p>Narxi: $${p.price}</p>
            <button class="btn-add" onclick="addToCart(${p.id})">Savatchaga qo'shish</button>
        </div>
    `).join('');
}

// 3. Savatchaga qo'shish
function addToCart(id) {
    const item = products.find(p => p.id === id);
    cart.push(item);
    updateCart();
}

// 4. Savatchani yangilash
function updateCart() {
    const cartDiv = document.getElementById('cart-items');
    const totalSpan = document.getElementById('total-price');
    
    localStorage.setItem('myCart', JSON.stringify(cart));

    if (cart.length === 0) {
        cartDiv.innerHTML = '<p>Savatcha bo\'sh</p>';
        totalSpan.innerText = '0';
        return;
    }

    cartDiv.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <span>${item.name}</span>
            <span>$${item.price}</span>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalSpan.innerText = total;
}

// 5. Savatchani tozalash
function clearCart() {
    cart = [];
    updateCart();
}

// Sayt yuklanganda ishga tushadi
displayProducts();
updateCart();