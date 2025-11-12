# Guide de publication

## 📦 Publier sur NPM

```bash
git pull

# Version patch (1.0.0 → 1.0.1)
npm version patch

# Version minor (1.0.0 → 1.1.0)
npm version minor

# Version major (1.0.0 → 2.0.0)
npm version major

# Publier sur NPM
npm publish --access public

# Pousser les changements
git push && git push --tags
```

## ✅ Vérification

```bash
npm view wedeed-design-system version
```
