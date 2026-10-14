const $ = (s) => document.querySelector(s);
const fmt = (n) => `${n.toLocaleString("pl-PL")} zł`;
const store = {
  get: (k) => { try { return JSON.parse(localStorage.getItem(k)) || {}; } catch { return {}; } },
  set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* tryb prywatny */ } }
};

let cart = store.get("jr-cart"); // { id: qty }
let favs = store.get("jr-favs"); // { id: true }
let filter = "all";

const byId = (id) => PRODUCTS.find((p) => p.id === id);

function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toast.t);
  toast.t = setTimeout(() => t.classList.remove("show"), 2000);
}

/* ---------- Karty produktów ---------- */
function cardHtml(p) {
  return `<article class="card">
    <div class="card-img-wrap" style="position:relative">
      ${p.bestseller ? '<span class="tag">Bestseller</span>' : ""}
      <button class="fav ${favs[p.id] ? "on" : ""}" data-fav="${p.id}" aria-label="Dodaj do ulubionych" aria-pressed="${!!favs[p.id]}">${favs[p.id] ? "♥" : "♡"}</button>
      <button class="card-img" data-open="${p.id}" aria-label="Zobacz: ${p.name}">${productImage(p)}</button>
    </div>
    <h3>${p.name}</h3>
    <p class="price">${fmt(p.price)}</p>
    <button class="btn" data-add="${p.id}">Dodaj do koszyka</button>
  </article>`;
}

function renderLists() {
  $("#bestsellers").innerHTML = PRODUCTS.filter((p) => p.bestseller).map(cardHtml).join("");
  const list = filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);
  $("#shop").innerHTML = list.map(cardHtml).join("");
  document.querySelectorAll("#filters button").forEach((b) => b.classList.toggle("active", b.dataset.f === filter));
}

function renderStatic() {
  $("#cats").innerHTML = CATEGORIES.map((c) =>
    `<button class="cat" data-cat="${c.id}">${artSvg(c.art, c.tone)}<span>${c.label}</span></button>`).join("");
  const labels = { all: "Wszystko", naszyjniki: "Naszyjniki", kolczyki: "Kolczyki", pierscionki: "Pierścionki", bransoletki: "Bransoletki" };
  $("#filters").innerHTML = Object.entries(labels).map(([k, v]) => `<button data-f="${k}">${v}</button>`).join("");
  $("#year").textContent = new Date().getFullYear();
}

function setFilter(f, scroll) {
  filter = f;
  renderLists();
  if (scroll) $("#sklep").scrollIntoView({ behavior: "smooth" });
}

/* ---------- Koszyk ---------- */
function cartCount() { return Object.values(cart).reduce((a, b) => a + b, 0); }
function cartTotal() { return Object.entries(cart).reduce((s, [id, q]) => s + byId(id).price * q, 0); }

function renderCart() {
  const entries = Object.entries(cart).filter(([id]) => byId(id));
  $("#cart-items").innerHTML = entries.length
    ? entries.map(([id, q]) => {
        const p = byId(id);
        return `<div class="line">
          <div class="thumb">${productImage(p)}</div>
          <div><h4>${p.name}</h4><small>${fmt(p.price)}</small>
            <div class="qty"><button data-dec="${id}" aria-label="Mniej">−</button><span>${q}</span><button data-inc="${id}" aria-label="Więcej">+</button></div></div>
          <button class="rm" data-rm="${id}" aria-label="Usuń">×</button></div>`;
      }).join("")
    : '<p class="empty">Twój koszyk jest pusty.</p>';
  const n = cartCount();
  const badge = $("#cart-count");
  badge.textContent = n;
  badge.hidden = n === 0;
  $("#cart-total").textContent = fmt(cartTotal());
  $("#checkout").style.opacity = n ? 1 : .4;
  $("#checkout").style.pointerEvents = n ? "auto" : "none";
  store.set("jr-cart", cart);
}

function renderFavCount() {
  const n = Object.keys(favs).length;
  $("#fav-count").textContent = n;
  $("#fav-count").hidden = n === 0;
  store.set("jr-favs", favs);
}

