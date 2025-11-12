# Design Tokens

Design system de Wedeed.

## 📦 Installation

```bash
# npm
npm install wedeed-design-system --save-dev

# bun
bun add wedeed-design-system --save-dev

# sail bun
sail bun add wedeed-design-system --save-dev
```

## 🎯 Intégration avec Tailwind CSS 4

### Dans votre fichier CSS principal

Dans votre fichier CSS principal (ex: `app.css`, `globals.css`, ou `main.css`), importez le thème de votre marque :

```css
@import "tailwindcss";
@import "wedeed-design-system/build/{votre-marque}/{votre-marque}.css";
@import "wedeed-design-system/build/{votre-marque}/{votre-marque}-tailwind-theme.css";
```

Le fichier `*-tailwind-theme.css` contient le mapping de toutes vos variables CSS vers Tailwind.
