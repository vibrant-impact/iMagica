document.addEventListener('DOMContentLoaded', () => {
    // 1. SELECTORS
    const searchInput = document.getElementById('librarySearch');
    const sortSelect = document.getElementById('sortPacks');
    const grid = document.querySelector('.libraryGrid');
    const noResults = document.getElementById('noResultsMessage');
    const homeSearchInput = document.getElementById('homeHeroSearch');
    const homeTags = document.querySelector('.mobileStyleTagContainer');
    const faqHeaders = document.querySelectorAll('.faqHeader');

    // 2. PRODUCT DATA CONFIG (The "Database")
    const allPacks = {
        
    "cyberpunkCharacter": {
          title: "Cyberpunk Character Pack",
          price: 12,
          tags: ["Cyberpunk", "Character Design", "Futuristic"],
          description: "Create stunning cyberpunk characters with neon aesthetics and futuristic vibes.",
          mainImg: "assets/images/homeProduct1.png",
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
          description: "Breathtaking fantasy landscapes with magical elements.",
          mainImg: "assets/images/productImageLarge.png",
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
          mainImg: "assets/images/homeProduct3.png",
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
          tags: ["Abstract", "Art", "Geometric"],
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
          title: "Anime Character Design",
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
          title: "Modern Architecture",
          price: 11,
          tags: ["Architecture", "Realism", "Minimalism"],
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
          title: "Halloween Horror",
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
          tags: ["Art Deco", "Vintage", "Luxury"],
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

    // 3. UTILITIES
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

    // --- REUSABLE UI UPDATES ---
    const updateCartStatus = () => {
        const count = localStorage.getItem('magicaCartCount') || 0;
        const badges = document.querySelectorAll('.cartBadge');
        badges.forEach(badge => {
            badge.textContent = count;
            badge.style.display = parseInt(count) > 0 ? 'flex' : 'none';
        });
    };

    const displayCart = () => {
        const cartList = document.getElementById('cartItemsList');
        if (!cartList) return;

        const cartItems = JSON.parse(localStorage.getItem('magicaCartItems')) || [];
        let subtotal = 0;

        if (cartItems.length === 0) {
            cartList.innerHTML = "<p style='padding: 2rem; text-align: center;'>Your cart is empty.</p>";
            if (document.getElementById('subtotalAmount')) document.getElementById('subtotalAmount').textContent = "$0.00";
            if (document.getElementById('gstAmount')) document.getElementById('gstAmount').textContent = "$0.00";
            if (document.getElementById('totalAmount')) document.getElementById('totalAmount').textContent = "$0.00";
            updateCartStatus();
            return;
        }

        cartList.innerHTML = cartItems.map((item, i) => {
            subtotal += item.price;
            return `
                <div class="productSummary">
                    <img src="${item.image}" alt="${item.title}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
                    <div class="productDetails">
                        <div class="textWrapper">
                            <h3>${item.title}</h3>
                            <h3 style="color: #008695;">$${item.price.toFixed(2)}</h3>
                        </div>
                        <button class="removeItem" data-index="${i}" title="Remove Item">&times;</button>
                    </div>
                </div>
            `;
        }).join('');

        const gstAmount = subtotal * 0.05;
        const finalTotal = subtotal + gstAmount;

        if (document.getElementById('subtotalAmount')) document.getElementById('subtotalAmount').textContent = `$${subtotal.toFixed(2)}`;
        if (document.getElementById('gstAmount')) document.getElementById('gstAmount').textContent = `$${gstAmount.toFixed(2)}`;
        if (document.getElementById('totalAmount')) document.getElementById('totalAmount').textContent = `$${finalTotal.toFixed(2)}`;
        
        const buyBtn = document.querySelector('.subscribeBtn');
        if (buyBtn) buyBtn.textContent = `Complete Purchase - $${finalTotal.toFixed(2)}`;

        document.querySelectorAll('.removeItem').forEach(btn => {
            btn.onclick = (e) => removeCartItem(e.target.dataset.index);
        });
    };

    const removeCartItem = (index) => {
        let cart = JSON.parse(localStorage.getItem('magicaCartItems')) || [];
        cart.splice(index, 1);
        localStorage.setItem('magicaCartItems', JSON.stringify(cart));
        localStorage.setItem('magicaCartCount', cart.length);
        displayCart();
        updateCartStatus();
    };

// --- DYNAMIC PRODUCT PAGE INJECTION ---
    const urlParams = new URLSearchParams(window.location.search);
    const packId = urlParams.get('id');

    if (packId && allPacks[packId]) {
        const pack = allPacks[packId];

        // 1. Update Text Fields
        if (document.getElementById('prodTitle')) document.getElementById('prodTitle').textContent = pack.title;
        if (document.getElementById('prodDesc')) document.getElementById('prodDesc').textContent = pack.description;
        if (document.getElementById('prodPrice')) document.getElementById('prodPrice').textContent = `$${pack.price}`;
        
        const prodModels = document.querySelector('.packDetailsLine:nth-child(2) p:last-child');
        const prodSettings = document.querySelector('.packDetailsLine:nth-child(3) p:last-child');
        if (prodModels) prodModels.textContent = pack.models;
        if (prodSettings) prodSettings.textContent = pack.settings;
        
        // 2. Update Main Image
        const mainImg = document.getElementById('mainProdImg');
        if (mainImg) {
            mainImg.src = pack.mainImg;
            mainImg.classList.add('cardImage'); // Added for Cart Logic
        }

        // 3. Update Thumbnails
        const thumbImgs = document.querySelectorAll('#thumbGrid img');
        if (pack.thumbnails && thumbImgs.length > 0) {
            pack.thumbnails.forEach((src, idx) => {
                if (thumbImgs[idx]) thumbImgs[idx].src = src;
            });
        }

        // 4. Update Tags
        const tagContainer = document.getElementById('prodTags');
        if (tagContainer) {
            tagContainer.innerHTML = pack.tags.map(t => `<p class="cardTag">${t}</p>`).join('');
        }

        // 5. Update Included Prompts
        const promptList = document.querySelector('.includedPromptsContainer');
        if (promptList) {
            const promptArea = promptList.querySelector('div') || promptList;
            promptArea.innerHTML = pack.prompts.map(p => `
                <div class="promptItemContainer">
                    <p>${p}</p>
                    <img src="assets/images/downloadIcon.svg" alt="Download" class="copyIcon" style="cursor:pointer">
                </div>
            `).join('');
        }

        // 6. Sync the Master Card for Cart Logic
        const productCard = document.getElementById('mainProductCard');
        if (productCard) {
            productCard.setAttribute('dataTitle', pack.title);
            productCard.setAttribute('dataPrice', pack.price);
        }
    }

    // --- MASTER CLICK LISTENER ---
    document.addEventListener('click', (e) => {
        // Add to Cart Logic
        const cartBtn = e.target.closest('.addToCartBtn') || e.target.closest('.cardButton') || e.target.closest('.whiteButton');
        
        if (cartBtn) {
            // Check for library card OR the main product card
            const card = cartBtn.closest('.packCard') || cartBtn.closest('.productDetailsContainer') || document.getElementById('mainProductCard');
            
            if (card) {
                const title = card.getAttribute('dataTitle');
                const price = card.getAttribute('dataPrice');
                const imgElement = card.querySelector('.cardImage') || card.querySelector('#mainProdImg');

                if (title && price && imgElement) {
                    const product = {
                        title: title,
                        price: parseFloat(price),
                        image: imgElement.src
                    };

                    let cart = JSON.parse(localStorage.getItem('magicaCartItems')) || [];
                    cart.push(product);
                    localStorage.setItem('magicaCartItems', JSON.stringify(cart));
                    localStorage.setItem('magicaCartCount', cart.length);
                    
                    updateCartStatus();
                    
                    // Visual feedback
                    const originalText = cartBtn.innerHTML;
                    cartBtn.innerHTML = "Added! ✓";
                    setTimeout(() => { cartBtn.innerHTML = originalText; }, 1000);
                }
            }
        }

        // Tag Filter Logic
        if (e.target.classList.contains('styleTag') || e.target.classList.contains('cardTag')) {
            const query = e.target.textContent;
            if (grid) {
                searchInput.value = query;
                runFilter();
            } else {
                window.location.href = `library.html?search=${encodeURIComponent(query)}`;
            }
        }
    });

    // --- INITIALIZE REMAINING LOGIC ---
    updateCartStatus();
    displayCart();

    if (faqHeaders) {
        faqHeaders.forEach(header => {
            header.onclick = () => {
                const item = header.parentElement;
                const isActive = item.classList.contains('active');
                document.querySelectorAll('.faqItem').forEach(i => i.classList.remove('active'));
                if (!isActive) item.classList.add('active');
            };
        });
    }

    const runFilter = () => {
        if (!searchInput) return;
        const query = searchInput.value.toLowerCase();
        const cards = document.querySelectorAll('.packCard');
        let visible = [];
        cards.forEach(card => {
            const matches = (card.getAttribute('dataTitle') || "").toLowerCase().includes(query) || 
                            (card.getAttribute('dataTags') || "").toLowerCase().includes(query);
            card.style.display = matches ? "flex" : "none";
            if (matches) visible.push(card);
        });
        if (noResults) noResults.style.display = visible.length === 0 ? "flex" : "none";
        triggerFade(visible);
    };

    if (searchInput) searchInput.oninput = debounce(runFilter);
});    