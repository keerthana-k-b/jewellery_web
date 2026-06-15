/* Aurelia Fine Jewellery - Animations & Micro-interactions JS */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Parallax Scroll Effect for Hero Images
    const heroImage = document.querySelector('#hero-slider img');
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            heroImage.style.transform = `translateY(${scrolled * 0.15}px)`;
        });
    }

    // 2. Carousel Scroll Handlers (Left / Right buttons)
    const setupCarousel = (carouselSelector, prevBtnSelector, nextBtnSelector) => {
        const carousel = document.querySelector(carouselSelector);
        const prevBtn = document.querySelector(prevBtnSelector);
        const nextBtn = document.querySelector(nextBtnSelector);

        if (carousel && prevBtn && nextBtn) {
            const scrollAmount = 320; // Matches standard card width + margin

            nextBtn.addEventListener('click', () => {
                carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            });

            prevBtn.addEventListener('click', () => {
                carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            });
        }
    };

    // Initialize carousels on Homepage & Product page
    // Trending Now carousel on homepage
    setupCarousel('.overflow-x-auto.scrollbar-hide', 'button:has(span[data-icon="chevron_left"])', 'button:has(span[data-icon="chevron_right"])');
    
    // Complete the look recommendation carousel on product page
    setupCarousel('.grid-cols-1.md:grid-cols-4', 'button:has(span:contains("west"))', 'button:has(span:contains("east"))');

    // 3. Wishlist Heart Toggle Listener
    document.body.addEventListener('click', (e) => {
        // Find closest heart icon trigger button
        const wishlistBtn = e.target.closest('.wishlist-toggle-btn');
        if (wishlistBtn) {
            e.stopPropagation();
            e.preventDefault();
            const icon = wishlistBtn.querySelector('.material-symbols-outlined');
            
            // Extract item metadata from card attributes
            const card = wishlistBtn.closest('.luxury-card') || wishlistBtn.closest('.group');
            if (card && icon) {
                const name = card.querySelector('h4, h3').textContent.trim();
                const price = card.querySelector('.font-price-display').textContent.trim();
                const img = card.querySelector('img').src;
                const meta = card.querySelector('.font-label-caps')?.textContent.trim() || '18K GOLD';

                const item = { name, price, img, meta };

                if (window.AureliaState) {
                    window.AureliaState.toggleWishlist(item);
                    
                    // Toggle visually
                    const active = window.AureliaState.isInWishlist(name);
                    if (active) {
                        icon.classList.add('fill-icon');
                    } else {
                        icon.classList.remove('fill-icon');
                    }
                }
            }
        }
    });

    // Sync wishlist heart icon states on load
    document.querySelectorAll('.luxury-card, .group').forEach(card => {
        const titleEl = card.querySelector('h4, h3');
        const heartIcon = card.querySelector('.wishlist-toggle-btn .material-symbols-outlined');
        
        if (titleEl && heartIcon && window.AureliaState) {
            const name = titleEl.textContent.trim();
            if (window.AureliaState.isInWishlist(name)) {
                heartIcon.classList.add('fill-icon');
            }
        }
    });

    // 4. Product Gallery Thumbnail Switching
    const thumbs = document.querySelectorAll('.aspect-square.cursor-pointer');
    const mainImg = document.querySelector('.product-image-zoom');

    if (thumbs.length > 0 && mainImg) {
        thumbs.forEach(thumb => {
            thumb.addEventListener('click', () => {
                const img = thumb.querySelector('img');
                
                // Animate transition fade
                mainImg.style.opacity = '0.3';
                
                setTimeout(() => {
                    mainImg.src = img.src;
                    mainImg.setAttribute('data-alt', img.getAttribute('data-alt'));
                    mainImg.style.opacity = '1';
                }, 150);
                
                // Update UI thumbnail border states
                thumbs.forEach(t => {
                    t.classList.remove('border-primary');
                    t.classList.add('border-transparent');
                    t.querySelector('img').classList.replace('opacity-100', 'opacity-60');
                });
                
                thumb.classList.remove('border-transparent');
                thumb.classList.add('border-primary');
                thumb.querySelector('img').classList.replace('opacity-60', 'opacity-100');
            });
        });
    }
});
