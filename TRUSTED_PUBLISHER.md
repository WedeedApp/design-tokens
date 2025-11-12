# Configuration du Trusted Publisher

Ce guide explique comment configurer le Trusted Publisher pour publier automatiquement sur NPM depuis GitHub Actions.

## 📋 Prérequis

- Avoir publié au moins une version du package manuellement
- Avoir les droits d'administration sur le package NPM
- Avoir les droits d'administration sur le repository GitHub

## 🔐 Étape 1 : Configurer le Trusted Publisher sur NPM

1. Allez sur [npmjs.com](https://www.npmjs.com/package/wedeed-design-system)
2. Connectez-vous avec votre compte NPM
3. Allez dans **Settings** → **Publishing Access**
4. Cliquez sur **Add Trusted Publisher**
5. Configurez les paramètres suivants :
   - **Provider**: `GitHub`
   - **Repository Owner**: `WedeedApp`
   - **Repository Name**: `design-tokens`
   - **Workflow File**: `.github/workflows/publish.yml`
   - **Environment** (optionnel): laissez vide
6. Cliquez sur **Add**

✅ Le Trusted Publisher est maintenant configuré !

## 🚀 Étape 2 : Publier une nouvelle version

Pour publier une nouvelle version, il suffit de créer un tag Git :

```bash
# 1. Mettre à jour les tokens dans tokens/all.json

# 2. Incrémenter la version
npm version patch  # 1.0.0 → 1.0.1
# ou
npm version minor  # 1.0.0 → 1.1.0
# ou
npm version major  # 1.0.0 → 2.0.0

# 3. Pousser le tag
git push --tags
```

Le workflow GitHub Actions se déclenchera automatiquement et publiera le package sur NPM ! 🎉

## 🔍 Vérifier la publication

Une fois le tag poussé :

1. Allez sur GitHub → Actions
2. Vous verrez le workflow "Publish to NPM" en cours d'exécution
3. Une fois terminé (✅), vérifiez sur [npmjs.com](https://www.npmjs.com/package/wedeed-design-system)

## ⚠️ Troubleshooting

### Le workflow échoue avec "permission denied"

Vérifiez que le Trusted Publisher est bien configuré sur NPM avec les bons paramètres (owner, repository, workflow).

### Le tag ne déclenche pas le workflow

Vérifiez que :
- Le tag commence par `v` (ex: `v1.0.1`)
- Le fichier `.github/workflows/publish.yml` existe
- Le workflow est activé dans Settings → Actions

## 📝 Notes

- **Pas besoin de token NPM** : Le Trusted Publisher utilise OIDC pour l'authentification
- **Sécurisé** : Seuls les workflows depuis votre repository GitHub peuvent publier
- **Traçabilité** : NPM sait exactement quelle version de code a été publiée

