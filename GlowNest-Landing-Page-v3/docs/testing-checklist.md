# Manual Testing Checklist
Mark each item after testing in a real browser.
## Navigation
- [ ] All nav and footer anchors scroll to the right section below the sticky header
- [ ] Active link highlights while scrolling
## Mobile menu (<= 860px)
- [ ] Hamburger opens/closes smoothly; icon becomes X; aria-expanded updates
- [ ] Menu closes after choosing a link and on Escape
## Responsive layout (320, 375, 768, 1024, 1440 px)
- [ ] No horizontal scroll, clipped text or overlaps
- [ ] Hero stacks with image first on mobile
## Product cards
- [ ] 4 columns desktop, 2 tablet, 1 mobile; equal heights; prices show in ₹
## Add-to-bag
- [ ] Add shows toast and updates count; repeat add increases quantity
- [ ] Bag opens/closes (button, overlay, Escape); remove works; subtotal correct; empty state shows
## Local storage
- [ ] Bag persists on refresh
- [ ] In console run `localStorage.setItem('glownest_bag_v1','oops')` then refresh: page loads with empty bag
## Newsletter
- [ ] Empty and invalid emails show errors; valid email shows demo success message
## FAQ
- [ ] Opens/closes with mouse, touch, Enter and Space; aria-expanded toggles
## Scroll animations
- [ ] Sections fade in once; with OS "reduce motion" on, content appears immediately
- [ ] With JavaScript disabled, all content is visible
## Image loading
- [ ] All images load; block images in DevTools to confirm the colored fallback
## Keyboard accessibility
- [ ] Skip link works; focus ring visible everywhere; Tab stays inside the open bag; back-to-top reachable
