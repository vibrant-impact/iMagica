# iMagica - AI Prompt Marketplace

iMagica is a premium digital marketplace designed for AI enthusiasts and digital creators. It provides a curated library of high-performance prompts for tools like Midjourney, DALL-E 3, and Stable Diffusion. This project represents a comprehensive study in blending high-end Graphic Design principles with modern Vanilla JavaScript Web Development.

## 🔗 Project Links

* **Live Active Page:** [vibrant-impact.github.io/iMagica/](https://vibrant-impact.github.io/iMagica/)
* **Original Figma Design:** [iMagica Design Specs](https://www.figma.com/design/LVs5xZE74FL5Qir3WmFTmV/Imagica?m=auto&t=B3PdHbPqWdA3L9xi-6)

## 🚀 Key Features

* **Dynamic Product Injection:** Utilizes JavaScript to populate a single "Product Details" template with unique data (images, full prompt descriptions, and technical settings) based on URL parameters.
* **Advanced Library Filtering & Sorting:** Features real-time search functionality and a multi-criteria sorting system (Price: Low to High, Price: High to Low, and Alphabetical A-Z).
* **Persistent Shopping Cart:** A custom-built cart system utilizing `localStorage` to ensure user selections persist across page refreshes and session transitions.
* **Secure Checkout Simulation:** A validated checkout flow requiring Terms of Service agreement, featuring dynamic price calculations including Subtotal and GST.
* **Responsive Mobile Experience:** A fully optimized mobile layout featuring a dedicated bottom navigation bar for seamless handheld browsing.
* **Interactive User Interface:** Custom-coded FAQ accordions, timed entrance modals for lead generation, and newsletter signup feedback loops.

## 🛠️ Technical Stack

* **HTML5:** Semantic architecture for improved accessibility and document structure.
* **CSS3:** Modern styling using Custom Properties (Variables), Flexbox, and CSS Grid to achieve a high-contrast "Dark Mode" aesthetic.
* **JavaScript (Vanilla):** Robust application logic built without external frameworks. Highlights include Event Delegation, Debouncing for search performance, and Global State management via LocalStorage.
* **Figma:** Professional UI/UX prototyping and asset export.

## 🎨 Design Vision

iMagica was envisioned as a "Tech-Luxe" platform. By pairing deep charcoal backgrounds with vibrant gold and teal accents, the interface evokes the "magic" of AI generation while maintaining the grounded feel of a professional creative tool.

## 📁 Project Structure

```text
iMagica/
├── assets/
│   ├── images/           # Product renders and SVG iconography
├── css/
│   └── app.css           # Main stylesheet with media queries
├── js/
│   └── app.js            # Core logic and descriptive data configurations
├── index.html            # Gateway Home Page
├── library.html          # Filterable Search Interface
├── productDetails.html   # Dynamic Item Template
├── plans.html            # Subscription Tier Overview
├── signIn.html           # Authentication Simulation
├── success.html          # Post-Purchase Confirmation
└── README.md             # Project Documentation

```

## 👩‍💻 Author

**Stephanie Otteson**<br> 
*Graphic Design Graduate & Web Development Student*
