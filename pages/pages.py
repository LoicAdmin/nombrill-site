"""Contenu des pages NOMBRILL."""

S = 'fill="none" stroke="#16201B" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"'
ILL_CLIP = f'''<svg viewBox="0 0 84 84" aria-hidden="true"><circle cx="42" cy="34" r="16" fill="#F2C230"/><circle cx="42" cy="34" r="6" fill="#ECE6D8" {S}/>
<path d="M39 40 L36 74 M45 40 L48 74" {S}/><circle cx="31" cy="52" r="2.6" fill="#16201B"/><circle cx="31" cy="62" r="2.6" fill="#16201B"/><circle cx="53" cy="52" r="2.6" {S}/><circle cx="53" cy="62" r="2.6" {S}/></svg>'''
ILL_LOCK = f'''<svg viewBox="0 0 84 84" aria-hidden="true"><path d="M42 6 V62" {S}/><rect x="14" y="62" width="56" height="12" rx="3" {S}/>
<ellipse cx="42" cy="44" rx="10" ry="4" fill="#F2C230" stroke="#16201B" stroke-width="2.4"/><path d="M60 20 V40 M55 35 L60 40 L65 35" {S}/></svg>'''
ILL_WRAP = f'''<svg viewBox="0 0 84 84" aria-hidden="true"><rect x="12" y="34" width="60" height="16" rx="4" fill="#16201B"/>
<path d="M8 58 C8 30 20 26 42 26 C64 26 76 30 76 58" {S}/><path d="M8 58 L14 52 M8 58 L3 51 M76 58 L70 52 M76 58 L81 51" {S}/><path d="M42 26 V10" {S}/><ellipse cx="42" cy="26" rx="6" ry="2.5" fill="#F2C230" stroke="#16201B" stroke-width="2"/></svg>'''
ILL_WRING = f'''<svg viewBox="0 0 84 84" aria-hidden="true"><path d="M18 40 H66 L60 76 H24 Z" fill="#ECE6D8" {S}/><path d="M42 4 V54" {S}/>
<path d="M26 22 A18 7 0 1 0 58 22" {S}/><path d="M58 22 L58 14 M58 22 L50 22" {S}/><path d="M34 54 Q42 62 50 54" stroke="#F2C230" stroke-width="5" fill="none" stroke-linecap="round"/></svg>'''

