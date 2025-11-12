# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère à [Semantic Versioning](https://semver.org/lang/fr/).

## [1.0.0] - 2025-11-12

### 🎉 Première version

#### Ajouté

- Configuration du package NPM `wedeed-design-system`
- Support multi-brand
- Génération automatique depuis Figma
- Fichiers générés pour chaque marque :
  - CSS avec variables CSS (`{brand}.css`)
  - JSON plat (`{brand}.json`)
  - Configuration Tailwind 4 (`{brand}-tailwind-theme.css`)
- Documentation complète (README, guide de publication)
- Build automatique avant publication (`prepublishOnly`)

#### Changé

- Migration de submodule Git vers package NPM
- Dépendances de build déplacées vers `devDependencies`
- Suppression du hook git `postinstall`

### Fichiers par Marque

Chaque marque contient :
- `{brand}.css` - Variables CSS
- `{brand}.json` - Tokens en format JSON
- `{brand}-tailwind-theme.css` - Configuration @theme pour Tailwind 4
