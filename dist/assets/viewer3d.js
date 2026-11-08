/* NOMBRILL : vue 3D et démonstration des quatre gestes (page La pose).
   three.js r128 est chargé depuis cdnjs et jsDelivr au premier clic. */
(function () {
  "use strict";
  var MODEL = { cloth: "#EFE7D3", waffle: "#D9CCAE", border: "#1F4A35", ring: "#F2C230" };
  var stageEl = document.getElementById("stage");
  if (!stageEl) return;
  var canvas = document.getElementById("scene");
  var applyModel = function () {};
  var runDemo = function () {};
  var loaded = null;
  function loadScript(src, sri) {
    return new Promise(function (res, rej) {
      var el = document.createElement("script");
      el.src = src;
      el.integrity = sri; // empreinte vérifiée : le navigateur refuse un fichier modifié
      el.crossOrigin = "anonymous";
      el.onload = res;
      el.onerror = rej;
      document.head.appendChild(el);
    });
  }
  function ensure3D() {
    if (!loaded) {
      var lb = document.getElementById("load3d");
      if (lb) lb.textContent = "Chargement…";
      loaded = loadScript("https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js", "sha384-CI3ELBVUz9XQO+97x6nwMDPosPR5XvsxW2ua7N1Xeygeh1IxtgqtCkGfQY9WWdHu")
        .then(function () {
          return loadScript("https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js", "sha384-wagZhIFgY4hD+7awjQjR4e2E294y6J2HSnd8eTNc15ZubTeQeVRZwhQJ+W6hnBsf");
        })
        .then(function () {
          start3D();
          document.getElementById("poster").hidden = true;
          var sh = document.getElementById("stage-hint");
          if (sh && !HERO) sh.hidden = false;
        })
        .catch(function () {
          canvas.hidden = true;
          if (HERO) return; // l'accueil garde l'image fixe
          document.getElementById("poster").hidden = true;
          document.getElementById("fallback").hidden = false;
        });
    }
    return loaded;
  }
  var HERO = stageEl.dataset.mode === "hero";
  var lbtn = document.getElementById("load3d");
  if (lbtn) lbtn.addEventListener("click", function () {
    ensure3D();
  });
  document.querySelectorAll(".seg button").forEach(function (b) {
    b.addEventListener("click", function () {
      ensure3D();
    });
  });
  var dbtn = document.getElementById("demo-btn");
  if (dbtn) dbtn.addEventListener("click", function () {
    ensure3D().then(function () {
      runDemo();
    });
  });
  function start3D() {
    if (!window.THREE) throw new Error("three missing");
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(32, 1, 1, 1000);
    camera.position.set(62, 52, 82);

    var controls = new THREE.OrbitControls(camera, canvas);
    controls.target.set(0, 9, 0);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.minPolarAngle = 0.25;
    controls.maxPolarAngle = 1.45;
    controls.autoRotate = !reduce;
    controls.autoRotateSpeed = HERO ? 1.4 : 0.8;
    controls.update();

    scene.add(new THREE.HemisphereLight(0xffffff, 0x9a958a, 0.75));
    var sun = new THREE.DirectionalLight(0xffffff, 0.85);
    sun.position.set(40, 90, 50);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    var sc = sun.shadow.camera;
    sc.left = -60;
    sc.right = 60;
    sc.top = 60;
    sc.bottom = -60;
    sc.near = 10;
    sc.far = 250;
    sun.shadow.radius = 6;
    scene.add(sun);

    var floor = new THREE.Mesh(new THREE.PlaneGeometry(400, 400), new THREE.ShadowMaterial({ opacity: 0.14 }));
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.9;
    floor.receiveShadow = true;
    scene.add(floor);
    // carrelage : joints tous les 20 cm
    var tiles = new THREE.GridHelper(200, 10, 0x9a958a, 0x9a958a);
    tiles.position.y = -0.88;
    tiles.material.transparent = true;
    tiles.material.opacity = 0.22;
    scene.add(tiles);
    // seau, visible pendant l'essorage
    var bucketMat = new THREE.MeshStandardMaterial({
      color: 0x6b7a72,
      roughness: 0.6,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    var bucket = new THREE.Mesh(new THREE.CylinderGeometry(17, 13.5, 25, 48, 1, true), bucketMat);
    bucket.position.y = 11.6;
    var bucketBase = new THREE.Mesh(new THREE.CircleGeometry(13.5, 48), bucketMat);
    bucketBase.rotation.x = -Math.PI / 2;
    bucketBase.position.y = -0.85;
    scene.add(bucket);
    scene.add(bucketBase);

    /* Raclette */
    var H = 8,
      HD = 3.6; // hauteur et demi-profondeur de la raclette (cm)
    var raclette = new THREE.Group();
    var bodyMat = new THREE.MeshStandardMaterial({ color: 0x2a3330, roughness: 0.55, metalness: 0.1 });
    var rubberMat = new THREE.MeshStandardMaterial({ color: 0x15171c, roughness: 0.9 });
    var handleMat = new THREE.MeshStandardMaterial({ color: 0xc9ced8, roughness: 0.35, metalness: 0.6 });
    var bar = new THREE.Mesh(new THREE.BoxGeometry(45, H - 2.5, HD * 2 - 1), bodyMat); // un peu plus petite que le profil de la toile : ses arêtes ne traversent plus le tissu
    bar.position.y = 2 + (H - 2) / 2;
    bar.castShadow = true;
    raclette.add(bar);
    var blade = new THREE.Mesh(new THREE.BoxGeometry(46, 2, 1.2), rubberMat);
    blade.position.y = 1;
    raclette.add(blade);
    var socket = new THREE.Mesh(new THREE.CylinderGeometry(1.9, 2.3, 4, 24), bodyMat);
    socket.position.y = H + 1.6;
    raclette.add(socket);
    var handle = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 120, 24), handleMat);
    handle.position.y = H + 60;
    handle.castShadow = true;
    raclette.add(handle);
    scene.add(raclette);

    /* Cloth */
    var W = 60,
      D = 50,
      SX = 120,
      SZ = 100;
    var geo = new THREE.PlaneGeometry(W, D, SX, SZ);
    var pos = geo.attributes.position;
    var N = pos.count;
    var baseX = new Float32Array(N),
      baseZ = new Float32Array(N);
    for (var i = 0; i < N; i++) {
      baseX[i] = pos.getX(i);
      baseZ[i] = -pos.getY(i);
    }

    var texCanvas = document.createElement("canvas");
    texCanvas.width = 1200;
    texCanvas.height = 1000;
    var tex = new THREE.CanvasTexture(texCanvas);
    tex.encoding = THREE.sRGBEncoding;
    tex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());

    var bumpCanvas = document.createElement("canvas");
    bumpCanvas.width = 1200;
    bumpCanvas.height = 1000;
    var bumpTex = new THREE.CanvasTexture(bumpCanvas);
    var clothMat = new THREE.MeshStandardMaterial({
      map: tex,
      bumpMap: bumpTex,
      bumpScale: 0.35,
      roughness: 0.95,
      side: THREE.DoubleSide,
      alphaTest: 0.5,
      transparent: false,
    });
    var cloth = new THREE.Mesh(geo, clothMat);
    cloth.castShadow = true;
    cloth.receiveShadow = true;
    cloth.customDepthMaterial = new THREE.MeshDepthMaterial({
      depthPacking: THREE.RGBADepthPacking,
      map: tex,
      alphaTest: 0.5,
    });
    scene.add(cloth);

    var collarMat = new THREE.MeshStandardMaterial({ color: 0xe9b714, roughness: 0.4 });
    var collar = new THREE.Mesh(new THREE.TorusGeometry(1.75, 0.6, 16, 40), collarMat);
    collar.rotation.x = Math.PI / 2;
    collar.castShadow = true;
    scene.add(collar);

    function drawTexture(m) {
      var c = texCanvas.getContext("2d");
      var w = texCanvas.width,
        h = texCanvas.height,
        px = 20; // 20 px par cm
      c.clearRect(0, 0, w, h);
      c.save();
      roundRect(c, 0, 0, w, h, 3 * px);
      c.clip();
      c.fillStyle = m.cloth;
      c.fillRect(0, 0, w, h);
      // gaufrage nid d'abeille : alvéoles creuses, relief dans la carte de bosses
      var cell = 14;
      var b = bumpCanvas.getContext("2d");
      b.fillStyle = "#ffffff";
      b.fillRect(0, 0, w, h);
      for (var y = 0; y < h; y += cell) {
        for (var x = 0; x < w; x += cell) {
          c.fillStyle = m.waffle;
          c.fillRect(x + 2.5, y + 2.5, cell - 5, cell - 5);
          c.fillStyle = "rgba(0,0,0,0.06)";
          c.fillRect(x + 2.5, y + 2.5, cell - 5, 2);
          c.fillStyle = "rgba(255,255,255,0.45)";
          c.fillRect(x + 2.5, y + cell - 4.5, cell - 5, 2);
          b.fillStyle = "#5a5a5a";
          b.fillRect(x + 3, y + 3, cell - 6, cell - 6);
        }
      }
      bumpTex.needsUpdate = true;
      // bordure biais
      c.lineWidth = 1.1 * px;
      c.strokeStyle = m.border;
      roundRect(c, 0.55 * px, 0.55 * px, w - 1.1 * px, h - 1.1 * px, 2.5 * px);
      c.stroke();
      c.setLineDash([10, 8]);
      c.lineWidth = 2;
      c.strokeStyle = "rgba(255,255,255,0.7)";
      roundRect(c, 0.55 * px, 0.55 * px, w - 1.1 * px, h - 1.1 * px, 2.5 * px);
      c.stroke();
      c.setLineDash([]);
      // fentes
      c.strokeStyle = "#1b1f2a";
      c.lineCap = "round";
      c.lineWidth = 7;
      [15 * px, w - 15 * px].forEach(function (sx) {
        c.beginPath();
        c.moveTo(sx, h / 2 - 3 * px);
        c.lineTo(sx, h / 2 + 3 * px);
        c.stroke();
      });
      // fente centrale bordée de biais, du trou au milieu d'un grand côté, et 3 pressions
      c.strokeStyle = m.border;
      c.lineCap = "butt";
      c.lineWidth = 0.9 * px;
      c.beginPath();
      c.moveTo(w / 2, h / 2);
      c.lineTo(w / 2, h);
      c.stroke();
      [12, 17, 22].forEach(function (d) {
        var sy = h / 2 + d * px;
        c.beginPath();
        c.arc(w / 2 - 0.9 * px, sy, 0.55 * px, 0, Math.PI * 2);
        c.fillStyle = "#FAFAF7";
        c.fill();
        c.lineWidth = 2;
        c.strokeStyle = "rgba(0,0,0,0.25)";
        c.stroke();
      });
      // couronne
      c.beginPath();
      c.arc(w / 2, h / 2, 4 * px, 0, Math.PI * 2);
      c.fillStyle = m.ring;
      c.globalAlpha = 0.9;
      c.fill();
      c.globalAlpha = 1;
      c.setLineDash([6, 6]);
      c.strokeStyle = "rgba(255,255,255,0.8)";
      c.lineWidth = 2.5;
      c.beginPath();
      c.arc(w / 2, h / 2, 3.4 * px, 0, Math.PI * 2);
      c.stroke();
      c.setLineDash([]);
      // trou
      c.globalCompositeOperation = "destination-out";
      c.beginPath();
      c.arc(w / 2, h / 2, 1.5 * px, 0, Math.PI * 2);
      c.fill();
      c.globalCompositeOperation = "source-over";
      c.restore();
      tex.needsUpdate = true;
      collarMat.color.set(m.ring);
    }
    function roundRect(c, x, y, w, h, r) {
      c.beginPath();
      c.moveTo(x + r, y);
      c.lineTo(x + w - r, y);
      c.quadraticCurveTo(x + w, y, x + w, y + r);
      c.lineTo(x + w, y + h - r);
      c.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      c.lineTo(x + r, y + h);
      c.quadraticCurveTo(x, y + h, x, y + h - r);
      c.lineTo(x, y + r);
      c.quadraticCurveTo(x, y, x + r, y);
      c.closePath();
    }

    /* States: precomputed vertex positions */
    var LIFT = 26; // hauteur de la raclette pendant l'essorage
    function profile(s, o) {
      // demi-section arrondie de la raclette : dessus, angle, flanc, angle, dessous
      var r = 1.4,
        L1 = HD - r,
        A = (Math.PI * r) / 2,
        L2 = H - 2 * r;
      if (s <= L1) return [s, H + o];
      s -= L1;
      if (s <= A) {
        var t = s / r;
        return [L1 + Math.sin(t) * (r + o), H - r + Math.cos(t) * (r + o)];
      }
      s -= A;
      if (s <= L2) return [HD + o, H - r - s];
      s -= L2;
      if (s <= A) {
        var t2 = s / r;
        return [L1 + Math.cos(t2) * (r + o), r - Math.sin(t2) * (r + o)];
      }
      s -= A;
      return [L1 - s, -o];
    }
    function build(kind) {
      var out = new Float32Array(N * 3);
      for (var i = 0; i < N; i++) {
        var x = baseX[i],
          z = baseZ[i],
          X,
          Y,
          Z;
        if (kind === "flat") {
          X = x;
          Z = z;
          Y = H + 0.35 + Math.sin(x * 0.25) * 0.15 + Math.cos(z * 0.3) * 0.15;
        } else if (kind === "drape") {
          var sgn = z < 0 ? -1 : 1,
            s = Math.abs(z);
          var o = 0.35 + (sgn < 0 ? 0.25 : 0);
          var p = profile(s, o);
          Z = sgn * Math.max(p[0], -HD + 0.8);
          Y = p[1];
          X = x;
          var ex = Math.max(0, Math.abs(x) - 23);
          if (ex > 0) {
            // les bords courts retombent sur les côtés
            var bend = Math.min(ex / 6, 1);
            X = Math.sign(x) * (23 + Math.cos((bend * Math.PI) / 2) * ex * 0.9);
            Y = Y - Math.sin((bend * Math.PI) / 2) * ex * 0.95;
          }
          Y += Math.sin(x * 0.4 + z * 0.2) * 0.08;
        } else {
          var r = Math.sqrt(x * x + z * z),
            a = Math.atan2(z, x);
          var rr = 1.9 + r * 0.16;
          var aa = a + r * 0.42;
          X = Math.cos(aa) * rr;
          Z = Math.sin(aa) * rr;
          Y = LIFT - 0.4 - r * 0.65;
        }
        out[i * 3] = X;
        out[i * 3 + 1] = Y;
        out[i * 3 + 2] = Z;
      }
      return out;
    }
    var STATES = { flat: build("flat"), drape: build("drape"), twist: build("twist") };
    var LIFTS = { flat: 0, drape: 0, twist: LIFT };

    var from = "drape",
      to = "drape",
      t = 1,
      dur = reduce ? 0.001 : 1.1;
    var arr = pos.array;
    function setState(name) {
      if (name === to && t >= 1) return;
      // freeze the current pose as the new origin
      STATES.__now = new Float32Array(arr);
      LIFTS.__now = raclette.position.y;
      from = "__now";
      to = name;
      t = 0;
      document.querySelectorAll(".seg button").forEach(function (b) {
        b.setAttribute("aria-pressed", b.dataset.state === name ? "true" : "false");
      });
    }
    document.querySelectorAll(".seg button").forEach(function (b) {
      b.addEventListener("click", function () {
        setState(b.dataset.state);
      });
    });

    function ease(x) {
      return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    }

    function apply(e) {
      var A = STATES[from],
        B = STATES[to];
      for (var k = 0; k < arr.length; k++) arr[k] = A[k] + (B[k] - A[k]) * e;
      pos.needsUpdate = true;
      geo.computeVertexNormals();
      var ly = LIFTS[from] + (LIFTS[to] - LIFTS[from]) * e;
      raclette.position.y = ly;
      curLift = ly;
    }
    var curLift = 0,
      clothLift = 0,
      clothLiftT = 0,
      collarLift = 0,
      collarLiftT = 0;
    apply(1);

    /* Démonstration des quatre gestes */
    var STEP_MS = 3800;
    var captionEl = document.getElementById("demo-caption");
    var numEl = document.getElementById("demo-num");
    var textEl = document.getElementById("demo-text");
    var hintEl = document.getElementById("stage-hint");
    var demoBtn = document.getElementById("demo-btn");
    var STEPS = [
      {
        text: "Clipser. Ouvrez les trois pressions et glissez la toile autour du manche, sans le dévisser.",
        enter: function () {
          setState("flat");
          clothLift = 30;
          clothLiftT = 0;
          collarLift = 44;
          collarLiftT = 44;
        },
      },
      {
        text: "Bloquer. Descendez le collier jusqu'à la raclette : la toile ne bouge plus.",
        enter: function () {
          setState("flat");
          collarLiftT = 0;
        },
      },
      {
        text: "Rabattre. Les bords passent dans les deux fentes et couvrent la lame en caoutchouc.",
        enter: function () {
          setState("drape");
          collarLiftT = 0;
        },
      },
      {
        text: "Essorer. Dans le seau, tournez le manche : la toile s'enroule sur elle-même et l'eau s'en va.",
        enter: function () {
          setState("twist");
        },
      },
    ];
    var demo = null;
    function demoStep(i) {
      if (i >= STEPS.length) {
        endDemo();
        return;
      }
      demo = { i: i, t0: performance.now() };
      STEPS[i].enter();
      numEl.textContent = String(i + 1);
      textEl.textContent = STEPS[i].text;
      captionEl.querySelectorAll(".demo-steps i").forEach(function (el, k) {
        el.className = k <= i ? "on" : "";
      });
      captionEl.hidden = false;
      hintEl.hidden = true;
    }
    function endDemo() {
      demo = null;
      captionEl.hidden = true;
      hintEl.hidden = false;
      demoBtn.textContent = "Démonstration";
      clothLiftT = 0;
      collarLiftT = 0;
      setState("drape");
    }
    runDemo = function () {
      if (demo) {
        endDemo();
        return;
      }
      demoBtn.textContent = "Arrêter";
      demoStep(0);
    };

    applyModel = function () {
      drawTexture(MODEL);
    };
    applyModel();

    function resize() {
      var r = stageEl.getBoundingClientRect();
      var w = Math.max(1, r.width),
        h = Math.max(1, r.height);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.position.setLength(HERO ? (w / h < 0.95 ? 118 : 96) : w / h < 0.95 ? 128 : 112);
      camera.updateProjectionMatrix();
    }
    if (window.ResizeObserver) new ResizeObserver(resize).observe(stageEl);
    else window.addEventListener("resize", resize);
    resize();

    canvas.addEventListener("pointerdown", function () {
      controls.autoRotate = false;
    });

    var clock = new THREE.Clock();
    var visible = true;
    if (window.IntersectionObserver) {
      new IntersectionObserver(function (en) {
        visible = en[0].isIntersecting;
      }).observe(stageEl);
    }
    function loop() {
      requestAnimationFrame(loop);
      var dt = Math.min(clock.getDelta(), 0.05);
      if (!visible) return;
      if (t < 1) {
        t = Math.min(1, t + dt / dur);
        apply(ease(t));
      }
      var k = reduce ? 1 : Math.min(1, dt * 2.5);
      clothLift += (clothLiftT - clothLift) * k;
      collarLift += (collarLiftT - collarLift) * k;
      cloth.position.y = clothLift;
      collar.position.set(0, curLift + H + 0.9 + collarLift, 0);
      bucketMat.opacity = 0.38 * Math.min(1, curLift / LIFT);
      bucket.visible = bucketBase.visible = bucketMat.opacity > 0.01;
      if (demo && performance.now() - demo.t0 > STEP_MS) demoStep(demo.i + 1);
      controls.update();
      renderer.render(scene, camera);
    }
    loop();
  }

  if (location.hash === "#demo") {
    ensure3D().then(function () {
      runDemo();
    });
  } else if (window.matchMedia("(min-width: 768px)").matches) {
    ensure3D();
  }
})();
