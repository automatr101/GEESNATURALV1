# 🥤 Gee's Naturals — Business Documentation

Welcome to the official documentation for the Gee's Naturals e-commerce platform. This document outlines how the website works, how to manage it, and how to handle customer orders.

---

## 🚀 1. Technology Stack
The website is built using modern, fast, and secure web technologies:
*   **Frontend**: HTML5, CSS3 (Vanilla), and JavaScript (ES6+).
*   **Database**: [Supabase](https://supabase.com/) (Real-time database for messages, subscribers, and orders).
*   **Payments**: [Paystack](https://paystack.com/) (Handles all GHC transactions).
*   **Notifications**: [Telegram Bot API](https://core.telegram.org/bots/api) (Instant alerts on your phone).
*   **Icons & Fonts**: Font Awesome & Google Fonts (Outfit).

---

## 📲 2. The Order Workflow
When a customer visits the store, this is the automated process:

1.  **Selection**: Customer adds juices and sizes (250ml, 350ml, 500ml) to their cart.
2.  **Checkout**: A modal appears asking for:
    *   Full Name
    *   Email
    *   Phone Number
    *   Delivery Address/Landmark
3.  **Payment**: The customer pays via Paystack (Mobile Money or Card).
4.  **Confirmation**:
    *   Customer is redirected to the `success` page.
    *   **Management** (You) receives an instant Telegram alert with all details.
    *   The order is permanently saved in your **Supabase `orders` table**.

---

## 🤖 3. Telegram Notifications
Your bot is your "Digital Assistant."

We use a **Secure Serverless Function** (`/api/notify.js`) to handle messages.
*   **Vercel Configuration**: 
    You must add `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` to your Vercel Project Settings (Environment Variables).
*   **To Change Recipients**: 
    1. Update the `TELEGRAM_CHAT_ID` variable in Vercel to a new User ID or Group ID.
    2. Redeploy the project on Vercel.

---

## 🛠 4. Management & Maintenance

### 🖼️ Updating Product Images
All images are located in `assets/products/`. 
To change an image:
1. Upload a new `.png` file to that folder.
2. Update the filename in the `PRODUCTS` array at the top of `app.js`.

### 🌟 Managing Testimonials
Testimonials are hard-coded in `home/index.html` for maximum speed.
*   Edit the `testimonial-card` divs inside the `testimonials-marquee-track`. 
*   **Note**: There are two sets (the original and the repeat) to create the infinite scroll effect. Make sure to edit both if you change one!

### 💰 Pricing
Price changes are done in `app.js` inside the `PRODUCTS` array. Each product has three `variants` (0, 1, 2) corresponding to the three sizes. Update the `price` number there.

---

## 🔒 5. Essential SQL (Supabase)
If you ever switch Supabase projects, run these scripts in the SQL Editor to set up your tables:

```sql
-- Create Messages Table
create table messages (
  id bigint primary key generated always as identity,
  full_name text,
  email_address text,
  phone_number text,
  subject_topic text,
  message_content text,
  created_at timestamptz default now()
);

-- Create Orders Table
create table orders (
  id bigint primary key generated always as identity,
  reference text,
  customer_name text,
  email text,
  phone text,
  delivery_address text,
  total numeric,
  items jsonb,
  status text,
  created_at timestamptz default now()
);

-- Create Subscribers Table
create table subscribers (
  id bigint primary key generated always as identity,
  email text unique,
  created_at timestamptz default now()
);
```

---

## 🌍 6. Contact & Support
*   **Website URL**: [geesnaturals.store](https://geesnaturals.store)
*   **Business Email**: ttabariyeng@gmail.com
*   **WhatsApp**: +233 50 395 9285

---
*Documentation generated on 2026-02-20. Keep this file safe (or added to your GitHub) for future reference.*
