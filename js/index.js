// Get navigation elements
var logoutBtn = document.getElementById("logout")

// Function to calculate total cart value
function calculateCartTotal(userName) {
  const cart = JSON.parse(localStorage.getItem("cart")) || []
  const userCartItems = cart.filter(item => item.userName === userName)
  const totalValue = userCartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  return totalValue.toFixed(2)
}

// Function to get cart items for current user
function getUserCartItems() {
  const currentUserName = localStorage.getItem("Name")
  if (!currentUserName) return []
  
  const cart = JSON.parse(localStorage.getItem("cart")) || []
  return cart.filter(item => item.userName === currentUserName)
}

// Navigation state is now handled by navigation.js

logoutBtn.addEventListener("click", function (event) {
  event.preventDefault();
  Send();
});

function Send() {
  localStorage.clear()
  setTimeout(() => {
    //window.location.href = "login.html"
    location = "signup.html"
  }, 1000)

}

// Products data
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    image: "Wireless Headphones.jpeg",
    description: "High-quality wireless headphones with noise cancellation and premium sound quality",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    image: "Smart Watch.jpeg",
    description: "Feature-rich smartwatch with health monitoring, GPS, and long battery life",
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 79.99,
    image: "Bluetooth Speaker.jpeg",
    description: "Portable bluetooth speaker with premium sound quality and waterproof design",
  },
  {
    id: 4,
    name: "Laptop Stand",
    price: 49.99,
    image: "Laptop Stand.jpeg",
    description: "Adjustable laptop stand for better ergonomics and improved workspace comfort",
  },
  {
    id: 5,
    name: "USB-C Hub",
    price: 39.99,
    image: "USB-C Hub.jpeg",
    description: "Multi-port USB-C hub with HDMI, USB 3.0 ports, and fast charging support",
  },
  {
    id: 6,
    name: "Wireless Mouse",
    price: 29.99,
    image: "Wireless Mouse.jpeg",
    description: "Ergonomic wireless mouse with precision tracking and long battery life",
  },
]
renderProducts(products)
// Render products
// Function to render products in existing container
function renderProducts(products) {
  const productsContainer = document.getElementById("productsContainer")

  // Generate product cards HTML
  const productsHTML = products.map((product) => createProductCardHTML(product)).join("")

  // Insert product cards into the container
  productsContainer.innerHTML = productsHTML

  // // Add event listeners to add to cart buttons
  // addCartEventListeners()
}

// Function to create product card HTML
function createProductCardHTML(product) {
  return `
      <div class="product-card">
        <div class="product-image-container">
          <img src="images/${product.image}" alt="${product.name}" class="product-image">
        </div>
        <div class="product-content">
          <h3 class="product-name">${product.name}</h3>
          <p class="product-description">${product.description}</p>
          <div class="product-footer">
            <div class="product-price">$${product.price}</div>
              <button class="btn btn-add-to-cart" onclick="addToCart(${product.id})">
                            Add to Cart
            </button>
          </div>
        </div>
      </div>
    `
}

// Global function to add product to cart (only needs product ID)
function addToCart(productId) {
  // Check if user is logged in
  const currentUserName = localStorage.getItem("Name")

  if (!currentUserName) {
    alert("Please log in to add items to cart")
    return
  }

  // Find product by ID from products array
  const product = products.find((p) => p.id === productId)

  if (!product) {
    alert("Product not found!")
    return
  }

  // Get existing cart or create new one
  const cart = JSON.parse(localStorage.getItem("cart")) || []

  // Check if product already exists in user's cart
  const existingItemIndex = cart.findIndex((item) => item.id === productId && item.userName === currentUserName)

  let message = ""
  
  if (existingItemIndex !== -1) {
    // Update quantity for existing item
    cart[existingItemIndex].quantity += 1
    const updatedItem = cart[existingItemIndex]
    const totalPrice = (updatedItem.price * updatedItem.quantity).toFixed(2)
    message = `${product.name} quantity updated to ${updatedItem.quantity} (Total: $${totalPrice})`
  } else {
    // Add new item to cart
    const newItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      quantity: 1,
      userName: currentUserName,
    }
    cart.push(newItem)
    message = `${product.name} added to cart! ($${product.price})`
  }

  // Save cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart))

  // Update cart count
  updateCartCount()

  // Show success message
  showCartMessage(message)
}

// Function to show cart message
function showCartMessage(message) {
  // Remove existing message if any
  const existingMessage = document.querySelector('.cart-message')
  if (existingMessage) {
    existingMessage.remove()
  }

  const currentUserName = localStorage.getItem("Name")
  const cartTotal = calculateCartTotal(currentUserName)
  const totalItems = getUserCartItems().reduce((total, item) => total + item.quantity, 0)

  // Create new message element
  const messageElement = document.createElement('div')
  messageElement.className = 'cart-message'
  messageElement.innerHTML = `
    <div>${message}</div>
    <div style="font-size: 12px; margin-top: 4px; opacity: 0.9;">
      Cart: ${totalItems} items - Total: $${cartTotal}
    </div>
  `
  
  // Add to body
  document.body.appendChild(messageElement)
  
  // Remove after 4 seconds (increased duration for more info)
  setTimeout(() => {
    messageElement.remove()
  }, 4000)
}

