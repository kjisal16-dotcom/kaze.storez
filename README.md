# KAZE Store

A mobile-first static storefront for KAZE (Vettichira), focused on shoes with watches and accessories.

## Included
- Responsive white/minimal design
- Product category filters
- Search
- Shopping bag with localStorage
- Delivery details form
- Direct WhatsApp order submission
- No COD
- KAZE logo in `assets/kaze-logo.jpg`

## WhatsApp ordering
Orders are sent to **9946375868** through WhatsApp.

## Add your real products
Open `script.js` and edit the `products` array near the top. Each product has:
- `name`
- `category`: `Shoes`, `Watches`, or `Others`
- `price`
- `tag`
- `meta`

You can later add real product image paths and product-specific options.

## GitHub Pages
1. Create a GitHub repository.
2. Upload `index.html`, `style.css`, `script.js`, and the `assets` folder.
3. In GitHub: **Settings → Pages**.
4. Select the main branch and root folder.
5. Save. GitHub will publish the site.

No build step or Node.js is required.