INDEX = f"""
<section class="hero" aria-labelledby="h-hero">
  <div class="wrap split">
    <div class="hero-text">
      <span class="eyebrow">Serpillière pour raclette</span>
      <h1 id="h-hero" data-words>Elle se pose autour du manche, sans rien dévisser.</h1>
      <p class="lead">Une toile percée au centre, fermée par trois pressions et bloquée par un collier. Elle reste sous la raclette du premier au dernier passage.</p>
      <ul class="facts" aria-label="En bref">
        <li><b data-price="classic">12,90 €</b> prix de lancement visé</li>
        <li>Manches de <b>20 à 28 mm</b></li>
      </ul>
      <div class="ctas">
        <a class="btn primary" href="produit.html">Choisir ma taille</a>
        <a class="btn ghost" href="pose.html">Voir la pose</a>
      </div>
    </div>
    <div class="hero-visual">
      <div class="stage" id="stage" data-mode="hero">
        <canvas id="scene" aria-label="NOMBRILL Classic en 3D, sur une raclette, qui tourne lentement"></canvas>
        <div class="poster" id="poster"><img class="photo" src="img/photo.webp" width="696" height="597" alt="Visuel de présentation : NOMBRILL Classic posée sur une raclette, le manche passé dans l'œillet central et bloqué par le collier jaune"></div>
        <p class="fallback" id="fallback" hidden></p>
      </div>
      <a class="badge360" href="pose.html">Voir en 3D</a>
    </div>
  </div>
</section>

<div class="ticker" aria-hidden="true"><div class="track">
  <span>Sans dévisser le manche</span><span>Lavable à 60 °C</span><span>Manches de 20 à 28 mm</span><span>Coton gaufré</span><span>Mains sèches à l'essorage</span>
  <span>Sans dévisser le manche</span><span>Lavable à 60 °C</span><span>Manches de 20 à 28 mm</span><span>Coton gaufré</span><span>Mains sèches à l'essorage</span>
</div></div>

<section class="sec problem" aria-labelledby="h-problem">
  <div class="wrap split">
    <div class="txt" data-reveal>
      <span class="eyebrow">Le problème</span>
      <h2 id="h-problem">Une serpillière posée sur une raclette finit toujours à côté.</h2>
      <p>Rien ne la retient : au bout de trois allers-retours, elle a glissé, la lame frotte le sol à nu et il faut se baisser pour la remettre en place.</p>
      <p>NOMBRILL règle ça par le centre. Le manche traverse la toile, et la toile ne peut plus partir.</p>
    </div>
    <figure class="frame" data-reveal style="--d:120ms">
      <img src="img/glisse.webp" width="1400" height="1000" loading="lazy" alt="Une serpillière classique qui a glissé de sous une raclette et traîne au sol à côté de la lame">
    </figure>
  </div>
</section>

<section class="sec detail" aria-labelledby="h-detail">
  <div class="wrap split">
    <figure class="frame" data-reveal>
      <img src="img/detail.webp" width="1200" height="1200" loading="lazy" alt="Gros plan sur l'œillet renforcé : la couronne jaune cousue au point zigzag et le collier serré autour du manche">
    </figure>
    <div class="txt" data-reveal style="--d:120ms">
      <span class="eyebrow">Le détail qui tient</span>
      <h2 id="h-detail">Un œillet fait pour durer.</h2>
      <ul class="specs">
        <li><b data-count="30" data-pre="Ø ">Ø 30</b><span><strong>Œillet ourlé</strong>Gainé de biais, il ne s'effiloche pas au lavage.</span></li>
        <li><b data-count="80" data-pre="Ø ">Ø 80</b><span><strong>Couronne double épaisseur</strong>Elle répartit l'effort autour du manche.</span></li>
        <li><b data-count="3">3</b><span><strong>Pressions en résine</strong>La fente s'ouvre pour passer le manche, puis se referme.</span></li>
        <li><b>20-28</b><span><strong>Collier en silicone</strong>Une taille par diamètre de manche, en millimètres.</span></li>
      </ul>
    </div>
  </div>
</section>

<section class="sec gestures" aria-labelledby="h-gestes">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow">La pose</span>
      <h2 id="h-gestes">Quatre gestes, sans outil.</h2>
    </div>
    <ol class="steps">
      <li class="step" data-reveal><div class="ill">{ILL_CLIP}</div><span class="n">01</span><h3>Clipser</h3><p>Ouvrez les pressions, passez la toile autour du manche, refermez.</p></li>
      <li class="step" data-reveal><div class="ill">{ILL_LOCK}</div><span class="n">02</span><h3>Bloquer</h3><p>Descendez le collier jusqu'à la raclette.</p></li>
      <li class="step" data-reveal><div class="ill">{ILL_WRAP}</div><span class="n">03</span><h3>Rabattre</h3><p>Glissez les bords dans les deux fentes pour couvrir la lame.</p></li>
      <li class="step" data-reveal><div class="ill">{ILL_WRING}</div><span class="n">04</span><h3>Essorer</h3><p>Dans le seau, bloquez la toile au fond et tournez le manche.</p></li>
    </ol>
    <div class="steps-foot"><a class="more" href="pose.html">Voir la démonstration en 3D</a></div>
  </div>
</section>

<section class="sec band" aria-labelledby="h-compat">
  <div class="wrap split">
    <div class="txt" data-reveal>
      <span class="eyebrow" style="color:#16201B">Compatibilité</span>
      <h2 id="h-compat">Elle va sur les raclettes à manche central.</h2>
      <ul class="checks">
        <li>Manche vissé ou fixé au centre</li>
        <li>Raclette de 35 à 45 cm de large</li>
        <li>Manche de 20 à 28 mm de diamètre</li>
        <li class="no">Pas pour les raclettes à étrier ou à manche sur le côté</li>
      </ul>
      <div class="ctas"><a class="btn primary" href="compatibilite.html">Vérifier ma raclette</a></div>
    </div>
    <figure class="frame" data-reveal style="--d:120ms">
      <img src="img/flat.webp" width="1400" height="1000" loading="lazy" alt="La toile NOMBRILL Classic à plat, vue de dessus, avec l'œillet central, la fente à pressions et les deux fentes latérales">
    </figure>
  </div>
</section>

<section class="sec" aria-labelledby="h-gamme">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow">Bientôt</span>
      <h2 id="h-gamme">Quatre autres toiles suivront Classic.</h2>
    </div>
    <div class="range">
      <a class="model" data-reveal href="gamme.html#micro"><div class="frame"><img src="img/g_micro.webp" width="900" height="700" loading="lazy" alt="Toile NOMBRILL Duo Micro bleue"></div><span class="who">Sols fragiles</span><h3>Duo Micro</h3><div class="row"><span>Microfibre double face</span><b data-price="micro" data-unit>14,90 €</b></div></a>
      <a class="model" data-reveal href="gamme.html#pro"><div class="frame"><img src="img/g_pro.webp" width="900" height="700" loading="lazy" alt="Toile NOMBRILL Pro à bordure verte"></div><span class="who">Agents d'entretien</span><h3>Pro</h3><div class="row"><span>Lot de 4, 450 g/m²</span><b data-price="pro" data-unit>34,90 €</b></div></a>
      <a class="model" data-reveal href="gamme.html#dose"><div class="frame"><img src="img/g_dose.webp" width="900" height="700" loading="lazy" alt="Toile NOMBRILL Dose à couronne orangée"></div><span class="who">Lavage malin</span><h3>Dose</h3><div class="row"><span>Poche à pastille de savon</span><b data-price="dose" data-unit>12,90 €</b></div></a>
      <a class="model" data-reveal href="gamme.html#nature"><div class="frame"><img src="img/g_nature.webp" width="900" height="700" loading="lazy" alt="Toile NOMBRILL Nature en lin et chanvre écru"></div><span class="who">Zéro plastique</span><h3>Nature</h3><div class="row"><span>Lin et chanvre</span><b data-price="nature" data-unit>13,90 €</b></div></a>
    </div>
  </div>
</section>

<section class="sec story" aria-labelledby="h-story">
  <div class="wrap">
    <h2 id="h-story" class="sr">D'où vient NOMBRILL</h2>
    <p class="quote" data-reveal>Tout est parti d'une femme de ménage qui avait fait <em>un trou au milieu</em> de sa serpillière.</p>
    <div class="body" data-reveal style="--d:150ms">
      <p>Elle y passait le manche, et la toile ne bougeait plus. Le tissu coupé s'effilochait à chaque lavage. NOMBRILL garde son geste et le rend solide.</p>
      <div class="ctas"><a class="btn primary" href="produit.html">Découvrir Classic, <span data-price="classic">12,90 €</span></a></div>
    </div>
  </div>
</section>
"""

