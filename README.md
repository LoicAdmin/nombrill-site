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
