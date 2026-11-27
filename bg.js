(function () {
  // weiches, stark verschwommenes rauschen, bei jedem laden neu
  var c = document.createElement("canvas");
  c.setAttribute("aria-hidden", "true");
  c.style.cssText = "position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:-1;pointer-events:none;";
  document.body.prepend(c);

  var W = 480, H = Math.round(480 * innerHeight / Math.max(innerWidth, 1));
  c.width = W; c.height = H;
  c.style.filter = "blur(1.5px)";
  var ctx = c.getContext("2d");
  var img = ctx.createImageData(W, H);

  function gitter(gx, gy) {
    var g = [];
    for (var i = 0; i < (gx + 3) * (gy + 3); i++) g.push(Math.random());
    return { gx: gx, gy: gy, g: g };
  }
  function glatt(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
  function wert(o, x, y) {
    var fx = x * o.gx, fy = y * o.gy;
    var ix = Math.floor(fx), iy = Math.floor(fy);
    var tx = glatt(fx - ix), ty = glatt(fy - iy);
    var w = o.gx + 3;
    var a = o.g[iy * w + ix], b = o.g[iy * w + ix + 1];
    var c2 = o.g[(iy + 1) * w + ix], d = o.g[(iy + 1) * w + ix + 1];
    return (a + (b - a) * tx) * (1 - ty) + (c2 + (d - c2) * tx) * ty;
  }

  var o1 = gitter(8, 5), o2 = gitter(22, 14), o3 = gitter(60, 38);
  var basis = 16 + Math.random() * 6;
  var spanne = 22 + Math.random() * 10;

  for (var y = 0; y < H; y++) {
    for (var x = 0; x < W; x++) {
      var u = x / W, v = y / H;
      var n = wert(o1, u, v) * 0.45 + wert(o2, u, v) * 0.35 + wert(o3, u, v) * 0.2;
      var g = basis + n * spanne + (Math.random() - 0.5) * 1.5; // leichtes dithering gegen streifen
      var i = (y * W + x) * 4;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = g;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
})();
