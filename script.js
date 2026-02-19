// Cart Data Storage
let cartData = {
    "1": { price: 35,000,000.0, quantity: 1, liked: false },
    "2": { price: 25,000,000.0, quantity: 1, liked: false },
    "3": { price: 35,000,000.0, quantity: 1, liked: false }
};

// DOM Elements
const cartItemsContainer = document.getElementById('cartItems');
const itemCountElement = document.getElementById('itemCount');
const subtotalElement = document.getElementById('subtotal');
const taxElement = document.getElementById('tax');
const totalElement = document.getElementById('total');

// Initialize Event Listeners
function initializeEventListeners() {
    // Plus buttons - Increase quantity
    const plusButtons = document.querySelectorAll('.qty-btn.plus');
    plusButtons.forEach(button => {
        button.addEventListener('click', handleQuantityIncrease);
    });

    // Minus buttons - Decrease quantity
    const minusButtons = document.querySelectorAll('.qty-btn.minus');
    minusButtons.forEach(button => {
        button.addEventListener('click', handleQuantityDecrease);
    });

    // Delete buttons - Remove item
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', handleDelete);
    });

    // Like buttons - Toggle favorite
    const likeButtons = document.querySelectorAll('.like-btn');
    likeButtons.forEach(button => {
        button.addEventListener('click', handleLike);
    });
}

// Handle Quantity Increase
function handleQuantityIncrease(event) {
    const itemId = event.currentTarget.dataset.id;
    
    // Update data
    cartData[itemId].quantity++;
    
    // Update UI
    updateQuantityDisplay(itemId);
    updateTotals();
    
    console.log(`Increased quantity for item ${itemId} to ${cartData[itemId].quantity}`);
}

// Handle Quantity Decrease
function handleQuantityDecrease(event) {
    const itemId = event.currentTarget.dataset.id;
    
    // Prevent quantity from going below 1
    if (cartData[itemId].quantity > 1) {
        cartData[itemId].quantity--;
        
        // Update UI
        updateQuantityDisplay(itemId);
        updateTotals();
        
        console.log(`Decreased quantity for item ${itemId} to ${cartData[itemId].quantity}`);
    }
}

// Update Quantity Display
function updateQuantityDisplay(itemId) {
    const quantityElement = document.querySelector(`.quantity[data-id="${itemId}"]`);
    quantityElement.textContent = cartData[itemId].quantity;
    
    // Update minus button state
    const minusButton = document.querySelector(`.qty-btn.minus[data-id="${itemId}"]`);
    if (cartData[itemId].quantity <= 1) {
        minusButton.disabled = true;
        minusButton.style.opacity = '0.5';
    } else {
        minusButton.disabled = false;
        minusButton.style.opacity = '1';
    }
}

// Handle Delete Item
function handleDelete(event) {
    const itemId = event.currentTarget.dataset.id;
    const itemElement = document.querySelector(`.cart-item[data-id="${itemId}"]`);
    
    // Add removing animation
    itemElement.classList.add('removing');
    
    // Wait for animation to complete
    setTimeout(() => {
        // Remove from DOM
        itemElement.remove();
        
        // Remove from data
        delete cartData[itemId];
        
        // Update totals
        updateTotals();
        updateItemCount();
        
        // Check if cart is empty
        checkEmptyCart();
        
        console.log(`Deleted item ${itemId} from cart`);
    }, 400);
}

// Handle Like Button
function handleLike(event) {
    const itemId = event.currentTarget.dataset.id;
    const likeButton = event.currentTarget;
    
    // Toggle liked state
    cartData[itemId].liked = !cartData[itemId].liked;
    
    // Update button appearance
    if (cartData[itemId].liked) {
        likeButton.classList.add('liked');
        console.log(`Liked item ${itemId}`);
    } else {
        likeButton.classList.remove('liked');
        console.log(`Unliked item ${itemId}`);
    }
}

// Update Totals
function updateTotals() {
    let subtotal = 0;
    
    // Calculate subtotal
    for (let itemId in cartData) {
        const item = cartData[itemId];
        subtotal += item.price * item.quantity;
    }
    
    // Calculate tax (10%)
    const tax = subtotal * 0.10;
    
    // Calculate total
    const total = subtotal + tax;
    
    // Update UI
    subtotalElement.textContent = subtotal.toFixed(2);
    taxElement.textContent = tax.toFixed(2);
    totalElement.textContent = total.toFixed(2);
    
    console.log(`Updated totals - Subtotal: $${subtotal.toFixed(2)}, Tax: $${tax.toFixed(2)}, Total: $${total.toFixed(2)}`);
}

// Update Item Count
function updateItemCount() {
    const itemCount = Object.keys(cartData).length;
    itemCountElement.textContent = itemCount;
}

// Check if Cart is Empty
function checkEmptyCart() {
    const itemCount = Object.keys(cartData).length;
    
    if (itemCount === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <h2>🛒 Your cart is empty</h2>
                <p>Add some items to get started!</p>
            </div>
        `;
        
        // Hide summary
        document.querySelector('.cart-summary').style.display = 'none';
    }
}

// Initialize minus buttons state on load
function initializeMinusButtons() {
    for (let itemId in cartData) {
        updateQuantityDisplay(itemId);
    }
}

// Checkout Button Event
const checkoutButton = document.querySelector('.checkout-btn');
checkoutButton.addEventListener('click', () => {
    const itemCount = Object.keys(cartData).length;
    const total = totalElement.textContent;
    
    alert(`🎉 Proceeding to checkout!\n\nItems: ${itemCount}\nTotal: $${total}\n\nThank you for shopping with us!`);
    
    console.log('Checkout initiated');
});

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    initializeMinusButtons();
    updateTotals();
    updateItemCount();
    
    console.log('Shopping cart initialized with', Object.keys(cartData).length, 'items');
});

// Additional feature: Keyboard shortcuts
document.addEventListener('keydown', (event) => {
    // Press 'C' to checkout
    if (event.key.toLowerCase() === 'c' && event.ctrlKey) {
        event.preventDefault();
        checkoutButton.click();
    }
});