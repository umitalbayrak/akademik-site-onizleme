(function () {
  "use strict";
  var typeBtns = document.querySelectorAll(".filters button");
  var yearSel = document.getElementById("year-filter");
  var countEl = document.getElementById("pub-count");
  var label = document.documentElement.lang === "en" ? " shown" : " gösteriliyor";
  var state = { type: "all", year: "all" };

  function apply() {
    var shown = 0;
    document.querySelectorAll(".pub").forEach(function (p) {
      var ok = (state.type === "all" || p.dataset.k === state.type) &&
               (state.year === "all" || p.dataset.year === state.year);
      p.hidden = !ok;
      if (ok) shown++;
    });
    document.querySelectorAll(".yg").forEach(function (g) {
      g.hidden = !g.querySelector(".pub:not([hidden])");
    });
    if (countEl) countEl.textContent = shown + label;
  }
  typeBtns.forEach(function (b) {
    b.addEventListener("click", function () {
      typeBtns.forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
      state.type = b.dataset.f;
      apply();
    });
  });
  if (yearSel) yearSel.addEventListener("change", function () { state.year = yearSel.value; apply(); });
  document.querySelectorAll("[aria-controls^='bib-']").forEach(function (b) {
    b.addEventListener("click", function () {
      var el = document.getElementById(b.getAttribute("aria-controls"));
      var open = el.hidden;
      el.hidden = !open;
      b.setAttribute("aria-expanded", String(open));
    });
  });
  apply();
})();
