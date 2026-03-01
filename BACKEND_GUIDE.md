# 🛠️ Gee's Naturals — Technical & Backend Documentation

This document provides a complete technical overview of how the Gee's Naturals website was built, the context behind the design, and the full backend/database/bot configuration.

---

## 🏛️ 1. Project Context & Philosophy
The goal was to create a **premium, Ghanaian-focused e-commerce experience** for a natural juice brand.
*   **Aesthetics**: Minimalist, high-end design using a "Healthy Green" palette (`#1b4332`, `#2d6a4f`).
*   **User Experience**: Fast, mobile-first, and friction-less. We removed complex account sign-ups and replaced them with a "Single-Modal Checkout" to maximize sales.
*   **Localization**: Prices are in `GHC`, names used in demos are local (e.g., Kwaku, Sarah), and Google Maps is integrated for the Accra location.

---

## 🏗️ 2. Frontend Architecture
The site uses a **Vanilla Lightweight Stack**:
*   **Structure**: Semantic HTML5 across multi-page folders (home, shop, product, contact, success).
*   **Logic (`app.js`)**: A centralized "Core Engine" that manages:
    *   State (Cart items, quantities, and persistent storage via `localStorage`).
    *   Dynamic Rendering (Product grids, featured items, and category filtering).
    *   Third-party APIs (Paystack, Supabase, Telegram).
*   **Styling (`styles.css`, `home.css`)**: Custom vanilla CSS with CSS Variables for easy brand color updates.

---

## 🗄️ 3. Backend Setup (Supabase)
We used **Supabase** as a "BaaS" (Backend as a Service). It handles all form data and order storage via REST API calls.

### A. Table Schemas
You must run these three scripts in the **Supabase SQL Editor** to initialize your database:

```sql
/* 1. CONTACT MESSAGES */
create table messages (
  id bigint primary key generated always as identity,
  full_name text,
  email_address text,
  phone_number text,
  subject_topic text,
  message_content text,
  created_at timestamptz default now()
);

/* 2. NEWSLETTER SUBSCRIBERS */
create table subscribers (
  id bigint primary key generated always as identity,
  email text unique,
  created_at timestamptz default now()
);

/* 3. CUSTOMER ORDERS */
create table orders (
  id bigint primary key generated always as identity,
  reference text unique,         -- Paystack Transaction ID
  customer_name text,
  email text,
  phone text,
  delivery_address text,
  total numeric,
  items jsonb,                   -- Stores the exact list of juice bottles bought
  status text default 'paid',
  created_at timestamptz default now()
);
```

### B. Security (Row Level Security)
To allow the website to "Write" to these tables without requiring a login, we enabled **RLS Policies**:
1.  Go to **Authentication > Policies**.
2.  Enable RLS on all 3 tables.
3.  Add an **"Insert" policy** for `anon` roles with `with check (true)`. This allows customers to save orders and send messages.

---

## 💳 4. Payment Gateway (Paystack)
Integrated using the **Paystack Inline JS SDK**.
*   **Currency**: Fixed to `GHS`.
*   **Transaction Logic**: The site calculates the total in Cedis, converts it to Pesewas (`total * 100`) for the Paystack API, and verifies the transaction before saving the order to Supabase.
*   **Metadata**: We pass the delivery address and phone number into Paystack's `metadata` field so they appear in your Paystack Business Dashboard.

---

## 🤖 5. Telegram Bot (Secure Notification Engine)
We use a **Vercel Serverless Function** to keep your credentials hidden from the public.

### A. How it works:
1. The website sends a message to `/api/notify`.
2. The serverless function (running in the cloud) picks up your **Bot Token** and **Chat ID** from the **Environment Variables**.
3. It securely forwards the message to Telegram.

### B. Configuration (Vercel Dashboard):
To make notifications work, you must add these two variables in **Vercel -> Settings -> Environment Variables**:
*   `TELEGRAM_BOT_TOKEN`: The token you got from @BotFather.
*   `TELEGRAM_CHAT_ID`: Your personal Chat ID from @userinfobot.

**NEVER** put these values directly in `app.js` or they will be flagged by security scanners like GitGuardian.

---

## 🚀 6. Future Expansion
*   **Inventory**: Currently `inStock: true` is hard-coded. For a bigger business, you can link this to a Supabase `stock` column.
*   **Live Mode**: To accept real money, change `pk_test_...` to `pk_live_...` in the `PAYSTACK_PUBLIC_KEY` variable in `app.js`.

---
**Documentation created for Gee's Naturals.**
*Date: 2026-02-20*
