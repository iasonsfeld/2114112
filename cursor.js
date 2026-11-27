(function () {
  // eigene, ruhige zeiger statt lupe und hand
  function svg(inhalt, g) {
    return 'url("data:image/svg+xml,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="' + g + '" height="' + g + '" viewBox="0 0 ' + g + ' ' + g + '">' + inhalt + '</svg>'
    ) + '") ' + g / 2 + ' ' + g / 2;
  }
  var dunkel = 'stroke="#000" stroke-opacity="0.55"';
  // ring: für links und knöpfe
  var ring = svg(
    '<circle cx="10" cy="10" r="6" fill="none" ' + dunkel + ' stroke-width="3"/>' +
    '<circle cx="10" cy="10" r="6" fill="none" stroke="#fff" stroke-width="1"/>', 20);
  // ring mit punkt: werk öffnen
  var oeffnen = svg(
    '<circle cx="14" cy="14" r="9" fill="none" ' + dunkel + ' stroke-width="3"/>' +
    '<circle cx="14" cy="14" r="9" fill="none" stroke="#fff" stroke-width="1"/>' +
    '<circle cx="14" cy="14" r="1.6" fill="#fff" ' + dunkel + ' stroke-width="1"/>', 28);
  // punkt: im betrachter
  var punkt = svg(
    '<circle cx="8" cy="8" r="2.2" fill="#fff" ' + dunkel + ' stroke-width="1.5"/>', 16);

  var css =
    "a,button,[role=button]{cursor:" + ring + ",pointer !important;}" +
    ".raster button{cursor:" + oeffnen + ",zoom-in !important;}" +
    ".betrachter,.betrachter.ziehen{cursor:" + punkt + ",crosshair !important;}" +
    ".image-links img{cursor:inherit !important;}";
  var st = document.createElement("style");
  st.textContent = css;
  document.head.appendChild(st);
})();
