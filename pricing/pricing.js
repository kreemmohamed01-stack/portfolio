/* ============================================================
   PRICING PAGE LOGIC — Kreem Aly / pricing.html
   Front-end only: no backend, no real payment processing.
   Everything (cart, checkout, promo codes) is simulated state
   kept in memory + localStorage for a nicer refresh experience.
   ============================================================ */

(function () {
  "use strict";

  const TABS = ["websites", "dashboards", "ai", "custom"];
  const ICONS = {
    diamond: '<svg viewBox="0 0 24 24" fill="none"><path d="M6 3h12l3 6-9 12L3 9l3-6Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M3 9h18M9 3l3 6 3-6M9 9l3 12 3-12" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>',
    bolt: '<svg viewBox="0 0 24 24" fill="none"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
    chart: '<svg viewBox="0 0 24 24" fill="none"><path d="M4 20V10M12 20V4M20 20v-7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    gear: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.6"/><path d="M19 12a7 7 0 0 0-.1-1.2l2-1.5-2-3.4-2.3.9a7 7 0 0 0-2.1-1.2L14 3h-4l-.5 2.6a7 7 0 0 0-2.1 1.2l-2.3-.9-2 3.4 2 1.5A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2l-2 1.5 2 3.4 2.3-.9c.6.5 1.3.9 2.1 1.2L10 21h4l.5-2.6c.8-.3 1.5-.7 2.1-1.2l2.3.9 2-3.4-2-1.5c.1-.4.1-.8.1-1.2Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>',
    headset: '<svg viewBox="0 0 24 24" fill="none"><path d="M4 13v-1a8 8 0 0 1 16 0v1" stroke="currentColor" stroke-width="1.6"/><rect x="3" y="13" width="4" height="6" rx="1.5" stroke="currentColor" stroke-width="1.6"/><rect x="17" y="13" width="4" height="6" rx="1.5" stroke="currentColor" stroke-width="1.6"/><path d="M19 19v1a2 2 0 0 1-2 2h-3" stroke="currentColor" stroke-width="1.6"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="none"><path d="M4 4h16v11H8l-4 4V4Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
    truck: '<svg viewBox="0 0 24 24" fill="none"><path d="M3 7h11v9H3z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M14 10h4l3 3v3h-7z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="7" cy="18" r="1.6" stroke="currentColor" stroke-width="1.4"/><circle cx="17" cy="18" r="1.6" stroke="currentColor" stroke-width="1.4"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    package: '<svg viewBox="0 0 24 24" fill="none"><path d="M21 8 12 3 3 8l9 5 9-5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M3 8v8l9 5 9-5V8M12 13v8" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
    cart: '<svg viewBox="0 0 24 24" fill="none"><path d="M3 3h2l.4 2M7 13h10l3.6-8H5.4M7 13 5.4 5M7 13l-1.6 3.2A1 1 0 0 0 6.3 18H17" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    share: '<svg viewBox="0 0 24 24" fill="none"><circle cx="6" cy="12" r="2.4" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="6" r="2.4" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="18" r="2.4" stroke="currentColor" stroke-width="1.5"/><path d="M8.2 10.8 15.8 7M8.2 13.2l7.6 3.8" stroke="currentColor" stroke-width="1.4"/></svg>',
    rocket: '<svg viewBox="0 0 24 24" fill="none"><path d="M14 3c3 0 6 3 6 7-3 1-5 3-6 6l-4-4c3-1 5-3 6-6-1.5-2-3.5-3-2-3Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M9 15l-4 4M5 19l1-4M5 19l4-1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
    layout: "🖥️", robot: "🤖", pages: "📄", bag: "🛍️", brush: "🎨", bars: "📶",
    "check-shield": "🛡️", puzzle: "🧩", code: "</>"
  };

  const state = {
    activeTab: "websites",
    billing: "onetime",
    cart: [],           // { id, name, blurb, price, icon, qty, configSummary? }
    promoCode: "",
    discountPct: 0,
    testimonialIndex: 0,
    checkoutStep: 1,
    // Per-configurable-plan choice: extra products beyond the base
    // quota, and whether the AI Agent add-on is selected. Keyed by
    // plan id so switching tabs and coming back keeps the choice.
    configState: {}
  };

  function getConfig(planId) {
    if (!state.configState[planId]) {
      state.configState[planId] = { extraProducts: 0, aiAgent: false };
    }
    return state.configState[planId];
  }

  /* Computes the live total for a configurable plan: base price +
     (extra products rounded up to the next step) * step price +
     the AI Agent add-on if selected. Categories never add cost. */
  function computeConfigurablePrice(plan) {
    const cfg = getConfig(plan.id);
    const steps = Math.ceil(cfg.extraProducts / plan.productStep);
    const extraCost = Math.max(0, steps) * plan.productStepPrice;
    const aiCost = cfg.aiAgent ? plan.aiAgent.price : 0;
    return {
      base: plan.basePrice,
      extraCost,
      aiCost,
      total: plan.basePrice + extraCost + aiCost,
      totalProducts: plan.baseProducts + cfg.extraProducts
    };
  }

  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  /* ---------------- persistence ---------------- */
  function loadCart() {
    try {
      const raw = localStorage.getItem("pr_cart_v1");
      if (raw) state.cart = JSON.parse(raw);
    } catch (e) { /* ignore corrupt storage */ }
  }
  function saveCart() {
    try { localStorage.setItem("pr_cart_v1", JSON.stringify(state.cart)); } catch (e) {}
  }

  /* ---------------- icon helper ---------------- */
  function icon(key) {
    const v = ICONS[key];
    if (!v) return "";
    return v.startsWith("<svg") ? v : `<span class="emoji-ico">${v}</span>`;
  }

  /* ================= TAB CONTENT RENDER ================= */

  function renderHeroForTab(tabKey) {
    const data = PRICING_DATA[tabKey];
    $$(".pr-hero-scene").forEach(el => el.classList.toggle("active", el.dataset.scene === tabKey));

    if (tabKey === "custom") return; // custom section has its own static hero copy

    $$('[data-tab-field="kicker"]').forEach(el => el.textContent = data.kicker);
    $$('[data-tab-field="titleLine1"]').forEach(el => el.textContent = data.titleLine1);
    $$('[data-tab-field="titleLine2"]').forEach(el => el.textContent = data.titleLine2);
    $$('[data-tab-field="subtitle"]').forEach(el => el.textContent = data.subtitle);
    $$('[data-tab-field="eyebrow"]').forEach(el => el.textContent = data.eyebrow);
    $$('[data-tab-field="sectionTitle"]').forEach(el => el.textContent = data.sectionTitle);
    $$('[data-tab-field="sectionDesc"]').forEach(el => el.textContent = data.sectionDesc);
    $$('[data-tab-field="compareWord"]').forEach(el => el.textContent = data.compareWord);
    $$('[data-tab-field="compareDesc"]').forEach(el => el.textContent = data.compareDesc);
    $$('[data-tab-field="compareLinkText"]').forEach(el => el.textContent = data.compareLinkText);
    $$('[data-tab-field="howItWorksDesc"]').forEach(el => el.textContent = data.howItWorksDesc);
    $$('[data-tab-field="testimonialSub"]').forEach(el => el.textContent = data.testimonialSub);

    const badgesWrap = $("#prHeroBadges");
    badgesWrap.innerHTML = data.badges.map(b => `
      <div class="pr-badge"><span class="ico">${icon(b.icon)}</span><span>${b.label}</span></div>
    `).join("");
  }

  function priceForPlan(plan) {
    if (plan.price == null) return null;
    if (state.billing === "monthly" && plan.monthlyPrice) return plan.monthlyPrice;
    if (state.billing === "monthly" && !plan.monthlyPrice) {
      // No monthly plan defined for this item -> approximate as /mo over 6 months for visual toggle only
      return Math.round(plan.price / 6);
    }
    return plan.price;
  }

  function renderCards(tabKey) {
    const data = PRICING_DATA[tabKey];
    const grid = $("#cardsGrid");
    document.body.setAttribute("data-active-tab", tabKey);

    grid.innerHTML = data.plans.map((p, i) => planCardHTML(p, i)).join("");
    wirePlanButtons();
    wireConfiguratorInputs();

    const notesWrap = $("#commonNotes");
    if (data.commonNotes && data.commonNotes.length) {
      notesWrap.hidden = false;
      notesWrap.innerHTML = `
        <span class="pr-common-notes-title">${icon("check")} Every package on this page already includes</span>
        <ul>${data.commonNotes.map(n => `<li>${n}</li>`).join("")}</ul>
      `;
    } else {
      notesWrap.hidden = true;
      notesWrap.innerHTML = "";
    }
  }

  function planCardHTML(plan, index) {
    const inCart = isInCart(plan.id);
    const tagHTML = plan.tag
      ? (plan.tag.includes("YOUR VISION") ? `<div class="pr-card-tag corner">${plan.tag.replace(/ /g, "<br>")}</div>` : `<div class="pr-card-tag">${plan.tag}</div>`)
      : "";

    const btnLabel = plan.isCustomCta ? plan.cta : (inCart ? "Added ✓" : plan.cta);
    const btnClass = plan.isCustomCta ? "pr-card-btn" : `pr-card-btn ${inCart ? "added" : "solid"}`;

    let priceBlock, configuratorBlock = "";

    if (plan.configurable) {
      const calc = computeConfigurablePrice(plan);
      const cfg = getConfig(plan.id);
      priceBlock = `
        <div class="pr-card-price" id="price-${plan.id}">
          <strong>${formatEGP(calc.total)}</strong><span>EGP</span>
        </div>
        <p class="pr-card-price-note" id="pricenote-${plan.id}">${configPriceNote(plan, calc)}</p>
      `;
      configuratorBlock = `
        <div class="pr-configurator" data-plan-id="${plan.id}">
          <div class="pr-configurator-row">
            <label for="products-${plan.id}">Extra products needed <span class="hint">(beyond the ${plan.baseProducts} included)</span></label>
            <div class="pr-stepper">
              <button type="button" class="pr-stepper-btn" data-step-action="products-minus" data-plan-id="${plan.id}" aria-label="Decrease extra products">−</button>
              <input type="number" id="products-${plan.id}" min="0" step="${plan.productStep}" value="${cfg.extraProducts}" inputmode="numeric" data-config-input="products" data-plan-id="${plan.id}">
              <button type="button" class="pr-stepper-btn" data-step-action="products-plus" data-plan-id="${plan.id}" aria-label="Increase extra products">+</button>
            </div>
          </div>
          <div class="pr-configurator-row">
            <label for="categories-${plan.id}">Categories needed <span class="hint">(up to ${plan.maxCategories} included, free)</span></label>
            <input type="number" id="categories-${plan.id}" min="0" max="${plan.maxCategories}" value="${plan.baseCategories}" inputmode="numeric" data-config-input="categories" data-plan-id="${plan.id}">
          </div>
          <label class="pr-configurator-ai">
            <input type="checkbox" data-config-input="aiagent" data-plan-id="${plan.id}" ${cfg.aiAgent ? "checked" : ""}>
            <span class="pr-configurator-ai-box">
              <span class="pr-configurator-ai-head">
                <span>+ Add AI Agent</span>
                <strong>+${formatEGP(plan.aiAgent.price)} EGP</strong>
              </span>
              <span class="pr-configurator-ai-desc">${plan.aiAgent.desc}</span>
            </span>
          </label>
        </div>
      `;
    } else {
      const priceVal = priceForPlan(plan);
      priceBlock = priceVal == null
        ? `<div class="pr-card-price letstalk"><strong>${plan.priceLabel || "Let's Talk"}</strong></div>`
        : `<div class="pr-card-price"><strong>${formatEGP(priceVal)}</strong><span>${plan.currency}</span>${state.billing === "monthly" ? '<span class="per">/mo</span>' : ""}</div>`;
    }

    return `
      <div class="pr-card ${plan.highlight ? "highlight" : ""} ${plan.isCustomCta ? "pr-card-custom" : ""}" style="--card-i:${index || 0}">
        ${tagHTML}
        <div class="pr-card-cover cover-${plan.cover}" style="background-image:url('pricing/${plan.id}.jpg')"></div>
        <h3>${plan.name}</h3>
        <p class="pr-card-blurb">${plan.blurb}</p>
        ${priceBlock}
        ${configuratorBlock}
        <ul>${plan.features.map(f => `<li><span class="check">${icon("check")}</span>${f}</li>`).join("")}</ul>
        <button type="button" class="${btnClass}" data-plan-id="${plan.id}" data-custom-cta="${!!plan.isCustomCta}">
          ${btnLabel}
          <svg viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </div>
    `;
  }

  /* Small note under the price explaining what's driving the number,
     e.g. "150 products + 10 categories" or "+50 extra products". */
  function configPriceNote(plan, calc) {
    const parts = [`${calc.totalProducts} products`, `up to ${plan.maxCategories} categories`];
    if (calc.extraCost > 0) parts.push(`+${formatEGP(calc.extraCost)} EGP for extra products`);
    if (calc.aiCost > 0) parts.push(`+${formatEGP(calc.aiCost)} EGP AI Agent`);
    return parts.join(" · ");
  }

  function findItemById(id) {
    for (const key of ["websites", "dashboards", "ai"]) {
      const d = PRICING_DATA[key];
      const inPlans = (d.plans || []).find(p => p.id === id);
      if (inPlans) return { ...inPlans, group: key };
    }
    return null;
  }

  function isInCart(id) { return state.cart.some(c => c.id === id); }

  function wirePlanButtons() {
    // Scoped to the buy button specifically (not just "any direct
    // child with data-plan-id") — the configurator wrapper also
    // carries data-plan-id for its own inputs, and a looser selector
    // here previously caught clicks bubbling up from inside it,
    // silently re-rendering the card and resetting the AI Agent
    // checkbox the moment someone tried to check it.
    $$('#cardsGrid > .pr-card > .pr-card-btn[data-plan-id]').forEach(btn => {
      btn.addEventListener("click", () => handleCardAction(btn));
    });
  }

  function handleCardAction(btn) {
    const id = btn.dataset.planId;
    const isCustomCta = btn.dataset.customCta === "true";
    if (isCustomCta) {
      window.open("https://wa.me/201211179625", "_blank", "noopener,noreferrer");
      return;
    }
    const item = findItemById(id);
    if (!item) return;

    if (isInCart(id)) {
      removeFromCart(id);
    } else {
      addToCart(item);
      pulseButton(btn);
    }
    renderCards(state.activeTab); // refresh Added state
  }

  /* ================= CONFIGURATOR (Premium/Signature product & AI Agent picker) ================= */

  function wireConfiguratorInputs() {
    $$(".pr-configurator").forEach(box => {
      const planId = box.dataset.planId;

      $$('[data-config-input="products"]', box).forEach(input => {
        input.addEventListener("change", () => {
          const plan = findItemById(planId);
          let val = Math.max(0, Math.round(Number(input.value) || 0));
          // Snap to the nearest step so the price always matches a
          // whole number of "+50 products" increments.
          val = Math.ceil(val / plan.productStep) * plan.productStep;
          input.value = val;
          getConfig(planId).extraProducts = val;
          refreshConfigurablePrice(planId);
        });
      });

      $$('[data-step-action]', box).forEach(btn => {
        btn.addEventListener("click", () => {
          const plan = findItemById(planId);
          const cfg = getConfig(planId);
          const dir = btn.dataset.stepAction.endsWith("plus") ? 1 : -1;
          cfg.extraProducts = Math.max(0, cfg.extraProducts + dir * plan.productStep);
          const input = $(`#products-${planId}`);
          if (input) input.value = cfg.extraProducts;
          refreshConfigurablePrice(planId);
        });
      });

      $$('[data-config-input="categories"]', box).forEach(input => {
        input.addEventListener("change", () => {
          const plan = findItemById(planId);
          let val = Math.max(0, Math.round(Number(input.value) || 0));
          val = Math.min(val, plan.maxCategories);
          input.value = val;
          // Categories never change price, but we still recompute the
          // note text so it reflects what the client actually typed.
          refreshConfigurablePrice(planId);
        });
      });

      $$('[data-config-input="aiagent"]', box).forEach(checkbox => {
        checkbox.addEventListener("change", () => {
          getConfig(planId).aiAgent = checkbox.checked;
          refreshConfigurablePrice(planId);
        });
      });
    });
  }

  /* Recomputes and repaints just the price + note for one card,
     without a full re-render (keeps focus in the input the client
     is typing in, and avoids losing the other card's own state). */
  function refreshConfigurablePrice(planId) {
    const plan = findItemById(planId);
    if (!plan) return;
    const calc = computeConfigurablePrice(plan);
    const priceEl = $(`#price-${planId} strong`);
    const noteEl = $(`#pricenote-${planId}`);
    if (priceEl) priceEl.textContent = formatEGP(calc.total);
    if (noteEl) noteEl.textContent = configPriceNote(plan, calc);

    // If this plan is already in the cart, keep the cart line's price
    // and summary in sync with the live configurator instead of
    // making the client remove and re-add it.
    const line = state.cart.find(c => c.id === planId);
    if (line) {
      line.price = calc.total;
      line.blurb = configCartSummary(plan, calc);
      saveCart();
      renderCart();
    }
  }

  function configCartSummary(plan, calc) {
    const bits = [`${calc.totalProducts} products`];
    if (getConfig(plan.id).aiAgent) bits.push("+ AI Agent");
    return bits.join(" ");
  }

  function pulseButton(btn) {
    btn.style.transform = "scale(0.96)";
    setTimeout(() => { btn.style.transform = ""; }, 160);
  }

  /* ================= CART ================= */

  function addToCart(item) {
    let price, blurb;
    if (item.configurable) {
      const calc = computeConfigurablePrice(item);
      price = calc.total;
      blurb = configCartSummary(item, calc);
    } else {
      price = item.price == null ? 0 : (state.billing === "monthly" && item.monthlyPrice ? item.monthlyPrice : item.price);
      blurb = item.blurb || item.desc || "";
    }
    state.cart.push({
      id: item.id,
      name: item.name,
      blurb: blurb,
      price: price,
      icon: item.cover === "robot" ? "🤖" : "💠",
      qty: 1
    });
    saveCart();
    renderCart();
    bumpCartCount();
  }

  function removeFromCart(id) {
    state.cart = state.cart.filter(c => c.id !== id);
    saveCart();
    renderCart();
  }

  function changeQty(id, delta) {
    const line = state.cart.find(c => c.id === id);
    if (!line) return;
    line.qty = Math.max(1, line.qty + delta);
    saveCart();
    renderCart();
  }

  function cartSubtotal() {
    return state.cart.reduce((sum, c) => sum + c.price * c.qty, 0);
  }
  function cartDiscountAmount() {
    return Math.round(cartSubtotal() * (state.discountPct / 100));
  }
  function cartTotal() {
    return Math.max(0, cartSubtotal() - cartDiscountAmount());
  }

  function bumpCartCount() {
    const el = $("#cartCount");
    el.classList.remove("bump");
    void el.offsetWidth;
    el.classList.add("bump");
  }

  function renderCart() {
    const count = state.cart.reduce((n, c) => n + c.qty, 0);
    $("#cartCount").textContent = count;
    $("#drawerCount").textContent = count;

    const itemsWrap = $("#cartItems");
    const emptyWrap = $("#cartEmpty");

    if (!state.cart.length) {
      itemsWrap.innerHTML = "";
      emptyWrap.hidden = false;
    } else {
      emptyWrap.hidden = true;
      itemsWrap.innerHTML = state.cart.map(c => `
        <div class="pr-cart-item" data-id="${c.id}">
          <div class="pr-cart-item-thumb">${c.icon}</div>
          <div class="pr-cart-item-info">
            <strong>${c.name}${c.qty > 1 ? ` × ${c.qty}` : ""}</strong>
            <span>${c.blurb}</span>
          </div>
          <div class="pr-cart-item-right">
            <span class="pr-cart-item-price">${formatEGP(c.price * c.qty)} EGP</span>
            <button type="button" class="pr-cart-item-remove" data-remove="${c.id}" aria-label="Remove">✕</button>
          </div>
        </div>
      `).join("");

      $$("[data-remove]", itemsWrap).forEach(btn => {
        btn.addEventListener("click", () => removeFromCart(btn.dataset.remove));
      });
    }

    $("#cartSubtotal").textContent = formatEGP(cartSubtotal()) + " EGP";
    const discRow = $("#discountRow");
    if (state.discountPct > 0 && state.cart.length) {
      discRow.hidden = false;
      $("#cartDiscount").textContent = "- " + formatEGP(cartDiscountAmount()) + " EGP";
    } else {
      discRow.hidden = true;
    }
    $("#cartTotal").textContent = formatEGP(cartTotal()) + " EGP";

    renderCheckoutSummary();
  }

  /* ================= TABS BAR ================= */

  function setActiveTab(tabKey, opts) {
    opts = opts || {};
    state.activeTab = tabKey;

    $$(".pr-tab").forEach(t => {
      const active = t.dataset.tab === tabKey;
      t.classList.toggle("active", active);
      t.setAttribute("aria-selected", active ? "true" : "false");
    });

    const packagesSection = $("#packagesSection");
    const customSection = $("#customSection");
    const bottomSection = $("#bottomSection");

    if (tabKey === "custom") {
      packagesSection.hidden = true;
      bottomSection.hidden = true;
      customSection.hidden = false;
      $("#prTabNote").textContent = "Have a unique project in mind?";
    } else {
      packagesSection.hidden = false;
      bottomSection.hidden = false;
      customSection.hidden = true;
      const noteMap = {
        websites: "Choose a category to see packages",
        dashboards: "Explore Dashboard Packages",
        ai: "Explore AI Packages"
      };
      $("#prTabNote").textContent = noteMap[tabKey] || "Choose a category to see packages";

      renderHeroForTab(tabKey);
      renderCards(tabKey);
      renderCompareTable(tabKey);
      renderHowItWorks(tabKey);
      state.testimonialIndex = 0;
      renderTestimonial(tabKey);
    }

    if (!opts.skipScrollReveal) triggerReveal();
    if (!opts.skipHistory) {
      const url = new URL(window.location);
      url.searchParams.set("tab", tabKey);
      window.history.replaceState({}, "", url);
    }
  }

  function renderCompareTable(tabKey) {
    const data = PRICING_DATA[tabKey];
    const table = $("#compareTable");
    const c = data.compare;
    let html = "<thead><tr>" + c.headers.map(h => `<th>${h}</th>`).join("") + "</tr></thead><tbody>";
    c.rows.forEach(row => {
      html += "<tr>" + row.map((cell, i) => {
        if (i === 0) return `<td>${cell}</td>`;
        if (cell === true) return `<td class="pr-yes">✓</td>`;
        if (cell === false) return `<td class="pr-no">—</td>`;
        return `<td>${cell}</td>`;
      }).join("") + "</tr>";
    });
    html += "</tbody>";
    table.innerHTML = html;
  }

  function renderHowItWorks(tabKey) {
    const data = PRICING_DATA[tabKey];
    const wrap = $("#hiwSteps");
    wrap.innerHTML = data.howItWorks.map((s, i) => `
      <div class="pr-hiw-step">
        <div class="circle">${icon(s.icon)}</div>
        <span class="num">0${i + 1}</span>
        <strong>${s.title}</strong>
        <div class="step-line"></div>
      </div>
    `).join("");
  }

  function renderTestimonial(tabKey) {
    const data = PRICING_DATA[tabKey];
    const list = data.testimonials;
    const t = list[state.testimonialIndex % list.length];
    const initials = t.name.split(" ").map(w => w[0]).join("").slice(0, 2);
    $("#testimonialBody").innerHTML = `
      <div class="pr-testimonial-avatar">${initials}</div>
      <div>
        <p class="pr-testimonial-quote">"${t.quote}"</p>
        <strong class="pr-testimonial-name">${t.name}</strong>
        <span class="pr-testimonial-role">${t.role}</span>
        <span class="pr-stars">★★★★★</span>
      </div>
    `;
  }

  /* ================= SCROLL REVEAL ================= */
  // Elements are revealed once and then left alone: re-pausing an
  // already-finished CSS animation would freeze it back at its 0%
  // (invisible) keyframe, which previously made whole sections
  // disappear on the second tab switch. `data-revealed` marks the
  // ones that already played so later calls skip them.
  let revealObserver;
  function triggerReveal() {
    requestAnimationFrame(() => {
      const els = $$("[data-reveal]:not([data-revealed])");
      if (!revealObserver) {
        revealObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.style.animationPlayState = "running";
              entry.target.setAttribute("data-revealed", "");
              revealObserver.unobserve(entry.target);
            }
          });
        }, { threshold: 0.12 });
      }
      els.forEach(el => {
        el.style.animationPlayState = "paused";
        revealObserver.observe(el);
      });
    });
  }

  /* ================= CART DRAWER OPEN/CLOSE ================= */

  function openCart() {
    $("#cartOverlay").classList.add("open");
    $("#cartDrawer").classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeCart() {
    $("#cartOverlay").classList.remove("open");
    $("#cartDrawer").classList.remove("open");
    if (!$("#checkoutOverlay").classList.contains("open")) document.body.style.overflow = "";
  }

  /* ================= CHECKOUT ================= */

  function openCheckout() {
    if (!state.cart.length) return;
    closeCart();
    $("#checkoutOverlay").classList.add("open");
    document.body.style.overflow = "hidden";
    setCheckoutStep(1);
    $("#confirmationView").hidden = true;
    $(".pr-checkout-body").style.display = "";
    renderCheckoutSummary();
    window.scrollTo({ top: 0 });
  }
  function closeCheckout() {
    $("#checkoutOverlay").classList.remove("open");
    document.body.style.overflow = "";
  }

  function setCheckoutStep(n) {
    state.checkoutStep = n;
    $$(".pr-cstep").forEach(el => {
      const step = Number(el.dataset.step);
      el.classList.toggle("active", step === n);
      el.classList.toggle("done", step < n);
    });
    $$(".pr-cstep-line").forEach((el, i) => el.classList.toggle("done", i < n - 1));
  }

  function renderCheckoutSummary() {
    const wrap = $("#summaryItems");
    if (!wrap) return;
    wrap.innerHTML = state.cart.map(c => `
      <div class="pr-summary-item" data-id="${c.id}">
        <div class="pr-summary-item-thumb">${c.icon}</div>
        <div>
          <strong>${c.name}</strong>
          <span class="sub">${c.blurb}</span>
          <div class="pr-qty-row">
            <button type="button" data-qty="-1">−</button>
            <span>${c.qty}</span>
            <button type="button" data-qty="1">+</button>
          </div>
        </div>
        <div class="pr-summary-item-price">${formatEGP(c.price * c.qty)} EGP</div>
      </div>
    `).join("");

    $$("[data-qty]", wrap).forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.target.closest(".pr-summary-item").dataset.id;
        changeQty(id, Number(btn.dataset.qty));
      });
    });

    $("#summaryCount").textContent = state.cart.reduce((n, c) => n + c.qty, 0) + " items";
    $("#summarySubtotal").textContent = formatEGP(cartSubtotal()) + " EGP";

    const discRow = $("#summaryDiscountRow");
    if (state.discountPct > 0 && state.cart.length) {
      discRow.hidden = false;
      $("#summaryDiscount").textContent = "- " + formatEGP(cartDiscountAmount()) + " EGP";
      $("#summarySaved").hidden = false;
      $("#summarySaved").textContent = `You save ${formatEGP(cartDiscountAmount())} EGP 🎉`;
    } else {
      discRow.hidden = true;
      $("#summarySaved").hidden = true;
    }
    $("#summaryTotal").textContent = formatEGP(cartTotal()) + " EGP";
  }

  function applyPromo(code) {
    code = (code || "").trim().toUpperCase();
    if (!code) return;
    // Simple simulated promo codes — front-end only, no server validation.
    const codes = { WELCOME10: 10, KREEM15: 15, SAVE20: 20 };
    if (codes[code]) {
      state.discountPct = codes[code];
    } else {
      state.discountPct = 0;
    }
    renderCart();
  }

  /* ================= EVENTS ================= */

  function wireStaticEvents() {
    // Tabs
    $$(".pr-tab").forEach(tab => {
      tab.addEventListener("click", () => setActiveTab(tab.dataset.tab));
    });
    $("#prTabPrev").addEventListener("click", () => cycleTab(-1));
    $("#prTabNext").addEventListener("click", () => cycleTab(1));

    // Billing toggle
    $$(".pr-billing-toggle button").forEach(btn => {
      btn.addEventListener("click", () => {
        $$(".pr-billing-toggle button").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        state.billing = btn.dataset.billing;
        if (state.activeTab !== "custom") renderCards(state.activeTab);
      });
    });

    // Cart open/close
    $("#cartOpenBtn").addEventListener("click", openCart);
    $("#cartCloseBtn").addEventListener("click", closeCart);
    $("#cartOverlay").addEventListener("click", closeCart);

    // goto custom tab links (inside cart / checkout)
    $$("[data-goto-tab]").forEach(a => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        closeCart();
        closeCheckout();
        setActiveTab(a.dataset.gotoTab);
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });

    // Promo
    $("#promoApply").addEventListener("click", () => applyPromo($("#promoInput").value));
    $("#promoApply2").addEventListener("click", () => applyPromo($("#promoInput2").value));

    // Checkout open/close
    $("#proceedCheckoutBtn").addEventListener("click", openCheckout);
    $("#backToCartBtn").addEventListener("click", () => { closeCheckout(); openCart(); });
    $("#backHomeBtn").addEventListener("click", () => { closeCheckout(); resetAfterOrder(); });

    // Payment method tabs
    $$(".pr-pay-tabs button").forEach(btn => {
      btn.addEventListener("click", () => {
        $$(".pr-pay-tabs button").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        $$(".pr-pay-panel").forEach(p => p.classList.toggle("active", p.dataset.payPanel === btn.dataset.pay));
      });
    });

    $("#instapaySentBtn").addEventListener("click", () => placeOrder());

    // Place order
    $("#placeOrderBtn").addEventListener("click", () => placeOrder());

    // Custom form submit (simulated)
    $("#customForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = e.target.querySelector('button[type="submit"]');
      const original = btn.innerHTML;
      btn.innerHTML = "Sending…";
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = "Request Sent ✓";
        setTimeout(() => {
          btn.innerHTML = original;
          btn.disabled = false;
          e.target.reset();
          window.open("https://wa.me/201211179625", "_blank", "noopener,noreferrer");
        }, 1400);
      }, 900);
    });

    // File drop visuals (no real upload)
    const drop = $(".pr-file-drop");
    const fileInput = $("#customFile");
    ["dragenter", "dragover"].forEach(evt => drop.addEventListener(evt, (e) => { e.preventDefault(); drop.classList.add("dragover"); }));
    ["dragleave", "drop"].forEach(evt => drop.addEventListener(evt, (e) => { e.preventDefault(); drop.classList.remove("dragover"); }));
    drop.addEventListener("drop", (e) => {
      if (e.dataTransfer.files.length) {
        fileInput.files = e.dataTransfer.files;
        updateFileDropLabel();
      }
    });
    fileInput.addEventListener("change", updateFileDropLabel);
    function updateFileDropLabel() {
      const n = fileInput.files.length;
      if (n) drop.querySelector("span").innerHTML = `${n} file${n > 1 ? "s" : ""} selected`;
    }

    // Mobile nav
    const navToggle = $("#navToggle");
    const mobilePanel = $("#mobileNavPanel");
    navToggle.addEventListener("click", () => {
      const open = mobilePanel.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    $$("#mobileNavPanel a").forEach(a => a.addEventListener("click", () => mobilePanel.classList.remove("open")));

    // Testimonial arrows
    $("#testiPrev").addEventListener("click", () => cycleTestimonial(-1));
    $("#testiNext").addEventListener("click", () => cycleTestimonial(1));

    // Escape closes overlays
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      if ($("#checkoutOverlay").classList.contains("open")) closeCheckout();
      else if ($("#cartDrawer").classList.contains("open")) closeCart();
    });
  }

  function cycleTab(dir) {
    const i = TABS.indexOf(state.activeTab);
    const next = TABS[(i + dir + TABS.length) % TABS.length];
    setActiveTab(next);
  }

  function cycleTestimonial(dir) {
    const list = PRICING_DATA[state.activeTab].testimonials;
    state.testimonialIndex = (state.testimonialIndex + dir + list.length) % list.length;
    renderTestimonial(state.activeTab);
  }

  function placeOrder() {
    const form = $("#checkoutForm");
    const required = $$("input[required], select[required]", form);
    const missing = required.filter(el => !el.value.trim());
    if (missing.length) {
      missing[0].focus();
      missing[0].style.borderColor = "#ef4444";
      return;
    }
    $(".pr-checkout-body").style.display = "none";
    $("#confirmationView").hidden = false;
    setCheckoutStep(4);
    // Clear the cart after a simulated successful order.
    state.cart = [];
    state.discountPct = 0;
    saveCart();
    renderCart();
  }

  function resetAfterOrder() {
    setActiveTab("websites");
    window.scrollTo({ top: 0 });
  }

  /* ================= INIT ================= */

  function init() {
    loadCart();
    wireStaticEvents();
    renderCart();

    const urlTab = new URL(window.location).searchParams.get("tab");
    const initialTab = TABS.includes(urlTab) ? urlTab : "websites";
    setActiveTab(initialTab, { skipHistory: true });

    // Sticky header shrink-on-scroll shadow (subtle)
    const header = $("#siteHeader");
    window.addEventListener("scroll", () => {
      header.style.boxShadow = window.scrollY > 10 ? "0 8px 24px rgba(0,0,0,0.35)" : "none";
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
