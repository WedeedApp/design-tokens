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
   - **Workflow File**: `build.yml` (nom du fichier uniquement, pas le chemin)
   - **Environment** (optionnel): laissez vide
6. Cliquez sur **Add**

✅ Le Trusted Publisher est maintenant configuré !

## 🚀 Étape 2 : Publier une nouvelle version

La publication est **automatique** ! Il suffit de modifier vos tokens et de push :

```bash
# 1. Modifier les tokens dans tokens/all.json
# Exemple: modifier une couleur, ajouter un token, etc.

# 2. Commit et push
git add tokens/all.json
git commit -m "feat: mise à jour des tokens"
git push
```

**C'est tout !** Le workflow GitHub Actions va automatiquement :
- ✅ Builder les tokens
- ✅ Créer un tag avec version patch (1.0.0 → 1.0.1)
- ✅ Publier sur NPM

La nouvelle version sera disponible sur NPM quelques minutes après votre push ! 🎉

## 🔍 Vérifier la publication

Après votre push :

1. Allez sur GitHub → Actions
2. Vous verrez le workflow "Build and Release" en cours d'exécution
3. Une fois terminé (✅), vérifiez sur [npmjs.com](https://www.npmjs.com/package/wedeed-design-system)

## ⚠️ Troubleshooting

### Le workflow échoue avec "permission denied"

Vérifiez que le Trusted Publisher est bien configuré sur NPM avec les bons paramètres (owner, repository, workflow).

### Le workflow ne publie pas sur NPM

Vérifiez que :
- Le Trusted Publisher est configuré sur npmjs.com
- Il y a bien eu des modifications dans `tokens/` ou `build/`
- Le workflow est activé dans Settings → Actions

## 📝 Notes

- **Pas besoin de token NPM** : Le Trusted Publisher utilise OIDC pour l'authentification
- **Sécurisé** : Seuls les workflows depuis votre repository GitHub peuvent publier
- **Traçabilité** : NPM sait exactement quelle version de code a été publiée
