# Design Tokens

Design tokens multi-brand de Wedeed pour Tailwind CSS 4.

## Installation

```bash
bun install wedeedapp-design-tokens --save-dev
```

Si votre projet utilise Laravel Sail :

```bash
sail bun install wedeedapp-design-tokens --save-dev
```

## Utilisation avec Tailwind CSS 4

Dans votre fichier CSS principal, importez le thème de votre marque :

```css
@import "tailwindcss";
@import "wedeedapp-design-tokens/build/{votre-marque}/{votre-marque}.css";
@import "wedeedapp-design-tokens/build/{votre-marque}/{votre-marque}-tailwind-theme.css";
```

Le fichier `*-tailwind-theme.css` contient le mapping de toutes vos variables CSS vers Tailwind.
