# Design Tokens

Système de design tokens multi-brand extrait depuis Figma et buildé avec Style Dictionary.

## 🎨 Fonctionnalités

- ✅ Extraction automatique depuis Figma (Enterprise) ou import manuel
- ✅ Support multi-brand (certivote, solucepay)
- ✅ Build automatique avec Style Dictionary
- ✅ Génération de CSS variables et JSON
- ✅ CI/CD avec GitHub Actions
- ✅ Format de tokens optimisé (sans préfixes, tirets préservés)

## 📦 Formats générés

Pour chaque brand, les fichiers suivants sont générés dans `build/{brand}/` :

- **`{brand}.css`** : Variables CSS (`--neutral-50`, `--primary`, etc.)
- **`{brand}.json`** : JSON plat pour intégration Laravel

## 🚀 Utilisation

### Méthode 1 : Git Submodule (Recommandé)

Ajoutez ce repo comme submodule dans votre projet Laravel :

```bash
# Dans votre projet Laravel
git submodule add git@github.com:WedeedApp/design-tokens.git resources/design-tokens
git submodule update --init --recursive
```

Puis, dans votre `app.css` ou `vite.config.js` :

```css
/* resources/css/app.css */
@import '../design-tokens/build/certivote/certivote.css';
```

Ou avec Vite :

```js
// vite.config.js
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.js',
            ],
        }),
    ],
    resolve: {
        alias: {
            '@design-tokens': path.resolve(__dirname, 'resources/design-tokens/build'),
        },
    },
});
```

### Méthode 2 : GitHub Actions (CI/CD)

Créez un workflow GitHub Actions dans vos projets Laravel pour télécharger automatiquement les tokens :

```yaml
# .github/workflows/sync-design-tokens.yml
name: Sync Design Tokens

on:
  workflow_dispatch:
  schedule:
    # Vérifie les mises à jour tous les jours à 6h
    - cron: '0 6 * * *'

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Download design tokens
        run: |
          mkdir -p resources/design-tokens/build
          curl -H "Authorization: token ${{ secrets.GITHUB_TOKEN }}" \
            -H "Accept: application/vnd.github.v3.raw" \
            -L https://api.github.com/repos/WedeedApp/design-tokens/contents/build/certivote/certivote.css \
            -o resources/design-tokens/build/certivote.css

          curl -H "Authorization: token ${{ secrets.GITHUB_TOKEN }}" \
            -H "Accept: application/vnd.github.v3.raw" \
            -L https://api.github.com/repos/WedeedApp/design-tokens/contents/build/certivote/certivote.json \
            -o resources/design-tokens/build/certivote.json

      - name: Commit changes
        run: |
          git config user.name "github-actions"
          git config user.email "actions@github.com"
          git add resources/design-tokens/
          git diff --staged --quiet || git commit -m "chore: update design tokens"
          git push
```

### Méthode 3 : Téléchargement manuel

Téléchargez les fichiers depuis GitHub et placez-les dans votre projet :

```bash
# Télécharger les fichiers CSS et JSON
curl -L https://raw.githubusercontent.com/WedeedApp/design-tokens/main/build/certivote/certivote.css \
  -o resources/css/design-tokens.css

curl -L https://raw.githubusercontent.com/WedeedApp/design-tokens/main/build/certivote/certivote.json \
  -o resources/json/design-tokens.json
```

## 💻 Utilisation dans Laravel

### CSS Variables

```css
/* resources/css/app.css */
@import './design-tokens.css';

.my-component {
  background-color: var(--primary);
  color: var(--primary-fg);
  border: 1px solid var(--border);
}
```

### JSON (pour Blade, JavaScript, etc.)

```php
// app/Helpers/DesignTokens.php
<?php

class DesignTokens
{
    public static function get(string $brand = 'certivote'): array
    {
        $path = resource_path("design-tokens/build/{$brand}/{$brand}.json");

        if (!file_exists($path)) {
            throw new \Exception("Design tokens not found for brand: {$brand}");
        }

        return json_decode(file_get_contents($path), true);
    }

    public static function getValue(string $key, string $brand = 'certivote'): ?string
    {
        $tokens = self::get($brand);
        return $tokens[$key] ?? null;
    }
}
```

```blade
{{-- resources/views/components/button.blade.php --}}
@php
    $primary = \App\Helpers\DesignTokens::getValue('primary');
@endphp

<button style="background-color: {{ $primary }}">
    {{ $slot }}
</button>
```

```js
// resources/js/app.js
import tokens from '@/design-tokens/certivote.json';

console.log(tokens['primary']); // #ff867d
```

## 🔧 Développement

### Installation

```bash
npm install
```

### Extraction depuis Figma

```bash
# Nécessite un token Figma avec scope file_variables:read (Enterprise uniquement)
export FIGMA_TOKEN="your-token"
export FIGMA_FILE_ID="your-file-id"
npm run fetch
```

### Build

```bash
npm run build
```

Cela va :
1. Séparer les tokens par brand depuis `tokens/all.json`
2. Générer les fichiers CSS et JSON dans `build/{brand}/`

### Structure des tokens

Les tokens sont définis dans `tokens/all.json` avec la structure suivante :

```json
{
  "colors": {
    "cert-ivote": {
      "neutral50": "#fafafa",
      "primary": "#ff867d"
    },
    "soluce-pay": {
      "neutral50": "#fafafa",
      "primary": "#ff867d"
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

Le script `split-tokens.js` transforme automatiquement cette structure en fichiers séparés par brand.

## 📝 Notes

- Les préfixes `color-`, `theme-`, `brand-`, et `feedback-` sont automatiquement retirés
- Les tirets dans les noms de tokens sont préservés (`neutral-50` au lieu de `neutral50`)
- Le timestamp dans les fichiers générés utilise le fuseau horaire Europe/Paris (CET)

## 🔐 Secrets GitHub

Pour activer l'extraction automatique depuis Figma, configurez ces secrets dans GitHub :

- `FIGMA_TOKEN` : Token Figma avec scope `file_variables:read` (Enterprise uniquement)
- `FIGMA_FILE_ID` : ID du fichier Figma

Pour les plans Pro, exportez manuellement les tokens via un plugin Figma et placez-les dans `tokens/all.json`.
