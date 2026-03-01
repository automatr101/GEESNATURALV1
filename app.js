/* ============================================
   GEE'S NATURALS — CORE APP JAVASCRIPT
   ============================================ */

// ---- SUPABASE CONFIG ----
const SUPABASE_URL = 'https://qbjovztybsuqhpyhkzrp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFiam92enR5YnN1cWhweWhrenJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1MjgyNzIsImV4cCI6MjA4NzEwNDI3Mn0.sxb-viBgHVwhs7RnIpQEcEH6m9uwCjUMf2oD-EtSx8c';

const PAYSTACK_PUBLIC_KEY = 'pk_test_aeaf7602344d30765dd914d60de1bd78654b31b2';

// ---- TELEGRAM CONFIG (MOVED TO API) ----
// Secrets are now stored in Vercel Environment Variables for security.

// ---- GOOGLE ANALYTICS HELPER ----
function trackEvent(eventName, params = {}) {
  if (typeof gtag === 'function') {
    gtag('event', eventName, params);
  }
}

// ---- PRODUCT DATA ----
const PRODUCTS = [
  {
    id: 1,
    name: 'Orange Juice',
    slug: 'orange-juice',
    category: 'citrus',
    badge: '100% Pure',
    description: 'Pure, cold-pressed Ghanaian oranges. No pulp, no added sugar. Bursting with natural vitamin C.',
    ingredients: ['Fresh Oranges'],
    nutrition: { calories: 110, sugar: '22g', vitamin_c: '120%', fiber: '2g' },
    image: 'assets/products/orange juice.png',
    inStock: true,
    variants: [
      { size: '250ml', price: 10 },
      { size: '350ml', price: 15 },
      { size: '500ml', price: 20 }
    ]
  },
  {
    id: 2,
    name: 'Pine Ginger',
    slug: 'pine-ginger',
    category: 'tropical',
    badge: 'Immunity Boost',
    description: 'A refreshing blend of sweet pineapple with a bold ginger kick. Perfect for a natural energy boost.',
    ingredients: ['Fresh Pineapple', 'Ginger Root', 'Lime Juice'],
    nutrition: { calories: 95, sugar: '18g', vitamin_c: '80%', fiber: '2g' },
    image: 'assets/products/pine ginger.png',
    inStock: true,
    variants: [
      { size: '250ml', price: 10 },
      { size: '350ml', price: 15 },
      { size: '500ml', price: 20 }
    ]
  },
  {
    id: 3,
    name: 'Tropical',
    slug: 'tropical',
    category: 'tropical',
    badge: 'Customer Choice',
    description: 'A luscious blend of mango, pineapple, and passion fruit. A tropical escape in every bottle.',
    ingredients: ['Mango', 'Pineapple', 'Passion Fruit', 'Filtered Water'],
    nutrition: { calories: 130, sugar: '26g', vitamin_c: '80%', fiber: '3g' },
    image: 'assets/products/tropical.png',
    inStock: true,
    variants: [
      { size: '250ml', price: 10 },
      { size: '350ml', price: 15 },
      { size: '500ml', price: 20 }
    ]
  },
  {
    id: 4,
    name: 'Sweet Beet',
    slug: 'sweet-beet',
    category: 'exotic',
    badge: 'Vibrant',
    description: 'An earthy-sweet powerhouse of beetroot, address, and a touch of ginger. Rich in antioxidants.',
    ingredients: ['Beetroot', 'Apple', 'Ginger', 'Lemon'],
    nutrition: { calories: 120, sugar: '24g', vitamin_c: '40%', fiber: '4g' },
    image: 'assets/products/sweet beet.png',
    inStock: true,
    variants: [
      { size: '250ml', price: 10 },
      { size: '350ml', price: 15 },
      { size: '500ml', price: 20 }
    ]
  },
  {
    id: 5,
    name: 'Fresh Fusion (green juice/Detox)',
    slug: 'fresh-fusion',
    category: 'refreshing',
    badge: 'Detox',
    description: 'Our signature green juice blend with kale, cucumber, and green apple. Ultimate refreshment.',
    ingredients: ['Kale', 'Cucumber', 'Green Apple', 'Lemon'],
    nutrition: { calories: 85, sugar: '12g', vitamin_c: '150%', fiber: '3g' },
    image: 'assets/products/Fresh Fusiongreendetox.png',
    inStock: true,
    variants: [
      { size: '250ml', price: 10 },
      { size: '350ml', price: 15 },
      { size: '500ml', price: 20 }
    ]
  },
  {
    id: 6,
    name: 'Watermelon',
    slug: 'watermelon',
    category: 'refreshing',
    badge: 'Hydrating',
    description: 'Pure, refreshing watermelon juice with a hint of lime and fresh mint.',
    ingredients: ['Fresh Watermelon', 'Lime Juice', 'Mint'],
    nutrition: { calories: 80, sugar: '16g', vitamin_c: '30%', fiber: '1g' },
    image: 'assets/products/watermelon.png',
    inStock: true,
    variants: [
      { size: '250ml', price: 10 },
      { size: '350ml', price: 15 },
      { size: '500ml', price: 20 }
    ]
  },
  {
    id: 7,
    name: 'Plain pineapple',
    slug: 'pineapple',
    category: 'tropical',
    badge: null,
    description: 'Classic sweet Ghanaian pineapple juice. 100% natural and freshly pressed.',
    ingredients: ['Fresh Pineapple'],
    nutrition: { calories: 90, sugar: '18g', vitamin_c: '70%', fiber: '2g' },
    image: 'assets/products/plain pinaple.png',
    inStock: true,
    variants: [
      { size: '250ml', price: 10 },
      { size: '350ml', price: 15 },
      { size: '500ml', price: 20 }
    ]
  },
];