ADMIN = """
<section class="page-head" aria-labelledby="h-admin">
  <div class="wrap">
    <nav class="crumbs" aria-label="Fil d'Ariane"><a href="index.html">Accueil</a> / Administration</nav>
    <h1 id="h-admin">Administration</h1>
    <p>Modifiez les prix, le statut, le stock et les textes des toiles, le bandeau d'annonce et les frais de port. Les visiteurs voient les changements tout de suite.</p>
  </div>
</section>
<div class="wrap admin">
  <p class="admin-note" id="admin-note" aria-live="polite">Vérification de l'accès…</p>
  <p><a class="btn primary" id="sheet-link" href="#" target="_blank" rel="noopener" hidden>Ouvrir le Google Sheet</a></p>
  <div id="admin" hidden>
    <section>
      <h2>Toiles</h2>
      <div class="tablewrap"><table>
        <thead><tr><th scope="col">Toile</th><th scope="col">Prix (€)</th><th scope="col">Statut</th><th scope="col">Stock</th><th scope="col">Description</th><th scope="col"><span class="sr">Action</span></th></tr></thead>
        <tbody id="rows"></tbody>
      </table></div>
    </section>
    <section class="panel-card" style="margin-top:40px">
      <h2>Bandeau d'annonce</h2>
      <label class="check"><input type="checkbox" id="b-on"> Afficher le bandeau en haut de chaque page</label>
      <label for="b-txt">Texte du bandeau</label>
      <input type="text" id="b-txt" maxlength="140">
      <h2 style="margin-top:12px">Frais de port (€), selon le nombre de serpillières</h2>
      <div class="ship" id="ship"></div>
      <div><button type="button" class="btn primary" id="save-site">Enregistrer le bandeau et la livraison</button></div>
    </section>
  </div>
</div>
"""

NOTFOUND = """
<section class="wrap done" aria-labelledby="h-404">
  <h1 id="h-404">Cette page n'existe pas.</h1>
  <p>Le lien est peut-être ancien ou mal recopié.</p>
  <div class="ctas"><a class="btn primary" href="index.html">Retour à l'accueil</a><a class="btn ghost" href="produit.html">Voir NOMBRILL Classic</a></div>
</section>
"""

PAGES = [
    ("index.html", "NOMBRILL, la serpillière pour raclette qui se pose sans dévisser", INDEX, {"scripts": '<script src="assets/viewer3d.js?v=20261108c"></script>'}),
]


def crumbs(label):
    return f'<nav class="crumbs" aria-label="Fil d\'Ariane"><a href="index.html">Accueil</a> / {label}</nav>'


SIZES = "".join(
    f'<label><input type="radio" name="collier" value="{n}"{" checked" if n == 24 else ""}><span>{n}</span></label>'
    for n in range(20, 29))

