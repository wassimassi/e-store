// Cart page functionality
var logoutBtn = document.getElementById("logout")

// Initialize page - navigation state is handled by navigation.js
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem("Name")) {
        // User is logged in - load cart
        loadCartItems()
    } else {
        // User is not logged in - redirect to login
        window.location.href = "login.html"
    }
});

// Logout functionality
logoutBtn.addEventListener("click", function (event) {
    event.preventDefault();
    logout();
});

function logout() {
    localStorage.clear()
    setTimeout(() => {
        window.location.href = "signup.html"
    }, 1000)
}

// Cart count function is now handled by navigation.js

// Function to load and display cart items
function loadCartItems() {
    const currentUserName = localStorage.getItem("Name")
    if (!currentUserName) return

    const cart = JSON.parse(localStorage.getItem("cart")) || []
    const userCartItems = cart.filter(item => item.userName === currentUserName)
    
    const cartContent = document.getElementById("cart-content")
    const cartEmpty = document.getElementById("cart-empty")
    const cartSummary = document.getElementById("cart-summary")

    if (userCartItems.length === 0) {
        cartContent.style.display = "none"
        cartSummary.style.display = "none"
        cartEmpty.style.display = "block"
        return
    }

    cartEmpty.style.display = "none"
    cartContent.style.display = "block"
    cartSummary.style.display = "block"

    // Generate cart items HTML
    const cartHTML = userCartItems.map(item => createCartItemHTML(item)).join("")
    cartContent.innerHTML = cartHTML

    // Update summary
    updateCartSummary()
}

// Function to create cart item HTML
function createCartItemHTML(item) {
    const itemTotal = (item.price * item.quantity).toFixed(2)
    
    return `
        <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-image">
                <img src="images/${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h3 class="cart-item-name">${item.name}</h3>
                <p class="cart-item-description">${item.description}</p>
                <div class="cart-item-price">$${item.price}</div>
            </div>
            <div class="cart-item-controls">
                <div class="quantity-controls">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <div class="cart-item-total">$${itemTotal}</div>
                <button class="btn-remove" onclick="removeFromCart(${item.id})">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 6h18m-2 0v14c0 2-1 3-3 3H8c-2 0-3-1-3-3V6m3 0V4c0-2 1-3 3-3h4c2 0 3 1 3 3v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M10 11v6m4-6v6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
        </div>
    `
}

// Function to update item quantity
function updateQuantity(productId, change) {
    const currentUserName = localStorage.getItem("Name")
    const cart = JSON.parse(localStorage.getItem("cart")) || []
    const itemIndex = cart.findIndex(item => item.id === productId && item.userName === currentUserName)
    
    if (itemIndex !== -1) {
        cart[itemIndex].quantity += change
        
        // Remove item if quantity is 0 or less
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1)
        }
        
        // Save updated cart
        localStorage.setItem("cart", JSON.stringify(cart))
        
        // Reload cart display
        loadCartItems()
        updateCartCount()
    }
}

// Function to remove item from cart
function removeFromCart(productId) {
    const currentUserName = localStorage.getItem("Name")
    let cart = JSON.parse(localStorage.getItem("cart")) || []
    
    // Filter out the item to remove
    cart = cart.filter(item => !(item.id === productId && item.userName === currentUserName))
    
    // Save updated cart
    localStorage.setItem("cart", JSON.stringify(cart))
    
    // Reload cart display
    loadCartItems()
    updateCartCount()
}

// Function to update cart summary
function updateCartSummary() {
    const currentUserName = localStorage.getItem("Name")
    const cart = JSON.parse(localStorage.getItem("cart")) || []
    const userCartItems = cart.filter(item => item.userName === currentUserName)
    
    const subtotal = userCartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
    const tax = subtotal * 0.08 // 8% tax
    const total = subtotal + tax
    
    document.getElementById("cart-subtotal").textContent = `$${subtotal.toFixed(2)}`
    document.getElementById("cart-tax").textContent = `$${tax.toFixed(2)}`
    document.getElementById("cart-total").textContent = `$${total.toFixed(2)}`
}

// Checkout functionality
document.addEventListener("DOMContentLoaded", function() {
    const checkoutBtn = document.querySelector(".btn-checkout")
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", function() {
            alert("Checkout functionality coming soon!")
        })
    }
}) 