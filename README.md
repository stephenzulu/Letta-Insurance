# Letta Insurance Brokers Limited - Website

## File Structure
```
letta-website/
├── index.html              # Home page (hero, about preview, services preview)
├── about.html              # About (story, vision, mission, values, SWOT)
├── services.html           # Services (6 cards + approach)
├── team.html               # Leadership (CEO, directors, org chart)
├── contact.html            # Contact (form, map, banking details)
├── css/
│   └── styles.css          # All shared styles
├── js/
│   ├── components.js       # ★ SHARED HEADER/FOOTER/NAV - injected into all pages
│   └── main.js             # Theme toggle, scroll, EmailJS, animations
└── img/
    ├── logo.jpg            # Original logo
    ├── logo-hd.png         # 8x upscaled logo
    └── logo-white.png      # Transparent background logo
```

## How It Works

### Shared Components (components.js)
The navbar, footer, preloader, social sidebar, and back-to-top button are defined
ONCE in `js/components.js` and automatically injected into every page.

**To use:** Just include these 3 scripts at the bottom of every page:
```html
<script src="js/components.js"></script>
<script src="js/main.js"></script>
```

**To edit the navbar or footer:** Edit `js/components.js` — changes apply everywhere.

### Active Nav Link
The current page is auto-detected and highlighted in the navbar.

## Email Setup (EmailJS - FREE)

1. Sign up at https://www.emailjs.com (free: 200 emails/month)
2. Add Email Service → note `SERVICE_ID`
3. Create Template with: `{{from_name}}`, `{{from_email}}`, `{{phone}}`, `{{service}}`, `{{message}}`
4. Note `TEMPLATE_ID` and `PUBLIC_KEY`
5. Edit `js/main.js` and replace the 3 placeholder values

Without EmailJS configured, the form opens the user's default email client as fallback.

## Deployment
Upload the entire `letta-website/` folder to any web host.