PRODUIT = f"""
<section class="pdp" aria-labelledby="h-prod">
  <div class="wrap">
    {crumbs("NOMBRILL Classic")}
    <div class="split" style="margin-top:24px">
      <div class="gallery">
        <div class="frame main"><img id="main-img" src="img/photo.webp" width="696" height="597" alt="Visuel de présentation : NOMBRILL Classic en coton gaufré posée sur une raclette, collier jaune autour du manche"></div>
        <div class="thumbs" aria-label="Autres vues">
          <button type="button" aria-pressed="true" data-src="img/photo.webp" data-alt="Visuel de présentation : NOMBRILL Classic en coton gaufré posée sur une raclette, collier jaune autour du manche"><img src="img/photo.webp" alt="" width="140" height="120"><span class="sr">Visuel de présentation</span></button>
          <button type="button" aria-pressed="false" data-src="img/hero.webp" data-alt="NOMBRILL Classic posée sur une raclette, le manche passé dans l'œillet central"><img src="img/hero.webp" alt="" width="140" height="120"><span class="sr">Sur la raclette</span></button>
          <button type="button" aria-pressed="false" data-src="img/flat.webp" data-alt="La toile à plat, vue de dessus, avec l'œillet, la fente à pressions et les fentes latérales"><img src="img/flat.webp" alt="" width="140" height="100"><span class="sr">À plat</span></button>
          <button type="button" aria-pressed="false" data-src="img/detail.webp" data-alt="Gros plan sur l'œillet renforcé et le collier jaune serré autour du manche"><img src="img/detail.webp" alt="" width="120" height="120"><span class="sr">Gros plan sur l'œillet</span></button>
        </div>
      </div>
      <div class="buybox">
        <span class="eyebrow">Serpillière pour raclette, 60 × 50 cm</span>
        <h1 id="h-prod">NOMBRILL Classic</h1>
        <div class="price"><span data-price="classic">12,90 €</span> <small>prix de lancement visé, TVA non applicable (article 293 B du CGI)</small></div>
        <p class="stock" data-stock="classic" hidden></p>
        <p style="color:var(--muted)">Coton gaufré, pour le ménage de tous les jours. Vendue seule, sans manche ni raclette.</p>
        <div class="opt">
          <div class="opt-head"><span id="l-size">Diamètre du manche, en mm</span><a href="compatibilite.html">Mesurer mon manche</a></div>
          <fieldset class="sizes" aria-labelledby="l-size">{SIZES}</fieldset>
        </div>
        <div class="buyrow">
          <div class="stepper"><button type="button" id="minus" aria-label="Une de moins">−</button><input id="qty" type="number" min="1" max="20" value="1" inputmode="numeric" aria-label="Quantité"><button type="button" id="plus" aria-label="Une de plus">+</button></div>
          <button type="button" class="btn primary" id="add">Ajouter au panier</button>
        </div>
        <p class="soon" data-soon>La vente en ligne ouvre bientôt. <a href="#lancement">Être prévenu de l'ouverture</a></p>
        <ul class="reassure">
          <li>Colissimo à domicile, <span data-ship="1">5,49 €</span> pour une serpillière</li>
          <li>14 jours pour changer d'avis</li>
          <li>Garantie légale de conformité de 2 ans</li>
        </ul>
        <div class="acc">
          <details open><summary>Caractéristiques</summary><div class="body"><dl>
            <dt>Toile</dt><dd>60 × 50 cm, coins arrondis, bordure en biais</dd>
            <dt>Matière</dt><dd>Coton gaufré nid d'abeille ; composition exacte indiquée au lancement</dd>
            <dt>Œillet</dt><dd>Ø 30 mm, ouvrable par 3 pressions en résine</dd>
            <dt>Couronne</dt><dd>Ø 80 mm, double épaisseur</dd>
            <dt>Collier</dt><dd>Silicone, une taille par diamètre de 20 à 28 mm</dd>
            <dt>Raclettes</dt><dd>35 à 45 cm, manche central vissé ou fixe</dd>
          </dl></div></details>
          <details><summary>Entretien</summary><div class="body"><p>Lavage en machine à 60 °C, pressions fermées. Pas d'eau de Javel pure. Séchage à l'air libre : rangée humide, la toile prend une odeur.</p></div></details>
          <details><summary>Sécurité et fabricant</summary><div class="body"><p>Les pressions et le collier sont de petites pièces : rangez la serpillière hors de portée des jeunes enfants. N'utilisez pas d'eau de Javel pure, qui abîme la toile et le collier.</p><p>Fabricant : NOMBRILL, Loïc Martinot, entrepreneur individuel, 13 rue de Senlis, 59176 Masny, France, <a href="mailto:contact@nombrill.fr">contact@nombrill.fr</a>. Chaque serpillière porte une étiquette avec sa composition et son numéro de lot.</p></div></details>
          <details><summary>Livraison et retours</summary><div class="body"><p>Colissimo à domicile en France métropolitaine : <span data-ship="1">5,49 €</span> pour une serpillière, <span data-ship="2">7,59 €</span> pour deux, <span data-ship="3">9,29 €</span> pour trois. Le total s'affiche dans le panier avant le paiement.</p><p>Vous avez 14 jours après réception pour vous rétracter. <a href="retractation.html">Comment faire</a></p></div></details>
        </div>
      </div>
    </div>
  </div>
</section>
"""

POSE = f"""
<section class="page-head" aria-labelledby="h-pose">
  <div class="wrap">
    {crumbs("La pose")}
    <h1 id="h-pose">La pose en quatre gestes, en 3D.</h1>
    <p>Tournez la vue avec la souris ou le doigt. Le bouton Démonstration enchaîne les quatre gestes avec une légende pour chacun.</p>
  </div>
</section>
<section aria-label="Vue 3D" style="padding-bottom:96px">
  <div class="wrap">
    <div class="stage" id="stage">
      <canvas id="scene" aria-label="NOMBRILL Classic en 3D, que l'on peut faire tourner"></canvas>
      <div class="poster" id="poster"><img src="img/photo.webp" alt="" width="696" height="597"><button type="button" class="btn primary" id="load3d">Afficher en 3D</button></div>
      <p class="fallback" id="fallback" hidden>La vue 3D n'a pas pu démarrer sur cet appareil. Les quatre gestes sont décrits plus bas.</p>
      <p class="hint" id="stage-hint" hidden>Faites glisser pour tourner</p>
      <div class="caption" id="demo-caption" hidden aria-live="polite"><span class="num" id="demo-num">1</span><span class="demo-steps"><i></i><i></i><i></i><i></i></span><span id="demo-text"></span></div>
    </div>
    <div class="controls">
      <div class="seg" role="group" aria-label="Position de la toile">
        <button type="button" data-state="flat" aria-pressed="false">À plat</button>
        <button type="button" data-state="drape" aria-pressed="true">Sur la raclette</button>
        <button type="button" data-state="twist" aria-pressed="false">Essorage</button>
      </div>
      <button type="button" class="btn ghost" id="demo-btn">Démonstration</button>
    </div>
    <ol class="steps pose-steps">
      <li class="step" data-reveal><div class="ill">{ILL_CLIP}</div><span class="n">01</span><h3>Clipser</h3><p>Ouvrez les trois pressions, glissez la toile autour du manche, refermez. Pas besoin de dévisser.</p></li>
      <li class="step" data-reveal><div class="ill">{ILL_LOCK}</div><span class="n">02</span><h3>Bloquer</h3><p>Descendez le collier jusqu'à la raclette : la toile ne remonte plus le long du manche.</p></li>
      <li class="step" data-reveal><div class="ill">{ILL_WRAP}</div><span class="n">03</span><h3>Rabattre</h3><p>Glissez les bords dans les deux fentes latérales pour couvrir la lame en caoutchouc.</p></li>
      <li class="step" data-reveal><div class="ill">{ILL_WRING}</div><span class="n">04</span><h3>Essorer</h3><p>Dans le seau, bloquez la toile au fond et tournez le manche. Les mains restent sèches.</p></li>
    </ol>
  </div>
</section>
"""

