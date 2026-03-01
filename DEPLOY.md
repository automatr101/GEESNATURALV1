# Deploying Gee's Naturals to Vercel

You can deploy this site in less than 2 minutes using Vercel. Choose one of the methods below.

## Option 1: Drag & Drop (Easiest — No Git required)

1. Go to [vercel.com/new](https://vercel.com/new).
2. Look for the section that says **"Import Third-Party Git Repository"** or just upload directly if available (or use the Vercel CLI).
   - *Better yet:* If you don't use Git, install the **Vercel CLI**:
     1. Open your terminal/command prompt.
     2. Run `npm install -g vercel`
     3. Run `vercel login`
     4. Run `vercel` inside this folder.
   - *Alternative:* Drag this entire `gee-s-naturals` folder into the dashboard on some hosting providers (like Netlify), but for Vercel, using Git is best.

## Option 2: Using GitHub (Recommended)

Since you have the code ready locally:

1. **Initialize Git** (if not done):
   ```bash
   git init
   git add .
   git commit -m "Ready for deploy"
   ```

2. **Create a Repo on GitHub**:
   - Go to [github.com/new](https://github.com/new).
   - Name it `gees-naturals`.
   - Click "Create repository".

3. **Push Code**:
   - Copy the commands shown on GitHub (usually looks like this):
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/gees-naturals.git
   git branch -M main
   git push -u origin main
   ```

4. **Connect to Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new).
   - Click **"Import"** next to your `gees-naturals` repo.
   - Click **Deploy**.

## Post-Deployment Setup

Once live, remember to:
- Add your **Paystack Public Key** in `app.js` (replace the placeholder).
- Set up **Supabase** if you want order tracking (replace URL/Key in `app.js`).
