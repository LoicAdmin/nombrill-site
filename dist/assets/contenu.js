/* NOMBRILL : contenu modifiable (prix, statut, stock, bandeau, frais de port).

   D'où vient le contenu, dans cet ordre :
   1. sur claude.ai : la base de données de l'artefact, modifiable depuis admin.html ;
   2. sur votre hébergement (Netlify, OVH...) : le Google Sheet ci-dessous ;
   3. si aucune des deux ne répond : les valeurs par défaut de NBR_DEFAUT. */
window.NBR_SHEET = {
  id: "1E7Sm6e1FPkUkTMNng51IEm2enns2mp1Crw5UhJHddXs",
  url: "https://docs.google.com/spreadsheets/d/1E7Sm6e1FPkUkTMNng51IEm2enns2mp1Crw5UhJHddXs/edit",
};

window.NBR_DEFAUT = {
  produits: {
    classic: { nom: "Classic", who: "Foyers", statut: "disponible", prix: 1290, unite: "", stock: null, description: "Coton gaufré, 60 × 50 cm, pour le ménage de tous les jours.", ordre: 1 },
    micro: { nom: "Duo Micro", who: "Sols fragiles", statut: "bientot", prix: 1490, unite: "", stock: null, description: "Microfibre double face, 60 × 50 cm. On la retourne sur le manche sans l'enlever, pour le parquet vitrifié et le béton ciré.", ordre: 2 },
    pro: { nom: "Pro", who: "Agents d'entretien", statut: "bientot", prix: 3490, unite: "les 4", stock: null, description: "70 × 60 cm, 450 g/m², collier renforcé et bordure au code couleur d'hygiène, pour les raclettes jusqu'à 55 cm.", ordre: 3 },
    dose: { nom: "Dose", who: "Lavage malin", statut: "bientot", prix: 1290, unite: "", stock: null, description: "Une poche autour de l'œillet accueille une pastille de savon noir, qui se dilue pendant le lavage.", ordre: 4 },
    nature: { nom: "Nature", who: "Zéro plastique", statut: "bientot", prix: 1390, unite: "", stock: null, description: "Lin et chanvre non teints, collier en caoutchouc naturel, sans plastique dans la toile.", ordre: 5 },
  },
  site: {
    bandeau: { actif: true, texte: "Lancement en préparation : laissez votre e-mail en bas de page pour être prévenu de l'ouverture." },
    livraison: [549, 759, 929, 959, 1119, 1739],
  },
};

