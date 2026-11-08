"""Assemble les pages du site NOMBRILL à partir d'un en-tête et d'un pied de page communs.
Sortie : dist/ (dossier à ouvrir dans VS Code ou à mettre en ligne)."""
import os, shutil, sys

ROOT = os.path.dirname(os.path.abspath(__file__))
DIST = os.path.join(ROOT, "dist")

NAV = [
    ("produit.html", "Le produit"),
    ("pose.html", "La pose"),
    ("compatibilite.html", "Compatibilité"),
    ("gamme.html", "La gamme"),
    ("aide.html", "Aide"),
]

LOGO = ('<svg viewBox="0 0 28 28" aria-hidden="true"><circle cx="14" cy="14" r="13" fill="#F2C230"/>'
        '<circle cx="14" cy="14" r="5.2" fill="#16201B"/><circle cx="14" cy="14" r="2.2" fill="#F5F2EA"/></svg>')
CART = ('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" '
        'stroke-linejoin="round" aria-hidden="true"><path d="M3 4h2.2l2.2 11h10.8l2-8H6.3"/><circle cx="9.5" cy="19.5" r="1.4"/>'
        '<circle cx="17" cy="19.5" r="1.4"/></svg>')
MENU = ('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" '
        'aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>')

DESC_DEFAULT = ("NOMBRILL, la serpillière pour raclette qui se pose autour du manche sans rien dévisser "
                "et reste en place grâce à son œillet central et à son collier.")


NOINDEX = ("admin.html", "merci.html", "404.html")


def head(title, desc, fname="index.html"):
    url = "https://nombrill.fr/" + ("" if fname == "index.html" else fname)
    seo = ('<meta name="robots" content="noindex">' if fname in NOINDEX else
           f'<link rel="canonical" href="{url}">\n'
           f'<meta property="og:type" content="website">\n<meta property="og:site_name" content="NOMBRILL">\n'
           f'<meta property="og:locale" content="fr_FR">\n<meta property="og:url" content="{url}">\n'
           f'<meta property="og:title" content="{title}">\n<meta property="og:description" content="{desc}">\n'
           '<meta property="og:image" content="https://nombrill.fr/img/partage.jpg">\n'
           '<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">\n'
           '<meta name="twitter:card" content="summary_large_image">')
    return f"""<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..800&amp;family=Instrument+Sans:wght@400..700&amp;display=swap">
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="assets/style.css">
<script>document.documentElement.classList.add("js")</script>
{seo}"""


def header(current):
    links = "".join(
        f'<a href="{h}"{" aria-current=\"page\"" if h == current else ""}>{t}</a>' for h, t in NAV)
    mlinks = "".join(f'<a href="{h}">{t}</a>' for h, t in NAV)
    return f"""<div class="annonce" id="annonce" hidden><span></span></div>
<header class="top">
  <div class="wrap">
    <a class="logo" href="index.html" aria-label="NOMBRILL, accueil">{LOGO}NOMBRILL</a>
    <nav class="nav" aria-label="Navigation principale">{links}</nav>
    <button type="button" class="cart-btn" data-cart-open aria-label="Ouvrir le panier">{CART}<span class="label">Panier</span><span class="count" data-cart-count>0</span></button>
    <button type="button" class="menu-btn" id="menu-btn" aria-expanded="false" aria-controls="mobile-nav" aria-label="Ouvrir le menu">{MENU}</button>
  </div>
</header>
<nav class="mobile-nav" id="mobile-nav" aria-label="Menu">{mlinks}<a class="btn primary" href="produit.html">Acheter NOMBRILL Classic</a></nav>"""


