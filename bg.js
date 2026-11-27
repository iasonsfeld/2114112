(function () {
  var c = document.createElement("canvas");
  c.setAttribute("aria-hidden", "true");
  c.style.cssText = "position:fixed;inset:-10%;width:120%;height:120%;z-index:-1;pointer-events:none;filter:blur(60px);";
  document.body.prepend(c);
  var W = 24, H = 16;
  c.width = W; c.height = H;
  var ctx = c.getContext("2d");
  var img = ctx.createImageData(W, H);
  var basis = 14 + Math.random() * 10;
  for (var i = 0; i < W * H; i++) {
    var v = basis + Math.pow(Math.random(), 2.2) * 38;
    img.data[i * 4] = img.data[i * 4 + 1] = img.data[i * 4 + 2] = v;
    img.data[i * 4 + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
})();