// ---- HELPER: Resolve Image Path ----
function resolveImagePath(path) {
  // If we're at the root, the path is already correct (assets/...)
  // If we're in a subdirectory, prepend ../
  const depth = window.location.pathname.split('/').filter(Boolean).length;
  // This is a simple heuristic. Works for index.html at root vs shop/index.html
  // But if the URL is https://geesnaturals.store/ (no index.html in path), depth might be 0.
  // If the URL is https://geesnaturals.store/shop/, depth is 1.

  // Checking for trailing index.html specifically
  const href = window.location.href;
  const isAtSubDir = (href.includes('/shop/') || href.includes('/about-us/') || href.includes('/contact/') || href.includes('/product/') || href.includes('/success/'));

  return isAtSubDir ? `../${path}` : `./${path}`;
}

// Map product images to resolved paths
PRODUCTS.forEach(p => p.image = resolveImagePath(p.image));

// ---- CART STATE ----
// Simple cart state that resets on page reload
let cart = [];

// Migration: Sync cart prices with new product data if needed
function syncCartWithProducts() {
  let changed = false;
  cart = cart.map(item => {
    const product = PRODUCTS.find(p => p.id === item.id);
    if (product) {
      // Find matching size variant or use the 500ml default
      const variant = product.variants.find(v => v.size === item.size) || product.variants[2];
      if (item.price !== variant.price) {
        item.price = variant.price;
        item.name = product.name; // ensure names match too
        changed = true;
      }
    }
    return item;
  });
  if (changed) localStorage.setItem('gn_cart', JSON.stringify(cart));
}
syncCartWithProducts();

function saveCart() {
  localStorage.setItem('gn_cart', JSON.stringify(cart));
  updateCartUI();
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function addToCart(productId, qty = 1, size = '500ml') {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const variant = product.variants.find(v => v.size === size) || product.variants[2];

  const existing = cart.find(i => i.id === productId && i.size === size);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ ...product, price: variant.price, size: variant.size, qty });
  }
  saveCart();
  showToast(`${product.name} (${size}) added to cart 🛒`, 'success');
  bumpCartCount();

  // GA Tracking
  trackEvent('add_to_cart', {
    item_id: product.id,
    item_name: product.name,
    item_variant: size,
    price: variant.price,
    currency: 'GHS'
  });
}

function removeFromCart(productId) {
  cart = cart.filter(i => i.id !== productId);
  saveCart();
}

