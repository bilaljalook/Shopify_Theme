# Heritage Shopify Theme

Heritage is a Shopify Liquid theme (version 2.0.3) built with modern JavaScript ES modules and comprehensive Liquid templating. The theme follows standard Shopify theme conventions and uses the Shopify CLI for development workflows.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Initial Setup
- Install Shopify CLI: `npm install -g @shopify/cli @shopify/theme` -- takes 40 seconds to complete. NEVER CANCEL. Set timeout to 60+ minutes.
- Install theme-check gem: `sudo gem install theme-check` -- takes 40 seconds including native extensions. NEVER CANCEL. Set timeout to 60+ minutes.

### Theme Validation and Linting
- **Primary validation**: `shopify theme check --path=.` -- takes 20 seconds. NEVER CANCEL. Set timeout to 60+ minutes.
- **Faster validation**: `theme-check .` -- takes 4 seconds. NEVER CANCEL. Set timeout to 30+ minutes.
- Both commands identify similar issues; use `theme-check .` for faster iteration during development.
- The theme currently has 330 offenses detected (theme-check) or 175 offenses (Shopify CLI), mostly style suggestions and some undefined object errors in blocks.

### Build and Package
- **Package theme**: `shopify theme package` -- takes 3 seconds. NEVER CANCEL. Set timeout to 30+ minutes.
- Creates a `Heritage-2.0.3.zip` file containing the complete theme.
- DO NOT commit theme package files to the repository.

### Development Server
- **Local development**: `shopify theme dev` requires connection to a live Shopify store.
- You CANNOT run the theme locally without store credentials.
- Use `--no-color --host=127.0.0.1 --port=9292` for consistent output in CI environments.
- To work with themes, you must connect to a Shopify development store.

## Validation

### Manual Testing Requirements
- ALWAYS validate theme packaging by running `shopify theme package` after making changes.
- ALWAYS run `theme-check .` before committing changes to ensure no new validation errors are introduced.
- Test Liquid syntax changes by running theme validation commands.
- For JavaScript changes, verify ES module imports work correctly with the theme's import map system.

### End-to-End Scenarios
- **JavaScript Module Testing**: After adding new JavaScript files to `/assets/`, ensure they can be packaged successfully with `shopify theme package`.
- **Import Map Validation**: When adding new JavaScript modules, verify the import paths match the import map in `snippets/scripts.liquid`.
- **Liquid Template Testing**: When modifying Liquid templates, ensure data objects exist and are properly referenced by running theme validation.
- **Asset Integration**: Test that new assets (CSS, JS, images) are properly included in the theme package.

## Common Tasks

### Repository Structure
```
.
├── assets/           # JavaScript, CSS, images, icons, and other static assets
├── blocks/           # Reusable theme blocks for sections  
├── config/           # Theme settings schema and data
├── layout/           # Theme layout templates
├── locales/          # Translation files for multiple languages
├── sections/         # Theme sections
├── snippets/         # Reusable Liquid code snippets
└── templates/        # Page templates (JSON template files)
```

### Key Files and Locations
- `config/settings_schema.json` - Theme configuration and settings
- `assets/jsconfig.json` - JavaScript/TypeScript configuration (ES2020 target)
- `snippets/scripts.liquid` - Import map for ES modules and script loading
- `layout/theme.liquid` - Main theme layout file
- `assets/critical.js` - Core JavaScript loaded on every page

### JavaScript Architecture
- Uses ES modules with import maps defined in `snippets/scripts.liquid`
- TypeScript definitions available in `assets/global.d.ts`
- Component-based architecture with base classes in `assets/component.js`
- Import paths use `@theme/*` aliases (e.g., `@theme/component`, `@theme/utilities`)

### Common Development Patterns
- Always check `snippets/scripts.liquid` when adding new JavaScript modules
- Liquid templates use `{% content_for 'blocks' %}` pattern for section blocks
- Custom web components extend from `Component` base class
- CSS uses custom properties extensively for theming

### Frequent Commands Output Reference

#### Repository Root Files
```bash
ls -la /
assets/
blocks/
config/
layout/
locales/
sections/
snippets/
templates/
```

#### Theme Validation Sample
```bash
theme-check .
382 files inspected, 330 offenses detected, 57 offenses auto-correctable
```

#### Assets Directory Structure
```bash
ls assets/ | head -10
accordion-custom.js
account-login-actions.js
anchored-popover.js
announcement-bar.js
auto-close-details.js
base.css
blog-posts-list.js
cart-discount.js
cart-drawer.js
cart-icon.js
```

### Theme-Specific Guidelines
- DO NOT attempt to run `npm install` or `yarn install` - this is not a Node.js project
- DO NOT try to build JavaScript files - they are used directly by Shopify
- Always use Shopify CLI commands for theme operations
- When working with Liquid templates, be aware of context variables like `section`, `block`, and `product`
- CSS is included directly; there is no Sass compilation step
- Icon files are SVG assets in the `/assets/` directory with `icon-` prefix

### Error Resolution
- "Unknown object" errors in theme-check often indicate missing context (like `closest.product` in blocks)
- JavaScript import errors usually point to incorrect paths in the import map
- Missing assets errors indicate files need to be added to the `/assets/` directory
- Liquid syntax errors are caught by both `shopify theme check` and `theme-check`

### Performance Considerations
- The theme uses `fetchpriority="low"` for non-critical scripts
- Critical JavaScript is loaded with `blocking="render"` 
- Images support lazy loading with `loading="lazy"` attributes
- CSS custom properties are used extensively for runtime theming

Remember: This is a Shopify theme, not a traditional web application. Work within Shopify's theme development paradigm using their CLI tools and Liquid templating system.