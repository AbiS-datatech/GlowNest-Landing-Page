# GlowNest Landing Page

Responsive landing page for **GlowNest**, a fictional premium skincare brand. Built with HTML5, CSS3 and vanilla JavaScript as Task 1 of a Web Development Internship at Auspify Technologies.

> **Disclaimers:** GlowNest is a fictional brand. Product names, prices and images are demo content. The bag is a front-end demonstration with no checkout. Newsletter submission does not contact a server. Testimonials are illustrative sample content, not real reviews. Ingredient text is general education and not a claim about any product.

## Live Demo
[View GlowNest Website](https://dreamy-pastelito-0c223c.netlify.app)

## GitHub Repository
https://github.com/AbiS-datatech/GlowNest-Landing-Page
## Brand concept
Gentle, simple, everyday self-care. Tagline: *Your Skin. Your Glow. Your Way.* Palette: ivory, cream, sage, forest green, olive, taupe, charcoal. Cormorant Garamond (headlines) + DM Sans (body).

## Features
- Announcement bar, sticky responsive nav with hamburger menu
- Hero, story, 4 product cards, brand values, ingredient spotlight, 3-step ritual, sample testimonials, newsletter, FAQ accordion, footer
- Working demo shopping bag (add, remove, quantities, INR subtotal, empty state, localStorage persistence)
- Newsletter validation with accessible messages
- Scroll reveal (IntersectionObserver, reduced-motion aware), back-to-top button, active nav highlighting
- Image-failure fallback (palette-colored block), lazy loading, fixed aspect ratios

## Tech stack
HTML5, CSS3 (Grid, Flexbox, custom properties, clamp()), vanilla JS (ES5-style syntax, no dependencies, no build).

## Folder structure
```
GlowNest-Landing-Page/
  index.html
  README.md
  css/style.css
  js/script.js
  assets/images/   (note on external images)
  assets/icons/    (favicon.svg)
  screenshots/     (add your own)
  docs/project-overview.md
  docs/testing-checklist.md
```

## Run in VS Code
1. Extract the ZIP. 2. In VS Code: File > Open Folder > `GlowNest-Landing-Page`. 3. Open `index.html` in a browser (double-click it, or right-click > Reveal in File Explorer).

## Run with Live Server
Install the **Live Server** extension, right-click `index.html`, choose **Open with Live Server**.

## Browser compatibility
Current Chrome, Edge, Firefox and Safari. Uses `grid-template-rows` transitions (accordion), `Intl.NumberFormat` and `IntersectionObserver`.

## External resources (internet required)
- Google Fonts (Cormorant Garamond, DM Sans). Falls back to Georgia / system sans.
- Unsplash photos via `images.unsplash.com` in `index.html`. If one fails to load, a palette-colored block is shown. Check each image in your browser; replace any broken URL with another Unsplash image or a local file.

## JavaScript functionality
Mobile menu (aria-expanded, closes on link click/Escape), smooth scrolling with sticky-header offset, bag with delegated listeners and localStorage (invalid data ignored), toast confirmations, newsletter validation, FAQ accordion, scroll reveal, back-to-top, image fallback.

## Known limitations
 see `docs/testing-checklist.md`.
- Unsplash image IDs were not verified from the build environment.
- Bag has no checkout by design. Social links are placeholders.

## Test responsive layout
Open DevTools (F12) > device toolbar (Ctrl+Shift+M). Test 320, 375, 768, 1024, 1440 px widths. Confirm no horizontal scroll.

## Upload to GitHub
```
git init
git add .
git commit -m "Add GlowNest landing page"
git branch -M main
git remote add origin https://github.com/<your-username>/GlowNest-Landing-Page.git
git push -u origin main
```
Optional: enable GitHub Pages (Settings > Pages > main branch, root).