FOOTER = """<footer>
  <div class="wrap">
    <section class="launch" id="lancement" aria-labelledby="lancement-t">
      <div>
        <h2 id="lancement-t">Prévenez-moi du lancement</h2>
        <p>La vente ouvre dans quelques semaines. Laissez votre e-mail : vous recevrez un seul message, le jour de l'ouverture.</p>
      </div>
      <form name="lancement" method="POST" action="/" data-netlify="true" netlify-honeypot="site-web" data-launch>
        <input type="hidden" name="form-name" value="lancement">
        <p class="hp"><label>Ne pas remplir <input name="site-web" tabindex="-1" autocomplete="off"></label></p>
        <label class="sr" for="lancement-mail">Votre e-mail</label>
        <div class="row"><input id="lancement-mail" type="email" name="email" required placeholder="vous@exemple.fr" autocomplete="email"><button class="btn primary" type="submit">Me prévenir</button></div>
        <p class="fine">Votre adresse sert uniquement à vous annoncer l'ouverture, puis elle est supprimée. <a href="confidentialite.html">En savoir plus</a></p>
        <p class="ok" role="status" hidden>C'est noté, merci ! Vous serez prévenu le jour de l'ouverture.</p>
      </form>
    </section>
    <div class="grid">
      <div>
        <a class="logo" href="index.html">""" + LOGO + """NOMBRILL</a>
        <p class="tag">La serpillière pour raclette qui tient par le centre. Lancement prévu fin 2026 : les prix affichés sont les prix de lancement.</p>
      </div>
      <div><h2>Produit</h2><ul><li><a href="produit.html">NOMBRILL Classic</a></li><li><a href="gamme.html">La gamme</a></li><li><a href="pose.html">La pose</a></li></ul></div>
      <div><h2>Aide</h2><ul><li><a href="compatibilite.html">Compatibilité</a></li><li><a href="aide.html">Questions fréquentes</a></li><li><a href="conseils.html">Conseils</a></li><li><a href="retractation.html">Retours</a></li></ul></div>
      <div><h2>Informations</h2><ul><li><a href="cgv.html">Conditions de vente</a></li><li><a href="mentions.html">Mentions légales</a></li><li><a href="confidentialite.html">Données personnelles</a></li></ul></div>
    </div>
    <div class="legal"><span>© 2026 NOMBRILL</span><span>Images : rendus 3D et visuels de présentation du prototype, créés par ordinateur</span><span>Modèle déposé, INPI n° 20264220</span></div>
  </div>
</footer>
<script src="assets/boutique.js"></script>
<script src="assets/contenu.js"></script>
<script src="assets/anim.js"></script>"""


def page(fname, title, body, desc=DESC_DEFAULT, scripts="", body_attr=""):
    return f"""<!doctype html>
<html lang="fr">
<head>
{head(title, desc, fname)}
</head>
<body{body_attr}>
{header(fname)}
<main id="contenu">
{body}
</main>
{FOOTER}
{scripts}
</body>
</html>
"""


def build(pages):
    if os.path.isdir(DIST):
        shutil.rmtree(DIST)
    shutil.copytree(os.path.join(ROOT, "assets"), os.path.join(DIST, "assets"))
    shutil.copytree(os.path.join(ROOT, "img"), os.path.join(DIST, "img"))
    for fname, title, body, extra in pages:
        with open(os.path.join(DIST, fname), "w", encoding="utf-8") as f:
            f.write(page(fname, title, body, **extra))
    base = "https://nombrill.fr/"
    pub = [p[0] for p in pages if p[0] not in ("admin.html", "merci.html", "404.html")]
    with open(os.path.join(DIST, "sitemap.xml"), "w", encoding="utf-8") as f:
        f.write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n')
        for n in pub:
            f.write(f"  <url><loc>{base}{'' if n == 'index.html' else n}</loc></url>\n")
        f.write("</urlset>\n")
    with open(os.path.join(DIST, "robots.txt"), "w") as f:
        f.write("User-agent: *\nDisallow: /merci.html\nSitemap: " + base + "sitemap.xml\n")
    shutil.copy(os.path.join(ROOT, "static_netlify.toml"), os.path.join(DIST, "netlify.toml"))
    # la page d'administration ne sert que dans l'aperçu claude.ai : elle n'est pas publiée sur Netlify
    for f in ("admin.html", os.path.join("assets", "admin.js")):
        if os.path.exists(os.path.join(DIST, f)):
            os.remove(os.path.join(DIST, f))
    print("pages:", [p[0] for p in pages])


if __name__ == "__main__":
    sys.path.insert(0, os.path.join(ROOT, "pages"))
    import pages as P
    build(P.PAGES)
