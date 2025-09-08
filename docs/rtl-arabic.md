# Arabic & RTL Setup

1. In Shopify Admin, go to **Settings → Languages** and add **Arabic**. Publish it to enable `/ar` URLs.
2. Verify Markets or subfolders generate locale-aware URLs automatically.

## Test Plan
- Desktop & mobile: Home, Collection, Product, Search, Cart.
- Check carousels and galleries swipe direction in RTL.
- Verify breadcrumbs, pagination arrows, and accordions render correctly.
- Validate locale-aware URLs and `hreflang` output.
