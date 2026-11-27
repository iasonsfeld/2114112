(function () {
  // feines fernsehrauschen, bei jedem laden neu
  var c = document.createElement("canvas");
  c.setAttribute("aria-hidden", "true");
  c.style.cssText = "position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:-1;pointer-events:none;image-rendering:pixelated;";
  document.body.prepend(c);

  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W = Math.min(Math.ceil(Math.max(innerWidth, screen.width || 0) * dpr), 3840);
  var H = Math.min(Math.ceil(Math.max(innerHeight, screen.height || 0) * dpr), 2400);
  c.width = W; c.height = H;
  var ctx = c.getContext("2d");
  var img = ctx.createImageData(W, H);
  var d = img.data;
  var basis = 14 + Math.random() * 6;

  for (var i = 0; i < W * H; i++) {
    var r = Math.random();
    var g = basis + r * r * 46;
    var j = i * 4;
    d[j] = d[j + 1] = d[j + 2] = g;
    d[j + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
})();