COMPAT = f"""
<section class="page-head" aria-labelledby="h-compat">
  <div class="wrap">
    {crumbs("Compatibilité")}
    <h1 id="h-compat">Elle va sur votre raclette ?</h1>
    <p>Décrivez votre raclette : la réponse donne le modèle et la taille du collier. Pour le diamètre, mesurez le manche au pied à coulisse, ou faites-en le tour avec une ficelle et divisez par 3,14.</p>
  </div>
</section>
<section style="padding-bottom:112px">
  <div class="wrap compat">
    <form id="compat-form" novalidate>
      <fieldset><legend>Comment le manche est-il fixé ?</legend><div class="choices">
        <label><input type="radio" name="fix" value="visse" checked><span>Vissé au centre</span></label>
        <label><input type="radio" name="fix" value="fixe"><span>Fixé au centre</span></label>
        <label><input type="radio" name="fix" value="etrier"><span>Deux branches (étrier)</span></label>
        <label><input type="radio" name="fix" value="cote"><span>Sur le côté</span></label>
      </div></fieldset>
      <fieldset><legend>Largeur de la raclette</legend><div class="choices">
        <label><input type="radio" name="width" value="45" checked><span>35 à 45 cm</span></label>
        <label><input type="radio" name="width" value="55"><span>46 à 55 cm</span></label>
        <label><input type="radio" name="width" value="more"><span>Plus de 55 cm</span></label>
      </div></fieldset>
      <fieldset><legend><label for="dia">Diamètre du manche</label></legend>
        <div class="dia"><input type="range" id="dia" min="16" max="32" step="0.5" value="23.5"><output id="dia-out" for="dia">23,5 mm</output></div>
        <p class="hintline">Les manches de raclette courants font entre 22 et 25 mm.</p>
      </fieldset>
    </form>
    <div class="verdict" id="verdict" data-state="ok" aria-live="polite">
      <span class="pill" id="v-pill">Compatible</span>
      <h2 id="v-title">NOMBRILL Classic</h2>
      <p id="v-text"></p>
      <dl><dt>Collier</dt><dd id="v-collar">24 mm</dd><dt>Pose</dt><dd id="v-pose"></dd></dl>
      <a class="btn primary" id="v-go" href="produit.html">Choisir Classic</a>
    </div>
  </div>
</section>
"""

MODELS = [
    ("classic", "flat", "Classic", "Disponible au lancement", "Foyers", "12,90 €", "Coton gaufré, 60 × 50 cm, pour le ménage de tous les jours.", True),
    ("micro", "g_micro", "Duo Micro", "Plus tard", "Sols fragiles", "14,90 €", "Microfibre double face, 60 × 50 cm. On la retourne sur le manche sans l'enlever, pour le parquet vitrifié et le béton ciré.", False),
    ("pro", "g_pro", "Pro", "Plus tard", "Agents d'entretien", "34,90 € les 4", "70 × 60 cm, 450 g/m², collier renforcé et bordure au code couleur d'hygiène, pour les raclettes jusqu'à 55 cm.", False),
    ("dose", "g_dose", "Dose", "Plus tard", "Lavage malin", "12,90 €", "Une poche autour de l'œillet accueille une pastille de savon noir, qui se dilue pendant le lavage.", False),
    ("nature", "g_nature", "Nature", "Plus tard", "Zéro plastique", "13,90 €", "Lin et chanvre non teints, collier en caoutchouc naturel, sans plastique dans la toile.", False),
]
rows = ""
for mid, img, name, tag, who, price, text, live in MODELS:
    act = '<a class="btn primary" href="produit.html">Choisir ma taille</a>' if live else ""
    rows += f"""<article class="model-row{' live' if live else ''}" id="{mid}" data-reveal>
      <div class="frame"><img src="img/{img}.webp" width="900" height="700" loading="lazy" alt="Toile NOMBRILL {name} vue de dessus"></div>
      <div class="info"><span class="tag" data-status="{mid}">{tag}</span><span class="eyebrow">{who}</span><h2>{name}</h2><p data-desc="{mid}">{text}</p><div class="price"><span data-price="{mid}" data-unit>{price}</span> <small>prix visé</small></div><p class="stock" data-stock="{mid}" hidden></p>{act}</div>
    </article>"""

