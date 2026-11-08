/* NOMBRILL : page d'administration (prix, statut, stock, textes, bandeau, livraison). */
(function () {
  "use strict";
  var box = document.getElementById("admin");
  var note = document.getElementById("admin-note");
  var C = window.NBR.contenu;
  var TIERS = ["1 serpillière", "2", "3", "4 ou 5", "6 à 10", "11 à 25"];
  function cents(v) {
    var n = Math.round(parseFloat(String(v).replace(",", ".")) * 100);
    return isNaN(n) ? null : n;
  }
  function eur(c) {
    return (c / 100).toFixed(2).replace(".", ",");
  }
  function say(t, bad) {
    note.textContent = t;
    note.dataset.state = bad ? "bad" : "ok";
  }
  if (!window.claude || typeof window.claude.use !== "function") {
    say("Sur ce site, le contenu se gère dans le Google Sheet « NOMBRILL, contenu du site ». Les changements apparaissent en quelques minutes.");
    var a = document.getElementById("sheet-link");
    if (a && window.NBR_SHEET) {
      a.href = window.NBR_SHEET.url;
      a.hidden = false;
    }
    return;
  }
  Promise.all([window.claude.use("user"), window.claude.use("db")]).then(function (r) {
    var user = r[0], db = r[1];
    if (!db) {
      say("La base de données n'est pas disponible dans cet affichage. Ouvrez le site sur claude.ai en étant connecté.", true);
      return;
    }
    (user ? user.canEdit() : Promise.resolve(false)).then(function (ok) {
      if (!ok) {
        say("Cette page est réservée au propriétaire du site.", true);
        return;
      }
      say("Connecté en administrateur. Les changements s'affichent tout de suite sur le site.");
      render(db);
    });
  });

  function render(db) {
    box.hidden = false;
    var tb = document.getElementById("rows");
    tb.innerHTML = "";
    Object.keys(C.produits)
      .sort(function (a, b) { return (C.produits[a].ordre || 9) - (C.produits[b].ordre || 9); })
      .forEach(function (id) {
        var p = C.produits[id];
        var tr = document.createElement("tr");
        tr.innerHTML =
          '<th scope="row"></th>' +
          '<td><input type="text" inputmode="decimal" class="i-prix" aria-label="Prix en euros"></td>' +
          '<td><select class="i-statut" aria-label="Statut"><option value="disponible">Disponible</option><option value="bientot">Plus tard</option><option value="rupture">Rupture</option></select></td>' +
          '<td><input type="number" min="0" class="i-stock" aria-label="Stock" placeholder="non suivi"></td>' +
          '<td><textarea rows="2" class="i-desc" aria-label="Description"></textarea></td>' +
          '<td><button type="button" class="btn primary sm">Enregistrer</button></td>';
        tr.querySelector("th").textContent = p.nom;
        tr.querySelector(".i-prix").value = eur(p.prix);
        tr.querySelector(".i-statut").value = p.statut;
        tr.querySelector(".i-stock").value = typeof p.stock === "number" ? p.stock : "";
        tr.querySelector(".i-desc").value = p.description;
        var btn = tr.querySelector("button");
        btn.addEventListener("click", function () {
          var prix = cents(tr.querySelector(".i-prix").value);
          if (prix == null || prix <= 0) return say("Prix invalide pour " + p.nom + ".", true);
          var st = tr.querySelector(".i-stock").value;
          var data = Object.assign({}, p, {
            prix: prix,
            statut: tr.querySelector(".i-statut").value,
            stock: st === "" ? null : Math.max(0, parseInt(st, 10)),
            description: tr.querySelector(".i-desc").value.trim(),
          });
          btn.disabled = true;
          db.doc("catalogue/" + id).set(data).then(function () {
            say(p.nom + " enregistré.");
          }, function (e) {
            say("Échec de l'enregistrement : " + (e && e.code ? e.code : "erreur"), true);
          }).then(function () { btn.disabled = false; });
        });
        tb.appendChild(tr);
      });

    var bOn = document.getElementById("b-on"), bTxt = document.getElementById("b-txt");
    bOn.checked = !!C.site.bandeau.actif;
    bTxt.value = C.site.bandeau.texte || "";
    var ship = document.getElementById("ship");
    ship.innerHTML = "";
    TIERS.forEach(function (t, i) {
      var l = document.createElement("label");
      l.innerHTML = "<span></span><input type=\"text\" inputmode=\"decimal\">";
      l.querySelector("span").textContent = t;
      l.querySelector("input").value = eur(C.site.livraison[i]);
      ship.appendChild(l);
    });
    document.getElementById("save-site").onclick = function () {
      var liv = [].map.call(ship.querySelectorAll("input"), function (i) { return cents(i.value); });
      if (liv.some(function (v) { return v == null || v < 0; })) return say("Un tarif de livraison est invalide.", true);
      var b = this;
      b.disabled = true;
      db.doc("reglages/site").set({ bandeau: { actif: bOn.checked, texte: bTxt.value.trim() }, livraison: liv }).then(function () {
        say("Bandeau et livraison enregistrés.");
      }, function (e) {
        say("Échec de l'enregistrement : " + (e && e.code ? e.code : "erreur"), true);
      }).then(function () { b.disabled = false; });
    };
  }
})();
