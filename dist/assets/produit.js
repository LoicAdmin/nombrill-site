/* NOMBRILL : fiche produit (galerie, taille du collier, quantité, ajout au panier). */
(function () {
  "use strict";
  var main = document.getElementById("main-img");
  document.querySelectorAll(".thumbs button").forEach(function (b) {
    b.addEventListener("click", function () {
      main.src = b.dataset.src;
      main.alt = b.dataset.alt;
      document.querySelectorAll(".thumbs button").forEach(function (o) {
        o.setAttribute("aria-pressed", o === b ? "true" : "false");
      });
    });
  });
  var qty = document.getElementById("qty");
  function clamp() {
    var v = parseInt(qty.value, 10);
    qty.value = String(Math.max(1, Math.min(20, isNaN(v) ? 1 : v)));
  }
  document.getElementById("minus").addEventListener("click", function () {
    qty.value = String(parseInt(qty.value, 10) - 1);
    clamp();
  });
  document.getElementById("plus").addEventListener("click", function () {
    qty.value = String(parseInt(qty.value, 10) + 1);
    clamp();
  });
  qty.addEventListener("change", clamp);
  // taille transmise par la page Compatibilité (produit.html?collier=24)
  var m = /collier=(\d+)/.exec(location.search);
  if (m) {
    var r = document.querySelector('.sizes input[value="' + m[1] + '"]');
    if (r) r.checked = true;
  }
  document.getElementById("add").addEventListener("click", function () {
    var c = document.querySelector('.sizes input:checked');
    window.NOMBRILL.add("classic", parseInt(c.value, 10), parseInt(qty.value, 10));
  });
})();
