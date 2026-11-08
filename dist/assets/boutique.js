/* NOMBRILL : réglages de la boutique, panier et paiement, communs à toutes les pages.

   À remplir avant d'ouvrir la vente (UN des deux moyens de paiement suffit) :
   - paypalEmail : adresse du compte PayPal professionnel qui reçoit les paiements ;
   - stripeLink  : lien de paiement Stripe (réglez alors les frais de port dans Stripe) ;
   - returnUrl   : adresse de la page de confirmation, par exemple https://nombrill.fr/merci.html
   - shipping    : frais de port en centimes selon le nombre de serpillières
                   (tarifs Colissimo en ligne 2026, France métropolitaine, à domicile). */
window.SHOP = {
  paypalEmail: "",
  stripeLink: "",
  returnUrl: "",
  shipping: {
    label: "Colissimo à domicile",
    tiers: [
      { upTo: 1, price: 549 },
      { upTo: 2, price: 759 },
      { upTo: 3, price: 929 },
      { upTo: 5, price: 959 },
      { upTo: 10, price: 1119 },
      { upTo: 25, price: 1739 },
    ],
  },
  maxItems: 25,
  products: {
    classic: { name: "NOMBRILL Classic", price: 1290, img: "img/flat.webp" },
  },
};

(function () {
  "use strict";
  var SHOP = window.SHOP;
  var KEY = "nombrill-panier";
  var cart = [];
  try {
    cart = JSON.parse(localStorage.getItem(KEY) || "[]") || [];
  } catch (e) {
    cart = [];
  }
  cart = cart.filter(function (l) {
    return SHOP.products[l.id] && l.qty > 0 && l.collar >= 20 && l.collar <= 28;
  });
  // page de confirmation : la commande est payée, le panier est vidé
  if (document.body.hasAttribute("data-clear-cart")) {
    cart = [];
    try {
      localStorage.removeItem(KEY);
    } catch (e) {}
  }

  function euro(c) {
    return (c / 100).toFixed(2).replace(".", ",") + " €";
  }
  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(cart));
    } catch (e) {}
  }
  function count() {
    return cart.reduce(function (s, l) {
      return s + l.qty;
    }, 0);
  }
  function shipping() {
    var n = count();
    if (!n) return 0;
    var t = SHOP.shipping.tiers.filter(function (x) {
      return n <= x.upTo;
    })[0];
    return t ? t.price : SHOP.shipping.tiers[SHOP.shipping.tiers.length - 1].price;
  }
  function subtotal() {
    return cart.reduce(function (s, l) {
      return s + SHOP.products[l.id].price * l.qty;
    }, 0);
  }
  function payHref() {
    if (!cart.length) return "";
    if (SHOP.paypalEmail) {
      var p = ["cmd=_cart", "upload=1", "currency_code=EUR", "charset=utf-8", "business=" + encodeURIComponent(SHOP.paypalEmail)];
      cart.forEach(function (l, i) {
        var pr = SHOP.products[l.id];
        p.push("item_name_" + (i + 1) + "=" + encodeURIComponent(pr.name + ", collier " + l.collar + " mm"));
        p.push("amount_" + (i + 1) + "=" + (pr.price / 100).toFixed(2));
        p.push("quantity_" + (i + 1) + "=" + l.qty);
      });
      p.push("handling_cart=" + (shipping() / 100).toFixed(2), "no_shipping=2", "lc=FR");
      if (SHOP.returnUrl) p.push("return=" + encodeURIComponent(SHOP.returnUrl));
      return "https://www.paypal.com/cgi-bin/webscr?" + p.join("&");
    }
    if (SHOP.stripeLink) {
      var ref = cart
        .map(function (l) {
          return "CL" + l.collar + "x" + l.qty;
        })
        .join("_");
      return SHOP.stripeLink + (SHOP.stripeLink.indexOf("?") < 0 ? "?" : "&") + "client_reference_id=" + ref;
    }
    return "";
  }

  /* Tiroir du panier, ajouté à chaque page */
  var d = document.createElement("div");
  d.className = "drawer";
  d.id = "drawer";
  d.innerHTML =
    '<div class="scrim" data-close></div>' +
    '<section class="panel" role="dialog" aria-modal="true" aria-labelledby="drawer-title">' +
    '<header><h2 id="drawer-title">Panier</h2><button type="button" class="x" data-close aria-label="Fermer le panier">×</button></header>' +
    '<div class="lines" id="lines"></div>' +
    '<div class="totals">' +
    '<div class="r"><span>Sous-total</span><span id="t-sub">0,00 €</span></div>' +
    '<div class="r"><span id="t-ship-l">Livraison</span><span id="t-ship">–</span></div>' +
    '<div class="r big"><span>Total</span><span id="t-tot">0,00 €</span></div>' +
    '<label><input type="checkbox" id="cgv-ok"><span>J\'accepte les <a href="cgv.html">conditions générales de vente</a>, droit de rétractation de 14 jours compris.</span></label>' +
    '<a class="btn primary" id="pay" href="#" aria-disabled="true">Commander avec obligation de paiement</a>' +
    '<p class="note" id="pay-off">La vente en ligne ouvre bientôt. Votre panier reste enregistré sur cet appareil. <a href="#lancement" data-close>Laissez votre e-mail</a> pour être prévenu le jour de l\'ouverture.</p>' +
    "</div></section>";
  document.body.appendChild(d);

  var lastFocus = null;
  function open() {
    render();
    lastFocus = document.activeElement;
    d.classList.add("open");
    document.body.style.overflow = "hidden";
    d.querySelector(".x").focus();
  }
  function close() {
    d.classList.remove("open");
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
  d.addEventListener("click", function (e) {
    if (e.target.closest("[data-close]")) close();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && d.classList.contains("open")) close();
  });

  function render() {
    document.querySelectorAll("[data-cart-count]").forEach(function (el) {
      el.textContent = String(count());
    });
    var box = document.getElementById("lines");
    box.innerHTML = cart.length ? "" : '<p class="empty">Votre panier est vide.</p>';
    cart.forEach(function (l, i) {
      var pr = SHOP.products[l.id];
      var row = document.createElement("div");
      row.className = "line";
      row.innerHTML =
        '<img alt="" width="64" height="64"><div><h3></h3><div class="meta"></div>' +
        '<div class="qty"><button type="button" aria-label="Retirer une serpillière">−</button><span></span><button type="button" aria-label="Ajouter une serpillière">+</button></div></div>' +
        '<div><div class="lp"></div><button type="button" class="rm">Supprimer</button></div>';
      row.querySelector("img").src = pr.img;
      row.querySelector("h3").textContent = pr.name;
      row.querySelector(".meta").textContent = "Collier " + l.collar + " mm, " + euro(pr.price) + " l'unité";
      row.querySelector(".qty span").textContent = String(l.qty);
      row.querySelector(".lp").textContent = euro(pr.price * l.qty);
      var b = row.querySelectorAll(".qty button");
      b[0].onclick = function () {
        l.qty--;
        if (l.qty <= 0) cart.splice(i, 1);
        save();
        render();
      };
      b[1].onclick = function () {
        if (count() < SHOP.maxItems) l.qty++;
        save();
        render();
      };
      row.querySelector(".rm").onclick = function () {
        cart.splice(i, 1);
        save();
        render();
      };
      box.appendChild(row);
    });
    var s = subtotal(),
      sh = shipping();
    document.getElementById("t-sub").textContent = euro(s);
    document.getElementById("t-ship-l").textContent = "Livraison, " + SHOP.shipping.label;
    document.getElementById("t-ship").textContent = cart.length ? euro(sh) : "–";
    document.getElementById("t-tot").textContent = euro(s + sh);
    updatePay();
  }
  function updatePay() {
    var href = payHref();
    var ok = !!href && document.getElementById("cgv-ok").checked;
    var a = document.getElementById("pay");
    a.setAttribute("href", ok ? href : "#");
    a.setAttribute("aria-disabled", ok ? "false" : "true");
    var live = !!(SHOP.paypalEmail || SHOP.stripeLink);
    document.getElementById("pay-off").hidden = live;
    a.hidden = !live;
    document.querySelectorAll("[data-soon]").forEach(function (el) { el.hidden = live; });
    document.getElementById("cgv-ok").closest("label").hidden = !live;
  }
  document.getElementById("cgv-ok").addEventListener("change", updatePay);

  document.querySelectorAll("[data-cart-open]").forEach(function (b) {
    b.addEventListener("click", open);
  });

  window.NOMBRILL = {
    add: function (id, collar, qty) {
      qty = Math.max(0, Math.min(qty, SHOP.maxItems - count()));
      if (qty > 0) {
        var line = cart.filter(function (l) {
          return l.id === id && l.collar === collar;
        })[0];
        if (line) line.qty += qty;
        else cart.push({ id: id, collar: collar, qty: qty });
        save();
      }
      open();
    },
    euro: euro,
    refresh: render,
  };
  render();

  /* Inscription au lancement (Netlify Forms), envoyée sans quitter la page */
  document.querySelectorAll("form[data-launch]").forEach(function (f) {
    f.addEventListener("submit", function (e) {
      if (!window.fetch) return;
      e.preventDefault();
      var btn = f.querySelector("button");
      btn.disabled = true;
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(f)).toString(),
      })
        .then(function (r) {
          if (!r.ok) throw new Error(r.status);
          f.querySelector(".row").hidden = true;
          f.querySelector(".ok").hidden = false;
        })
        .catch(function () {
          btn.disabled = false;
          f.submit();
        });
    });
  });

  /* Menu sur téléphone */
  var mb = document.getElementById("menu-btn"),
    mn = document.getElementById("mobile-nav");
  if (mb && mn) {
    mb.addEventListener("click", function () {
      var o = mn.classList.toggle("open");
      mb.setAttribute("aria-expanded", o ? "true" : "false");
      mb.setAttribute("aria-label", o ? "Fermer le menu" : "Ouvrir le menu");
      document.body.style.overflow = o ? "hidden" : "";
    });
  }
})();