function updateCartQty(productId, qty) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  if (qty <= 0) {
    removeFromCart(productId);
  } else {
    item.qty = qty;
    saveCart();
  }
}

function clearCart() {
  cart = [];
  saveCart();
}

// ---- CART UI ----
function updateCartUI() {
  const count = getCartCount();
  const total = getCartTotal();

  // Update all cart count badges
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'inline-flex' : 'none';
  });

  // Update cart sidebar
  const cartItemsEl = document.getElementById('cart-items');
  const cartEmptyEl = document.getElementById('cart-empty');
  const cartFooterEl = document.getElementById('cart-footer');
  const cartSubtotalEl = document.getElementById('cart-subtotal');
  const cartTotalEl = document.getElementById('cart-total');

  if (!cartItemsEl) return;

  if (cart.length === 0) {
    cartItemsEl.innerHTML = '';
    if (cartEmptyEl) cartEmptyEl.style.display = 'flex';
    if (cartFooterEl) cartFooterEl.style.display = 'none';
  } else {
    if (cartEmptyEl) cartEmptyEl.style.display = 'none';
    if (cartFooterEl) cartFooterEl.style.display = 'flex';

    cartItemsEl.innerHTML = cart.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.name}" loading="lazy">
        </div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-size">${item.size}</div>
          <div class="cart-item-price">GHC ${(item.price * item.qty).toFixed(2)}</div>
          <div class="cart-item-controls">
            <button class="qty-btn" onclick="updateCartQty(${item.id}, ${item.qty - 1})">−</button>
            <span class="qty-display">${item.qty}</span>
            <button class="qty-btn" onclick="updateCartQty(${item.id}, ${item.qty + 1})">+</button>
          </div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${item.id})" title="Remove">✕</button>
      </div>
    `).join('');

    if (cartSubtotalEl) cartSubtotalEl.textContent = `GHC ${total.toFixed(2)}`;
    if (cartTotalEl) cartTotalEl.textContent = `GHC ${total.toFixed(2)}`;
  }
}

function bumpCartCount() {
  document.querySelectorAll('.cart-count').forEach(el => {
    el.classList.remove('bump');
    void el.offsetWidth; // reflow
    el.classList.add('bump');
  });
}

// ---- CART SIDEBAR TOGGLE ----
function openCart() {
  document.getElementById('cart-sidebar')?.classList.add('open');
  document.getElementById('cart-overlay')?.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cart-sidebar')?.classList.remove('open');
  document.getElementById('cart-overlay')?.classList.remove('open');
  document.body.style.overflow = '';
}

// ---- PAYSTACK CHECKOUT ----
// ---- CHECKOUT MODAL LOGIC ----
function openCheckoutModal() {
  if (cart.length === 0) {
    showToast('Your cart is empty!', 'error');
    return;
  }

  // Create modal if it doesn't exist
  if (!document.getElementById('checkout-modal')) {
    const modalHtml = `
      <div class="modal" id="checkout-modal">
        <div class="modal-backdrop" onclick="closeCheckoutModal()"></div>
        <div class="modal-content">
          <div class="modal-header">
            <h3>Delivery Details</h3>
            <button class="modal-close" onclick="closeCheckoutModal()">✕</button>
          </div>
          <form class="checkout-form" id="checkout-form">
            <div>
              <label for="checkout-name">Full Name</label>
              <input type="text" id="checkout-name" placeholder="John Doe" required>
            </div>
            <div>
              <label for="checkout-email">Email Address</label>
              <input type="email" id="checkout-email" placeholder="john@example.com" required>
            </div>
            <div>
              <label for="checkout-phone">Phone Number</label>
              <input type="tel" id="checkout-phone" placeholder="024XXXXXXX" required>
            </div>
            <div>
              <label for="checkout-address">Delivery Address / Landmark</label>
              <textarea id="checkout-address" rows="3" placeholder="Digital Address or clear landmarks (e.g. Near the big Baobab tree, Accra)" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary btn-full mt-2">Proceed to Payment</button>
          </form>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    document.getElementById('checkout-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const customerData = {
        name: document.getElementById('checkout-name').value,
        email: document.getElementById('checkout-email').value,
        phone: document.getElementById('checkout-phone').value,
        address: document.getElementById('checkout-address').value
      };
      closeCheckoutModal();
      processPayment(customerData);
    });
  }

  document.getElementById('checkout-modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCheckoutModal() {
  document.getElementById('checkout-modal')?.classList.remove('active');
  document.body.style.overflow = '';
}

