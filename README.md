# Design Tokens

Design tokens multi-brand (Certivote, SolucePay) pour Tailwind CSS 4.

## Installation

```bash
npm install wedeedapp-design-tokens
```

## Utilisation avec Tailwind CSS 4

**Pour Certivote :**

```css
@import "tailwindcss";
@import "wedeedapp-design-tokens/build/certivote/certivote.css";
@import "wedeedapp-design-tokens/build/certivote/certivote-tailwind-theme.css";
```

**Pour SolucePay :**

```css
@import "tailwindcss";
@import "wedeedapp-design-tokens/build/solucepay/solucepay.css";
@import "wedeedapp-design-tokens/build/solucepay/solucepay-tailwind-theme.css";
```

## Dans vos composants

```jsx
<div className="bg-primary-500 text-white">
  <p className="text-neutral-700">Contenu</p>
</div>

<button className="bg-accent-600 hover:bg-accent-700 text-white">
  Bouton
</button>

<div className="border border-border bg-bg text-fg">
  Carte
</div>
```
