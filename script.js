/* ═══════════════════════════════════════════
   YNKOMODA — script.js
   Alternative Fashion Store — Clean JS
═══════════════════════════════════════════ */

"use strict";

// ══════════════════════════════════════════
// DATA — Products
// ══════════════════════════════════════════
const PRODUCTS = [
  {
    id: 1,
    name: "Chain Off-Shoulder Jacket",
    category: "Outerwear",
    categoryKey: "outerwear",
    price: 65000,
    priceLabel: "$65.000",
    badge: "NEW",
    img: "Chaqueta.jpeg",
    desc: "Chaqueta negra off-shoulder con cadenas metálicas laterales y cierre frontal metálico. Mangas con cordón entrelazado a lo largo. Tela de raso de alta calidad. Una pieza que define actitud sin pedir permiso.",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "Sweet Chaos Jean",
    category: "Bottoms",
    categoryKey: "bottoms",
    price: 70000,
    priceLabel: "$70.000",
    badge: "HOT",
    img: "Jean.jpeg",
    desc: "Jean urbano tipo flare con rotos estratégicos, encaje negro en la parte trasera, llamas rojas bordadas y gráfico 'Sweet Chaos'. Cordones rojos laterales, cadenas metálicas en la cintura. La etiqueta YNKOMODA en la parte trasera. Una declaración visual.",
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: 3,
    name: "Chain Turtleneck Body",
    category: "Tops",
    categoryKey: "tops",
    price: 50000,
    priceLabel: "$50.000",
    badge: "LIMITED",
    img: "Blusa.jpeg",
    desc: "Body de cuello tortuga con apertura frontal en el pecho y múltiples cadenas metálicas en cascada. Tela de alto poder de compresión y moldeo. Combínalo con el Sweet Chaos Jean para el look completo YNKOMODA.",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
];

// ══════════════════════════════════════════
// STATE
// ══════════════════════════════════════════
let cart = [];
let currentProduct = null;
let currentQty = 1;
let selectedSize = "M";

// ══════════════════════════════════════════
// UTILS
// ══════════════════════════════════════════
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const formatPrice = (n) => "$" + n.toLocaleString("es-CO");

// ══════════════════════════════════════════
// NAVBAR — scroll effect
// ══════════════════════════════════════════
const navbar = $("#navbar");

const handleScroll = () => {
  if (window.scrollY > 60) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
};

window.addEventListener("scroll", handleScroll, { passive: true });

// Active nav link on scroll
const sections = $$("section[id]");
const navLinks = $$(".nav-link");

const observeSections = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle("active-link", link.dataset.section === id);
          });
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" },
  );
  sections.forEach((s) => observer.observe(s));
};

// ══════════════════════════════════════════
// HAMBURGER MENU
// ══════════════════════════════════════════
const hamburger = $("#hamburger");
const navMenu = $("#navMenu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navMenu.classList.toggle("open");
  document.body.style.overflow = navMenu.classList.contains("open")
    ? "hidden"
    : "";
});

navMenu.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navMenu.classList.remove("open");
    document.body.style.overflow = "";
  });
});

// ══════════════════════════════════════════
// SMOOTH SCROLL for all anchor links
// ══════════════════════════════════════════
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});

// ══════════════════════════════════════════
// PARTICLES — Hero background
// ══════════════════════════════════════════
const createParticles = () => {
  const container = $("#particles");
  if (!container) return;

  for (let i = 0; i < 25; i++) {
    const p = document.createElement("div");
    p.style.cssText = `
      position: absolute;
      width: ${Math.random() * 3 + 1}px;
      height: ${Math.random() * 3 + 1}px;
      background: ${Math.random() > 0.5 ? "rgba(204,0,0,0.4)" : "rgba(192,192,192,0.15)"};
      border-radius: 50%;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      animation: particleFloat ${Math.random() * 8 + 6}s ease-in-out ${Math.random() * 4}s infinite;
    `;
    container.appendChild(p);
  }

  const style = document.createElement("style");
  style.textContent = `
    @keyframes particleFloat {
      0%, 100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.6; }
      33%       { transform: translateY(-${Math.random() * 30 + 20}px) translateX(${Math.random() * 20 - 10}px) scale(1.2); opacity: 1; }
      66%       { transform: translateY(${Math.random() * 20 + 10}px) translateX(${Math.random() * 20 - 10}px) scale(0.8); opacity: 0.3; }
    }
  `;
  document.head.appendChild(style);
};

