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
- Token d'accès Figma (pour l'API REST - **Enterprise uniquement**)
- ID du fichier Figma

## ⚠️ Important : Plan Figma requis

**L'API REST des variables Figma nécessite un plan Enterprise avec un siège complet.**

Si vous êtes sur un plan **Pro**, vous avez deux options :

### Option 1 : Utiliser un plugin Figma (Recommandé pour Pro)

1. Installez le plugin **"Variables to JSON"** ou **"Design Tokens"** dans Figma
2. Exportez manuellement les variables depuis Figma
3. Placez les fichiers JSON dans le dossier `tokens/`
4. Le workflow GitHub Actions buildera automatiquement les fichiers CSS/JSON

### Option 2 : Mettre à niveau vers Enterprise

Contactez l'administrateur de votre organisation pour passer au plan Enterprise.

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

3. **Configurer les variables d'environnement** (Enterprise uniquement)

**Important :** L'accès aux variables via l'API Figma nécessite :
- Un compte avec un **siège complet dans une organisation Enterprise**
- Le scope `file_variables:read` dans votre token

**Note :** Si le scope `file_variables:read` n'apparaît pas dans la liste des scopes disponibles, cela signifie que votre compte n'a pas les permissions nécessaires (plan Enterprise requis).

Pour créer un token avec les bons scopes :
1. Allez sur https://www.figma.com/settings
2. Section "Personal access tokens"
3. Faites défiler la liste complète des scopes
4. Cochez `file_variables:read` (et `file_variables:write` si nécessaire)
5. Si le scope n'apparaît pas, contactez l'administrateur de votre organisation Enterprise
6. Copiez le token généré

Créez un fichier `.env` à la racine :
```env
FIGMA_TOKEN=your_figma_token_here
FIGMA_FILE_ID=your_figma_file_id_here
```

4. **Tester l'extraction** (Enterprise uniquement)
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
├── fetch-figma-variables.js  # Script d'extraction Figma (Enterprise)
├── style-dictionary.config.cjs  # Configuration Style Dictionary
└── .github/workflows/build.yml   # Workflow CI/CD
```

## 🔄 Workflow CI/CD

Le workflow GitHub Actions :
1. Se déclenche à chaque push sur `main` ou manuellement
2. Extrait les variables depuis Figma (si Enterprise) ou utilise les fichiers dans `tokens/`
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

- `npm run fetch` - Extrait les variables depuis Figma (Enterprise uniquement)
- `npm run build` - Build les tokens avec Style Dictionary

## 📝 Notes

- Les tokens sont organisés par collections dans Figma
- Chaque collection devient un fichier JSON dans `tokens/`
- Style Dictionary génère les fichiers CSS et JSON dans `build/`
- Pour les plans Pro, utilisez un plugin Figma pour exporter les variables manuellement
