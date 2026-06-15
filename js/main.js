/* Aurelia Fine Jewellery - Main App JS */

// Global state initialization
const AureliaState = {
    cart: JSON.parse(localStorage.getItem('aurelia_cart')) || [],
    wishlist: JSON.parse(localStorage.getItem('aurelia_wishlist')) || [],
    
    // Add item to cart
    addToCart(item) {
        // Find if item with same id, selectedMetal, and selectedSize already exists in cart
        const existingIndex = this.cart.findIndex(c => c.id === item.id && c.selectedMetal === item.selectedMetal && c.selectedSize === item.selectedSize);
        if (existingIndex > -1) {
            this.cart[existingIndex].qty = (this.cart[existingIndex].qty || 1) + (item.qty || 1);
        } else {
            this.cart.push({
                id: item.id,
                qty: item.qty || 1,
                selectedMetal: item.selectedMetal || '18K Gold',
                selectedSize: item.selectedSize || 'Standard'
            });
        }
        localStorage.setItem('aurelia_cart', JSON.stringify(this.cart));
        this.updateCartBadge();
        
        // Show notification with product name
        const product = window.AureliaProducts ? window.AureliaProducts[item.id] : null;
        const name = product ? product.name : item.id;
        this.showNotification(`Added ${name} to bag`);
        
        // Open cart drawer
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

    // Update item quantity in cart
    updateCartQty(index, qty) {
        if (qty <= 0) {
            this.removeFromCart(index);
        } else {
            this.cart[index].qty = qty;
            localStorage.setItem('aurelia_cart', JSON.stringify(this.cart));
            this.updateCartBadge();
            if (window.AureliaNavigation) {
                window.AureliaNavigation.renderCartItems();
            }
        }
    },

    // Toggle wishlist item
    toggleWishlist(item) {
        const itemName = item.name || (window.AureliaProducts[item.id] ? window.AureliaProducts[item.id].name : item.id);
        const index = this.wishlist.findIndex(w => (w.name === itemName || w.id === item.id));
        if (index > -1) {
            this.wishlist.splice(index, 1);
            this.showNotification(`Removed from Wishlist`);
        } else {
            const product = window.AureliaProducts[item.id] || window.AureliaProducts[item.name] || Object.values(window.AureliaProducts).find(p => p.name === item.name);
            const productId = item.id || Object.keys(window.AureliaProducts).find(key => window.AureliaProducts[key].name === item.name) || item.name.toLowerCase().replace(/\s+/g, '-');
            
            this.wishlist.push({
                id: productId,
                name: product ? product.name : itemName,
                price: product ? `$${product.price.toLocaleString('en-US')}.00` : (item.price || '$0.00'),
                img: product ? product.images[0] : (item.img || ''),
                meta: product ? (product.specs.metal || '18K GOLD') : (item.meta || '18K GOLD')
            });
            this.showNotification(`Added to Wishlist`);
        }
        localStorage.setItem('aurelia_wishlist', JSON.stringify(this.wishlist));
        this.updateWishlistBadge();
    },

    // Check if item is in wishlist
    isInWishlist(itemName) {
        return this.wishlist.some(w => (w.name === itemName || w.id === itemName));
    },

    // Update bag items quantity badge
    updateCartBadge() {
        const badges = document.querySelectorAll('.cart-badge');
        const totalItems = this.cart.reduce((sum, item) => sum + (item.qty || 1), 0);
        
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

// Global Metal Rates and Pricing Configuration
window.AureliaMetalRates = {
  baseRate: 60,
  multipliers: {
    "18K Gold": 1.00,
    "22K Gold": 1.20,
    "24K Gold": 1.35,
    "Platinum": 1.50
  }
};

window.calculateProductPrice = function(product, metal) {
  if (!product) return 0;
  // If price is hardcoded and no weight config, fallback to price
  if (product.baseWeight === undefined) return product.price;
  const baseWeight = product.baseWeight || 0;
  const stoneValue = product.stoneValue || 0;
  const makingCharge = product.makingCharge || 0;
  const multiplier = window.AureliaMetalRates.multipliers[metal] || 1.00;
  const baseRate = window.AureliaMetalRates.baseRate;
  
  const price = (baseWeight * baseRate * multiplier) + stoneValue + (baseWeight * makingCharge);
  return Math.round(price);
};

// Global Product Database
window.AureliaProducts = {
  "celestial-aura-ring": {
    id: "celestial-aura-ring",
    sku: "AUR-CAR-001",
    certificateNumber: "GIA-64291823",
    name: "Celestial Aura Diamond Ring",
    price: 4250,
    originalPrice: 5100,
    category: "rings",
    meta: "18K GOLD • 4.2g",
    baseWeight: 4.2,
    stoneValue: 3788,
    makingCharge: 50,
    availableMetals: ["18K Gold", "22K Gold", "Platinum"],
    availableSizes: ["5", "6", "7", "8", "9", "10"],
    images: [
      "assets/images/aurelia_img_718e4a07e966.webp",
      "assets/images/aurelia_img_a3c81fed7b64.webp",
      "assets/images/aurelia_img_4dd8d01a71ff.webp",
      "assets/images/aurelia_img_06ae8dcacc8f.webp"
    ],
    specs: {
      metal: "18K Solid Yellow Gold",
      weight: "4.2 Grams",
      diamond: "Round Brilliant (1.2ct)",
      clarity: "VVS1 / D Grade"
    }
  },
  "aurora-solitaire-ring": {
    id: "aurora-solitaire-ring",
    sku: "AUR-ASR-002",
    certificateNumber: "GIA-83749201",
    name: "Aurora Solitaire Diamond Ring",
    price: 12400,
    originalPrice: 15000,
    category: "rings",
    meta: "18K YELLOW GOLD • 6.42g",
    baseWeight: 6.42,
    stoneValue: 11693.8,
    makingCharge: 50,
    availableMetals: ["18K Gold", "22K Gold", "Platinum"],
    availableSizes: ["5", "6", "7", "8", "9", "10"],
    images: [
      "assets/images/aurelia_img_94a53b0f04a9.webp"
    ],
    specs: {
      metal: "18K Yellow Gold",
      weight: "6.42 Grams",
      diamond: "Solitaire (2.0ct)",
      clarity: "VVS2 / E Grade"
    }
  },
  "starlight-cascade-earrings": {
    id: "starlight-cascade-earrings",
    sku: "AUR-SCE-003",
    certificateNumber: "IGI-48201948",
    name: "Starlight Cascade Earrings",
    price: 8950,
    originalPrice: 10500,
    category: "earrings",
    meta: "18K WHITE GOLD • 12.1g",
    baseWeight: 12.1,
    stoneValue: 7740,
    makingCharge: 40,
    availableMetals: ["18K Gold", "Platinum"],
    availableSizes: ["Standard"],
    images: [
      "assets/images/aurelia_img_26e4991b65de.webp"
    ],
    specs: {
      metal: "18K White Gold",
      weight: "12.1 Grams",
      diamond: "Cascade Brilliant (1.8ct)",
      clarity: "VS1 / F Grade"
    }
  },
  "emerald-cut-legacy-pendant": {
    id: "emerald-cut-legacy-pendant",
    sku: "AUR-ECL-004",
    certificateNumber: "GIA-19384019",
    name: "Emerald-Cut Legacy Pendant",
    price: 15200,
    originalPrice: 18000,
    category: "pendants",
    meta: "18K YELLOW GOLD • 18.5g",
    baseWeight: 18.5,
    stoneValue: 13257.5,
    makingCharge: 45,
    availableMetals: ["18K Gold", "Platinum"],
    availableSizes: ["Standard"],
    images: [
      "assets/images/aurelia_img_4fdf8db55e48.webp"
    ],
    specs: {
      metal: "18K Yellow Gold",
      weight: "18.5 Grams",
      diamond: "Emerald Cut (2.5ct)",
      clarity: "VVS1 / D Grade"
    }
  },
  "trinity-silk-bangles": {
    id: "trinity-silk-bangles",
    sku: "AUR-TSB-005",
    certificateNumber: "N/A",
    name: "Trinity Silk Bangles",
    price: 4800,
    originalPrice: 5500,
    category: "bangles",
    meta: "18K TRINITY GOLD • 24.0g",
    baseWeight: 24.0,
    stoneValue: 2400,
    makingCharge: 40,
    availableMetals: ["18K Gold", "22K Gold", "Platinum"],
    availableSizes: ["2.4", "2.6", "2.8"],
    images: [
      "assets/images/aurelia_img_364be99f7739.webp"
    ],
    specs: {
      metal: "18K Trinity Gold",
      weight: "24.0 Grams",
      diamond: "None",
      clarity: "N/A"
    }
  },
  "royal-crimson-drops": {
    id: "royal-crimson-drops",
    sku: "AUR-RCD-006",
    certificateNumber: "GIA-59201847",
    name: "Royal Crimson Drops",
    price: 22100,
    originalPrice: 25000,
    category: "earrings",
    meta: "18K ROSE GOLD • 10.4g",
    baseWeight: 10.4,
    stoneValue: 20956,
    makingCharge: 50,
    availableMetals: ["18K Gold", "Platinum"],
    availableSizes: ["Standard"],
    images: [
      "assets/images/aurelia_img_64a4c3c503da.webp"
    ],
    specs: {
      metal: "18K Rose Gold",
      weight: "10.4 Grams",
      diamond: "Ruby & Round Brilliant (1.5ct)",
      clarity: "VS1"
    }
  },
  "architect-platinum-band": {
    id: "architect-platinum-band",
    sku: "AUR-APB-007",
    certificateNumber: "GIA-49102847",
    name: "Architect Platinum Band",
    price: 3200,
    originalPrice: 3800,
    category: "rings",
    meta: "PLATINUM • 5.0g",
    baseWeight: 5.0,
    stoneValue: 2450,
    makingCharge: 60,
    availableMetals: ["18K Gold", "22K Gold", "Platinum"],
    availableSizes: ["5", "6", "7", "8", "9", "10"],
    images: [
      "assets/images/aurelia_img_6b72d39c6199.webp"
    ],
    specs: {
      metal: "Platinum 950",
      weight: "5.0 Grams",
      diamond: "Pave Inner Band (0.2ct)",
      clarity: "VVS2"
    }
  },
  "baguette-solitaire-ring": {
    id: "baguette-solitaire-ring",
    sku: "AUR-BSR-008",
    certificateNumber: "GIA-94810284",
    name: "Baguette Solitaire Ring",
    price: 1250,
    originalPrice: 1500,
    category: "rings",
    meta: "18K GOLD • 4.5g",
    baseWeight: 4.5,
    stoneValue: 800,
    makingCharge: 40,
    availableMetals: ["18K Gold", "22K Gold", "Platinum"],
    availableSizes: ["5", "6", "7", "8", "9", "10"],
    images: [
      "assets/images/aurelia_img_fa31582437ed.webp"
    ],
    specs: {
      metal: "18K Gold",
      weight: "4.5 Grams",
      diamond: "Baguette Solitaire (0.5ct)",
      clarity: "VS1"
    }
  },
  "lumina-drop-necklace": {
    id: "lumina-drop-necklace",
    sku: "AUR-LDN-009",
    certificateNumber: "IGI-38491028",
    name: "Lumina Drop Necklace",
    price: 980,
    originalPrice: 1100,
    category: "pendants",
    meta: "14K GOLD • 2.8g",
    baseWeight: 2.8,
    stoneValue: 700,
    makingCharge: 40,
    availableMetals: ["18K Gold", "Platinum"],
    availableSizes: ["Standard"],
    images: [
      "assets/images/aurelia_img_8fedf6e51f48.webp"
    ],
    specs: {
      metal: "14K Gold",
      weight: "2.8 Grams",
      diamond: "Brilliant Accent (0.3ct)",
      clarity: "VS2"
    }
  },
  "infinity-diamond-hoops": {
    id: "infinity-diamond-hoops",
    sku: "AUR-IDH-010",
    certificateNumber: "GIA-39482019",
    name: "Infinity Diamond Hoops",
    price: 2400,
    originalPrice: 2800,
    category: "earrings",
    meta: "PLATINUM • 8.2g",
    baseWeight: 8.2,
    stoneValue: 1252,
    makingCharge: 50,
    availableMetals: ["18K Gold", "Platinum"],
    availableSizes: ["Standard"],
    images: [
      "assets/images/aurelia_img_967a833c8aca.webp"
    ],
    specs: {
      metal: "Platinum",
      weight: "8.2 Grams",
      diamond: "Infinity Loop (1.0ct)",
      clarity: "VS1"
    }
  },
  "titan-signet-ring": {
    id: "titan-signet-ring",
    sku: "AUR-TSR-011",
    certificateNumber: "N/A",
    name: "Titan Signet Ring",
    price: 1850,
    originalPrice: 2200,
    category: "rings",
    meta: "18K GOLD • 12g",
    baseWeight: 12.0,
    stoneValue: 770,
    makingCharge: 30,
    availableMetals: ["18K Gold", "22K Gold", "Platinum"],
    availableSizes: ["5", "6", "7", "8", "9", "10"],
    images: [
      "assets/images/aurelia_img_25aadfae3ec2.webp"
    ],
    specs: {
      metal: "18K Gold",
      weight: "12 Grams",
      diamond: "None",
      clarity: "N/A"
    }
  },
  "celestial-studs": {
    id: "celestial-studs",
    sku: "AUR-CS-012",
    certificateNumber: "GIA-49201948",
    name: "Celestial Studs",
    price: 1850,
    originalPrice: 2100,
    category: "earrings",
    meta: "18K GOLD • 3.0g",
    baseWeight: 3.0,
    stoneValue: 1535,
    makingCharge: 45,
    availableMetals: ["18K Gold", "Platinum"],
    availableSizes: ["Standard"],
    images: [
      "assets/images/aurelia_img_f982d8f4b7e6.webp"
    ],
    specs: {
      metal: "18K Gold",
      weight: "3.0 Grams",
      diamond: "Round Brilliant (0.8ct)",
      clarity: "VS1"
    }
  },
  "eternal-orbit-pendant": {
    id: "eternal-orbit-pendant",
    sku: "AUR-EOP-013",
    certificateNumber: "GIA-59201849",
    name: "Eternal Orbit Pendant",
    price: 2100,
    originalPrice: 2450,
    category: "pendants",
    meta: "18K GOLD • 3.5g",
    baseWeight: 3.5,
    stoneValue: 1732.5,
    makingCharge: 45,
    availableMetals: ["18K Gold", "Platinum"],
    availableSizes: ["Standard"],
    images: [
      "assets/images/aurelia_img_a4999068351f.webp"
    ],
    specs: {
      metal: "18K Gold",
      weight: "3.5 Grams",
      diamond: "Orbit Set (0.9ct)",
      clarity: "VS2"
    }
  },
  "nova-diamond-band": {
    id: "nova-diamond-band",
    sku: "AUR-NDB-014",
    certificateNumber: "GIA-92018472",
    name: "Nova Diamond Band",
    price: 1250,
    originalPrice: 1400,
    category: "rings",
    meta: "18K GOLD • 4.0g",
    baseWeight: 4.0,
    stoneValue: 850,
    makingCharge: 40,
    availableMetals: ["18K Gold", "22K Gold", "Platinum"],
    availableSizes: ["5", "6", "7", "8", "9", "10"],
    images: [
      "assets/images/aurelia_img_b8c4af0b9953.webp"
    ],
    specs: {
      metal: "18K Gold",
      weight: "4.0 Grams",
      diamond: "Nova Band (0.6ct)",
      clarity: "VS1"
    }
  },
  "star-dust-cuff": {
    id: "star-dust-cuff",
    sku: "AUR-SDC-015",
    certificateNumber: "GIA-19384910",
    name: "Star-Dust Cuff",
    price: 3400,
    originalPrice: 3900,
    category: "bangles",
    meta: "18K GOLD • 9.0g",
    baseWeight: 9.0,
    stoneValue: 2410,
    makingCharge: 50,
    availableMetals: ["18K Gold", "22K Gold", "Platinum"],
    availableSizes: ["Standard"],
    images: [
      "assets/images/aurelia_img_c5a83f180be2.webp"
    ],
    specs: {
      metal: "18K Gold",
      weight: "9.0 Grams",
      diamond: "Star-dust Accents (1.2ct)",
      clarity: "VS1"
    }
  }
};

