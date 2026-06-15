/* Aurelia Fine Jewellery - Main App JS */

// Global state initialization
const AureliaState = {
    cart: JSON.parse(localStorage.getItem('aurelia_cart')) || [],
    wishlist: JSON.parse(localStorage.getItem('aurelia_wishlist')) || [],
    
    // Add item to cart
    addToCart(item) {
        this.cart.push(item);
        localStorage.setItem('aurelia_cart', JSON.stringify(this.cart));
        this.updateCartBadge();
        this.showNotification(`Added ${item.name} to bag`);
        // Optional: Open cart drawer
        if (window.AureliaNavigation) {
            window.AureliaNavigation.openCart();
        }
    },

    // Remove item from cart
    removeFromCart(index) {
        this.cart.splice(index, 1);
        localStorage.setItem('aurelia_cart', JSON.stringify(this.cart));
        this.updateCartBadge();
        if (window.AureliaNavigation) {
            window.AureliaNavigation.renderCartItems();
        }
    },

    // Toggle wishlist item
    toggleWishlist(item) {
        const index = this.wishlist.findIndex(w => w.name === item.name);
        if (index > -1) {
            this.wishlist.splice(index, 1);
            this.showNotification(`Removed from Wishlist`);
        } else {
            this.wishlist.push(item);
            this.showNotification(`Added to Wishlist`);
        }
        localStorage.setItem('aurelia_wishlist', JSON.stringify(this.wishlist));
        this.updateWishlistBadge();
    },

    // Check if item is in wishlist
    isInWishlist(itemName) {
        return this.wishlist.some(w => w.name === itemName);
    },

    // Update bag items quantity badge
    updateCartBadge() {
        const badges = document.querySelectorAll('.cart-badge');
        const totalItems = this.cart.length;
        
        badges.forEach(badge => {
            if (totalItems > 0) {
                badge.textContent = totalItems;
                badge.classList.remove('hidden');
            } else {
                badge.classList.add('hidden');
            }
        });
    },

    // Update wishlist items badge
    updateWishlistBadge() {
        const badges = document.querySelectorAll('.wishlist-badge');
        const totalItems = this.wishlist.length;
        
        badges.forEach(badge => {
            if (totalItems > 0) {
                badge.textContent = totalItems;
                badge.classList.remove('hidden');
            } else {
                badge.classList.add('hidden');
            }
        });
    },

    // Show temporary notification alert
    showNotification(message) {
        // Remove existing notification if any
        const existing = document.getElementById('aurelia-notification');
        if (existing) {
            existing.remove();
        }

        // Create new alert container
        const notif = document.createElement('div');
        notif.id = 'aurelia-notification';
        notif.className = 'fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#735c00] text-white font-label-caps text-xs tracking-widest px-6 py-4 rounded-none shadow-2xl z-50 transition-all duration-500 opacity-0 translate-y-4';
        notif.style.fontFamily = '"Source Sans 3", sans-serif';
        notif.textContent = message.toUpperCase();

        document.body.appendChild(notif);

        // Animate in
        setTimeout(() => {
            notif.classList.remove('opacity-0', 'translate-y-4');
            notif.classList.add('opacity-100', 'translate-y-0');
        }, 10);

        // Animate out after 3 seconds
        setTimeout(() => {
            notif.classList.remove('opacity-100', 'translate-y-0');
            notif.classList.add('opacity-0', 'translate-y-4');
            setTimeout(() => {
                notif.remove();
            }, 500);
        }, 3000);
    }
};

// Initialize counters on window load
document.addEventListener('DOMContentLoaded', () => {
    AureliaState.updateCartBadge();
    AureliaState.updateWishlistBadge();
});
