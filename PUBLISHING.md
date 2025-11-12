# Guide de publication

## 🔄 Workflow automatique

À chaque push sur `main`, GitHub Actions :
- ✅ Split les tokens par marque
- ✅ Build les fichiers CSS et JSON
- ✅ Commit et push les fichiers générés

## 📝 Mettre à jour les tokens

### 1. Modifier `tokens/all.json`

Éditez le fichier `tokens/all.json` pour ajouter ou modifier vos tokens.

### 2. Commit et push

```bash
git add tokens/all.json
git commit -m "feat: mise à jour des tokens"
git push
```

GitHub Actions va automatiquement builder les fichiers et les commiter.

## 📦 Publier sur NPM

Une fois que vos modifications sont prêtes à être publiées :

### 1. Récupérer les fichiers buildés

```bash
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
