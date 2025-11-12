// Product data
const products = [
  { id: 1, name: "T-Shirt", price: 499, image: "https://via.placeholder.com/250x200?text=T-Shirt" },
  { id: 2, name: "Hoodie", price: 899, image: "https://via.placeholder.com/250x200?text=Hoodie" },
  { id: 3, name: "Jeans", price: 1199, image: "https://via.placeholder.com/250x200?text=Jeans" },
  { id: 4, name: "Sneakers", price: 1599, image: "https://via.placeholder.com/250x200?text=Sneakers" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
const productList = document.getElementById("product-list");
const cartCount = document.getElementById("cartCount");
const cartPopup = document.getElementById("cartPopup");
const cartItems = document.getElementById("cartItems");
const totalPrice = document.getElementById("totalPrice");

// Show username
const userInfo = JSON.parse(localStorage.getItem("user"));
const userName = document.getElementById("userName");
if (userName && userInfo) {
  userName.textContent = `Hello, ${userInfo.username}!`;
}

// Logout
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedIn");
    alert("Logged out successfully!");
    window.location.href = "index.html";
  });
}

// Show products
if (productList) {
  products.forEach(p => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    productList.appendChild(productDiv);
  });
}

// Add to cart
function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${product.name} added to cart!`);
}

// Delete from cart
function deleteFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  showCart();
  updateCartCount();
}

// Update cart count
function updateCartCount() {
  if (cartCount) cartCount.textContent = cart.length;
}

// Cart popup logic
const cartBtn = document.getElementById("cartBtn");
if (cartBtn) {
  cartBtn.addEventListener("click", () => {
    showCart();
  });
}

const closeCart = document.getElementById("closeCart");
if (closeCart) {
  closeCart.addEventListener("click", () => {
    cartPopup.style.display = "none";
  });
}

// Show cart
function showCart() {
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - ₹${item.price}
      <button onclick="deleteFromCart(${index})">Delete</button>
    `;
    cartItems.appendChild(li);
  });
  totalPrice.textContent = total;
  cartPopup.style.display = "block";
}

updateCartCount();