(function () {
  "use strict";
  var TIERS = [1, 2, 3, 5, 10, 25];
  var STATUTS = { disponible: "Disponible", bientot: "Plus tard", rupture: "Rupture de stock" };
  var C = JSON.parse(JSON.stringify(window.NBR_DEFAUT));
  window.NBR = { contenu: C, source: "defaut" };

  function euro(c) {
    var v = (c / 100).toFixed(2).replace(".", ",");
    return v.replace(",00", ",00") + " €";
  }
  function flash(el) {
    el.classList.remove("flash");
    void el.offsetWidth;
    el.classList.add("flash");
  }
  function setText(el, t) {
    if (el.textContent !== t) {
      var had = el.textContent !== "";
      el.textContent = t;
      if (had && window.NBR.source === "base") flash(el);
    }
  }

  function apply() {
    var P = C.produits;
    document.querySelectorAll("[data-price]").forEach(function (el) {
      var p = P[el.dataset.price];
      if (p) setText(el, euro(p.prix) + (p.unite && el.hasAttribute("data-unit") ? " " + p.unite : ""));
    });
    document.querySelectorAll("[data-status]").forEach(function (el) {
      var p = P[el.dataset.status];
      if (!p) return;
      setText(el, el.dataset.status === "classic" && p.statut === "disponible" ? "Disponible au lancement" : STATUTS[p.statut] || "");
      el.dataset.state = p.statut;
    });
    document.querySelectorAll("[data-desc]").forEach(function (el) {
      var p = P[el.dataset.desc];
      if (p) setText(el, p.description);
    });
    document.querySelectorAll("[data-stock]").forEach(function (el) {
      var p = P[el.dataset.stock];
      if (!p) return;
      if (p.statut === "rupture") {
        el.hidden = false;
        setText(el, "En rupture de stock pour le moment.");
      } else if (typeof p.stock === "number" && p.stock > 0 && p.stock <= 30) {
        el.hidden = false;
        setText(el, "Plus que " + p.stock + " en stock.");
      } else el.hidden = true;
    });
    document.querySelectorAll("[data-ship]").forEach(function (el) {
      var i = TIERS.indexOf(parseInt(el.dataset.ship, 10));
      if (i >= 0 && C.site.livraison[i] != null) setText(el, euro(C.site.livraison[i]));
    });
    var add = document.getElementById("add");
    if (add) {
      var off = P.classic.statut === "rupture";
      add.disabled = off;
      add.textContent = off ? "Indisponible" : "Ajouter au panier";
    }
    var b = document.getElementById("annonce");
    if (b) {
      var on = C.site.bandeau && C.site.bandeau.actif && C.site.bandeau.texte;
      b.hidden = !on;
      if (on) b.querySelector("span").textContent = C.site.bandeau.texte;
    }
    // panier : prix et frais de port à jour
    if (window.SHOP) {
      window.SHOP.products.classic.price = P.classic.prix;
      window.SHOP.shipping.tiers = TIERS.map(function (n, i) {
        return { upTo: n, price: C.site.livraison[i] };
      });
    }
    if (window.NOMBRILL && window.NOMBRILL.refresh) window.NOMBRILL.refresh();
    document.dispatchEvent(new CustomEvent("nbr:contenu"));
  }
  apply();

  /* Google Sheet (site hébergé hors de claude.ai) */
  var STATUT_SHEET = { disponible: "disponible", "plus tard": "bientot", rupture: "rupture" };
  function gviz(sheet) {
    var u = "https://docs.google.com/spreadsheets/d/" + window.NBR_SHEET.id + "/gviz/tq?tqx=out:json&headers=1&sheet=" + encodeURIComponent(sheet);
    var ctl = "AbortController" in window ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctl) ctl.abort(); }, 8000);
    return fetch(u, { signal: ctl ? ctl.signal : undefined, cache: "no-store" })
      .then(function (r) {
        if (!r.ok) throw new Error("http " + r.status);
        return r.text();
      })
      .then(function (t) {
        clearTimeout(timer);
        var j = JSON.parse(t.slice(t.indexOf("{"), t.lastIndexOf("}") + 1));
        if (j.status !== "ok") throw new Error("sheet");
        var cols = j.table.cols.map(function (c) { return (c.label || "").trim(); });
        return j.table.rows.map(function (r) {
          var o = {};
          cols.forEach(function (c, i) { o[c] = r.c[i] ? r.c[i].v : null; });
          return o;
        });
      });
  }
  function num(v) {
    if (typeof v === "number") return v;
    var n = parseFloat(String(v == null ? "" : v).replace(",", "."));
    return isNaN(n) ? null : n;
  }
  function fromSheet() {
    var CACHE = "nombrill-contenu";
    try {
      var c = JSON.parse(sessionStorage.getItem(CACHE) || "null");
      if (c && c.produits) { C.produits = c.produits; C.site = c.site; apply(); }
    } catch (e) {}
    Promise.all([gviz("Toiles"), gviz("Réglages")]).then(function (r) {
      r[0].forEach(function (row) {
        var id = String(row["Code"] || "").trim();
        if (!id) return;
        var prix = num(row["Prix (€)"]), stock = num(row["Stock"]);
        var cur = C.produits[id] || {};
        C.produits[id] = {
          nom: row["Nom"] || cur.nom || id,
          who: row["Pour qui"] || cur.who || "",
          statut: STATUT_SHEET[String(row["Statut"] || "").trim().toLowerCase()] || cur.statut || "bientot",
          prix: prix != null && prix > 0 ? Math.round(prix * 100) : cur.prix,
          unite: row["Unité"] || "",
          stock: stock == null ? null : Math.max(0, Math.round(stock)),
          description: row["Description"] || cur.description || "",
          ordre: num(row["Ordre"]) || cur.ordre || 9,
        };
      });
      var liv = [];
      r[1].forEach(function (row) {
        var k = String(row["Réglage"] || "").trim().toLowerCase(), v = row["Valeur"];
        if (k === "bandeau affiché") C.site.bandeau.actif = String(v).trim().toLowerCase() === "oui";
        else if (k === "texte du bandeau") C.site.bandeau.texte = String(v || "").trim();
        else if (k.indexOf("livraison") === 0) liv.push(Math.round((num(v) || 0) * 100));
      });
      if (liv.length === 6 && liv.every(function (x) { return x > 0; })) C.site.livraison = liv;
      window.NBR.source = "sheet";
      try { sessionStorage.setItem(CACHE, JSON.stringify(C)); } catch (e) {}
      apply();
    }).catch(function () {
      /* tableau injoignable ou non partagé : on garde les valeurs déjà affichées */
    });
  }

  /* Base de données de l'artefact (claude.ai uniquement) */
  if (!window.claude || typeof window.claude.use !== "function") {
    if (window.NBR_SHEET && window.NBR_SHEET.id) fromSheet();
    return;
  }
  window.claude.use("db").then(function (db) {
    if (!db) return;
    window.NBR.db = db;
    db.collection("catalogue").onSnapshot(
      function (snap) {
        if (!snap.docs.length) return; // base vide : on garde les valeurs par défaut
        snap.docs.forEach(function (d) {
          var v = d.data();
          if (C.produits[d.id]) Object.assign(C.produits[d.id], v);
          else C.produits[d.id] = v;
        });
        window.NBR.source = "base";
        apply();
      },
      function () {}
    );
    db.doc("reglages/site").onSnapshot(
      function (snap) {
        if (!snap.exists) return;
        var v = snap.data();
        if (v.bandeau) C.site.bandeau = v.bandeau;
        if (Array.isArray(v.livraison) && v.livraison.length === 6) C.site.livraison = v.livraison;
        window.NBR.source = "base";
        apply();
      },
      function () {}
    );
  });
})();
