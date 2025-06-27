// Navigation menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation state based on user login status
    initializeNavigation();
    
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            // Toggle active class on hamburger
            hamburger.classList.toggle('active');
            
            // Toggle active class on nav menu
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a nav link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
});

// Function to initialize navigation based on user login status
function initializeNavigation() {
    const visitor = document.getElementById("nav-visitor");
    const user = document.getElementById("nav-user");
    const userName = document.querySelector("#nav-user h3");
    const cartCountElement = document.getElementById("cart-count");
    
    // Check if user is logged in
    const currentUserName = localStorage.getItem("Name");
    
    if (currentUserName && visitor && user && userName) {
        // User is logged in - show user navigation
        console.log("User is logged in:", currentUserName);
        user.classList.add('show');
        visitor.classList.add('hide');
        userName.textContent = currentUserName;
        
        // Update cart count if cart count element exists
        if (cartCountElement) {
            updateCartCount();
        }
    } else {
        // No user logged in - show visitor navigation only
        console.log("No user logged in - showing visitor navigation");
        if (user) {
            user.classList.remove('show');
        }
        if (visitor) {
            visitor.classList.remove('hide');
        }
        if (cartCountElement) {
            cartCountElement.textContent = "0";
            cartCountElement.classList.add("hidden");
        }
    }
}

// Function to update cart count display
function updateCartCount() {
    const currentUserName = localStorage.getItem("Name");
    const cartCountElement = document.getElementById("cart-count");
    
    if (!currentUserName || !cartCountElement) {
        if (cartCountElement) {
            cartCountElement.textContent = "0";
            cartCountElement.classList.add("hidden");
        }
        return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const userCartItems = cart.filter(item => item.userName === currentUserName);
    const totalItems = userCartItems.reduce((total, item) => total + item.quantity, 0);
    
    cartCountElement.textContent = totalItems;
    if (totalItems > 0) {
        cartCountElement.classList.remove("hidden");
    } else {
        cartCountElement.classList.add("hidden");
    }
}

// Handle window resize - close menu if window becomes desktop size
window.addEventListener('resize', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu && window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
}); 