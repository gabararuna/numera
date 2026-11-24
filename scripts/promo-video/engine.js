// Numera Ecosystem Deterministic Motion Engine (--ease-numera: cubic-bezier(0.22, 1, 0.36, 1))

window.NumeraEngine = (function () {
  function clamp01(v) {
    return v < 0 ? 0 : v > 1 ? 1 : v;
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  // Exact cubic-bezier solver using Newton-Raphson + bisection fallback
  function cubicBezier(x1, y1, x2, y2) {
    function sampleX(t) {
      return ((1 - 3 * x2 + 3 * x1) * t + (3 * x2 - 6 * x1)) * t * t + 3 * x1 * t;
    }
    function sampleY(t) {
      return ((1 - 3 * y2 + 3 * y1) * t + (3 * y2 - 6 * y1)) * t * t + 3 * y1 * t;
    }
    function slopeX(t) {
      return 3 * (1 - 3 * x2 + 3 * x1) * t * t + 2 * (3 * x2 - 6 * x1) * t + 3 * x1;
    }
    return function (x) {
      if (x <= 0) return 0;
      if (x >= 1) return 1;
      var t = x;
      for (var i = 0; i < 6; i++) {
        var dx = sampleX(t) - x;
        var d = slopeX(t);
        if (Math.abs(dx) < 1e-6) return sampleY(t);
        if (Math.abs(d) < 1e-6) break;
        t -= dx / d;
      }
      var lo = 0, hi = 1;
      t = clamp01(x);
      for (var j = 0; j < 14; j++) {
        var cur = sampleX(t);
        if (Math.abs(cur - x) < 1e-6) break;
        if (x > cur) lo = t;
        else hi = t;
        t = 0.5 * (lo + hi);
      }
      return sampleY(t);
    };
  }

  var easeNumera = cubicBezier(0.22, 1, 0.36, 1);
  var easeInOut = cubicBezier(0.45, 0, 0.55, 1);

  function remapLinear(t, start, end) {
    if (end <= start) return t >= end ? 1 : 0;
    return clamp01((t - start) / (end - start));
  }

  function remap(t, start, end) {
    return easeNumera(remapLinear(t, start, end));
  }

  function remapInOut(t, start, end) {
    return easeInOut(remapLinear(t, start, end));
  }

  function sceneEnv(t, start, end, fadeInDur, fadeOutDur) {
    var fi = fadeInDur === undefined ? 0.36 : fadeInDur;
    var fo = fadeOutDur === undefined ? 0.36 : fadeOutDur;
    var active = t >= start - 0.02 && t <= end + 0.02;
    var alphaIn = fi > 0 ? remap(t, start, start + fi) : 1;
    var alphaOut = fo > 0 ? 1 - remapInOut(t, end - fo, end) : 1;
    var alpha = clamp01(Math.min(alphaIn, alphaOut));
    return {
      active: active && alpha > 0.002,
      alpha: alpha,
      localT: Math.max(0, t - start),
      p: remapLinear(t, start, end),
    };
  }

  function setScene(el, env) {
    if (!el) return;
    if (!env.active) {
      el.style.display = 'none';
      el.style.opacity = '0';
      return;
    }
    el.style.display = 'flex';
    el.style.opacity = env.alpha.toFixed(4);
  }

  function setReveal(el, progress, dy) {
    if (!el) return;
    var p = clamp01(progress);
    var offset = (dy === undefined ? 24 : dy) * (1 - p);
    el.style.opacity = p.toFixed(4);
    el.style.transform = 'translate3d(0,' + offset.toFixed(2) + 'px,0)';
  }

  function setStrokeDraw(path, length, progress) {
    if (!path) return;
    var p = clamp01(progress);
    path.style.strokeDasharray = String(length);
    path.style.strokeDashoffset = (length * (1 - p)).toFixed(2);
  }

  return {
    clamp01: clamp01,
    lerp: lerp,
    easeNumera: easeNumera,
    easeInOut: easeInOut,
    remapLinear: remapLinear,
    remap: remap,
    remapInOut: remapInOut,
    sceneEnv: sceneEnv,
    setScene: setScene,
    setReveal: setReveal,
    setStrokeDraw: setStrokeDraw,
  };
})();
