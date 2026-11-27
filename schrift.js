(function () {
  // die schrift selbst rauscht leise: hellweißes korn, bei jedem laden neu,
  // und wo sich text verändert, verschiebt sich das korn ein wenig.
  var G = 96;
  var c = document.createElement("canvas");
  c.width = c.height = G;
  var ctx = c.getContext("2d");
  var bild = ctx.createImageData(G, G), d = bild.data;
  for (var i = 0; i < d.length; i += 4) {
    var r = Math.random(), v;
    if (r < 0.62) v = 255;                       // meist reines weiß
    else if (r < 0.93) v = 228 + Math.random() * 27;
    else v = 175 + Math.random() * 50;          // wenige dunklere körner
    d[i] = d[i + 1] = d[i + 2] = v; d[i + 3] = 255;
  }
  ctx.putImageData(bild, 0, 0);

  var st = document.createElement("style");
  st.textContent =
    ".korn{color:transparent!important;background-image:url(" + c.toDataURL() + ");" +
    "background-size:" + G + "px " + G + "px;-webkit-background-clip:text;background-clip:text;" +
    "-webkit-text-fill-color:transparent;image-rendering:pixelated;}" +
    ".korn::selection,.korn *::selection{background:rgba(255,255,255,.28);}";
  document.head.appendChild(st);

  var AUS = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, HTML: 1, BODY: 1, CANVAS: 1, svg: 1 };

  function schieben(el) {
    el.style.backgroundPosition = Math.floor(Math.random() * G) + "px " + Math.floor(Math.random() * G) + "px";
  }

  function tauglich(el) {
    if (!el || el.nodeType !== 1 || AUS[el.tagName]) return false;
    var s = getComputedStyle(el);
    return s.backgroundImage === "none" && (s.backgroundColor === "rgba(0, 0, 0, 0)" || s.backgroundColor === "transparent");
  }

  function markieren(wurzel, neu) {
    var w = document.createTreeWalker(wurzel, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) { return /\S/.test(n.nodeValue) ? 1 : 3; }
    });
    var n;
    while ((n = w.nextNode())) {
      var el = n.parentElement;
      if (!el.classList.contains("korn") && tauglich(el)) { el.classList.add("korn"); schieben(el); }
      else if (neu && el.classList.contains("korn")) schieben(el);
    }
  }

  function start() {
    markieren(document.body, false);
    new MutationObserver(function (liste) {
      liste.forEach(function (m) {
        var ziel = m.type === "characterData" ? m.target.parentElement : m.target;
        if (ziel && ziel.nodeType === 1) markieren(ziel, true);
      });
    }).observe(document.body, { childList: true, characterData: true, subtree: true });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
