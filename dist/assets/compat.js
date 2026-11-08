/* NOMBRILL : vérificateur de compatibilité. */
(function () {
  "use strict";
  var form = document.getElementById("compat-form");
  var dia = document.getElementById("dia");
  function fmt(n) {
    return String(n).replace(".", ",") + " mm";
  }
  function check() {
    var fix = form.querySelector('input[name="fix"]:checked').value;
    var width = form.querySelector('input[name="width"]:checked').value;
    var d = parseFloat(dia.value);
    document.getElementById("dia-out").textContent = fmt(d);
    var state = "ok", pill = "Compatible", title, text;
    var size = Math.round(d), collar = size + " mm";
    var pose = fix === "visse" ? "Par les pressions, ou en dévissant" : "Par les pressions, sans démonter";
    var model = width === "45" ? "NOMBRILL Classic" : "NOMBRILL Pro";
    if (fix === "etrier" || fix === "cote") {
      state = "no"; pill = "Non compatible"; title = "Pas pour cette raclette";
      text = fix === "etrier" ? "Une raclette à deux branches ne passe pas par un seul trou central." : "Un manche fixé sur le côté ne passe pas par le centre de la toile.";
      collar = "Sans objet"; pose = "Sans objet";
    } else if (width === "more") {
      state = "no"; pill = "Non compatible"; title = "Raclette trop large";
      text = "Au-delà de 55 cm, même le modèle Pro de 70 × 60 cm ne couvre pas toute la lame.";
      collar = "Sans objet"; pose = "Sans objet";
    } else if (d < 20 || d > 28) {
      state = "maybe"; pill = "Hors plage"; title = model;
      text = "Le collier existe de 20 à 28 mm. Vérifiez la mesure : la plupart des manches font entre 22 et 25 mm.";
      collar = d < 20 ? "Le plus petit (20 mm) serait trop large" : "Le plus grand (28 mm) serait trop serré";
    } else {
      title = model;
      text = width === "45" ? "Votre raclette est dans la plage prévue pour Classic." : "Pour une raclette de 46 à 55 cm, il faudra le modèle Pro, plus grand. Il arrive après Classic.";
    }
    var v = document.getElementById("verdict");
    v.dataset.state = state;
    document.getElementById("v-pill").textContent = pill;
    document.getElementById("v-title").textContent = title;
    document.getElementById("v-text").textContent = text;
    document.getElementById("v-collar").textContent = collar;
    document.getElementById("v-pose").textContent = pose;
    var go = document.getElementById("v-go");
    if (state === "ok" && width === "45") {
      go.hidden = false;
      go.href = "produit.html?collier=" + size;
      go.textContent = "Choisir Classic, collier " + size + " mm";
    } else go.hidden = true;
  }
  form.addEventListener("input", check);
  form.addEventListener("change", check);
  form.addEventListener("submit", function (e) { e.preventDefault(); });
  check();
})();
