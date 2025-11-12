# Guide de publication

## 🔄 Workflow automatique

À chaque push sur `main`, GitHub Actions :
- ✅ Split les tokens par marque
- ✅ Build les fichiers CSS et JSON
- ✅ Commit et push les fichiers générés

## 📦 Publication sur NPM (manuelle)

Pour publier une nouvelle version sur NPM :

### 1. Vérifier que tout est à jour

```bash
cd /Users/lnourrisson/www/design-tokens
git pull
```

### 2. Incrémenter la version

```bash
# Version patch (1.0.0 → 1.0.1)
npm version patch

# Version minor (1.0.0 → 1.1.0)
npm version minor

# Version major (1.0.0 → 2.0.0)
npm version major
```

Cette commande va :
- Modifier `package.json`
- Créer un commit automatique
- Créer un tag Git

### 3. Publier sur NPM

```bash
npm publish --access public
```

### 4. Pousser les changements

```bash
git push && git push --tags
```

## ✅ Vérification

Vérifiez que la nouvelle version est disponible :

```bash
npm view wedeed-design-system version
```

Ou sur : https://www.npmjs.com/package/wedeed-design-system

