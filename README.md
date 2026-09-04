# KAZE STORE

A minimal, mobile-friendly online store for shoes, watches, and
accessories.

## Features

-   Product grid with category filters
-   Product search
-   Shopping cart
-   Customer checkout form
-   One-click WhatsApp ordering with complete order details
-   Responsive mobile and desktop design
-   No database required for the basic WhatsApp ordering workflow

## Run Locally

Make sure Node.js is installed, then run:

``` bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal (for example,
`http://localhost:5173`).

## Change the WhatsApp Number

Open `src/main.jsx` and find:

``` js
const WHATSAPP_NUMBER = "919876543210";
```

Replace it with your own full WhatsApp number, including the country
code, without `+`, spaces, or dashes.

Example:

``` js
const WHATSAPP_NUMBER = "919876543210";
```

## Add Your Own Products

Edit the `products` array in `src/main.jsx`.

You can change the product name, price, category, description, image,
and product ID.

For production, replace the demo Unsplash image URLs with your own
product images.

## Build for Production

``` bash
npm run build
```

The production files will be generated in the `dist/` folder.

To preview the production build locally:

``` bash
npm run preview
```

## Deploy to Vercel

1.  Push this project to GitHub.
2.  Import the repository into Vercel.
3.  Use the default Vite settings:
    -   Build command: `npm run build`
    -   Output directory: `dist`
4.  Click **Deploy**.

## License

This project is for personal and commercial use.