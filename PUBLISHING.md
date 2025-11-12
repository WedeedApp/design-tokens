# Guide de Publication NPM

## 🚀 Première Publication

### 1. Se connecter à NPM

```bash
npm login
```

Entrez vos identifiants NPM. Si vous n'avez pas de compte, créez-en un sur [npmjs.com](https://www.npmjs.com/).

### 2. Vérifier que tout est prêt

```bash
# Vérifier que le build fonctionne
npm run build

# Vérifier quels fichiers seront publiés
npm pack --dry-run
```

Vous devriez voir uniquement les fichiers du dossier `build/` dans la liste.

### 3. Publier le package

```bash
npm publish
```

✅ Votre package est maintenant disponible sur NPM !

## 🔄 Publier une Mise à Jour

### 1. Mettre à jour les tokens

Éditez `tokens/all.json` avec les nouveaux tokens depuis Figma.

### 2. Mettre à jour la version

Utilisez npm version pour incrémenter automatiquement :

```bash
# Pour un patch (1.0.0 → 1.0.1) - corrections de bugs
npm version patch

# Pour un minor (1.0.0 → 1.1.0) - nouvelles fonctionnalités
npm version minor

# Pour un major (1.0.0 → 2.0.0) - breaking changes
npm version major
```

Ou éditez manuellement le champ `version` dans `package.json`.

### 3. Commit et publier

```bash
# Commit les changements
git add .
git commit -m "chore: version bump and token updates"
git push

# Publier sur NPM
npm publish
```

## 📋 Checklist de Publication

- [ ] Tous les tokens sont à jour dans `tokens/all.json`
- [ ] Le build fonctionne (`npm run build`)
- [ ] La version est mise à jour dans `package.json`
- [ ] Les changements sont commités
- [ ] Le package est publié (`npm publish`)
- [ ] Les changements sont poussés sur GitHub (`git push`)

## 🎯 Convention de Versioning (Semver)

- **Patch** (1.0.X) : Corrections de bugs, petites modifications
- **Minor** (1.X.0) : Nouvelles couleurs, nouveaux tokens (non-breaking)
- **Major** (X.0.0) : Suppression de tokens, renommage (breaking changes)

## ⚠️ Troubleshooting

### Erreur 403 lors de la publication

Vérifiez que vous êtes connecté à NPM :

```bash
npm whoami
```

Si vous n'êtes pas connecté, faites `npm login`.

### Le package existe déjà

Si `wedeedapp-design-tokens` est déjà pris, choisissez un autre nom dans `package.json` :

```json
{
  "name": "votre-org-design-tokens"
}
```

### Créer une organisation NPM pour utiliser un scope

Si vous voulez utiliser un nom scoped comme `@wedeedapp/design-tokens` :

1. Allez sur [npmjs.com](https://www.npmjs.com/)
2. Créez une organisation appelée "wedeedapp"
3. Changez le nom dans `package.json` en `@wedeedapp/design-tokens`
4. Republiez avec `npm publish`

### Les fichiers ne sont pas inclus

Vérifiez le champ `files` dans `package.json` et le `.npmignore`.