// ══════════════════════════════════════════
// SCROLL REVEAL — intersection observer
// ══════════════════════════════════════════
const revealElements = () => {
  const elements = $$(
    ".product-card, .collection-inner, .about-inner, .contact-inner, .newsletter-inner, .section-header",
  );

  elements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const delay = entry.target.classList.contains("product-card")
            ? Array.from($$(".product-card")).indexOf(entry.target) * 100
            : 0;
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -80px 0px", threshold: 0.1 },
  );

  elements.forEach((el) => observer.observe(el));
};

// ══════════════════════════════════════════
// FILTER BAR
// ══════════════════════════════════════════
const filterBtns = $$(".filter-btn");
const productCards = $$(".product-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    productCards.forEach((card) => {
      const match = filter === "all" || card.dataset.category === filter;
      card.style.transition = "opacity 0.3s ease, transform 0.3s ease";

      if (match) {
        card.classList.remove("hide");
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      } else {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        setTimeout(() => card.classList.add("hide"), 300);
      }
    });
  });
});

// ══════════════════════════════════════════
// TOAST NOTIFICATION
// ══════════════════════════════════════════
const toast = $("#toast");
const toastMsg = $("#toastMsg");
let toastTimer = null;

const showToast = (msg) => {
  toastMsg.textContent = msg;
  toast.classList.add("show");
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
};

// ══════════════════════════════════════════
// CART
// ══════════════════════════════════════════
const cartCount = $("#cartCount");
const cartBtn = $("#cartBtn");
const cartDrawer = $("#cartDrawer");
const cartOverlay = $("#cartOverlay");
const cartClose = $("#cartClose");
const cartItemsContainer = $("#cartItems");
const cartEmpty = $("#cartEmpty");
const cartFooter = $("#cartFooter");
const cartTotalEl = $("#cartTotal");

const updateCartUI = () => {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

  // Count badge
  cartCount.textContent = totalQty;
  if (totalQty > 0) {
    cartCount.classList.add("visible");
  } else {
    cartCount.classList.remove("visible");
  }

  // Total
  cartTotalEl.textContent = formatPrice(total);

  // Items
  if (cart.length === 0) {
    cartEmpty.style.display = "flex";
    cartFooter.style.display = "none";
    cartItemsContainer.innerHTML = "";
    cartItemsContainer.appendChild(cartEmpty);
    return;
  }

  cartEmpty.style.display = "none";
  cartFooter.style.display = "block";

  // Render items
  const existingItems = cartItemsContainer.querySelectorAll(".cart-item");
  existingItems.forEach((el) => el.remove());

  cart.forEach((item) => {
    const el = document.createElement("div");
    el.className = "cart-item";
    el.innerHTML = `
      <img src="${item.img}" alt="${item.name}" class="cart-item-img" />
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-size">Talla: ${item.size} · Qty: ${item.qty}</div>
        <div class="cart-item-price">${formatPrice(item.price * item.qty)}</div>
      </div>
      <button class="cart-item-remove" data-cart-id="${item.cartId}" aria-label="Eliminar">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/>
        </svg>
      </button>
    `;
    cartItemsContainer.appendChild(el);
  });

  // Remove buttons
  cartItemsContainer.querySelectorAll(".cart-item-remove").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.cartId;
      cart = cart.filter((item) => item.cartId !== id);
      updateCartUI();
    });
  });
};

const openCart = () => {
  cartDrawer.classList.add("open");
  cartOverlay.classList.add("open");
  document.body.style.overflow = "hidden";
};

const closeCart = () => {
  cartDrawer.classList.remove("open");
  cartOverlay.classList.remove("open");
  document.body.style.overflow = "";
};

