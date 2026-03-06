const products = [
    { id:1, name:"iPhone 15", price:1000, image:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/IPhone_15.png/320px-IPhone_15.png" },
    { id:2, name:"MacBook Air", price:1300, image:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/MacBook_Air_M2_Silver.jpg/320px-MacBook_Air_M2_Silver.jpg" },
    { id:3, name:"Apple Watch", price:400, image:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Apple_Watch_Series_6.png/320px-Apple_Watch_Series_6.png" },
    { id:4, name:"AirPods Pro", price:250, image:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/AirPods_Pro.png/320px-AirPods_Pro.png" }
];

let cart = JSON.parse(localStorage.getItem('myCart')) || [];

function displayProducts() {
    const productsDiv = document.getElementById('products');
    productsDiv.innerHTML = products.map(p => `
        <div class="product-card">
            <img src="${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>$${p.price}</p>
            <button class="btn-add" onclick="addToCart(${p.id})">Savatchaga qo'shish</button>
        </div>
    `).join('');
}

function addToCart(id){
    const item = products.find(p => p.id===id);
    const exist = cart.find(i => i.id===id);
    if(exist) exist.quantity++;
    else cart.push({...item, quantity:1});
    updateCart();
}

function updateCart(){
    const cartDiv = document.getElementById('cart-items');
    const totalSpan = document.getElementById('total-price');

    localStorage.setItem('myCart', JSON.stringify(cart));

    if(cart.length===0){
        cartDiv.innerHTML = '<p>Savatcha bo\'sh</p>';
        totalSpan.innerText='0';
        return;
    }

    cartDiv.innerHTML = cart.map((item,index)=>`
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-image">
            <span>${item.name}</span>
            <div>
                <button class="btn-qty decrease" onclick="decrease(${index})">-</button>
                <span>${item.quantity}</span>
                <button class="btn-qty increase" onclick="increase(${index})">+</button>
                <button class="btn-qty remove" onclick="removeItem(${index})">x</button>
            </div>
            <span>$${item.price*item.quantity}</span>
        </div>
    `).join('');

    const total = cart.reduce((sum,i)=>sum+i.price*i.quantity,0);
    totalSpan.innerText = total;
}

function increase(index){ cart[index].quantity++; updateCart(); }
function decrease(index){ cart[index].quantity--; if(cart[index].quantity<=0) cart.splice(index,1); updateCart(); }
function removeItem(index){ cart.splice(index,1); updateCart(); }
function clearCart(){ cart=[]; updateCart(); }

displayProducts();
updateCart();

// Theme toggle
const toggleBtn = document.getElementById('theme-toggle');
toggleBtn.addEventListener('click', ()=>{
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
    toggleBtn.textContent = document.body.classList.contains('dark-mode') ? "☀️ Kunduzgi rejim" : "🌙 Tungi rejim";
});