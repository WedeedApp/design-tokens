# Design Tokens

Système de design tokens multi-brand extrait depuis Figma et buildé avec Style Dictionary.

## 🚀 Fonctionnalités

- ✅ Extraction automatique des variables depuis Figma
- ✅ Build multi-brand (certivote, solucepay, foundation)
- ✅ Génération de fichiers CSS et JSON
- ✅ CI/CD automatique via GitHub Actions

## 📋 Prérequis

- Node.js 20+
- npm
- Token d'accès Figma
- ID du fichier Figma

## 🔧 Configuration locale

1. **Cloner le repo**
```bash
git clone git@github.com:WedeedApp/design-tokens.git
cd design-tokens
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**

**Important :** Votre token Figma doit avoir le scope `file_variables:read` pour accéder aux variables.

Pour créer un token avec les bons scopes :
1. Allez sur https://www.figma.com/settings
2. Section "Personal access tokens"
3. Créez un nouveau token avec au minimum le scope `file_variables:read`
4. Copiez le token généré

Créez un fichier `.env` à la racine :
```env
FIGMA_TOKEN=your_figma_token_here
FIGMA_FILE_ID=your_figma_file_id_here
```

4. **Tester l'extraction**
```bash
npm run fetch
```

5. **Builder les tokens**
```bash
npm run build
```

## 📁 Structure du projet

```
design-tokens/
├── tokens/           # Tokens JSON extraits depuis Figma
│   ├── certivote.json
│   ├── foundation.json
│   └── solucepay.json
├── build/            # Fichiers générés (CSS + JSON)
│   ├── certivote/
│   ├── foundation/
│   └── solucepay/
├── fetch-figma-variables.js  # Script d'extraction Figma
├── style-dictionary.config.cjs  # Configuration Style Dictionary
└── .github/workflows/build.yml   # Workflow CI/CD
```

## 🔄 Workflow CI/CD

Le workflow GitHub Actions :
1. Se déclenche à chaque push sur `main` ou manuellement
2. Extrait les variables depuis Figma
3. Build les tokens avec Style Dictionary
4. Commit et push les fichiers générés

## 📦 Utilisation dans vos projets Laravel

### Option 1 : Git Submodule

```bash
cd /path/to/votre-projet-laravel
git submodule add git@github.com:WedeedApp/design-tokens.git vendor/design-tokens
```

### Option 2 : Copier les fichiers

Dans votre `webpack.mix.js` ou `vite.config.js` :

```javascript
const brand = process.env.BRAND || 'certivote';

mix.copy(
  `vendor/design-tokens/build/${brand}/${brand}.css`,
  'public/css/tokens.css'
);
```

### Utilisation dans Blade

```blade
<link rel="stylesheet" href="{{ asset('css/tokens.css') }}">
```

### Utilisation dans Alpine/Livewire

```html
<button style="background-color: var(--color-primary);">
  Bouton
</button>
```

## 🛠️ Scripts disponibles

- `npm run fetch` - Extrait les variables depuis Figma
- `npm run build` - Build les tokens avec Style Dictionary

## 📝 Notes

- Les tokens sont organisés par collections dans Figma
- Chaque collection devient un fichier JSON dans `tokens/`
- Style Dictionary génère les fichiers CSS et JSON dans `build/`