function initiateCheckout() {
  trackEvent('begin_checkout', {
    currency: 'GHS',
    value: getCartTotal(),
    items: cart.map(i => ({
      item_id: i.id,
      item_name: i.name,
      price: i.price,
      quantity: i.qty
    }))
  });
  openCheckoutModal();
}

function processPayment(customerData) {
  const total = getCartTotal();
  const handler = PaystackPop.setup({
    key: PAYSTACK_PUBLIC_KEY,
    email: customerData.email,
    amount: total * 100,
    currency: 'GHS',
    ref: 'GN_' + Date.now(),
    metadata: {
      custom_fields: [
        { display_name: 'Customer Name', variable_name: 'customer_name', value: customerData.name },
        { display_name: 'Phone Number', variable_name: 'customer_phone', value: customerData.phone },
        { display_name: 'Delivery Address', variable_name: 'delivery_address', value: customerData.address },
        { display_name: 'Order Items', variable_name: 'order_items', value: JSON.stringify(cart.map(i => ({ name: i.name, qty: i.qty, price: i.price }))) }
      ]
    },
    callback: function (response) {
      saveOrder(customerData, response.reference, total);
    },
    onClose: function () {
      showToast('Payment cancelled.', 'error');
    }
  });
  handler.openIframe();
}

// ---- TELEGRAM NOTIFICATIONS (SECURE VIA API) ----
async function sendTelegramNotification(message) {
  try {
    const response = await fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Notification Error Details:', errorData);
    }
  } catch (err) {
    console.error('Network/Server Error:', err);
  }
}

// ---- SUPABASE ORDER SAVING ----
async function saveOrder(customerData, reference, total) {
  try {
    const orderData = {
      reference,
      customer_name: customerData.name,
      email: customerData.email,
      phone: customerData.phone,
      delivery_address: customerData.address,
      total,
      items: cart,
      status: 'paid',
      created_at: new Date().toISOString(),
    };

    // Construct Telegram message
    const itemDetails = cart.map(i => `• ${i.name} (${i.size}) x${i.qty}`).join('\n');
    const telegramMsg = `💰 <b>New Order Received!</b>\n\n` +
      `👤 <b>Customer:</b> ${customerData.name}\n` +
      `📞 <b>Phone:</b> ${customerData.phone}\n` +
      `📧 <b>Email:</b> ${customerData.email}\n` +
      `📍 <b>Address:</b> ${customerData.address}\n\n` +
      `🛒 <b>Items:</b>\n${itemDetails}\n\n` +
      `💳 <b>Total:</b> GHC ${total.toFixed(2)}\n` +
      `🔢 <b>Ref:</b> <code>${reference}</code>`;

    sendTelegramNotification(telegramMsg);

    // If Supabase is configured, save to DB
    if (SUPABASE_URL !== 'https://your-project.supabase.co') {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify(orderData),
      });
      if (!response.ok) throw new Error('Failed to save order');
    }

    // Always save locally as backup
    const orders = JSON.parse(localStorage.getItem('gn_orders') || '[]');
    orders.push(orderData);
    localStorage.setItem('gn_orders', JSON.stringify(orders));

    clearCart();
    closeCart();
    showToast('🎉 Order placed successfully! Thank you!', 'success');

    // GA Tracking
    trackEvent('purchase', {
      transaction_id: reference,
      value: total,
      currency: 'GHS',
      items: cart.map(i => ({
        item_id: i.id,
        item_name: i.name,
        price: i.price,
        quantity: i.qty
      }))
    });

    // Redirect to confirmation
    setTimeout(() => {
      window.location.href = `../success/index.html?ref=${reference}`;
    }, 2000);

  } catch (err) {
    console.error('Order save error:', err);
    showToast('Payment received but order save failed. Please contact us.', 'error');
  }
}

