# Design Tokens

Système de design tokens multi-brand (Certivote, SolucePay) généré depuis Figma avec Style Dictionary.

## 📦 Installation

```bash
npm install wedeedapp-design-tokens
```

## 🎯 Intégration avec Tailwind CSS 4

### Dans votre fichier CSS principal

Dans votre fichier CSS principal (ex: `app.css`, `globals.css`, ou `main.css`) :

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

C'est tout ! Le fichier `*-tailwind-theme.css` contient déjà :

- La désactivation des couleurs par défaut de Tailwind (`--color-*: initial;`)
- Le mapping de toutes vos variables CSS vers Tailwind
- Toutes vos couleurs disponibles en classes Tailwind

Tout est généré automatiquement lors du build, vous n'avez rien à configurer manuellement.

### Utilisation dans vos composants

Une fois configuré, vous pouvez utiliser vos tokens directement dans vos classes Tailwind :

```jsx
// Utiliser vos tokens via Tailwind
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

## 📝 Structure des tokens

Les tokens sont organisés dans `tokens/all.json` :

- **`colors`** : Couleurs par brand (certIvote, solucePay, etc.)
- **`theme`** : Variables de thème partagées (bg, fg, border, etc.)

Le script `split-tokens.js` sépare automatiquement les tokens par brand avant la génération.

## 🔧 Scripts disponibles

- `npm run build` : Génère les fichiers CSS, JSON et la configuration Tailwind 4 (@theme) pour tous les brands
- `npm run split` : Sépare uniquement les tokens par brand (sans build)
- `npm run install-hooks` : Réinstalle le hook git manuellement (si nécessaire)

## 📦 Mettre à jour les tokens

```bash
npm update wedeedapp-design-tokens
```
