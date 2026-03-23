document.addEventListener('DOMContentLoaded', () => {
    // 1. SELECTORS (Full Descriptive Names)
    const librarySearchInput = document.getElementById('librarySearch');
    const librarySortSelect = document.getElementById('sortPacks');
    const libraryGridContainer = document.querySelector('.libraryGrid');
    const noResultsMessage = document.getElementById('noResultsMessage');
    const homeHeroSearchInput = document.getElementById('homeHeroSearch');
    const faqHeaderElements = document.querySelectorAll('.faqHeader');

    // 2. DATA CONFIGURATIONS (Restored Full Descriptions)
    const allPromptPacks = {
        "cyberpunkCharacter": {
            title: "Cyberpunk Character Pack",
            price: 12,
            tags: ["Cyberpunk", "Character Design", "Futuristic"],
            description: "Create stunning cyberpunk characters with neon aesthetics and futuristic vibes. Perfect for game design and digital art projects.",
            mainImg: "assets/images/product1.png",
            thumbnails: ["assets/images/product1.png", "assets/images/cyberpunk1.png", "assets/images/cyberpunk2.png"],
            models: "Midjourney v6, Leonardo AI",
            settings: "--v 6.0 --style cyberpunk --s 250",
            prompts: [
                "Cyborg girl close-up, neon glowing facial highlights, large eyes",
                "Tactical motorcycle helmet, futuristic visor glow, neon background",
                "Gritty old hacker smoking electronic cigar, stylized smoke, red lens glasses",
                "Blond android assassin with sharp haircut, black clothing, and stark eyeliner",
                "Urban street-samurai, neon reflections in deep shadows, cityscape background",
            ]
        },
        "fantasyLandscape": {
            title: "Fantasy Landscape Collection",
            price: 15,
            tags: ["Landscape", "Surrealism", "Fantasy"],
            description: "Breathtaking fantasy landscapes with magical elements. From floating islands to enchanted forests.",
            mainImg: "assets/images/product2.png",
            thumbnails: ["assets/images/productImageSmall1.png", "assets/images/productImageSmall2.png", "assets/images/productImageSmall3.png"],
            models: "Stable Diffusion XL, DALL-E 3",
            settings: "--ar 16:9 --style fantasy --quality high",
            prompts: [
                "Cobblestone path leading to ancient mystical portal to another realm",
                "Night landscape with large bright moon over a calm lake, mystical creature",
                "Majestic castle on a waterfall cliff in forested mountain valley",
                "Surreal oasis with glowing river and neon sunset sky, palm trees",
                "Island floating in the sky with pink waterfalls pouring into clouds, fantasy vibe",
            ]
        },
        "productPhotography": {
            title: "Product Photography Pro",
            price: 8,
            tags: ["Still Life", "Realism", "Product Photography"],
            description: "Professional product photography prompts for e-commerce and marketing.",
            mainImg: "assets/images/product3.png",
            thumbnails: ["assets/images/product3.png", "assets/images/photography1.png", "assets/images/photography2.png"],
            models: "Midjourney v6, Leonardo AI",
            settings: "--v 6.0 --style raw --s 250",
            prompts: [
                "Teal, white, grey running shoe splashing into teal water on a reflective surface",
                "Luxury gold chronograph watch on a swirling bokeh golden background",
                "Fresh orange juice bottle on dark stone with citrus fruit and herbs",
                "Outdoor tactical backpack on a mountain peak during a golden sunset",
                "Sleek matte black smartphone floating with soft neon rim lighting",
            ]
        },
        "abstractArt": {
            title: "Abstract Art Explorations",
            price: 10,
            tags: ["Abstract", "Fractal", "Geometric"],
            description: "Modern abstract compositions with bold colors and geometric patterns.",
            mainImg: "assets/images/product4.png",
            thumbnails: ["assets/images/abstract1.png", "assets/images/abstract2.png", "assets/images/abstract3.png"],
            models: "Midjourney v6, Leonardo AI",
            settings: "--v 6.0 --style raw --s 250",
            prompts: [
                "Fluid alcohol ink painting, deep violet and blue with gold glitter veins",
                "Surreal cracked ice landscape with glowing blue neon energy lines",
                "Microscopic view of a single biological neuron with pink glowing nucleus",
                "Infinite grid of 3D isometric hexagonal blocks, pastel pink and mint",
                "Abstract 3D render of looping, intertwined glass tubes with a spectrum gradient",
            ]
        },
        "portraitMasterclass": {
            title: "Portrait Masterclass",
            price: 12,
            tags: ["Portrait", "Realism", "Cinematic"],
            description: "Create stunning realistic portraits with perfect lighting and composition.",
            mainImg: "assets/images/product5.png",
            thumbnails: ["assets/images/portraits1.png", "assets/images/portraits2.png", "assets/images/portraits3.png"],
            models: "Midjourney v6, Leonardo AI",
            settings: "--v 6.0 --style raw --s 250",
            prompts: [
                "Close up of an elderly woman with kind eyes and soft golden hour light",
                "Dignified senior man in a black coat with classic cinematic lighting",
                "Young boy in a denim jacket sitting at a table with soft window light",
                "Elegant middle-aged woman with blonde hair against a moody grey studio",
                "Intense close up of a person with freckles and striking blue eyes",
            ]
        },
        "animeCharacter": {
            title: "Anime Character Bundle",
            price: 12,
            tags: ["Anime", "Comic", "Character Design", "Fantasy"],
            description: "Beautiful anime-style character designs with various expressions and poses.",
            mainImg: "assets/images/product6.png",
            thumbnails: ["assets/images/anime1.png", "assets/images/anime2.png", "assets/images/anime3.png"],
            models: "Midjourney v6, Leonardo AI",
            settings: "--v 6.0 --style raw --s 250",
            prompts: [
                "Lofi anime boy studying at desk with city skyline night view in background",
                "Brave anime knight girl in shining silver armor standing before a castle",
                "Edgy cyberpunk anime girl with blue hair holding wrench in neon garage",
                "Elegant elven mage girl with long white hair holding a glowing star orb",
                "Otherworldly anime alien character with purple skin and multiple eyes",
            ]
        },
        "modernArchitecture": {
            title: "Modern Architecture Views",
            price: 11,
            tags: ["Architecture", "Realism", "Minimalist"],
            description: "Stunning architectural visualizations of modern buildings and structures.",
            mainImg: "assets/images/product7.png",
            thumbnails: ["assets/images/architecture1.png", "assets/images/architecture2.png", "assets/images/architecture3.png"],
            models: "Midjourney v6, Leonardo AI",
            settings: "--v 6.0 --style raw --s 250",
            prompts: [
                "Brutalist concrete villa cantilevered over rocky cliff at golden sunset",
                "Futuristic white organic curved buildings with lush garden pathways",
                "Modern pointed cathedral with glowing floor lights against night sky",
                "Luxury glass treehouse villa nestled deep within a tropical jungle",
                "Minimalist desert home with infinity pool and floor-to-ceiling glass",
            ]
        },
        "watercolorDreams": {
            title: "Watercolor Dreams",
            price: 9,
            tags: ["Watercolor", "Landscape", "Impressionism"],
            description: "Soft, dreamy watercolor-style landscapes and scenes.",
            mainImg: "assets/images/product8.png",
            thumbnails: ["assets/images/watercolor1.png", "assets/images/watercolor2.png", "assets/images/watercolor3.png"],
            models: "Midjourney v6, Leonardo AI",
            settings: "--v 6.0 --style raw --s 250",
            prompts: [
                "Watercolor city street with purple cherry blossoms and rain reflections",
                "Charming European alleyway with autumn leaves and cozy yellow houses",
                "Vibrant alpine meadow with a winding stream and snow-capped peaks",
                "Night forest scene with a full moon glowing over a small wooden bridge",
                "Ethereal sunset over a calm ocean with soft pastel clouds and flying birds",
            ]
        },
        "wildlifeWonders": {
            title: "Wildlife Wonders",
            price: 11,
            tags: ["Animals", "Realism", "Nature"],
            description: "Majestic wildlife photography prompts capturing nature's beauty.",
            mainImg: "assets/images/product9.png",
            thumbnails: ["assets/images/wildlife1.png", "assets/images/wildlife2.png", "assets/images/wildlife3.png"],
            models: "Midjourney v6, Leonardo AI",
            settings: "--v 6.0 --style raw --s 250",
            prompts: [
                "Close up of a snow leopard with striking blue eyes in a winter landscape",
                "Red fox walking through deep snow with soft cinematic winter lighting",
                "Humpback whale breaching the ocean surface during a golden sunset",
                "Mother orangutan holding her baby in a lush jungle with sun rays",
                "Detailed macro shot of a colorful kingfisher bird perched on a branch",
            ]
        },
        "halloweenHorror": {
            title: "Halloween Horror Pack",
            price: 10,
            tags: ["Horror", "Surrealism", "Cinematic"],
            description: "Spooky Halloween-themed prompts for creative artists.",
            mainImg: "assets/images/product10.png",
            thumbnails: ["assets/images/halloween1.png", "assets/images/halloween2.png", "assets/images/halloween3.png"],
            models: "Midjourney v6, Leonardo AI",
            settings: "--v 6.0 --style raw --s 250",
            prompts: [
                "Gothic woman in a black gown standing in a foggy moonlit graveyard",
                "Sinister red-haired clown peering through a dark circus tent opening",
                "Terrifying ghost appearing behind a family during a candlelit dinner",
                "Zombie hand reaching out from a shallow grave in a dark misty forest",
                "Haunted Victorian mansion with glowing windows and skeletal trees",
            ]
        },
        "artDecoElegance": {
            title: "Art Deco Elegance",
            price: 13,
            tags: ["Art Deco", "Vintage", "Luxury", "Fashion"],
            description: "Elegant Art Deco designs with geometric patterns and luxury aesthetics.",
            mainImg: "assets/images/product11.png",
            thumbnails: ["assets/images/artdeco1.png", "assets/images/artdeco2.png", "assets/images/artdeco3.png"],
            models: "Midjourney v6, Leonardo AI",
            settings: "--v 6.0 --style raw --s 250",
            prompts: [
                "Glamorous woman in a gold sequin gown against a gold Art Deco backdrop",
                "Gritty 1920s gangster with a fedora smoking a cigar in a dark lounge",
                "Elegant couple dancing in a grand ballroom during a luxury Gatsby party",
                "Showgirl in a feathered gold costume performing on a lavish Art Deco stage",
                "Abstract geometric gold and black pattern with symmetrical sunbursts",
            ]
        },
        "kidsCartoonFun": {
            title: "Kids Cartoon Fun",
            price: 8,
            tags: ["Comic", "Kids", "Character Design"],
            description: "Fun, colorful cartoon-style prompts perfect for children's content.",
            mainImg: "assets/images/product12.png",
            thumbnails: ["assets/images/kids1.png", "assets/images/kids2.png", "assets/images/kids3.png"],
            models: "Midjourney v6, Leonardo AI",
            settings: "--v 6.0 --style raw --s 250",
            prompts: [
                "Adorable tiny orange dragon with big green eyes sitting on a tree branch",
                "Happy cartoon boy wearing a sun hat riding a camel through a sunny desert",
                "Brave little firefighter boy and his heroic dog spraying a water hose",
                "Young wizard apprentice casting a powerful swirling blue magic spell",
                "Playful space explorer cat in a glass helmet floating in a candy nebula",
            ]
        }
    };

    const subscriptionPlans = {
        "monthly": {
            name: "Monthly Pro",
            price: 29.00,
            billingTerm: "/ month",
            savingsTag: "Cancel anytime",
            features: ["Access to all prompt packs", "Unlimited downloads", "2 exclusive monthly packs", "Commercial license included"]
        },
        "annual": {
            name: "Annual Pro",
            price: 249.00,
            billingTerm: "/ year",
            savingsTag: "Save $99/year",
            features: ["Everything in Monthly Pro", "Bonus: 12 exclusive packs", "Premium Discord community", "1-on-1 prompt consultation"]
        },
        "lifetime": {
            name: "Lifetime Access",
            price: 599.00,
            billingTerm: "/ lifetime",
            savingsTag: "Pay once, own forever",
            features: ["All current and future packs", "Unlimited downloads forever", "VIP support priority", "Resell rights for prompts"]
        }
    };

    // 3. UTILITIES
    function debounce(callback, delay = 500) {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => { callback.apply(this, args); }, delay);
        };
    }

    const triggerFadeInAnimation = (elements) => {
        elements.forEach(element => {
            element.classList.remove('fadeIn');
            void element.offsetWidth; // Trigger reflow
            element.classList.add('fadeIn');
        });
    };

    // 4. UI UPDATE HELPERS
    window.resetLibrarySearch = () => {
        if (librarySearchInput) {
            librarySearchInput.value = '';
            executeLibraryFilter();
        }
    };

    const updateCartBadgeStatus = () => {
        const cartCount = localStorage.getItem('magicaCartCount') || 0;
        document.querySelectorAll('.cartBadge').forEach(badge => {
            badge.textContent = cartCount;
            badge.style.display = parseInt(cartCount) > 0 ? 'flex' : 'none';
        });
    };

    const renderCheckoutCart = () => {
        const cartItemsContainer = document.getElementById('cartItemsList');
        if (!cartItemsContainer) return;

        const cartItems = JSON.parse(localStorage.getItem('magicaCartItems')) || [];
        let runningSubtotal = 0;

        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = "<p style='padding: 2rem; text-align: center;'>Your cart is empty.</p>";
            if (document.getElementById('totalAmount')) document.getElementById('totalAmount').textContent = "$0.00";
            return;
        }

        cartItemsContainer.innerHTML = cartItems.map((item, index) => {
            runningSubtotal += item.price;
            return `
                <div class="productSummary">
                    <img src="${item.image}" alt="${item.title}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
                    <div class="productDetails">
                        <div class="textWrapper">
                            <h3>${item.title}</h3>
                            <h3 style="color: #008695;">$${item.price.toFixed(2)}</h3>
                        </div>
                        <button class="removeItem" data-index="${index}" title="Remove Item">&times;</button>
                    </div>
                </div>
            `;
        }).join('');

        const calculatedGst = runningSubtotal * 0.05;
        const finalGrandTotal = runningSubtotal + calculatedGst;

        if (document.getElementById('subtotalAmount')) document.getElementById('subtotalAmount').textContent = `$${runningSubtotal.toFixed(2)}`;
        if (document.getElementById('gstAmount')) document.getElementById('gstAmount').textContent = `$${calculatedGst.toFixed(2)}`;
        if (document.getElementById('totalAmount')) document.getElementById('totalAmount').textContent = `$${finalGrandTotal.toFixed(2)}`;
        
        const checkoutButton = document.querySelector('.subscribeBtn');
        if (checkoutButton && !document.getElementById('displayPlanName')) {
            checkoutButton.textContent = `Complete Purchase - $${finalGrandTotal.toFixed(2)}`;
        }
    };

    // 5. DYNAMIC PAGE CONTENT INJECTIONS
    const urlSearchParameters = new URLSearchParams(window.location.search);
    const selectedPlanId = urlSearchParameters.get('plan');
    const selectedPackId = urlSearchParameters.get('id');

    // Subscription Checkout Logic
    if (selectedPlanId && subscriptionPlans[selectedPlanId]) {
        const planData = subscriptionPlans[selectedPlanId];
        if (document.getElementById('displayPlanName')) document.getElementById('displayPlanName').textContent = planData.name;
        if (document.getElementById('planPrice')) document.getElementById('planPrice').textContent = `$${planData.price}`;
        if (document.getElementById('planTerm')) document.getElementById('planTerm').textContent = planData.billingTerm;
        if (document.getElementById('saveTag')) document.getElementById('saveTag').textContent = planData.savingsTag;
        
        const subtotal = planData.price;
        const gst = subtotal * 0.05;
        const total = subtotal + gst;

        if (document.getElementById('subtotalAmount')) document.getElementById('subtotalAmount').textContent = `$${subtotal.toFixed(2)}`;
        if (document.getElementById('gstAmount')) document.getElementById('gstAmount').textContent = `$${gst.toFixed(2)}`;
        if (document.getElementById('totalAmount')) document.getElementById('totalAmount').textContent = `$${total.toFixed(2)}`;
        
        const featureBulletList = document.getElementById('planBullets');
        if (featureBulletList) featureBulletList.innerHTML = planData.features.map(feature => `<li>${feature}</li>`).join('');
    }

    // Product Details Logic
    if (selectedPackId && allPromptPacks[selectedPackId]) {
        const packData = allPromptPacks[selectedPackId];
        if (document.getElementById('prodTitle')) document.getElementById('prodTitle').textContent = packData.title;
        if (document.getElementById('prodDesc')) document.getElementById('prodDesc').textContent = packData.description;
        if (document.getElementById('prodPrice')) document.getElementById('prodPrice').textContent = `$${packData.price}`;
        
        const mainContainer = document.getElementById('mainProductCard');
        if (mainContainer) {
            mainContainer.setAttribute('dataTitle', packData.title);
            mainContainer.setAttribute('dataPrice', packData.price);
        }

        const mainProductImage = document.getElementById('mainProdImg');
        if (mainProductImage) {
            mainProductImage.src = packData.mainImg;
            mainProductImage.classList.add('cardImage');
        }

        const thumbnailImages = document.querySelectorAll('#thumbGrid img');
        if (packData.thumbnails && thumbnailImages.length > 0) {
            packData.thumbnails.forEach((source, index) => { if (thumbnailImages[index]) thumbnailImages[index].src = source; });
        }

        const promptListContainer = document.getElementById('promptList');
        if (promptListContainer) {
            promptListContainer.innerHTML = packData.prompts.map(promptText => `
                <div class="promptItemContainer">
                    <p>${promptText}</p>
                    <img src="assets/images/downloadIcon.svg" class="copyIcon" alt="Download">
                </div>
            `).join('');
        }
    }

    // 6. MASTER GLOBAL CLICK LISTENER
    document.addEventListener('click', (event) => {
        // Remove Item from Cart
        if (event.target.classList.contains('removeItem')) {
            let cart = JSON.parse(localStorage.getItem('magicaCartItems')) || [];
            cart.splice(event.target.dataset.index, 1);
            localStorage.setItem('magicaCartItems', JSON.stringify(cart));
            localStorage.setItem('magicaCartCount', cart.length);
            renderCheckoutCart();
            updateCartBadgeStatus();
            return;
        }

        // Add to Cart / Purchase Pack
        const cartButtonTarget = event.target.closest('.addToCartBtn') || event.target.closest('.cardButton') || event.target.closest('.whiteButton');
        if (cartButtonTarget) {
            const productCard = cartButtonTarget.closest('.packCard') || document.getElementById('mainProductCard');
            if (productCard) {
                const title = productCard.getAttribute('dataTitle');
                const priceValue = productCard.getAttribute('dataPrice');
                const imageSource = productCard.querySelector('.cardImage') || document.getElementById('mainProdImg');

                if (title && priceValue && imageSource) {
                    let cart = JSON.parse(localStorage.getItem('magicaCartItems')) || [];
                    cart.push({ title, price: parseFloat(priceValue), image: imageSource.src });
                    localStorage.setItem('magicaCartItems', JSON.stringify(cart));
                    localStorage.setItem('magicaCartCount', cart.length);
                    updateCartBadgeStatus();
                    
                    const originalLabel = cartButtonTarget.innerHTML;
                    cartButtonTarget.innerHTML = "Added! ✓";
                    setTimeout(() => { cartButtonTarget.innerHTML = originalLabel; }, 1000);
                }
            }
        }

        // Complete Purchase Logic
        const finalizePurchaseBtn = event.target.closest('.subscribeBtn');
        if (finalizePurchaseBtn) {
            const termsAgreedCheckbox = document.getElementById('termsCheckbox');
            if (termsAgreedCheckbox && !termsAgreedCheckbox.checked) {
                alert("Please agree to the Terms of Service to continue.");
                return;
            }
            event.preventDefault();
            const isSubscriptionPurchase = !!document.getElementById('displayPlanName');
            
            if (!isSubscriptionPurchase) {
                let currentCartItems = JSON.parse(localStorage.getItem('magicaCartItems')) || [];
                let userLibrary = JSON.parse(localStorage.getItem('purchasedPacks')) || [];
                localStorage.setItem('purchasedPacks', JSON.stringify([...userLibrary, ...currentCartItems]));
                localStorage.removeItem('magicaCartItems');
                localStorage.setItem('magicaCartCount', '0');
            }
            finalizePurchaseBtn.innerHTML = "Processing Magic... ⏳";
            setTimeout(() => { window.location.href = 'success.html'; }, 1500);
        }

        // Tag and Search Filtering
        const tagTarget = event.target.closest('.styleTag') || event.target.closest('.cardTag');
        if (tagTarget) {
            const tagQuery = tagTarget.textContent.trim();
            if (libraryGridContainer) {
                librarySearchInput.value = tagQuery;
                executeLibraryFilter();
            } else {
                window.location.href = `library.html?search=${encodeURIComponent(tagQuery)}`;
            }
        }

        // Auth Logic
        if (event.target.classList.contains('goldButton')) {
            if (document.querySelector('.signInForm') || document.querySelector('.joinForm')) {
                event.preventDefault();
                localStorage.setItem('isLoggedIn', 'true');
                window.location.href = 'account.html';
            }
        }
    });

    // 7. FILTERING & SORTING LOGIC
    const executeLibraryFilter = () => {
        if (!librarySearchInput) return;
        const searchQuery = librarySearchInput.value.toLowerCase().trim();
        const productCards = document.querySelectorAll('.packCard');
        let visibleCount = [];

        productCards.forEach(card => {
            const matches = card.getAttribute('dataTitle').toLowerCase().includes(searchQuery) || 
                          card.getAttribute('dataTags').toLowerCase().includes(searchQuery);
            card.style.display = matches ? "flex" : "none";
            if (matches) visibleCount.push(card);
        });

        if (noResultsMessage) noResultsMessage.style.display = visibleCount.length === 0 ? "flex" : "none";
        triggerFadeInAnimation(visibleCount);
    };

    if (librarySearchInput) librarySearchInput.oninput = debounce(executeLibraryFilter);

    if (librarySortSelect) {
        librarySortSelect.addEventListener('change', () => {
            const sortValue = librarySortSelect.value;
            const cardArray = Array.from(document.querySelectorAll('.packCard'));

            cardArray.sort((first, second) => {
                if (sortValue === 'price-low') return parseFloat(first.getAttribute('dataPrice')) - parseFloat(second.getAttribute('dataPrice'));
                if (sortValue === 'price-high') return parseFloat(second.getAttribute('dataPrice')) - parseFloat(first.getAttribute('dataPrice'));
                if (sortValue === 'title') return first.getAttribute('dataTitle').localeCompare(second.getAttribute('dataTitle'));
                return 0;
            });
            cardArray.forEach(card => libraryGridContainer.appendChild(card));
        });
    }

    // 8. GLOBAL INITIALIZATIONS
    if (homeHeroSearchInput) {
        homeHeroSearchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                const query = homeHeroSearchInput.value.trim();
                if (query) window.location.href = `library.html?search=${encodeURIComponent(query)}`;
            }
        });
    }

    const initialSearchParam = new URLSearchParams(window.location.search).get('search');
    if (initialSearchParam && librarySearchInput) {
        librarySearchInput.value = initialSearchParam;
        executeLibraryFilter();
    }

    updateCartBadgeStatus();
    renderCheckoutCart();
    updateHeaderAuthStatus();

    if (faqHeaderElements) {
        faqHeaderElements.forEach(header => {
            header.onclick = () => {
                const parentItem = header.parentElement;
                const isCurrentlyActive = parentItem.classList.contains('active');
                document.querySelectorAll('.faqItem').forEach(item => item.classList.remove('active'));
                if (!isCurrentlyActive) parentItem.classList.add('active');
            };
        });
    }

    document.getElementById('footerSubscribeBtn')?.addEventListener('click', handleFooterNewsletterSignup);
});

