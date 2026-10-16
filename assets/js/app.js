/* ROVENTO — app.js (بدون مكتبات خارجية) */
(function () {
  "use strict";
  var CFG = window.ROVENTO_CONFIG;

  /* الأسعار الفعلية من Supabase (جدول products) هي المرجع. لو مش متاحة نكمل بأسعار config.js */
  function applyDbPrices(rows) {
    (rows || []).forEach(function (r) {
      var p = CFG.products.filter(function (x) { return x.id === r.id; })[0];
      if (!p) return;
      p.prices = { 250: r.price_250, 500: r.price_500, 1000: r.price_1000 };
      p.confirmed = { 250: false, 500: false, 1000: false };
    });
  }
  function prefetchPrices(done) {
    var fired = false;
    function fin() { if (!fired) { fired = true; done(); } }
    try {
      if (CFG.supabaseUrl && CFG.supabaseKey && window.supabase) {
        var c = window.supabase.createClient(CFG.supabaseUrl, CFG.supabaseKey, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } });
        setTimeout(fin, 1800);
        c.from("products").select("id,price_250,price_500,price_1000").eq("active", true).then(function (r) {
          if (r && r.data && r.data.length) applyDbPrices(r.data);
          fin();
        }, fin);
        return;
      }
    } catch (e) { /* ignore */ }
    fin();
  }
  prefetchPrices(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- helpers ---------- */
  var nf = new Intl.NumberFormat("ar-EG");
  function num(n) { return nf.format(n); }
  function sizeLabel(s) { return s === 1000 ? "١ كجم" : num(s) + " جم"; }
  function money(n) { return num(n) + " جنيه"; }
  function byId(id) { return CFG.products.filter(function (p) { return p.id === id; })[0]; }
  var toastTimer;
  function toast(msg) {
    var t = $("#toast"); t.textContent = msg; t.hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { t.hidden = true; }, 3200);
  }

  /* ---------- trust bar ---------- */
  var ICONS = {
    truck: '<path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" /><circle cx="7.5" cy="17.5" r="1.8"/><circle cx="17.5" cy="17.5" r="1.8"/>',
    chat: '<path d="M4 5h16v11H9l-5 4z"/>',
    bean: '<path d="M12 3c4 0 7 3.5 7 8s-3 10-7 10-7-5.5-7-10 3-8 7-8Z"/><path d="M12 5c-2 4 2 6 0 14"/>',
    label: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 9h8M8 13h8M8 17h4"/>',
    cash: '<rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/>'
  };
  $("#trustGrid").innerHTML = CFG.trustItems.map(function (t) {
    return '<div class="trust-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      (ICONS[t.icon] || ICONS.bean) + '</svg><div><strong>' + t.title + '</strong><span>' + t.text + '</span></div></div>';
  }).join("");

  /* ---------- shipping ---------- */
  var FEE = Number(CFG.shippingFee) || 0;
  function shippingFor(sub) { return CFG.freeShippingThreshold && sub >= CFG.freeShippingThreshold ? 0 : FEE; }
  $$("[data-shipping-text]").forEach(function (el) { el.textContent = FEE ? "ثابت " + money(FEE) : "مجاني"; });

  /* ---------- products ---------- */
  var state = { filter: "all", sel: {} };
  CFG.products.forEach(function (p) { state.sel[p.id] = 250; });

  function roastHtml(p) {
    if (!p.roast) return "";
    return '<div class="roast" aria-label="درجة التحميص ' + p.roast + '">' +
      ["LIGHT", "MEDIUM", "DARK"].map(function (r) { return '<i class="' + (r === p.roast ? "on" : "") + '">' + r + "</i>"; }).join("") + "</div>";
  }
  function priceHtml(p) {
    var s = state.sel[p.id];
    var est = CFG.showEstimateBadge && !p.confirmed[s] ? '<span class="est">سعر تقديري</span>' : "";
    return '<span class="price">' + num(p.prices[s]) + '<small>جنيه</small></span>' + est;
  }
  function renderProducts() {
    var list = CFG.products.filter(function (p) { return state.filter === "all" || p.line === state.filter; });
    $("#productGrid").innerHTML = list.map(function (p) {
      return '<article class="card reveal" data-id="' + p.id + '">' +
        '<div class="card-media"><img src="' + p.img + '" alt="عبوة ' + p.name + '" width="1000" height="1000" loading="lazy">' +
        (p.featured ? '<span class="ribbon">الأكثر طلبًا</span>' : "") + "</div>" +
        '<div class="card-body">' +
        '<p class="card-tag">' + p.tag + "</p>" +
        "<h3>" + p.name + "</h3>" +
        '<p class="card-type">' + p.type + "</p>" + roastHtml(p) +
        '<p class="card-desc">' + p.desc + "</p>" +
        '<div class="sizes" role="group" aria-label="اختيار الحجم">' +
        CFG.sizes.map(function (s) {
          return '<button class="size" type="button" data-size="' + s + '" aria-pressed="' + (state.sel[p.id] === s) + '">' + sizeLabel(s) + "</button>";
        }).join("") + "</div>" +
        '<div class="price-row" data-price>' + priceHtml(p) + "</div>" +
        '<button class="btn btn-primary add" type="button" data-add>أضف للسلة</button>' +
        "</div></article>";
    }).join("");
    observeReveal();
  }
  $("#productGrid").addEventListener("click", function (e) {
    var card = e.target.closest(".card"); if (!card) return;
    var p = byId(card.getAttribute("data-id"));
    var sizeBtn = e.target.closest(".size");
    if (sizeBtn) {
      state.sel[p.id] = Number(sizeBtn.getAttribute("data-size"));
      $$(".size", card).forEach(function (b) { b.setAttribute("aria-pressed", String(b === sizeBtn)); });
      $("[data-price]", card).innerHTML = priceHtml(p);
      return;
    }
    if (e.target.closest("[data-add]")) {
      addToCart(p.id, state.sel[p.id]);
      toast("اتضاف للسلة: " + p.name + " — " + sizeLabel(state.sel[p.id]));
    }
  });
  function setFilter(f) {
    state.filter = f;
    $$(".chip").forEach(function (c) {
      var on = c.getAttribute("data-filter") === f;
      c.classList.toggle("is-on", on); c.setAttribute("aria-selected", String(on));
    });
    renderProducts();
  }
  $$(".chip").forEach(function (c) { c.addEventListener("click", function () { setFilter(c.getAttribute("data-filter")); }); });
  $$("[data-filter-link]").forEach(function (a) {
    a.addEventListener("click", function () { setFilter(a.getAttribute("data-filter-link")); });
  });

  /* ---------- cart ---------- */
  var KEY = "rovento_cart_v1";
  var cart = [];
  try { cart = JSON.parse(localStorage.getItem(KEY) || "[]").filter(function (i) { return byId(i.id) && CFG.sizes.indexOf(i.size) > -1 && i.qty > 0; }); } catch (e) { cart = []; }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (e) { /* ignore */ } }
  function addToCart(id, size) {
    var f = cart.filter(function (i) { return i.id === id && i.size === size; })[0];
    if (f) f.qty += 1; else cart.push({ id: id, size: size, qty: 1 });
    save(); renderCart();
  }
  function total() { return cart.reduce(function (t, i) { return t + byId(i.id).prices[i.size] * i.qty; }, 0); }
  function count() { return cart.reduce(function (t, i) { return t + i.qty; }, 0); }
  function renderCart() {
    var c = count();
    [$("#cartCount")].forEach(function (el) { el.hidden = !c; el.textContent = num(c); });
    var fc = $("#floatCount"); fc.hidden = !c; fc.textContent = num(c);
    var body = $("#cartBody"), foot = $("#cartFoot");
    if (!cart.length) {
      body.innerHTML = '<p class="empty">السلة فاضية. اختار منتجك وحجمك وأضفه هنا.</p>';
      foot.hidden = true; return;
    }
    foot.hidden = false;
    body.innerHTML = cart.map(function (i, idx) {
      var p = byId(i.id);
      return '<div class="line"><img src="' + p.img + '" alt="" width="64" height="64">' +
        '<div><h4>' + p.name + '</h4><small>' + sizeLabel(i.size) + " • " + money(p.prices[i.size]) + "</small>" +
        '<div class="qty"><button type="button" data-q="-1" data-i="' + idx + '" aria-label="تقليل الكمية">−</button><span>' + num(i.qty) +
        '</span><button type="button" data-q="1" data-i="' + idx + '" aria-label="زيادة الكمية">+</button></div></div>' +
        '<div style="text-align:end"><div class="line-price">' + money(p.prices[i.size] * i.qty) + '</div>' +
        '<button class="rm" type="button" data-rm="' + idx + '">حذف</button></div></div>';
    }).join("");
    var sub = total(), ship = shippingFor(sub);
    $("#cartSub").textContent = money(sub);
    $("#cartShip").textContent = ship ? money(ship) : "مجاني";
    $("#cartTotal").textContent = money(sub + ship);
  }
  $("#cartBody").addEventListener("click", function (e) {
    var q = e.target.closest("[data-q]"), r = e.target.closest("[data-rm]");
    if (q) {
      var it = cart[Number(q.getAttribute("data-i"))]; it.qty += Number(q.getAttribute("data-q"));
      if (it.qty <= 0) cart.splice(Number(q.getAttribute("data-i")), 1);
      save(); renderCart();
    } else if (r) { cart.splice(Number(r.getAttribute("data-rm")), 1); save(); renderCart(); }
  });

  /* drawer */
  var drawer = $("#drawer"), overlay = $("#overlay"), lastFocus = null;
  function openCart() {
    lastFocus = document.activeElement;
    drawer.classList.add("is-open"); drawer.setAttribute("aria-hidden", "false"); overlay.hidden = false;
    document.body.style.overflow = "hidden"; drawer.focus();
  }
  function closeCart() {
    drawer.classList.remove("is-open"); drawer.setAttribute("aria-hidden", "true"); overlay.hidden = true;
    document.body.style.overflow = ""; if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  $("#openCart").addEventListener("click", openCart);
  $$("[data-open-cart]").forEach(function (b) {
    b.addEventListener("click", function () {
      if (!cart.length && b.id === "floatCta") { location.hash = "#products"; toast("اختار منتجك الأول"); return; }
      openCart();
    });
  });
  $("#closeCart").addEventListener("click", closeCart);
  overlay.addEventListener("click", closeCart);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && drawer.classList.contains("is-open")) closeCart(); });

  /* WhatsApp order */
  function waLink(text) {
    var n = (CFG.whatsappNumber || "").replace(/\D/g, "");
    return n ? "https://wa.me/" + n + (text ? "?text=" + encodeURIComponent(text) : "") : "";
  }
  /* ---------- Supabase: دخول جوجل + حفظ الطلبات ---------- */
  var sb = null, user = null;
  try {
    if (CFG.supabaseUrl && CFG.supabaseKey && window.supabase) {
      sb = window.supabase.createClient(CFG.supabaseUrl, CFG.supabaseKey, { auth: { persistSession: true, detectSessionInUrl: true, flowType: "pkce" } });
    }
  } catch (e) { sb = null; }
  var authBtn = $("#authBtn"), acctMenu = $("#acctMenu");
  function renderAuth() {
    if (!sb) { authBtn.hidden = true; return; }
    authBtn.hidden = false;
    var meta = (user && user.user_metadata) || {};
    var nm = meta.full_name || meta.name || (user && user.email) || "";
    $("#authLabel").textContent = user ? (nm.split(" ")[0] || "حسابي") : "دخول بجوجل";
    authBtn.classList.toggle("is-in", !!user);
    $("#acctName").textContent = user ? nm + (user.email && nm !== user.email ? " — " + user.email : "") : "";
    if (!user) acctMenu.hidden = true;
  }
  function prefillFromUser() {
    if (!user) return;
    var meta = user.user_metadata || {}, nm = meta.full_name || meta.name || "";
    if (nm && !F.name.value) F.name.value = nm;
    sb.from("profiles").select("phone,governorate,address").eq("id", user.id).maybeSingle().then(function (r) {
      var d = r && r.data; if (!d) return;
      if (d.phone && !F.phone.value) F.phone.value = d.phone;
      if (d.governorate && !gov.value) gov.value = d.governorate;
      if (d.address && !F.addr.value) F.addr.value = d.address;
    }, function () { /* ignore */ });
  }
  authBtn.addEventListener("click", function () {
    if (!sb) return;
    if (!user) {
      sb.auth.signInWithOAuth({ provider: "google", options: { redirectTo: window.location.origin + window.location.pathname } })
        .then(function (r) { if (r && r.error) toast("تعذر الدخول بجوجل. حاول تاني بعد شوية"); });
      return;
    }
    acctMenu.hidden = !acctMenu.hidden; authBtn.setAttribute("aria-expanded", String(!acctMenu.hidden));
  });
  $("#signOutBtn").addEventListener("click", function () { sb.auth.signOut().then(function () { toast("تم تسجيل الخروج"); }); });
  document.addEventListener("click", function (e) { if (!e.target.closest(".acct")) acctMenu.hidden = true; });
  function saveOrder(phone) {
    if (!sb) return Promise.resolve(null);
    var items = cart.map(function (i) { return { id: i.id, size: i.size, qty: i.qty, expected_price: byId(i.id).prices[i.size] }; });
    var call = sb.rpc("create_order", { p_name: F.name.value.trim(), p_phone: phone, p_governorate: gov.value, p_address: F.addr.value.trim(), p_notes: F.notes.value.trim(), p_items: items })
      .then(function (r) { if (r && r.error && window.console) console.warn("create_order:", r.error.message); return r && !r.error ? r.data : null; }, function () { return null; });
    if (user) sb.from("profiles").update({ phone: phone, governorate: gov.value, address: F.addr.value.trim(), updated_at: new Date().toISOString() }).eq("id", user.id).then(function () {}, function () {});
    /* لو الاتصال بطيء ما نعطلش العميل أكتر من ٣ ثواني */
    return Promise.race([call, new Promise(function (res) { setTimeout(function () { res(null); }, 3000); })]);
  }

  /* محافظات + استرجاع بيانات العميل */
  var gov = $("#custGov");
  (CFG.governorates || []).forEach(function (g) { var o = document.createElement("option"); o.value = g; o.textContent = g; gov.appendChild(o); });
  var CKEY = "rovento_customer_v1", F = { name: $("#custName"), phone: $("#custPhone"), gov: gov, addr: $("#custAddress"), notes: $("#custNotes") };
  try { var sv = JSON.parse(localStorage.getItem(CKEY) || "{}"); F.name.value = sv.name || ""; F.phone.value = sv.phone || ""; F.addr.value = sv.addr || ""; if (sv.gov) gov.value = sv.gov; } catch (e) { /* ignore */ }

  function latin(str) { return String(str).replace(/[٠-٩]/g, function (d) { return String(d.charCodeAt(0) - 1632); }).replace(/[۰-۹]/g, function (d) { return String(d.charCodeAt(0) - 1776); }); }
  function setErr(field, errId, msg) {
    var e = $(errId); field.setAttribute("aria-invalid", msg ? "true" : "false");
    e.textContent = msg || ""; e.hidden = !msg; return !msg;
  }
  function validate() {
    var ok = true, first = null;
    function chk(good, field, id, msg) { var r = setErr(field, id, good ? "" : msg); if (!r) { ok = false; first = first || field; } }
    chk(F.name.value.trim().split(/\s+/).filter(Boolean).length >= 2 && F.name.value.trim().length >= 5, F.name, "#errName", "اكتب الاسم بالكامل (اسمين على الأقل)");
    var ph = latin(F.phone.value).replace(/[\s-]/g, "").replace(/^\+?20/, "0");
    chk(/^01[0125]\d{8}$/.test(ph), F.phone, "#errPhone", "اكتب رقم موبايل مصري صحيح (١١ رقم يبدأ بـ 01)");
    chk(!!gov.value, gov, "#errGov", "اختار المحافظة");
    chk(F.addr.value.trim().length >= 10, F.addr, "#errAddr", "اكتب العنوان بالتفصيل (المنطقة والشارع ورقم العمارة)");
    return { ok: ok, first: first, phone: ph };
  }
  Object.keys(F).forEach(function (k) { F[k].addEventListener("input", function () { if (F[k].getAttribute("aria-invalid") === "true") validate(); }); });

  function buildMessage(phone, orderNo) {
    var sub = total(), ship = shippingFor(sub);
    var lines = cart.map(function (i) {
      var p = byId(i.id);
      return "• " + p.name + " — " + sizeLabel(i.size) + " × " + num(i.qty) + " = " + money(p.prices[i.size] * i.qty);
    });
    var msg = "طلب جديد من موقع روفينتو" + (orderNo ? " (رقم " + num(orderNo) + ")" : "") + "\n\nالمنتجات:\n" + lines.join("\n") +
      "\n\nثمن المنتجات: " + money(sub) + "\nالشحن: " + (ship ? money(ship) : "مجاني") + "\nالإجمالي: " + money(sub + ship) +
      "\n\nبيانات الشحن:\nالاسم: " + F.name.value.trim() + "\nالموبايل: " + phone + "\nالمحافظة: " + gov.value + "\nالعنوان: " + F.addr.value.trim() +
      (F.notes.value.trim() ? "\nملاحظات: " + F.notes.value.trim() : "");
    return msg;
  }
  $("#cartFoot").addEventListener("submit", function (e) {
    e.preventDefault();
    if (!cart.length) return;
    var v = validate();
    if (!v.ok) { v.first.focus(); toast("كمّل بيانات الشحن الأول"); return; }
    try { localStorage.setItem(CKEY, JSON.stringify({ name: F.name.value.trim(), phone: v.phone, gov: gov.value, addr: F.addr.value.trim() })); } catch (x) { /* ignore */ }
    if (!waLink("")) { toast("رقم الواتساب لسه متضافش. أضفه في assets/js/config.js"); return; }
    var btn = $("#sendOrder"); btn.disabled = true; btn.textContent = "جاري تجهيز طلبك...";
    saveOrder(v.phone).then(function (res) {
      btn.disabled = false; btn.textContent = "أكمل الطلب على الواتساب";
      var link = waLink(buildMessage(v.phone, res && res.order_no));
      $("#waFallback").href = link; $("#sentBox").hidden = false;
      var w = null;
      try { w = window.open(link, "_blank", "noopener"); } catch (x) { w = null; }
      if (!w) window.location.href = link;
    });
  });
  $("#clearCart").addEventListener("click", function () { cart = []; save(); renderCart(); $("#sentBox").hidden = true; closeCart(); toast("تم تفضية السلة. شكرًا لثقتك في روفينتو"); });

  /* ---------- floating whatsapp + footer ---------- */
  var waBase = waLink("");
  if (waBase) { var fab = $("#waFab"); fab.href = waBase + "?text=" + encodeURIComponent("مرحبًا روفينتو، عندي استفسار"); fab.target = "_blank"; fab.rel = "noopener"; fab.hidden = false; }
  var soc = [];
  if (waBase) soc.push('<a href="' + waBase + '" target="_blank" rel="noopener">واتساب</a>');
  if (CFG.facebookUrl) soc.push('<a href="' + CFG.facebookUrl + '" target="_blank" rel="noopener">فيسبوك</a>');
  if (CFG.instagramUrl) soc.push('<a href="' + CFG.instagramUrl + '" target="_blank" rel="noopener">إنستجرام</a>');
  $("#footSocial").innerHTML = soc.join("");
  $("#siteUrlText").textContent = (CFG.siteUrl || "").replace(/^https?:\/\//, "");
  $("#year").textContent = num(new Date().getFullYear()).replace(/٬/g, "");

  /* ---------- banners تفاعلية ---------- */
  function priceNode(el, p, size, label) {
    var est = CFG.showEstimateBadge && !p.confirmed[size] ? ' <span class="est">سعر تقديري</span>' : "";
    el.innerHTML = (label ? "<small>" + label + "</small> " : "") + '<span class="price bump">' + num(p.prices[size]) + "<small>جنيه</small></span>" + est;
  }
  /* بانر ١: حجم العبوة */
  (function () {
    var p = byId("gold-21"), size = 250, box = $("#b1Sizes"), img = $("#b1Img"), seal = $("#b1Seal");
    var scale = { 250: .82, 500: .91, 1000: 1 };
    box.innerHTML = CFG.sizes.map(function (s) { return '<button class="size" type="button" data-size="' + s + '" aria-pressed="false">' + sizeLabel(s) + "</button>"; }).join("");
    function set(s) {
      size = s;
      $$(".size", box).forEach(function (b) { b.setAttribute("aria-pressed", String(Number(b.getAttribute("data-size")) === s)); });
      img.style.transform = "scale(" + (scale[s] || 1) + ")";
      seal.innerHTML = "<span>" + sizeLabel(s) + "</span>";
      priceNode($("#b1Price"), p, s);
    }
    box.addEventListener("click", function (e) { var b = e.target.closest(".size"); if (b) set(Number(b.getAttribute("data-size"))); });
    $("#b1Add").addEventListener("click", function () { addToCart(p.id, size); toast("اتضاف للسلة: " + p.name + " — " + sizeLabel(size)); });
    set(250);
  })();
  /* بانرات ٢ و٣: اختيار المنتج */
  function picker(prefix, ids, withMeter) {
    var box = $("#" + prefix + "Picks"), stack = $("#" + prefix + "Stack"), cur = ids[withMeter ? 1 : 0], size = 250;
    box.innerHTML = ids.map(function (id) {
      var p = byId(id); var t = withMeter ? p.name.replace("GOLD ", "") + " • " + ({ LIGHT: "خفيفة", MEDIUM: "متوسطة", DARK: "غامقة" }[p.roast]) : p.name;
      return '<button class="pick" type="button" data-id="' + id + '" aria-pressed="false">' + t + "</button>";
    }).join("");
    stack.innerHTML = ids.map(function (id) { var p = byId(id); return '<img class="photo" src="' + p.img + '" alt="عبوة ' + p.name + '" width="1000" height="1000" loading="lazy" data-id="' + id + '">'; }).join("");
    function set(id) {
      cur = id; var p = byId(id);
      $$(".pick", box).forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-id") === id)); });
      $$("img", stack).forEach(function (im) { im.classList.toggle("on", im.getAttribute("data-id") === id); });
      $("#" + prefix + "Note").textContent = p.name + " — " + p.desc;
      priceNode($("#" + prefix + "Price"), p, size, "من");
      if (withMeter) { var order = ["LIGHT", "MEDIUM", "DARK"], idx = order.indexOf(p.roast); $$("#" + prefix + "Meter i").forEach(function (m, k) { m.classList.toggle("on", k === idx); m.classList.toggle("lit", k < idx); }); }
    }
    box.addEventListener("click", function (e) { var b = e.target.closest(".pick"); if (b) set(b.getAttribute("data-id")); });
    $("#" + prefix + "Add").addEventListener("click", function () { addToCart(cur, size); toast("اتضاف للسلة: " + byId(cur).name + " — " + sizeLabel(size)); });
    set(cur);
  }
  picker("b2", ["gold-18", "gold-21", "gold-24"], true);
  picker("b3", ["premium", "bar-intenso"], false);

  /* ميل ثلاثي الأبعاد للعبوة مع حركة الماوس/اللمس */
  if (!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)) {
    $$("[data-tilt]").forEach(function (st) {
      var tgt = $(".swap", st) || st;
      st.addEventListener("pointermove", function (e) {
        var r = st.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        tgt.style.transform = "rotateY(" + (x * 16).toFixed(1) + "deg) rotateX(" + (-y * 16).toFixed(1) + "deg)";
      });
      st.addEventListener("pointerleave", function () { tgt.style.transform = ""; });
    });
  }

  /* ---------- slider ---------- */
  var slides = $$(".slide"), dotsBox = $("#dots"), cur = 0, timer = null;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  slides.forEach(function (s, i) {
    var d = document.createElement("button");
    d.className = "dot"; d.type = "button"; d.setAttribute("role", "tab");
    d.setAttribute("aria-label", "الانتقال للبانر " + num(i + 1));
    d.addEventListener("click", function () { go(i); restart(); });
    dotsBox.appendChild(d);
  });
  var dots = $$(".dot");
  function go(i) {
    cur = (i + slides.length) % slides.length;
    slides.forEach(function (s, k) {
      var on = k === cur; s.classList.toggle("is-active", on); s.setAttribute("aria-hidden", String(!on));
      if ("inert" in s) s.inert = !on;
    });
    dots.forEach(function (d, k) { d.setAttribute("aria-selected", String(k === cur)); });
  }
  function start() { if (reduce || timer) return; timer = setInterval(function () { go(cur + 1); }, 5500); }
  function stop() { clearInterval(timer); timer = null; }
  function restart() { stop(); start(); }
  $("#nextSlide").addEventListener("click", function () { go(cur + 1); restart(); });
  $("#prevSlide").addEventListener("click", function () { go(cur - 1); restart(); });
  var hero = $(".hero");
  hero.addEventListener("mouseenter", stop); hero.addEventListener("mouseleave", start);
  hero.addEventListener("focusin", stop); hero.addEventListener("focusout", start);
  document.addEventListener("visibilitychange", function () { if (document.hidden) stop(); else start(); });
  var sx = 0, sy = 0;
  hero.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; stop(); }, { passive: true });
  hero.addEventListener("touchend", function (e) {
    var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? cur + 1 : cur - 1); /* RTL: سحب لليسار = التالي */
    start();
  }, { passive: true });
  go(0); start();
  /* إخفاء زر الطلب العائم أثناء ظهور السلايدر عشان ما يغطيش النقط */
  if ("IntersectionObserver" in window) {
    var fcta = $("#floatCta");
    new IntersectionObserver(function (en) { fcta.classList.toggle("is-away", en[0].intersectionRatio > .35); }, { threshold: [0, .35, .6] }).observe(hero);
  }

  /* ---------- reveal on scroll ---------- */
  var io = null;
  function observeReveal() {
    var els = $$(".reveal:not(.in)");
    if (!("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("in"); }); return; }
    if (!io) io = new IntersectionObserver(function (en) {
      en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } });
    }, { threshold: .12 });
    els.forEach(function (e) { io.observe(e); });
  }
  $$(".why, .steps li, .label-fig").forEach(function (e) { e.classList.add("reveal"); });

  renderProducts();
  renderCart();
  observeReveal();
  if (sb) {
    sb.auth.getSession().then(function (r) { user = r && r.data && r.data.session ? r.data.session.user : null; renderAuth(); prefillFromUser(); }, renderAuth);
    sb.auth.onAuthStateChange(function (ev, session) { user = session ? session.user : null; renderAuth(); if (user) prefillFromUser(); });
  }
  renderAuth();
  });
})();