GAMME = f"""
<section class="page-head" aria-labelledby="h-gamme">
  <div class="wrap">
    {crumbs("La gamme")}
    <h1 id="h-gamme">Cinq toiles, un même œillet.</h1>
    <p>Classic sort en premier. Les autres suivront après les tests du prototype ; elles gardent toutes l'œillet, les pressions et le collier.</p>
  </div>
</section>
<section style="padding-bottom:112px"><div class="wrap models">{rows}</div></section>
"""

FAQ = [
    ("Faut-il démonter la raclette pour la poser ?", "Non. La toile s'ouvre par une fente fermée par trois pressions en résine : on l'ouvre, on la passe autour du manche et on referme. Cela marche aussi sur les manches fixes, rivetés ou télescopiques."),
    ("Comment choisir la taille du collier ?", "Le collier existe pour chaque diamètre de manche de 20 à 28 mm. Mesurez votre manche au pied à coulisse, ou faites-en le tour avec une ficelle et divisez la longueur par 3,14. La page <a href=\"compatibilite.html\">Compatibilité</a> donne la taille directement."),
    ("Ma raclette a deux branches, ça marche ?", "Non. Les raclettes à étrier et celles dont le manche est fixé sur le côté ne passent pas par le centre de la toile."),
    ("Sur quels sols l'utiliser ?", "Tous les sols durs qu'on lave à l'eau : carrelage, lino et vinyle, tomettes. Pour le parquet vitrifié et le béton ciré, une microfibre bien essorée convient mieux : ce sera le modèle Duo Micro."),
    ("Le manche ou la raclette sont-ils fournis ?", "Non. NOMBRILL est vendue seule, pour s'adapter à la raclette que vous avez déjà."),
    ("Comment laver la serpillière ?", "En machine à 60 °C, pressions fermées pour qu'elles ne s'accrochent pas. Évitez l'eau de Javel pure et faites sécher à l'air libre."),
    ("Combien coûte la livraison ?", "Colissimo à domicile en France métropolitaine : <span data-ship='1'>5,49 €</span> pour une serpillière, <span data-ship='2'>7,59 €</span> pour deux, <span data-ship='3'>9,29 €</span> pour trois, <span data-ship='5'>9,59 €</span> jusqu'à cinq. Le total s'affiche dans le panier avant le paiement."),
    ("Comment renvoyer un article ?", "Vous avez 14 jours après réception pour changer d'avis. La marche à suivre est sur la page <a href=\"retractation.html\">Retours</a>."),
    ("Quand sera-t-elle disponible ?", "Classic sort en premier, à la fin des tests du prototype ; les autres modèles suivront. Pour être prévenu le jour de l'ouverture, laissez votre e-mail en bas de cette page."),
]
faq_html = "".join(f"<details><summary>{q}</summary><div class=\"body\"><p>{a}</p></div></details>" for q, a in FAQ)

AIDE = f"""
<section class="page-head" aria-labelledby="h-aide">
  <div class="wrap">
    {crumbs("Aide")}
    <h1 id="h-aide">Questions fréquentes</h1>
    <p>Pose, compatibilité, entretien, livraison.</p>
  </div>
</section>
<section style="padding-bottom:112px">
  <div class="wrap faq-grid">
    <div class="acc">{faq_html}</div>
    <aside class="contact-card"><h2>Une autre question ?</h2><p>Écrivez-nous, réponse sous 48 h ouvrées.</p><p><b><a href="mailto:contact@nombrill.fr">contact@nombrill.fr</a></b></p></aside>
  </div>
</section>
"""


def legal(fid, label, h1, inner):
    return f"""
<section class="page-head" aria-labelledby="h-{fid}">
  <div class="wrap">{crumbs(label)}<h1 id="h-{fid}">{h1}</h1></div>
</section>
<section><div class="wrap legal-doc">{inner}</div></section>
"""


CGV = legal("cgv", "Conditions de vente", "Conditions générales de vente", """
<p class="warn">La vente en ligne n'est pas encore ouverte. Ces conditions s'appliqueront à partir de l'ouverture de la boutique et seront complétées à cette date.</p>
<h2>1. Vendeur</h2><p>Loïc Martinot, entrepreneur individuel (EI) au régime micro-entrepreneur, nom commercial NOMBRILL, immatriculation au registre national des entreprises en cours, adresse : 13 rue de Senlis, 59176 Masny. Contact : <a href="mailto:contact@nombrill.fr">contact@nombrill.fr</a>.</p>
<h2>2. Produits</h2><p>Les produits vendus sont les serpillières NOMBRILL décrites sur ce site, vendues sans manche ni raclette. Le client choisit la taille du collier selon le diamètre de son manche.</p>
<h2>3. Prix</h2><p>Les prix sont indiqués en euros. TVA non applicable, article 293 B du CGI (franchise en base de TVA). Les frais de livraison s'ajoutent selon le nombre d'articles et sont indiqués dans le panier, avant la commande.</p>
<h2>4. Commande</h2><p>La commande est passée par le panier, après acceptation des présentes conditions, puis validée sur la page de paiement. Un e-mail de confirmation récapitule la commande.</p>
<h2>5. Paiement</h2><p>Le paiement se fait en une fois, à la commande, par carte bancaire via un prestataire de paiement sécurisé, précisé à l'ouverture de la vente. Le vendeur n'a jamais accès aux données bancaires.</p>
<h2>6. Livraison</h2><p>Livraison en France métropolitaine par Colissimo, à domicile, sous 2 à 4 jours ouvrés après le paiement. En cas de retard, le client peut résoudre la vente dans les conditions prévues par le Code de la consommation.</p>
<h2>7. Droit de rétractation</h2><p>Le client dispose de 14 jours à compter de la réception pour se rétracter, sans avoir à se justifier. Les frais de retour sont à sa charge. Le remboursement intervient dans les 14 jours suivant la rétractation, par le même moyen de paiement. Un produit lavé ou utilisé au-delà de ce qui est nécessaire pour l'essayer peut faire l'objet d'une déduction.</p>
<h2>8. Garanties</h2><p>Les produits bénéficient de la garantie légale de conformité de 2 ans et de la garantie contre les vices cachés.</p>
<h2>9. Médiation</h2><p>En cas de litige, le client peut recourir gratuitement au médiateur de la consommation, dont les coordonnées seront indiquées ici à l'ouverture de la vente.</p>
<h2>10. Données personnelles</h2><p>Voir la page <a href="confidentialite.html">Données personnelles</a>.</p>
<h2>11. Emballages</h2><p>Le numéro d'identifiant unique REP des emballages sera indiqué ici à l'ouverture de la vente.</p>
<h2>12. Droit applicable</h2><p>Droit français.</p>
""")