// 9. OUTSIDE SCOPE HELPERS
const updateHeaderAuthStatus = () => {
    const authDisplay = document.getElementById('authContainer');
    if (authDisplay) {
        if (localStorage.getItem('isLoggedIn') === 'true') {
            authDisplay.innerHTML = `<a href="account.html"><img src="assets/images/profileIcon.svg" style="width: 32px;" alt="Profile"></a>`;
        } else {
            authDisplay.innerHTML = `<a href="signIn.html" id="navSignInLink"><button class="multiButton">Sign-in</button></a>`;
        }
    }
};

const handleFooterNewsletterSignup = () => {
    if (document.getElementById('footerEmail')?.value.includes('@')) {
        document.getElementById('newsletterInputGroup').style.display = 'none';
        document.getElementById('footerSuccessMessage').style.display = 'block';
    }
};

const handleModalNewsletterSignup = () => {
    if (document.getElementById('modalEmail')?.value.includes('@')) {
        document.getElementById('starterModal').style.display = 'none';
        document.getElementById('successModal').style.display = 'flex';
        localStorage.setItem('hasFreePack', 'true');
    }
};

const openEntryModal = () => { 
    const modal = document.getElementById('modalOverlay');
    if (modal) modal.style.display = 'flex'; 
};

const closeEntryModal = () => { 
    const modal = document.getElementById('modalOverlay');
    if (modal) modal.style.display = 'none'; 
};

document.getElementById('closeStarter')?.addEventListener('click', closeEntryModal);
document.getElementById('closeSuccess')?.addEventListener('click', closeEntryModal);
document.getElementById('getFreePackBtn')?.addEventListener('click', handleModalNewsletterSignup);
if (!localStorage.getItem('hasFreePack')) setTimeout(openEntryModal, 5000);