cartBtn.addEventListener("click", openCart);
cartClose.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

$("#checkoutBtn").addEventListener("click", () => {
  showToast("🔥 Checkout en construcción — próximamente!");
});

// Add to cart function
const addToCart = (productId, size, qty) => {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  const cartId = `${productId}-${size}-${Date.now()}`;
  const existing = cart.find((i) => i.id === productId && i.size === size);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      cartId,
      id: product.id,
      name: product.name,
      price: product.price,
      size: size || "M",
      qty,
      img: product.img,
    });
  }

  updateCartUI();

  // Cart icon animation
  const icon = cartBtn.querySelector("svg");
  icon.style.transform = "scale(1.4) rotate(-10deg)";
  icon.style.transition = "transform 0.3s ease";
  setTimeout(() => {
    icon.style.transform = "scale(1) rotate(0deg)";
  }, 300);

  showToast(`✓ ${product.name} agregado al carrito`);
};

// Quick add-to-cart from product card
$$(".add-cart-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const id = parseInt(btn.dataset.id);
    const product = PRODUCTS.find((p) => p.id === id);
    if (!product) return;
    addToCart(id, product.sizes[2] || product.sizes[0], 1);

    // Button animation
    btn.style.transform = "scale(1.3)";
    setTimeout(() => (btn.style.transform = ""), 300);
  });
});

// ══════════════════════════════════════════
// MODAL — Product Detail
// ══════════════════════════════════════════
const modalOverlay = $("#modalOverlay");
const modal = $("#productModal");
const modalClose = $("#modalClose");
const modalImg = $("#modalImg");
const modalCategory = $("#modalCategory");
const modalProductName = $("#modalProductName");
const modalDesc = $("#modalDesc");
const modalPrice = $("#modalPrice");
const modalBadge = $("#modalBadge");
const sizeGrid = $("#sizeGrid");
const qtyNum = $("#qtyNum");
const qtyPlus = $("#qtyPlus");
const qtyMinus = $("#qtyMinus");
const modalAddBtn = $("#modalAddBtn");

const openModal = (productId) => {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  currentProduct = product;
  currentQty = 1;
  selectedSize = product.sizes.includes("M") ? "M" : product.sizes[0];

  // Fill modal
  modalImg.src = product.img;
  modalImg.alt = product.name;
  modalCategory.textContent = product.category;
  modalProductName.textContent = product.name;
  modalDesc.textContent = product.desc;
  modalPrice.textContent = product.priceLabel;
  modalBadge.textContent = product.badge;
  qtyNum.textContent = "1";

  // Sizes
  sizeGrid.innerHTML = "";
  product.sizes.forEach((size) => {
    const btn = document.createElement("button");
    btn.className = "size-btn" + (size === selectedSize ? " active" : "");
    btn.dataset.size = size;
    btn.textContent = size;
    btn.addEventListener("click", () => {
      sizeGrid
        .querySelectorAll(".size-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      selectedSize = size;
    });
    sizeGrid.appendChild(btn);
  });

  // Show modal
  modalOverlay.classList.add("open");
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  modalOverlay.classList.remove("open");
  document.body.style.overflow = "";
  currentProduct = null;
};

modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeModal();
});

// Quantity control
qtyPlus.addEventListener("click", () => {
  currentQty = Math.min(currentQty + 1, 10);
  qtyNum.textContent = currentQty;
});
qtyMinus.addEventListener("click", () => {
  currentQty = Math.max(currentQty - 1, 1);
  qtyNum.textContent = currentQty;
});

// Modal add to cart
modalAddBtn.addEventListener("click", () => {
  if (!currentProduct) return;
  addToCart(currentProduct.id, selectedSize, currentQty);

  // Button feedback
  modalAddBtn.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
    <span>Agregado!</span>
  `;
  modalAddBtn.style.background = "#1a7a1a";
  setTimeout(() => {
    modalAddBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 01-8 0"/>
      </svg>
      <span>Agregar al carrito</span>
    `;
    modalAddBtn.style.background = "";
  }, 1800);

  closeModal();
  setTimeout(() => openCart(), 400);
});

