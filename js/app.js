document.addEventListener('DOMContentLoaded', () => {
    // 1. SELECTORS
    const searchInput = document.getElementById('librarySearch');
    const sortSelect = document.getElementById('sortPacks');
    const grid = document.querySelector('.libraryGrid');
    const noResults = document.getElementById('noResultsMessage');
    const cartIcons = document.querySelectorAll('.cartIconMain');
    const homeSearchInput = document.getElementById('homeHeroSearch');
    const homeTags = document.querySelector('.mobileStyleTagContainer');

    // 2. UTILITIES
    function debounce(func, timeout = 500) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    }

    const triggerFade = (elements) => {
        elements.forEach(el => {
            el.classList.remove('fadeIn');
            void el.offsetWidth;
            el.classList.add('fadeIn');
        });
    };

    // 3. CART FUNCTIONS
    const updateCartStatus = () => {
        const cartCount = localStorage.getItem('magicaCartCount') || 0;
        const badges = document.querySelectorAll('.cartBadge');
        
        badges.forEach(badge => {
            if (parseInt(cartCount) > 0) {
                badge.textContent = cartCount;
                badge.classList.add('show');
            } else {
                badge.classList.remove('show');
            }
        });
    };

    const displayCart = () => {
        const cartList = document.getElementById('cartItemsList');
        if (!cartList) return;

        const cartItems = JSON.parse(localStorage.getItem('magicaCartItems')) || [];
        let subtotal = 0;

        if (cartItems.length === 0) {
            cartList.innerHTML = "<p style='padding: 2rem; text-align: center;'>Your cart is empty.</p>";
            // Reset subtotal/total to $0 if cart is empty
            if (document.getElementById('subtotalAmount')) document.getElementById('subtotalAmount').textContent = "$0.00";
            if (document.getElementById('gstAmount')) document.getElementById('gstAmount').textContent = "$0.00";
            if (document.getElementById('totalAmount')) document.getElementById('totalAmount').textContent = "$0.00";
            return;
        }

        cartList.innerHTML = cartItems.map(item => {
            subtotal += item.price;
            return `
                <div class="productSummary">
                    <img src="${item.image}" alt="${item.title}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">
                    <div class="productDetails">
                        <h3>${item.title}</h3>
                        <h3>$${item.price}</h3>
                    </div>
                </div>
            `;
        }).join('');

        // --- ALBERTA GST CALCULATION (5%) ---
        const gstRate = 0.05;
        const gstAmount = subtotal * gstRate;
        const finalTotal = subtotal + gstAmount;

        // Update the UI elements
        const subtotalEl = document.getElementById('subtotalAmount');
        const gstEl = document.getElementById('gstAmount'); // Ensure your HTML has this ID
        const totalEl = document.getElementById('totalAmount');
        const buyBtn = document.querySelector('.subscribeBtn');

        if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
        if (gstEl) gstEl.textContent = `$${gstAmount.toFixed(2)}`;
        if (totalEl) totalEl.textContent = `$${finalTotal.toFixed(2)}`;
        
        // Update the button text with the NEW final total
        if (buyBtn) buyBtn.textContent = `Complete Purchase - $${finalTotal.toFixed(2)}`;
    };

    // 4. FILTER/SEARCH LOGIC
    const runFilter = () => {
        if (!searchInput) return;
        const query = searchInput.value.toLowerCase();
        const cards = document.querySelectorAll('.packCard');
        let visibleCount = 0;
        let visibleCards = [];

        cards.forEach(card => {
            const title = card.getAttribute('dataTitle').toLowerCase();
            const tags = card.getAttribute('dataTags').toLowerCase();
            const matches = title.includes(query) || tags.includes(query);
            
            if (matches) {
                card.style.display = "flex";
                visibleCards.push(card);
                visibleCount++;
            } else {
                card.style.display = "none";
            }
        });

        if (noResults) noResults.style.display = visibleCount === 0 ? "flex" : "none";
        triggerFade(visibleCards);
    };

    // 5. EVENT LISTENERS
    
    // Initial UI Setup
    updateCartStatus();
    displayCart();

    // Home Page Hero Search
    if (homeSearchInput) {
        homeSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = homeSearchInput.value.trim();
                if (query) window.location.href = `library.html?search=${encodeURIComponent(query)}`;
            }
        });
    }

    // Home Page Style Tags
    if (homeTags) {
        homeTags.addEventListener('click', (e) => {
            if (e.target.classList.contains('styleTag')) {
                window.location.href = `library.html?search=${encodeURIComponent(e.target.textContent)}`;
            }
        });
    }

    // Library Search Input
    if (searchInput) {
        searchInput.addEventListener('input', debounce(() => runFilter()));
    }

    // Grid Actions (Add to Cart & Tag Filtering)
    if (grid) {
        grid.addEventListener('click', (e) => {
            // Tag Filter
            if (e.target.classList.contains('cardTag')) {
                searchInput.value = e.target.textContent;
                runFilter();
            }

            // Add to Cart
            const cartBtn = e.target.closest('.cardButton');
            if (cartBtn) {
                const card = cartBtn.closest('.packCard');
                
                // 1. Capture the product data from the HTML attributes
                const product = {
                    // Use a unique ID if you have one, otherwise title works for now
                    id: card.getAttribute('dataTitle').replace(/\s+/g, '-').toLowerCase(), 
                    title: card.getAttribute('dataTitle'),
                    price: parseFloat(card.getAttribute('dataPrice')),
                    image: card.querySelector('.cardImage').src
                };

                // 2. Get existing items, add the new one, and save back to storage
                let cart = JSON.parse(localStorage.getItem('magicaCartItems')) || [];
                cart.push(product);
                localStorage.setItem('magicaCartItems', JSON.stringify(cart));

                // 3. Keep the count in sync with the actual array length
                localStorage.setItem('magicaCartCount', cart.length);
                
                // 4. Update the UI
                updateCartStatus(); // Updates the red badge
                
                // Button Feedback
                const originalText = cartBtn.innerHTML;
                cartBtn.innerHTML = "Added!";
                setTimeout(() => { cartBtn.innerHTML = originalText; }, 1000);
            }
        });
    }

    // Sorting
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            const cards = Array.from(document.querySelectorAll('.packCard'));
            cards.sort((a, b) => {
                const priceA = parseFloat(a.getAttribute('dataPrice'));
                const priceB = parseFloat(b.getAttribute('dataPrice'));
                const titleA = a.getAttribute('dataTitle').toLowerCase();
                const titleB = b.getAttribute('dataTitle').toLowerCase();

                if (sortSelect.value === 'price-low') return priceA - priceB;
                if (sortSelect.value === 'price-high') return priceB - priceA;
                if (sortSelect.value === 'title') return titleA.localeCompare(titleB);
                return 0;
            });
            cards.forEach(card => grid.appendChild(card));
            triggerFade(cards.filter(c => c.style.display !== 'none'));
        });
    }

    // URL Parameter handling
    const params = new URLSearchParams(window.location.search);
    const initialQuery = params.get('search');
    if (initialQuery && searchInput) {
        searchInput.value = initialQuery;
        runFilter();
    }
});

function resetSearch() {
    const searchInput = document.getElementById('librarySearch');
    if (searchInput) {
        searchInput.value = '';
        searchInput.dispatchEvent(new Event('input'));
    }
}