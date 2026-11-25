/* Riseion Solar - script.js: calculator, enquiry form, reviews, WhatsApp, SEO enrichment, optional analytics.
   Language switching lives in i18n.js. Edit CONFIG only. */
(function () {
  'use strict';
  /* ===== CONFIG ===== */
  var CFG = {
    SITE_URL: '',                   // e.g. 'https://www.riseionsolar.com' (blank = auto-detect on a real domain)
    PHONE: '917567776876',          // WhatsApp/call number - VERIFY which number is primary
    FORM_ENDPOINT: '',              // Formspree / Google Apps Script URL. Blank = enquiry opens WhatsApp
    UNITS_PER_KW_MONTH: 120,        // VERIFY with team (about 4 units per kW per day)
    SQFT_PER_KW: 100,               // VERIFY roof area needed per kW
    DEFAULT_PANEL_W: 550,
    GA_ID: '',                      // optional GA4 id, e.g. 'G-XXXXXXXXXX'
    REVIEW_URL: '',                 // Google review link (from Google Business Profile) - used by the review button
    REVIEWS: []                     // REAL reviews only: {name:'', place:'', text:'', stars:5}
  };
  var M = {
    en: { kw: 'kW', panels: 'Panels', units: 'Units', need: 'Please enter your monthly units, or your bill and rate.', cut: 'Size reduced to fit your roof area.', ok: 'Thank you! Our team will contact you soon.', fail: 'Something went wrong. Please call us or try again.', share: 'Share this estimate on WhatsApp',
      sub: function (n) { return 'Indicative central subsidy for homes: up to ₹' + n + ' (PM Surya Ghar, subject to eligibility; verify on pmsuryaghar.gov.in).'; } },
    hi: { kw: 'kW', panels: 'पैनल', units: 'यूनिट', need: 'कृपया मासिक यूनिट, या बिल और दर दर्ज करें।', cut: 'आपकी छत के क्षेत्र के अनुसार साइज घटाया गया।', ok: 'धन्यवाद! हमारी टीम जल्द ही आपसे संपर्क करेगी।', fail: 'कुछ गलत हो गया। कृपया हमें कॉल करें या दोबारा कोशिश करें।', share: 'यह अनुमान व्हाट्सऐप पर शेयर करें',
      sub: function (n) { return 'घरों के लिए अनुमानित केंद्रीय सब्सिडी: ₹' + n + ' तक (पीएम सूर्य घर, पात्रता के अधीन; pmsuryaghar.gov.in पर पुष्टि करें)।'; } },
    gu: { kw: 'kW', panels: 'પેનલ', units: 'યુનિટ', need: 'કૃપા કરીને માસિક યુનિટ, અથવા બિલ અને દર નાખો.', cut: 'તમારા છતના વિસ્તાર મુજબ સાઇઝ ઘટાડી છે.', ok: 'આભાર! અમારી ટીમ જલ્દી તમારો સંપર્ક કરશે.', fail: 'કંઈક ખોટું થયું. કૃપા કરીને અમને કૉલ કરો અથવા ફરી પ્રયત્ન કરો.', share: 'આ અંદાજ વોટ્સએપ પર શેર કરો',
      sub: function (n) { return 'ઘરો માટે અંદાજિત કેન્દ્રીય સબસિડી: ₹' + n + ' સુધી (પીએમ સૂર્ય ઘર, પાત્રતાને આધીન; pmsuryaghar.gov.in પર ખાતરી કરો).'; } }
  };
  function T(k, a) { var l = M[document.documentElement.lang] || M.en, v = l[k]; return typeof v === 'function' ? v(a) : v; }
  function $(s, r) { return (r || document).querySelector(s); }
  function el(t, c, x) { var e = document.createElement(t); if (c) e.className = c; if (x) e.textContent = x; return e; }
  function wa(text) { return 'https://wa.me/' + CFG.PHONE + (text ? '?text=' + encodeURIComponent(text) : ''); }
  function track(n) { try { if (window.gtag) window.gtag('event', n); } catch (e) {} }

  /* ===== WhatsApp floating button ===== */
  var a = el('a', 'wa-float'); a.href = wa('Hello Riseion Solar, I want to know about solar.'); a.target = '_blank'; a.rel = 'noopener'; a.setAttribute('aria-label', 'WhatsApp');
  a.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.1-1.3A10 10 0 1 0 12 2zm5.2 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.2-.7-2.7-1.1-4.4-3.9-4.5-4.1-.1-.2-1.1-1.4-1.1-2.7s.7-1.9.9-2.2c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6c-.2.2-.3.4-.1.7.2.3.8 1.3 1.7 2.1 1.1 1 2.1 1.3 2.4 1.5.3.1.5.1.7-.1l1-1.2c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.6.3.1.2.1.8-.1 1.3z"/></svg>';
  document.body.appendChild(a);

  /* ===== Optional GA4 ===== */
  if (CFG.GA_ID) { var g = document.createElement('script'); g.async = true; g.src = 'https://www.googletagmanager.com/gtag/js?id=' + CFG.GA_ID; document.head.appendChild(g);
    window.dataLayer = window.dataLayer || []; window.gtag = function () { window.dataLayer.push(arguments); }; window.gtag('js', new Date()); window.gtag('config', CFG.GA_ID); }

  /* ===== SEO enrichment: canonical / og:url / schema url+logo once a real domain is known ===== */
  var base = (CFG.SITE_URL || (/^https?:$/.test(location.protocol) && !/^(localhost|127\.|192\.168\.)/.test(location.hostname) ? location.origin : '')).replace(/\/$/, '');
  if (base) {
    var path = location.pathname.replace(/index\.html$/, ''), url = base + (path || '/');
    var c = $('link[rel=canonical]') || document.head.appendChild(el('link')); c.rel = 'canonical'; c.href = url;
    [['og:url', url], ['og:image', base + '/og-image.png']].forEach(function (p) { var m = $('meta[property="' + p[0] + '"]') || document.head.appendChild(el('meta')); m.setAttribute('property', p[0]); m.setAttribute('content', p[1]); });
    document.querySelectorAll('script[type="application/ld+json"]').forEach(function (s) {
      try { var d = JSON.parse(s.textContent); if (d['@type'] === 'LocalBusiness') { d.url = base + '/'; d.logo = base + '/logo.png'; d.image = base + '/og-image.png'; d['@id'] = base + '/#business'; s.textContent = JSON.stringify(d); } } catch (e) {}
    });
  }

  /* ===== Reviews: only real reviews are rendered ===== */
  var rc = $('#review-cta'); if (rc) rc.href = CFG.REVIEW_URL || wa('Hello Riseion Solar, I would like to share my experience.');
  var grid = $('#reviews-grid');
  if (grid && CFG.REVIEWS.length) {
    grid.textContent = '';
    CFG.REVIEWS.forEach(function (r) {
      var c = el('div', 'review-card'); c.appendChild(el('div', 'stars', '★'.repeat(Math.max(1, Math.min(5, r.stars || 5)))));
      c.appendChild(el('p', '', '“' + r.text + '”')); c.appendChild(el('strong', '', r.name)); if (r.place) c.appendChild(el('span', '', r.place)); grid.appendChild(c);
    });
  }

  /* ===== Contact popup: Esc + outside click ===== */
  var modal = $('#contact-form');
  if (modal) {
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && location.hash === '#contact-form') location.hash = '#'; });
    modal.addEventListener('click', function (e) { if (e.target === modal) location.hash = '#'; });
  }

  /* ===== Calculator ===== */
  var last = null;
  function num(id) { var e = document.getElementById(id), v = e ? parseFloat(e.value) : NaN; return isFinite(v) && v > 0 ? v : 0; }
  function nf(n) { return n.toLocaleString('en-IN'); }
  function subsidy(kw) { return Math.round(kw <= 2 ? kw * 30000 : Math.min(78000, 60000 + (kw - 2) * 18000)); }
  function calc() {
    var bill = num('bill'), units = num('units'), tariff = num('tariff'), roof = num('roof'), watt = parseInt(($('#panel') || {}).value, 10) || CFG.DEFAULT_PANEL_W;
    if (!units && bill && tariff) units = bill / tariff;
    if (!tariff && bill && units) tariff = bill / units;
    if (!units) return { err: true };
    var kw = Math.max(1, Math.ceil(units / CFG.UNITS_PER_KW_MONTH * 2) / 2), cut = false;
    if (roof && kw * CFG.SQFT_PER_KW > roof) { kw = Math.max(0.5, Math.floor(roof / CFG.SQFT_PER_KW * 2) / 2); cut = true; }
    var gen = Math.round(kw * CFG.UNITS_PER_KW_MONTH), save = tariff ? Math.min(Math.round(gen * tariff), bill || Infinity) : 0;
    return { kw: kw, panels: Math.ceil(kw * 1000 / watt), gen: gen, save: save, cut: cut, home: (($('#property') || {}).selectedIndex === 1) };
  }
  function set(id, t) { var e = document.getElementById(id); if (e) e.textContent = t; }
  function render(r, scroll) {
    var fb = document.getElementById('calculator-feedback'); if (!fb) return;
    if (r.err) { fb.style.color = '#c0392b'; fb.textContent = T('need'); return; }
    fb.style.color = ''; fb.textContent = r.cut ? T('cut') : '';
    set('result-capacity', r.kw + ' ' + T('kw')); set('result-panels', r.panels + ' ' + T('panels'));
    set('result-generation', nf(r.gen) + ' ' + T('units')); set('result-savings', r.save ? '₹ ' + nf(r.save) : '--');
    var grid = $('.result-grid'), ex = document.getElementById('result-extra');
    if (!ex) { ex = el('div', 'result-extra'); ex.id = 'result-extra'; ex.appendChild(el('p')); var s = el('a', 'btn btn-green'); s.target = '_blank'; s.rel = 'noopener'; ex.appendChild(s); grid.parentNode.appendChild(ex); }
    ex.firstChild.textContent = r.home ? T('sub', nf(subsidy(r.kw))) : ''; ex.firstChild.style.display = r.home ? '' : 'none';
    var sh = $('a', ex); sh.textContent = T('share');
    sh.href = wa('Solar estimate from Riseion Solar calculator: ' + r.kw + ' kW, ' + r.panels + ' panels, approx. ' + r.gen + ' units/month, saving about Rs ' + (r.save || '-') + '/month. Please contact me.');
    grid.setAttribute('aria-live', 'polite');
    if (scroll) grid.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  var cb = document.getElementById('calculate-solar');
  if (cb) {
    cb.addEventListener('click', function () { last = calc(); render(last, true); track('calculator_use'); });
    var cf = cb.closest('form'); if (cf) cf.addEventListener('submit', function (e) { e.preventDefault(); cb.click(); });
    ['bill', 'tariff'].forEach(function (id) {
      var e = document.getElementById(id); if (e) e.addEventListener('input', function () { var u = document.getElementById('units'), b = num('bill'), t = num('tariff'); if (u && !u.dataset.touched && b && t) u.value = Math.round(b / t); });
    });
    var u = document.getElementById('units'); if (u) u.addEventListener('input', function () { u.dataset.touched = '1'; });
  }
  window.addEventListener('riseion:lang', function () { if (last) render(last, false); });

  /* ===== Enquiry form ===== */
  var f = $('.enquiry-form');
  if (f) f.addEventListener('submit', function (e) {
    e.preventDefault();
    var msg = $('.form-msg', f) || f.appendChild(el('p', 'form-msg')); msg.setAttribute('role', 'status');
    var fd = new FormData(f), d = {}; fd.forEach(function (v, k) { d[k] = v; });
    if (d.website) return;                                    // honeypot: bots only
    function ok() { msg.className = 'form-msg ok'; msg.textContent = T('ok'); f.reset(); track('generate_lead'); }
    if (CFG.FORM_ENDPOINT) {
      fd.append('page', location.href);
      fetch(CFG.FORM_ENDPOINT, { method: 'POST', body: fd, headers: { Accept: 'application/json' } })
        .then(function (r) { if (!r.ok) throw 0; ok(); })
        .catch(function () { msg.className = 'form-msg err'; msg.textContent = T('fail'); });
    } else {
      window.open(wa('New solar enquiry\nName: ' + d.name + '\nMobile: ' + d.mobile + '\nAddress: ' + d.address + '\nType: ' + d.project_type + '\nMessage: ' + (d.message || '-')), '_blank', 'noopener'); ok();
    }
  });
})();
