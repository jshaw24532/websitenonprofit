# On 3rd Outreach — Static HTML Site

Complete static HTML clone with all assets organized under `assets/`.

## Folder structure

```
html project/
├── index.html
├── about/
├── mission/
├── programs/
├── impact/
├── contact/
├── volunteer/
├── terms/
├── privacy/
├── government/          (10 consortium sub-pages)
├── donate/              (marketplace + 25 orgs × donation methods)
└── assets/
    ├── css/
    │   └── main.css     — Site stylesheet
    ├── js/
    │   ├── webpack-runtime.js
    │   ├── vendor-react.js
    │   ├── vendor-next.js
    │   ├── framework.js
    │   ├── main-app.js
    │   ├── layout.js
    │   ├── page-home.js (page-shared.js)
    │   ├── page-donate-finder.js
    │   ├── page-donate-cash.js
    │   ├── page-donate-crypto.js
    │   └── …            (28 JS bundles total)
    ├── images/          — SVG/JPG images
    ├── videos/          — Hero background video
    └── fonts/           — Web fonts (when present)
```

## Open locally

```powershell
cd "html project"
npx serve .
```

Then open http://localhost:3000 (or the port shown).

## Reorganize assets

If you replace HTML files manually, run:

```powershell
node reorganize-assets.mjs
```

This moves `_next/`, `images/`, and `videos/` into `assets/` with clean file names and updates all references.

## Notes

- Serve via HTTP (not `file://`) so JavaScript and routing work correctly.
- Donation forms show success UI; connect a payment backend for production.
