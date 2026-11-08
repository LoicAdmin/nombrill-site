# Site NOMBRILL

Le site publié sur https://nombrill.fr, hébergé par Netlify.

## Comment ça marche

- `pages/pages.py` contient le texte de chaque page, `build.py` assemble les pages avec l'en-tête et le pied de page communs.
- `assets/` contient les styles et les scripts, `img/` les images.
- `python3 build.py` fabrique le site dans `dist/`.
- `dist/` est enregistré dans le dépôt : Netlify le publie tel quel à chaque modification de la branche `main`, sans étape de construction.
- `netlify.toml` (à la racine) règle la publication et les en-têtes de sécurité. `static_netlify.toml` en est la copie placée dans `dist/` par `build.py`.

## Mettre le site à jour

1. Modifier les fichiers sources.
2. Lancer `python3 build.py`.
3. Enregistrer et pousser sur `main` : Netlify met nombrill.fr à jour en une minute environ.

## Conseils (articles)

Chaque article est un fichier `articles/AAAA-MM-JJ-mot-cle.html` qui commence par un bloc :

```
<!--
titre: Titre de l'article
description: Une phrase pour Google et la liste des conseils.
date: AAAA-MM-JJ
-->
```

suivi du texte en HTML simple (`<p>`, `<h2>`, `<ul>`, liens vers les pages du site). `python3 build.py` crée la page `conseils-mot-cle.html`, l'ajoute à la page Conseils et au plan du site.