MENTIONS = legal("mentions", "Mentions légales", "Mentions légales", """
<h2>Éditeur</h2><p>Loïc Martinot, entrepreneur individuel (EI), nom commercial NOMBRILL, 13 rue de Senlis, 59176 Masny. Immatriculation au registre national des entreprises en cours. TVA non applicable, article 293 B du CGI. Contact : <a href="mailto:contact@nombrill.fr">contact@nombrill.fr</a>. Directeur de la publication : Loïc Martinot.</p>
<h2>Hébergement</h2><p>Netlify, Inc., 2325 3rd Street, Suite 296, San Francisco, CA 94107, États-Unis, <a href="https://www.netlify.com">netlify.com</a>.</p>
<h2>Contact</h2><p><a href="mailto:contact@nombrill.fr">contact@nombrill.fr</a></p>
<h2>Propriété intellectuelle</h2><p>Le modèle NOMBRILL est déposé à l'INPI (dépôt de dessin et modèle n° 20264220 du 8 novembre 2026). Toute reproduction du produit est interdite sans autorisation.</p>
<h2>Images</h2><p>Les images du produit sont des rendus 3D et des visuels de présentation du prototype NOMBRILL Classic, créés par ordinateur. Le produit livré peut présenter de légères différences.</p>
""")

CONFID = legal("donnees", "Données personnelles", "Données personnelles", """
<p>Responsable du traitement : Loïc Martinot, EI NOMBRILL, 13 rue de Senlis, 59176 Masny.</p>
<p>Ce site ne dépose pas de cookie publicitaire ni de mesure d'audience. Le panier est enregistré uniquement dans votre navigateur.</p>
<h2>Inscription au lancement</h2><p>Si vous laissez votre e-mail dans le formulaire « Prévenez-moi du lancement », il sert uniquement à vous envoyer un message le jour de l'ouverture de la boutique. Il est enregistré par notre hébergeur Netlify (États-Unis, encadré par les clauses contractuelles types de la Commission européenne), n'est jamais vendu ni transmis, et il est supprimé au plus tard 3 mois après l'ouverture. Base légale : votre consentement, que vous pouvez retirer à tout moment par simple e-mail.</p>
<h2>Commandes</h2><p>À l'ouverture de la vente, les données de commande (nom, adresse, e-mail) serviront à traiter le paiement et la livraison, et seront conservées pendant la durée légale.</p>
<p>Vous pouvez accéder à vos données, les faire rectifier ou supprimer en écrivant à <a href="mailto:contact@nombrill.fr">contact@nombrill.fr</a>. Vous pouvez aussi saisir la CNIL.</p>
""")

RETRACT = legal("retour", "Retours", "Retours et droit de rétractation", """
<p>Vous avez 14 jours à compter de la réception de votre commande pour changer d'avis, sans donner de raison. Les frais de retour restent à votre charge.</p>
<h2>Comment faire</h2>
<ol><li>Envoyez une déclaration claire à <a href="mailto:contact@nombrill.fr">contact@nombrill.fr</a>, ou le formulaire ci-dessous.</li><li>Renvoyez le produit à 13 rue de Senlis, 59176 Masny dans les 14 jours suivant votre déclaration.</li><li>Vous êtes remboursé dans les 14 jours, par le même moyen de paiement.</li></ol>
<h2>Formulaire de rétractation</h2>
<p class="form">À l'attention de Loïc Martinot, 13 rue de Senlis, 59176 Masny, <a href="mailto:contact@nombrill.fr">contact@nombrill.fr</a> : je vous notifie par la présente ma rétractation du contrat portant sur la vente du bien ci-dessous. Commandé le : … Reçu le : … Nom : … Adresse : … Signature (sauf envoi par e-mail) : … Date : …</p>
""")

