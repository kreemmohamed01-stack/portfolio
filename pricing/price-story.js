/* Pricing page (story layout). Renders categories, packages, the live
   product / AI-agent calculator and the comparison table from
   PRICING_DATA, and sends orders to WhatsApp with the total filled in. */
(function () {
  var D = typeof PRICING_DATA !== 'undefined' ? PRICING_DATA : window.PRICING_DATA;
  if (!D) return;
  var CATS = [
    { key: 'websites', label: 'Websites', short: 'Stores & brand websites' },
    { key: 'dashboards', label: 'Dashboards', short: 'Admin panels for your business' },
    { key: 'ai', label: 'AI Agents', short: 'Assistants that sell 24/7' }
  ];
  var current = 'websites';
  var state = {}; // per plan: { extra: n, ai: bool }

  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function fmt(n) { return Number(n).toLocaleString('en-US'); }
  function strip(h) { var d = document.createElement('div'); d.innerHTML = h; return d.textContent; }
  function minPrice(cat) {
    var ps = D[cat].plans.map(function (p) { return p.configurable ? p.basePrice : p.price; }).filter(function (x) { return x; });
    return Math.min.apply(null, ps);
  }
  function total(plan) {
    if (!plan.configurable) return plan.price;
    var st = state[plan.id] || { extra: 0, ai: false };
    return plan.basePrice + st.extra * plan.productStepPrice + (st.ai ? plan.aiAgent.price : 0);
  }
  var IG = 'https://ig.me/m/kreemaly.dev';
  function orderText(cat, plan) {
    var lines = ['Hi Kreem! I\'d like to order:', '', '• ' + CATS.filter(function (c) { return c.key === cat; })[0].label + ' — ' + plan.name + ' package'];
    if (plan.configurable) {
      var st = state[plan.id] || { extra: 0, ai: false };
      lines.push('• Products: ' + fmt(plan.baseProducts + st.extra * plan.productStep));
      if (st.ai) lines.push('• + ' + strip(plan.aiAgent.label));
    }
    if (plan.price === null && !plan.configurable) lines.push('', 'I\'d like a custom quote.');
    else lines.push('', 'Total: ' + fmt(total(plan)) + ' EGP');
    return lines.join('\n');
  }
  // Instagram can't prefill a DM, so copy the order and tell the visitor to paste it
  function toast(msg) {
    var t = document.querySelector('.ps-toast');
    if (!t) { t = document.createElement('div'); t.className = 'ps-toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('on');
    clearTimeout(t._h); t._h = setTimeout(function () { t.classList.remove('on'); }, 4200);
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest('.ps-order'); if (!a) return;
    var art = a.closest('.ps-plan'), plan = find(art.dataset.plan), text = orderText(current, plan);
    var done = function () { toast('Order copied — paste it in the Instagram chat'); };
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, done);
      else { var ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); done(); }
    } catch (err) { done(); }
  });

  /* ---------- categories (services-style list) ---------- */
  var list = document.getElementById('svcList');
  CATS.forEach(function (c, i) {
    var li = document.createElement('li');
    li.innerHTML = '<button type="button" class="ps-svc" data-cat="' + c.key + '">' +
      '<span class="ps-svc-num">' + pad(i + 1) + '</span>' +
      '<span class="ps-svc-name">' + c.label + '</span>' +
      '<span class="ps-svc-meta"><em>' + c.short + '</em><b>from ' + fmt(minPrice(c.key)) + ' EGP</b></span>' +
      '</button>';
    list.appendChild(li);
  });
  function showImg(cat) {
    document.querySelectorAll('[data-svc-img]').forEach(function (im) { im.classList.toggle('is-on', im.dataset.svcImg === cat); });
  }
  list.addEventListener('pointerover', function (e) { var b = e.target.closest('.ps-svc'); if (b) showImg(b.dataset.cat); });
  list.addEventListener('pointerleave', function () { showImg(current); });
  list.addEventListener('click', function (e) {
    var b = e.target.closest('.ps-svc'); if (!b) return;
    select(b.dataset.cat);
    var plans = document.getElementById('plans');
    if (window.__lenis) window.__lenis.scrollTo(plans, { offset: -40 });
    else plans.scrollIntoView({ behavior: 'smooth' });
  });

  /* ---------- tabs ---------- */
  var tabs = document.getElementById('psTabs');
  CATS.forEach(function (c) {
    var t = document.createElement('button');
    t.type = 'button'; t.className = 'ps-tab'; t.setAttribute('role', 'tab'); t.dataset.cat = c.key; t.textContent = c.label;
    t.addEventListener('click', function () { select(c.key); });
    tabs.appendChild(t);
  });

  /* ---------- plans ---------- */
  var planList = document.getElementById('planList');
  var check = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>';
  function planHTML(cat, plan, i) {
    var price;
    if (plan.configurable) price = '<span class="ps-price-num" data-total>' + fmt(total(plan)) + '</span><span class="ps-cur">EGP</span>';
    else if (plan.price === null) price = '<span class="ps-price-num ps-talk">' + (plan.priceLabel || 'Let\'s Talk') + '</span>';
    else price = '<span class="ps-price-num">' + fmt(plan.price) + '</span><span class="ps-cur">' + (plan.currency || 'EGP') + '</span>';
    var calc = '';
    if (plan.configurable) {
      var st = state[plan.id] || (state[plan.id] = { extra: 0, ai: false });
      calc = '<div class="ps-calc">' +
        '<div class="ps-calc-row"><span>Products</span>' +
          '<div class="ps-step"><button type="button" data-step="-1" aria-label="Fewer products">&minus;</button>' +
          '<b data-products>' + fmt(plan.baseProducts + st.extra * plan.productStep) + '</b>' +
          '<button type="button" data-step="1" aria-label="More products">+</button></div></div>' +
        '<p class="ps-calc-note">' + plan.baseProducts + ' included &middot; +' + fmt(plan.productStepPrice) + ' EGP per ' + plan.productStep + ' more</p>' +
        '<label class="ps-ai"><input type="checkbox" data-ai' + (st.ai ? ' checked' : '') + '><span class="ps-ai-box" aria-hidden="true"></span>' +
          '<span><b>Add AI Agent &middot; +' + fmt(plan.aiAgent.price) + ' EGP</b><small>' + plan.aiAgent.desc + '</small></span></label>' +
        '</div>';
    }
    return '<article class="ps-plan' + (plan.highlight ? ' is-featured' : '') + '" data-plan="' + plan.id + '" data-r>' +
      '<div class="ps-plan-id"><span class="ps-plan-num">' + pad(i + 1) + '</span>' +
        (plan.tag ? '<span class="ps-tag">' + plan.tag + '</span>' : '') +
        '<h3 class="ps-plan-name">' + plan.name + '</h3><p class="ps-blurb">' + plan.blurb + '</p></div>' +
      '<ul class="ps-feats">' + plan.features.map(function (f) { return '<li>' + check + '<span>' + f + '</span></li>'; }).join('') + '</ul>' +
      '<div class="ps-buy"><div class="ps-price">' + price + '</div>' + calc +
        '<a class="btn ' + (plan.highlight ? 'btn-white' : '') + ' ps-order" target="_blank" rel="noopener noreferrer" href="' + IG + '">' +
        (plan.price === null && !plan.configurable ? 'Request a quote' : 'Order on Instagram') +
        ' <svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></a></div>' +
      '</article>';
  }
  function renderPlans(cat) {
    var d = D[cat];
    document.getElementById('plansKicker').innerHTML = d.eyebrow;
    document.getElementById('plansTitle').innerHTML = d.sectionTitle;
    document.getElementById('plansNotes').innerHTML = (d.commonNotes || []).map(function (n) { return '<li>' + check + '<span>' + n + '</span></li>'; }).join('');
    planList.innerHTML = d.plans.map(function (p, i) { return planHTML(cat, p, i); }).join('');
    planList.querySelectorAll('[data-r]').forEach(function (el, i) {
      el.style.setProperty('--d', (i * 0.08) + 's');
      requestAnimationFrame(function () { requestAnimationFrame(function () { el.classList.add('in'); }); });
    });
  }
  planList.addEventListener('click', function (e) {
    var b = e.target.closest('[data-step]'); if (!b) return;
    var art = b.closest('.ps-plan'), plan = find(art.dataset.plan), st = state[plan.id];
    st.extra = Math.max(0, Math.min(40, st.extra + (+b.dataset.step)));
    refresh(art, plan);
  });
  planList.addEventListener('change', function (e) {
    if (!e.target.matches('[data-ai]')) return;
    var art = e.target.closest('.ps-plan'), plan = find(art.dataset.plan);
    state[plan.id].ai = e.target.checked;
    refresh(art, plan);
  });
  function find(id) { return D[current].plans.filter(function (p) { return p.id === id; })[0]; }
  function refresh(art, plan) {
    var st = state[plan.id];
    art.querySelector('[data-products]').textContent = fmt(plan.baseProducts + st.extra * plan.productStep);
    var t = art.querySelector('[data-total]');
    t.textContent = fmt(total(plan));
    t.classList.remove('bump'); void t.offsetWidth; t.classList.add('bump');
  }

  /* ---------- comparison ---------- */
  function renderCompare(cat) {
    var c = D[cat].compare, tbl = document.getElementById('compareTable');
    var cell = function (v) { return v === true ? '<span class="ps-yes" aria-label="Included">' + check + '</span>' : v === false ? '<span class="ps-no" aria-label="Not included">&mdash;</span>' : v; };
    tbl.innerHTML = '<thead><tr>' + c.headers.map(function (h) { return '<th scope="col">' + h + '</th>'; }).join('') + '</tr></thead><tbody>' +
      c.rows.map(function (r) { return '<tr><th scope="row">' + r[0] + '</th>' + r.slice(1).map(function (v) { return '<td>' + cell(v) + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody>';
  }

  function select(cat) {
    current = cat;
    document.querySelectorAll('.ps-tab').forEach(function (t) { var on = t.dataset.cat === cat; t.classList.toggle('is-on', on); t.setAttribute('aria-selected', on); });
    document.querySelectorAll('.ps-svc').forEach(function (b) { b.classList.toggle('is-on', b.dataset.cat === cat); });
    showImg(cat);
    renderPlans(cat);
    renderCompare(cat);
  }
  select(current);
})();
