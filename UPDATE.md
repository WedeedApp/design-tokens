# Mettre à jour les tokens

## 📝 Modifier les tokens

```bash
# 1. Modifier tokens/all.json
# 2. Commit et push
git add tokens/all.json && git commit -m "feat: mise à jour des tokens" && git push
```

⚙️ **GitHub Actions va automatiquement builder et commiter les fichiers générés.**

## 📦 Publier sur NPM

```bash
git pull && npm version patch && npm publish --access public && git push && git push --tags
```

✅ **C'est tout !**