// Open modal from product cards
$$(".quick-view-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const id = parseInt(btn.dataset.id);
    openModal(id);
  });
});

$$(".product-card").forEach((card) => {
  card.addEventListener("click", () => {
    const id = parseInt(card.dataset.id);
    openModal(id);
  });
});

// Keyboard close
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
    closeCart();
  }
});

// ══════════════════════════════════════════
// NEWSLETTER FORM
// ══════════════════════════════════════════
const newsletterForm = $("#newsletterForm");
const nlSuccess = $("#nlSuccess");

newsletterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = $("#nlEmail").value;
  if (!email || !email.includes("@")) {
    showToast("Por favor ingresa un email válido");
    return;
  }
  nlSuccess.classList.add("show");
  newsletterForm.querySelector(".nl-input-wrap").style.opacity = "0.4";
  newsletterForm.querySelector(".nl-input-wrap").style.pointerEvents = "none";
  showToast("¡Bienvenida a YNKOMODA!");
});

// ══════════════════════════════════════════
// CONTACT FORM
// ══════════════════════════════════════════
const contactForm = $("#contactForm");
const contactSuccess = $("#contactSuccess");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = $("#contactName").value.trim();
  const email = $("#contactEmail").value.trim();
  const message = $("#contactMessage").value.trim();

  if (!name || !email || !message) {
    showToast("Por favor completa todos los campos requeridos");
    return;
  }

  contactSuccess.classList.add("show");
  contactForm.style.opacity = "0.5";
  contactForm.style.pointerEvents = "none";
  showToast("✓ Mensaje enviado con éxito");

  setTimeout(() => {
    contactForm.reset();
    contactForm.style.opacity = "";
    contactForm.style.pointerEvents = "";
    contactSuccess.classList.remove("show");
  }, 5000);
});

// ══════════════════════════════════════════
// LOGO ANIMATION — subtle glitch on hover
// ══════════════════════════════════════════
const logoLink = $("#logo-link");
if (logoLink) {
  const glitchStyle = document.createElement("style");
  glitchStyle.textContent = `
    @keyframes logoGlitch {
      0%   { text-shadow: none; }
      20%  { text-shadow: -2px 0 #ff0000, 2px 0 #00ffff; letter-spacing: 4px; }
      40%  { text-shadow: 2px 0 #ff0000, -2px 0 #00ffff; letter-spacing: 2px; }
      60%  { text-shadow: -1px 0 #ff0000; letter-spacing: 3px; }
      80%  { text-shadow: 1px 0 rgba(204,0,0,0.6); letter-spacing: 2px; }
      100% { text-shadow: none; letter-spacing: 2px; }
    }
    .nav-logo:hover .logo-text {
      animation: logoGlitch 0.6s ease;
    }
  `;
  document.head.appendChild(glitchStyle);
}

// ══════════════════════════════════════════
// ADD ACTIVE NAV STYLE
// ══════════════════════════════════════════
const activeStyle = document.createElement("style");
activeStyle.textContent = `
  .nav-link.active-link { color: var(--white); }
  .nav-link.active-link::after { width: 100%; }
`;
document.head.appendChild(activeStyle);

// ══════════════════════════════════════════
// INIT
// ══════════════════════════════════════════
document.addEventListener("DOMContentLoaded", () => {
  handleScroll();
  createParticles();
  revealElements();
  observeSections();
  updateCartUI();

  // Hero product preview hover parallax
  const previewImg = document.querySelector(".hero-product-preview");
  if (previewImg) {
    document.addEventListener("mousemove", (e) => {
      const xAxis = (window.innerWidth / 2 - e.pageX) / 40;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 40;
      previewImg.style.transform = `perspective(800px) rotateY(${xAxis}deg) rotateX(${yAxis * 0.5}deg) translateY(0)`;
    });
    document.addEventListener("mouseleave", () => {
      previewImg.style.transform = "perspective(800px) rotateY(0) rotateX(0)";
    });
  }
});