function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  renderCart();
  toast(`Dodano do koszyka: ${byId(id).name}`);
}

function setDrawer(open) {
  $("#drawer").classList.toggle("open", open);
  $("#drawer").setAttribute("aria-hidden", String(!open));
  $("#overlay").hidden = !open;
}

function checkoutMail() {
  const lines = Object.entries(cart).map(([id, q]) => `- ${byId(id).name} × ${q} = ${fmt(byId(id).price * q)}`);
  const body = `Dzień dobry,\n\nChciałabym złożyć zamówienie:\n\n${lines.join("\n")}\n\nRazem: ${fmt(cartTotal())}\n\nImię i nazwisko:\nAdres dostawy:\nTelefon:\n`;
  return `mailto:kontakt@justyna-rekodzielo.pl?subject=${encodeURIComponent("Zamówienie ze sklepu")}&body=${encodeURIComponent(body)}`;
}

/* ---------- Modal produktu ---------- */
function openProduct(id) {
  const p = byId(id);
  $("#modal-body").innerHTML = `<div class="modal-img">${productImage(p)}</div>
    <div class="modal-info">
      <span class="cat-label">${p.category}</span>
      <h3>${p.name}</h3>
      <p class="price">${fmt(p.price)}</p>
      <p>${p.desc}</p>
      <ul>${p.details.map((d) => `<li>${d}</li>`).join("")}</ul>
      <button class="btn" data-add="${p.id}">Dodaj do koszyka</button>
    </div>`;
  $("#product-modal").showModal();
}

/* ---------- Zdarzenia ---------- */
document.addEventListener("click", (e) => {
  const t = e.target.closest("button, a");
  if (!t) return;
  const d = t.dataset;
  if (d.add) { addToCart(d.add); $("#product-modal").close(); }
  else if (d.open) openProduct(d.open);
  else if (d.fav) {
    if (favs[d.fav]) delete favs[d.fav]; else favs[d.fav] = true;
    renderFavCount(); renderLists();
  }
  else if (d.cat) setFilter(d.cat, true);
  else if (d.f) setFilter(d.f, false);
  else if (d.inc) { cart[d.inc]++; renderCart(); }
  else if (d.dec) { if (--cart[d.dec] <= 0) delete cart[d.dec]; renderCart(); }
  else if (d.rm) { delete cart[d.rm]; renderCart(); }
  else if (t.id === "cart-btn") setDrawer(true);
  else if (t.id === "drawer-close") setDrawer(false);
  else if (t.id === "fav-btn") {
    setFilter("all", false);
    const first = document.querySelector(".fav.on");
    toast(first ? `Ulubione produkty: ${Object.keys(favs).length}` : "Dodaj produkty do ulubionych (♡)");
  }
  else if (t.classList.contains("modal-close")) $("#product-modal").close();
  else if (t.id === "checkout") { t.href = checkoutMail(); }
  else if (t.closest("#nav") && d.filter) { setFilter(d.filter, false); $("#nav").classList.remove("open"); }
  else if (t.closest("#nav")) $("#nav").classList.remove("open");
});

$("#overlay").addEventListener("click", () => setDrawer(false));
$("#product-modal").addEventListener("click", (e) => { if (e.target.id === "product-modal") e.target.close(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setDrawer(false); });
$(".nav-toggle").addEventListener("click", (e) => {
  const open = $("#nav").classList.toggle("open");
  e.currentTarget.setAttribute("aria-expanded", String(open));
});

$("#newsletter").addEventListener("submit", (e) => {
  e.preventDefault();
  const v = $("#nl-email").value.trim();
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  $("#nl-msg").textContent = ok ? "Dziękujemy! (wersja demo – adres nie został zapisany)" : "Podaj poprawny adres e-mail.";
  if (ok) e.target.reset();
});

// Usuń z koszyka/ulubionych produkty, których już nie ma w katalogu
for (const id of Object.keys(cart)) if (!byId(id)) delete cart[id];
for (const id of Object.keys(favs)) if (!byId(id)) delete favs[id];

renderStatic();
renderLists();
renderCart();
renderFavCount();
