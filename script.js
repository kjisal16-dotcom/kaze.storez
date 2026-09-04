const WHATSAPP = "919946375868";

/*
  EDIT PRODUCTS HERE.
  Add your real product image URL/path in "image" later if needed.
  "category" must be Shoes, Watches or Others.
*/
const products = [
  {id:1,name:"KAZE Street Runner",category:"Shoes",price:1299,tag:"New",meta:"Casual • Sizes 6–10"},
  {id:2,name:"KAZE Everyday Sneaker",category:"Shoes",price:1499,tag:"Best seller",meta:"Sneaker • Sizes 6–11"},
  {id:3,name:"KAZE Classic Court",category:"Shoes",price:1199,tag:"New",meta:"Casual • Sizes 6–10"},
  {id:4,name:"KAZE Urban Trainer",category:"Shoes",price:1699,tag:"Popular",meta:"Sports • Sizes 7–11"},
  {id:5,name:"KAZE Minimal Watch",category:"Watches",price:999,tag:"",meta:"Everyday watch"},
  {id:6,name:"KAZE Classic Watch",category:"Watches",price:1299,tag:"",meta:"Classic style"},
  {id:7,name:"KAZE Essential Wallet",category:"Others",price:499,tag:"",meta:"Accessory"},
  {id:8,name:"KAZE Sunglasses",category:"Others",price:699,tag:"",meta:"Accessory"}
];

let cart = JSON.parse(localStorage.getItem("kazeCart") || "[]");

const money = n => `₹${Number(n).toLocaleString("en-IN")}`;

function saveCart(){
  localStorage.setItem("kazeCart", JSON.stringify(cart));
  renderCart();
  updateCount();
}

function updateCount(){
  const count = cart.reduce((sum,item)=>sum+item.qty,0);
  document.getElementById("cartCount").textContent = count;
  document.getElementById("mobileCartCount").textContent = count;
}

function renderProducts(list = products){
  const grid = document.getElementById("productGrid");
  if(!list.length){
    grid.innerHTML = `<p class="empty" style="grid-column:1/-1">No products found.</p>`;
    return;
  }
  grid.innerHTML = list.map(p => `
    <article class="product">
      <div class="product-image">
        ${p.tag ? `<span class="badge">${p.tag}</span>` : ""}
        <div class="mock">${p.category === "Shoes" ? "SHOE" : p.category === "Watches" ? "TIME" : "KAZE"}</div>
      </div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <div class="meta">${p.meta}</div>
        <div class="price">${money(p.price)}</div>
        <button class="add" data-add="${p.id}">Add to bag</button>
      </div>
    </article>
  `).join("");
}

function renderCart(){
  const box = document.getElementById("cartItems");
  if(!cart.length){
    box.innerHTML = `<div class="empty">Your bag is empty.<br>Pick a few KAZE favourites.</div>`;
  } else {
    box.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-thumb">${item.category === "Shoes" ? "SHOE" : item.category === "Watches" ? "TIME" : "KAZE"}</div>
        <div>
          <h4>${item.name}</h4>
          <p>${money(item.price)}</p>
          <div class="qty">
            <button data-minus="${item.id}" aria-label="Decrease quantity">−</button>
            <span>${item.qty}</span>
            <button data-plus="${item.id}" aria-label="Increase quantity">+</button>
            <button class="remove" data-remove="${item.id}">Remove</button>
          </div>
        </div>
        <strong>${money(item.price * item.qty)}</strong>
      </div>
    `).join("");
  }
  const total = cart.reduce((sum,item)=>sum + item.price * item.qty,0);
  document.getElementById("cartTotal").textContent = money(total);
}

function addToCart(id){
  const p = products.find(x=>x.id === id);
  if(!p) return;
  const existing = cart.find(x=>x.id === id);
  if(existing) existing.qty++;
  else cart.push({...p,qty:1});
  saveCart();
  openCart();
}

function openCart(){
  document.getElementById("cartDrawer").classList.add("open");
  document.getElementById("drawerBackdrop").classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeCart(){
  document.getElementById("cartDrawer").classList.remove("open");
  document.getElementById("drawerBackdrop").classList.remove("open");
  document.body.style.overflow = "";
}
function openCheckout(){
  if(!cart.length){ alert("Please add a product to your bag first."); return; }
  closeCart();
  document.getElementById("checkoutModal").classList.add("open");
  document.getElementById("checkoutModal").setAttribute("aria-hidden","false");
}
function closeCheckout(){
  document.getElementById("checkoutModal").classList.remove("open");
  document.getElementById("checkoutModal").setAttribute("aria-hidden","true");
}

document.addEventListener("click", e => {
  const add = e.target.closest("[data-add]");
  if(add) addToCart(Number(add.dataset.add));

  const plus = e.target.closest("[data-plus]");
  if(plus){
    const item = cart.find(x=>x.id===Number(plus.dataset.plus));
    if(item) item.qty++;
    saveCart();
  }
  const minus = e.target.closest("[data-minus]");
  if(minus){
    const item = cart.find(x=>x.id===Number(minus.dataset.minus));
    if(item){ item.qty--; if(item.qty<=0) cart=cart.filter(x=>x.id!==item.id); }
    saveCart();
  }
  const remove = e.target.closest("[data-remove]");
  if(remove){
    cart=cart.filter(x=>x.id!==Number(remove.dataset.remove));
    saveCart();
  }
});

document.getElementById("cartBtn").onclick = openCart;
document.getElementById("mobileCart").onclick = openCart;
document.getElementById("closeCart").onclick = closeCart;
document.getElementById("drawerBackdrop").onclick = closeCart;
document.getElementById("checkoutBtn").onclick = openCheckout;
document.getElementById("closeCheckout").onclick = closeCheckout;

document.getElementById("searchBtn").onclick = () => {
  const panel = document.getElementById("searchPanel");
  panel.classList.toggle("open");
  if(panel.classList.contains("open")) document.getElementById("searchInput").focus();
};

document.getElementById("searchInput").addEventListener("input", e => {
  const q = e.target.value.trim().toLowerCase();
  renderProducts(products.filter(p => `${p.name} ${p.category} ${p.meta}`.toLowerCase().includes(q)));
});

document.querySelectorAll(".filter").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    const value = btn.dataset.filter;
    renderProducts(value === "all" ? products : products.filter(p=>p.category===value));
  });
});

document.getElementById("checkoutForm").addEventListener("submit", e => {
  e.preventDefault();
  if(!cart.length) return;

  const data = new FormData(e.target);
  const lines = cart.map(item => `• ${item.name} × ${item.qty} — ${money(item.price * item.qty)}`).join("\n");
  const total = cart.reduce((sum,item)=>sum + item.price * item.qty,0);

  const message =
`*KAZE — NEW ORDER*

*Products:*
${lines}

*Subtotal:* ${money(total)}
*Customer:* ${data.get("name")}
*Phone:* ${data.get("phone")}
*Delivery Address:* ${data.get("address")}
*Notes:* ${data.get("notes") || "None"}

COD: No
Please confirm delivery charge and order availability.`;

  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`, "_blank");
  closeCheckout();
});

document.getElementById("year").textContent = new Date().getFullYear();
renderProducts();
renderCart();
updateCount();