// ---- SUPABASE NEWSLETTER SIGNUP ----
async function subscribeToNewsletter(email) {
  try {
    if (SUPABASE_URL !== 'https://your-project.supabase.co') {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/subscribers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        // If error code is 409, it means the email is already subscribed
        if (response.status === 409) {
          showToast('You are already subscribed! 💚', 'info');
          return true;
        }
        throw new Error('Subscription failed');
      }
    }

    sendTelegramNotification(`📧 <b>New Newsletter Subscriber!</b>\n\nEmail: ${email}`);
    showToast(`🎉 Welcome! You're now subscribed to our exclusive updates.`, 'success');

    // GA Tracking
    trackEvent('generate_lead', {
      method: 'newsletter',
      value: email
    });

    return true;
  } catch (err) {
    console.error('Newsletter error:', err);
    showToast('Something went wrong. Please try again.', 'error');
    return false;
  }
}

// ---- SUPABASE CONTACT MESSAGES (FRESH START) ----
async function sendMessage(formData) {
  try {
    if (SUPABASE_URL === 'https://your-project.supabase.co') return false;

    const response = await fetch(`${SUPABASE_URL}/rest/v1/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({
        full_name: formData.name,
        email_address: formData.email,
        phone_number: formData.phone,
        subject_topic: formData.subject,
        message_content: formData.message
      }),
    });

    if (!response.ok) throw new Error('Network response was not ok');

    // Send Telegram Alert
    const telegramMsg = `📩 <b>New Contact Message</b>\n\n` +
      `👤 <b>From:</b> ${formData.name}\n` +
      `📞 <b>Phone:</b> ${formData.phone}\n` +
      `📧 <b>Email:</b> ${formData.email}\n` +
      `🏷️ <b>Subject:</b> ${formData.subject}\n\n` +
      `💬 <b>Message:</b>\n${formData.message}`;

    sendTelegramNotification(telegramMsg);

    showToast('🚀 Message sent! We will get back to you soon.', 'success');

    // GA Tracking
    trackEvent('contact', {
      content_type: formData.subject,
      contact_method: 'form'
    });

    return true;
  } catch (err) {
    console.error('Message Error:', err);
    showToast('Something went wrong. Please try WhatsApp.', 'error');
    return false;
  }
}

// ---- TOAST NOTIFICATIONS ----
function showToast(message, type = 'default') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const icons = { success: '✓', error: '✕', default: 'ℹ' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span class="toast-icon">${icons[type] || icons.default}</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ---- SCROLL REVEAL ----
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
}

// ---- NAV SCROLL EFFECT ----
function initNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // Hamburger
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  // Create overlay if it doesn't exist
  if (!document.querySelector('.mobile-nav-overlay')) {
    const overlay = document.createElement('div');
    overlay.className = 'mobile-nav-overlay';
    document.body.appendChild(overlay);

    overlay.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('open');
      overlay.classList.remove('active');
    });
  }

  const overlay = document.querySelector('.mobile-nav-overlay');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('open');
      overlay.classList.toggle('active');
    });
  }

  // Active link
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(link => {
    const href = link.getAttribute('href') || '';
    // Handle both relative and absolute paths for active state
    if (currentPath === '/' || currentPath === '/index.html' || href === 'index.html' || href === '../index.html') {
      link.classList.add('active');
    } else if (href !== '#' && currentPath.includes(href.replace('../', ''))) {
      link.classList.add('active');
    }
  });
}

// ---- CART SIDEBAR INIT ----
function initCartSidebar() {
  document.getElementById('cart-overlay')?.addEventListener('click', closeCart);
  document.getElementById('cart-close-btn')?.addEventListener('click', closeCart);
  document.querySelectorAll('[data-open-cart]').forEach(btn => {
    btn.addEventListener('click', openCart);
  });
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initCartSidebar();
  initScrollReveal();
  updateCartUI();
});