MERCI = """
<section class="wrap done" aria-labelledby="h-merci">
  <h1 id="h-merci">Merci pour votre commande.</h1>
  <p>Votre paiement est enregistré. Vous recevez la confirmation par e-mail de la part de notre prestataire de paiement, puis le numéro de suivi Colissimo à l'expédition.</p>
  <p>Une question sur votre commande : <a href="mailto:contact@nombrill.fr">contact@nombrill.fr</a></p>
  <div class="ctas"><a class="btn primary" href="pose.html">Revoir la pose</a><a class="btn ghost" href="index.html">Retour à l'accueil</a></div>
</section>
"""

PAGES = [
    ("index.html", "NOMBRILL, la serpillière pour raclette qui se pose sans dévisser", INDEX, {"scripts": '<script src="assets/viewer3d.js?v=20261108c"></script>'}),
    ("produit.html", "NOMBRILL Classic, serpillière pour raclette 60 × 50 cm", PRODUIT,
     {"scripts": '<script src="assets/produit.js"></script>',
      "desc": "NOMBRILL Classic : serpillière pour raclette en coton gaufré, 60 × 50 cm, avec œillet central, fente à pressions et collier de 20 à 28 mm."}),
    ("pose.html", "La pose de NOMBRILL en quatre gestes", POSE,
     {"scripts": '<script src="assets/viewer3d.js?v=20261108c"></script>',
      "desc": "Clipser, bloquer, rabattre, essorer : la pose de NOMBRILL en 3D, sans dévisser le manche."}),
    ("compatibilite.html", "Compatibilité de NOMBRILL avec votre raclette", COMPAT,
     {"scripts": '<script src="assets/compat.js"></script>',
      "desc": "Vérifiez si NOMBRILL va sur votre raclette et quelle taille de collier choisir."}),
    ("gamme.html", "La gamme NOMBRILL", GAMME, {"desc": "Classic, Duo Micro, Pro, Dose et Nature : les toiles NOMBRILL."}),
    ("aide.html", "Aide et questions fréquentes, NOMBRILL", AIDE, {"desc": "Pose, compatibilité, entretien et livraison de NOMBRILL."}),
    ("cgv.html", "Conditions générales de vente, NOMBRILL", CGV, {}),
    ("mentions.html", "Mentions légales, NOMBRILL", MENTIONS, {}),
    ("confidentialite.html", "Données personnelles, NOMBRILL", CONFID, {}),
    ("retractation.html", "Retours et rétractation, NOMBRILL", RETRACT, {}),
    ("admin.html", "Administration, NOMBRILL", ADMIN, {"scripts": '<script src="assets/admin.js"></script>'}),
    ("404.html", "Page introuvable, NOMBRILL", NOTFOUND, {}),
    ("merci.html", "Merci pour votre commande, NOMBRILL", MERCI, {"body_attr": " data-clear-cart"}),
]


# ---------- Conseils : articles écrits dans le dossier articles/ ----------
import os as _os, re as _re, html as _html

_ART_DIR = _os.path.join(_os.path.dirname(_os.path.dirname(_os.path.abspath(__file__))), "articles")
_MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août",
         "septembre", "octobre", "novembre", "décembre"]


def _date_fr(d):
    a, m, j = d.split("-")
    return f"{int(j)} {_MOIS[int(m) - 1]} {a}"


def _lire_articles():
    out = []
    if not _os.path.isdir(_ART_DIR):
        return out
    for n in sorted(_os.listdir(_ART_DIR), reverse=True):
        if not n.endswith(".html"):
            continue
        txt = open(_os.path.join(_ART_DIR, n), encoding="utf-8").read()
        m = _re.match(r"\s*<!--(.*?)-->(.*)", txt, _re.S)
        if not m:
            continue
        meta = dict(l.split(":", 1) for l in m.group(1).strip().splitlines() if ":" in l)
        meta = {k.strip(): v.strip() for k, v in meta.items()}
        slug = _re.sub(r"^\d{4}-\d{2}-\d{2}-", "", n[:-5])
        out.append({"fichier": f"conseils-{slug}.html", "titre": meta["titre"],
                    "description": meta["description"], "date": meta["date"], "corps": m.group(2).strip()})
    return out


ARTICLES = _lire_articles()

_liste = "".join(
    f'<li><a href="{a["fichier"]}"><strong>{a["titre"]}</strong></a><br>'
    f'<span>{_date_fr(a["date"])} · {a["description"]}</span></li>' for a in ARTICLES)
CONSEILS = legal("conseils", "Conseils", "Conseils pour laver ses sols",
                 "<p>Des réponses simples aux questions qu'on se pose en faisant le ménage.</p>"
                 f'<ul class="articles">{_liste}</ul>')

PAGES.append(("conseils.html", "Conseils pour laver ses sols, NOMBRILL", CONSEILS,
              {"desc": "Conseils pratiques pour laver carrelage, lino et tomettes avec une raclette et une serpillière."}))
for _a in ARTICLES:
    _corps = (f'<p class="date">Publié le {_date_fr(_a["date"])}</p>{_a["corps"]}'
              '<p class="fin"><a href="conseils.html">Tous les conseils</a> · '
              '<a href="produit.html">Découvrir NOMBRILL Classic</a></p>')
    PAGES.append((_a["fichier"], _html.escape(_a["titre"]) + ", NOMBRILL",
                  legal("art", '<a href="conseils.html">Conseils</a> / ' + _a["titre"], _a["titre"], _corps),
                  {"desc": _html.escape(_a["description"], quote=True)}))
