/* Aurelia Fine Jewellery - Navigation & Modals JS */

const AureliaNavigation = {
    backdrop: null,
    cartDrawer: null,
    mobileMenu: null,
    searchModal: null,
    sizeGuideModal: null,

    init() {
        this.injectContainers();
        this.bindGlobalEvents();
        this.bindScrollEffects();
        this.bindActionTriggers();
    },

    // Inject drawer & modal markup dynamically to avoid HTML duplication
    injectContainers() {
        // 1. Backdrop
        this.backdrop = document.createElement('div');
        this.backdrop.className = 'overlay-backdrop';
        this.backdrop.id = 'global-backdrop';
        document.body.appendChild(this.backdrop);

        // 2. Mobile Menu Drawer
        this.mobileMenu = document.createElement('div');
        this.mobileMenu.className = 'drawer-panel drawer-left w-80 max-w-full p-8 flex flex-col justify-between';
        this.mobileMenu.id = 'mobile-menu-drawer';
        this.mobileMenu.innerHTML = `
            <div>
                <div class="flex justify-between items-center mb-10">
                    <span class="font-display-lg text-headline-md text-primary font-bold">AURELIA</span>
                    <button id="close-mobile-menu" class="text-on-surface hover:text-primary"><span class="material-symbols-outlined">close</span></button>
                </div>
                <nav class="flex flex-col space-y-6 font-label-caps text-sm tracking-widest">
                    <a href="collection.html" class="hover:text-primary transition-colors">All Jewellery</a>
                    <a href="collection.html" class="hover:text-primary transition-colors">Gold</a>
                    <a href="collection.html" class="hover:text-primary transition-colors">Diamond</a>
                    <a href="collection.html" class="hover:text-primary transition-colors">Earrings</a>
                    <a href="collection.html" class="hover:text-primary transition-colors">Rings</a>
                    <a href="collection.html" class="hover:text-primary transition-colors">Pendants</a>
                </nav>
            </div>
            <div class="border-t border-outline-variant/30 pt-6">
                <p class="font-body-md text-xs text-on-surface-variant mb-4">Mastering the art of brilliance since 1924.</p>
                <div class="flex space-x-4">
                    <span class="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer" data-icon="share">share</span>
                    <span class="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer" data-icon="public">public</span>
                </div>
            </div>
        `;
        document.body.appendChild(this.mobileMenu);

        // 3. Cart Drawer
        this.cartDrawer = document.createElement('div');
        this.cartDrawer.className = 'drawer-panel drawer-right w-[450px] max-w-full p-8 flex flex-col justify-between';
        this.cartDrawer.id = 'cart-drawer';
        this.cartDrawer.innerHTML = `
            <div>
                <div class="flex justify-between items-center mb-8 border-b border-outline-variant/20 pb-4">
                    <div class="flex items-center space-x-2">
                        <span class="material-symbols-outlined">shopping_bag</span>
                        <span class="font-label-caps text-sm tracking-widest font-semibold">YOUR BAG</span>
                    </div>
                    <button id="close-cart" class="text-on-surface hover:text-primary"><span class="material-symbols-outlined">close</span></button>
                </div>
                <div id="cart-items-container" class="space-y-6 overflow-y-auto max-h-[55vh] custom-scrollbar pr-2">
                    <!-- Dynamic Cart Items go here -->
                </div>
            </div>
            <div class="border-t border-outline-variant/30 pt-6 space-y-4">
                <div class="flex justify-between items-center font-label-caps text-xs">
                    <span>SUBTOTAL</span>
                    <span id="cart-subtotal" class="font-semibold text-primary">$0.00</span>
                </div>
                <p class="font-body-md text-[10px] text-on-surface-variant">Shipping and taxes computed at checkout.</p>
                <button class="w-full bg-[#735c00] text-white font-label-caps text-xs py-4 tracking-widest hover:bg-[#d4af37] transition-colors duration-500 rounded-none gold-shimmer">
                    PROCEED TO CHECKOUT
                </button>
            </div>
        `;
        document.body.appendChild(this.cartDrawer);

        // 4. Search Modal Overlay
        this.searchModal = document.createElement('div');
        this.searchModal.className = 'modal-container w-[600px] p-8';
        this.searchModal.id = 'search-overlay-modal';
        this.searchModal.innerHTML = `
            <div class="flex justify-between items-center mb-6">
                <span class="font-label-caps text-xs tracking-widest text-primary font-semibold">SEARCH THE COLLECTION</span>
                <button id="close-search" class="text-on-surface hover:text-primary"><span class="material-symbols-outlined">close</span></button>
            </div>
            <div class="relative mb-6">
                <input type="text" placeholder="Search for diamonds, rings, earrings..." class="w-full border-b border-outline-variant py-3 px-0 font-body-md text-on-surface bg-transparent focus:outline-none focus:border-primary transition-all placeholder:text-on-surface-variant/40" />
                <button class="absolute right-0 bottom-3 text-primary"><span class="material-symbols-outlined">search</span></button>
            </div>
            <div class="space-y-2">
                <p class="font-label-caps text-[10px] text-on-surface-variant tracking-wider">SUGGESTED SEARCHES</p>
                <div class="flex flex-wrap gap-2 text-[11px] font-label-caps">
                    <a href="collection.html" class="px-3 py-1 bg-surface-container-low border border-outline-variant/40 hover:border-primary transition-all">Solitaire Rings</a>
                    <a href="collection.html" class="px-3 py-1 bg-surface-container-low border border-outline-variant/40 hover:border-primary transition-all">18K Yellow Gold</a>
                    <a href="collection.html" class="px-3 py-1 bg-surface-container-low border border-outline-variant/40 hover:border-primary transition-all">Celestial Studs</a>
                </div>
            </div>
        `;
        document.body.appendChild(this.searchModal);

        // 5. Size Guide Modal
        this.sizeGuideModal = document.createElement('div');
        this.sizeGuideModal.className = 'modal-container w-[500px] p-8';
        this.sizeGuideModal.id = 'size-guide-modal';
        this.sizeGuideModal.innerHTML = `
            <div class="flex justify-between items-center mb-6 border-b border-outline-variant/20 pb-4">
                <span class="font-label-caps text-xs tracking-widest text-primary font-semibold">RING SIZE GUIDE</span>
                <button id="close-size-guide" class="text-on-surface hover:text-primary"><span class="material-symbols-outlined">close</span></button>
            </div>
            <div class="space-y-4 font-body-md text-sm text-on-surface-variant">
                <p>To find your perfect ring size, measure the inner diameter of an existing ring or wrap a thread around your finger and map it to the scale below:</p>
                <table class="w-full border-collapse border border-outline-variant text-center font-label-caps text-[11px] mt-4">
                    <thead>
                        <tr class="bg-surface-container-low">
                            <th class="border border-outline-variant p-2">US Size</th>
                            <th class="border border-outline-variant p-2">Inner Circumference (mm)</th>
                            <th class="border border-outline-variant p-2">Inner Diameter (mm)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td class="border border-outline-variant p-2">5</td><td class="border border-outline-variant p-2">49.3</td><td class="border border-outline-variant p-2">15.7</td></tr>
                        <tr class="bg-surface-container-low/20"><td class="border border-outline-variant p-2">6</td><td class="border border-outline-variant p-2">51.9</td><td class="border border-outline-variant p-2">16.5</td></tr>
                        <tr><td class="border border-outline-variant p-2">7</td><td class="border border-outline-variant p-2">54.4</td><td class="border border-outline-variant p-2">17.3</td></tr>
                        <tr class="bg-surface-container-low/20"><td class="border border-outline-variant p-2">8</td><td class="border border-outline-variant p-2">57.0</td><td class="border border-outline-variant p-2">18.2</td></tr>
                    </tbody>
                </table>
            </div>
        `;
        document.body.appendChild(this.sizeGuideModal);
    },

    // Bind common click event handlers to close and open drawers
    bindGlobalEvents() {
        // Clicking backdrop closes active elements
        this.backdrop.addEventListener('click', () => this.closeAll());

        // Close triggers
        document.getElementById('close-mobile-menu').addEventListener('click', () => this.closeAll());
        document.getElementById('close-cart').addEventListener('click', () => this.closeAll());
        document.getElementById('close-search').addEventListener('click', () => this.closeAll());
        document.getElementById('close-size-guide').addEventListener('click', () => this.closeAll());
    },

    // Bind triggers from standard header navigation links and icons
    bindActionTriggers() {
        // Mobile menu trigger
        document.querySelectorAll('.header-menu-btn').forEach(btn => {
            btn.addEventListener('click', () => this.openMobileMenu());
        });

        // Search trigger
        document.querySelectorAll('.header-search-btn').forEach(btn => {
            btn.addEventListener('click', () => this.openSearch());
        });

        // Cart trigger
        document.querySelectorAll('.header-cart-btn').forEach(btn => {
            btn.addEventListener('click', () => this.openCart());
        });
    },

    // Shrinking and scroll header actions
    bindScrollEffects() {
        let lastScrollTop = 0;
        const header = document.querySelector('header');
        
        window.addEventListener('scroll', () => {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Shrink on scroll
            if (scrollTop > 50) {
                header.classList.add('glass-header', 'shadow-sm', 'py-2');
                header.classList.remove('py-4');
            } else {
                header.classList.remove('glass-header', 'shadow-sm', 'py-2');
                header.classList.add('py-4');
            }

            // Hide/Show on scroll down/up
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            lastScrollTop = scrollTop;
        });
    },

    // Action Methods
    openMobileMenu() {
        this.closeAll();
        this.backdrop.classList.add('active');
        this.mobileMenu.classList.add('active');
    },

    openCart() {
        this.closeAll();
        this.backdrop.classList.add('active');
        this.cartDrawer.classList.add('active');
        this.renderCartItems();
    },

    openSearch() {
        this.closeAll();
        this.backdrop.classList.add('active');
        this.searchModal.classList.add('active');
    },

    openSizeGuide() {
        this.closeAll();
        this.backdrop.classList.add('active');
        this.sizeGuideModal.classList.add('active');
    },

    closeAll() {
        this.backdrop.classList.remove('active');
        this.mobileMenu.classList.remove('active');
        this.cartDrawer.classList.remove('active');
        this.searchModal.classList.remove('active');
        this.sizeGuideModal.classList.remove('active');
    },

    // Render cart drawer products dynamically
    renderCartItems() {
        const container = document.getElementById('cart-items-container');
        const subtotalEl = document.getElementById('cart-subtotal');
        const items = window.AureliaState ? window.AureliaState.cart : [];

        if (items.length === 0) {
            container.innerHTML = `
                <div class="h-48 flex flex-col items-center justify-center text-center space-y-4">
                    <span class="material-symbols-outlined text-4xl text-on-surface-variant/30">shopping_bag</span>
                    <p class="font-body-md text-sm text-on-surface-variant">Your shopping bag is empty.</p>
                    <a href="collection.html" class="font-label-caps text-xs text-primary underline underline-offset-4" onclick="AureliaNavigation.closeAll()">BROWSE JEWELLERY</a>
                </div>
            `;
            subtotalEl.textContent = '$0.00';
            return;
        }

        let subtotal = 0;
        container.innerHTML = items.map((item, idx) => {
            const price = parseFloat(item.price.replace(/[$,]/g, ''));
            subtotal += price;
            return `
                <div class="flex items-center space-x-4 border-b border-outline-variant/10 pb-4">
                    <img src="${item.img}" alt="${item.name}" class="w-16 h-20 object-cover bg-surface-container-low" />
                    <div class="flex-1 space-y-1">
                        <h5 class="font-headline-md text-sm text-on-surface font-semibold">${item.name}</h5>
                        <p class="font-label-caps text-[10px] text-on-surface-variant">${item.meta || '18K GOLD'}</p>
                        <div class="flex justify-between items-center">
                            <span class="font-price-display text-xs text-primary">${item.price}</span>
                            <button onclick="AureliaState.removeFromCart(${idx})" class="text-[10px] font-label-caps text-red-700 hover:underline">REMOVE</button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        subtotalEl.textContent = `$${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
};

// Initialize navigation on document ready
document.addEventListener('DOMContentLoaded', () => {
    AureliaNavigation.init();
    
    // Bind size guide triggers if they exist on the page
    document.body.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('size-guide-trigger') || e.target.textContent.trim() === 'SIZE GUIDE') {
            e.preventDefault();
            AureliaNavigation.openSizeGuide();
        }
    });
});
window.AureliaNavigation = AureliaNavigation;
