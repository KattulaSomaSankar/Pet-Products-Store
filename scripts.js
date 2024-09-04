// Toggle navigation menu on mobile
const menuIcon = document.getElementById('menu-icon');
const navLinks = document.getElementById('nav-links');

menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});

// Cart functionality
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartItemsContainer = document.getElementById('cart-items');
const totalAmount = document.getElementById('total-amount');
const cartCount = document.getElementById('cart-count');
const cartSection = document.getElementById('cart');
const viewCartButton = document.getElementById('view-cart');

let cart = [];
let totalPrice = 0;

// Add product to cart
addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        const productName = productCard.getAttribute('data-name');
        const productPrice = parseFloat(productCard.getAttribute('data-price'));

        // Add to cart array
        cart.push({ name: productName, price: productPrice });

        // Update cart total and item count
        totalPrice += productPrice;
        cartCount.textContent = cart.length;

        // Show alert for confirmation
        alert(`${productName} added to cart!`);
    });
});

// View Cart functionality
viewCartButton.addEventListener('click', () => {
    cartSection.style.display = 'block';
    updateCart();
});

// Update the cart display
function updateCart() {
    // Clear current cart items
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.innerHTML = `<p>${item.name} - $${item.price.toFixed(2)} <button class="remove-item" data-index="${index}">Remove</button></p>`;
            cartItemsContainer.appendChild(cartItem);
        });

        // Attach event listeners for removing items
        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                removeItemFromCart(index);
            });
        });
    }

    totalAmount.textContent = totalPrice.toFixed(2);
}

// Remove an item from the cart
function removeItemFromCart(index) {
    totalPrice -= cart[index].price;
    cart.splice(index, 1);
    cartCount.textContent = cart.length;
    updateCart();
}
