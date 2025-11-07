# Design Tokens

Système de design tokens multi-brand généré avec Style Dictionary.

## 📦 Installation

```bash
npm install
```

Le build se fait automatiquement après l'installation. Un hook git est également installé pour rebuilder automatiquement après chaque `git pull`.

**💡 Recommandation** : Utilisez GitHub Actions dans vos projets pour mettre à jour automatiquement les tokens (voir section "Mettre à jour les tokens").

Les fichiers sont générés dans `build/{brand}/`.

## 🎨 Utilisation

### 1. Importer vos tokens

Éditez manuellement le fichier `tokens/all.json` pour y ajouter vos tokens :

```json
{
  "colors": {
    "certIvote": {
      "neutral50": "#fafafa",
      "primary500": "#ff867d"
    },
    "solucePay": {
      "neutral50": "#fafafa",
      "primary500": "#46bab9"
    }
  },
  "theme": {
    "value": {
      "bg": "#ffffff",
      "fg": "#000000",
      "primary": "#ff867d"
    }
  }
}
```

### 2. Générer les fichiers

```bash
npm run build
```

Cela génère automatiquement :

- Les fichiers CSS (`{brand}.css`) avec les variables CSS
- Les fichiers JSON (`{brand}.json`)
- Les fichiers Tailwind 4 (`{brand}-tailwind-theme.css`) avec la configuration `@theme` complète

Tous les fichiers sont dans `build/{brand}/` pour chaque brand.

## 🚀 Intégration dans un projet

### Ajouter le repo comme submodule

```bash
# Dans votre projet
git submodule add https://github.com/votre-org/design-tokens.git design-tokens
git submodule update --init --recursive
cd design-tokens
npm install
```

Le build se fait automatiquement après `npm install` et le hook git est installé.

### Mettre à jour les tokens automatiquement avec GitHub Actions

#### Option 1 : Workflow automatique dans vos projets (Recommandé)

Créez un fichier `.github/workflows/update-design-tokens.yml` dans votre projet :

```yaml
name: Update Design Tokens

on:
  schedule:
    # Vérifie les mises à jour tous les jours à 6h
    - cron: '0 6 * * *'
  workflow_dispatch: # Permet de déclencher manuellement

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          submodules: recursive
          token: ${{ secrets.GITHUB_TOKEN }}

      - name: Update submodule
        run: |
          git submodule update --remote --merge design-tokens
          cd design-tokens
          npm install
          npm run build

      - name: Commit changes
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add design-tokens/
          git diff --staged --quiet || git commit -m "chore: update design tokens"
          git push
```

Ce workflow :

- Se déclenche automatiquement tous les jours à 6h
- Peut être déclenché manuellement depuis l'onglet Actions de GitHub
- Met à jour le submodule, rebuild les tokens et commit automatiquement

#### Option 2 : Mise à jour manuelle (si nécessaire)

```bash
cd design-tokens
git pull origin main
```

Le build se fait automatiquement après le `git pull` grâce au hook git installé.

## 🎯 Intégration avec Tailwind CSS 4

### Dans votre fichier CSS principal

Dans votre fichier CSS principal (ex: `app.css`, `globals.css`, ou `main.css`) :

```css
@import "tailwindcss";
@import "./design-tokens/build/certivote/certivote.css";
@import "./design-tokens/build/certivote/certivote-tailwind-theme.css";
```

C'est tout ! Le fichier `certivote-tailwind-theme.css` contient déjà :

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

## 💡 Exemple complet

Voici un exemple de fichier CSS complet pour un projet avec Tailwind 4 :

```css
/* app.css */
@import "tailwindcss";
@import "./design-tokens/build/certivote/certivote.css";
@import "./design-tokens/build/certivote/certivote-tailwind-theme.css";
```

Une fois importé, toutes vos couleurs sont disponibles en classes Tailwind et les couleurs par défaut sont désactivées. Tout est automatique !
