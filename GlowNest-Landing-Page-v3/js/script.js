/* GlowNest v3: responsive/interactive fixes */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var money = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

  /* ---------- Mobile navigation ---------- */
  var burger = $('#burger'), menu = $('#site-nav');
  function setMenu(open) {
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  burger.addEventListener('click', function () { setMenu(!menu.classList.contains('open')); });
  $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('click', function (e) {
    if (menu.classList.contains('open') && !e.target.closest('.header')) setMenu(false);
  });
  window.matchMedia('(min-width: 861px)').addEventListener('change', function () { setMenu(false); });

  /* ---------- Smooth scroll for internal links (respects sticky header via CSS scroll-padding) ---------- */
  $$('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id === '#') { e.preventDefault(); toast('Demo link: no real social account.'); return; }
      var target = $(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      if (history.pushState) history.pushState(null, '', id);
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });

  /* ---------- Active nav link ---------- */
  var links = $$('a', menu);
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (l) { l.classList.toggle('active', l.getAttribute('href') === '#' + en.target.id); });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    ['home', 'story', 'shop', 'ingredients', 'contact'].forEach(function (id) { var s = document.getElementById(id); if (s) spy.observe(s); });
  }

  /* ---------- Toast ---------- */
  var toastEl = $('#toast'), toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 2200);
  }

  /* ---------- Shopping bag (front-end demo) ---------- */
  var KEY = 'glownest_bag_v1';
  var bag = load();
  var panel = $('#bag-panel'), overlay = $('#overlay'), openBtn = $('#bag-open'), closeBtn = $('#bag-close');
  var lastFocus = null;

  function load() {
    try {
      var data = JSON.parse(localStorage.getItem(KEY));
      if (!Array.isArray(data)) return [];
      return data.filter(function (i) {
        return i && typeof i.id === 'string' && typeof i.name === 'string' &&
          isFinite(i.price) && i.price >= 0 && Number.isInteger(i.qty) && i.qty > 0;
      });
    } catch (e) { return []; }
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(bag)); } catch (e) { /* storage unavailable */ } }

  function render() {
    var list = $('#bag-list');
    list.textContent = '';
    var count = 0, total = 0;
    bag.forEach(function (item) {
      count += item.qty; total += item.price * item.qty;
      var li = document.createElement('li'); li.className = 'bag-item';
      var name = document.createElement('strong'); name.textContent = item.name;
      var meta = document.createElement('small'); meta.textContent = 'Qty ' + item.qty + ' x ' + money.format(item.price) + ' = ' + money.format(item.price * item.qty);
      var rm = document.createElement('button'); rm.type = 'button'; rm.className = 'rm'; rm.dataset.id = item.id;
      rm.textContent = 'Remove'; rm.setAttribute('aria-label', 'Remove ' + item.name + ' from bag');
      li.appendChild(name); li.appendChild(meta); li.appendChild(rm); list.appendChild(li);
    });
    $('#bag-empty').hidden = bag.length > 0;
    $('#bag-subtotal').textContent = money.format(total);
    var c = $('#bag-count'); c.textContent = count;
    openBtn.setAttribute('aria-label', 'Open shopping bag, ' + count + (count === 1 ? ' item' : ' items'));
  }

  function addItem(btn) {
    var id = btn.dataset.id, price = Number(btn.dataset.price);
    var found = bag.filter(function (i) { return i.id === id; })[0];
    if (found) found.qty += 1; else bag.push({ id: id, name: btn.dataset.name, price: price, qty: 1 });
    save(); render();
    var c = $('#bag-count'); c.classList.add('pop'); setTimeout(function () { c.classList.remove('pop'); }, 220);
    toast(btn.dataset.name + ' added to your bag');
  }

  // One delegated listener per container: no duplicate handlers possible.
  $('#products').addEventListener('click', function (e) {
    var btn = e.target.closest('.add-btn'); if (btn) addItem(btn);
  });
  $('#bag-list').addEventListener('click', function (e) {
    var rm = e.target.closest('.rm'); if (!rm) return;
    bag = bag.filter(function (i) { return i.id !== rm.dataset.id; });
    save(); render(); toast('Item removed');
    (bag.length ? $('.rm', panel) : closeBtn).focus();
  });

  function setBag(open) {
    if (!open && lastFocus && panel.contains(document.activeElement)) { lastFocus.focus(); }
    panel.classList.toggle('open', open);
    panel.setAttribute('aria-hidden', String(!open));
    openBtn.setAttribute('aria-expanded', String(open));
    overlay.hidden = !open;
    document.body.classList.toggle('lock', open);
    if (open) { lastFocus = document.activeElement; panel.focus(); }
  }
  openBtn.addEventListener('click', function () { setBag(true); });
  closeBtn.addEventListener('click', function () { setBag(false); });
  overlay.addEventListener('click', function () { setBag(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (panel.classList.contains('open')) setBag(false);
      else if (menu.classList.contains('open')) { setMenu(false); burger.focus(); }
    }
    // simple focus trap while the bag is open
    if (e.key === 'Tab' && panel.classList.contains('open')) {
      var f = $$('button', panel).filter(function (b) { return !b.hidden; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === panel)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  render();

  /* ---------- Newsletter (no server) ---------- */
  var form = $('#news-form'), email = $('#email'), msg = $('#news-msg');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var v = email.value.trim();
    var valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
    msg.className = 'msg ' + (valid ? 'ok' : 'err');
    email.setAttribute('aria-invalid', String(!valid));
    if (valid) {
      msg.textContent = 'Thanks! This is a demo, so nothing was sent or saved.';
      form.reset();
    } else {
      msg.textContent = v ? 'Enter a valid email, like name@example.com.' : 'Enter your email address to subscribe.';
      email.focus();
    }
  });
  email.addEventListener('input', function () { email.removeAttribute('aria-invalid'); });

  /* ---------- FAQ accordion ---------- */
  $$('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      document.getElementById(btn.getAttribute('aria-controls')).classList.toggle('open', !open);
    });
  });

  /* ---------- Scroll reveal ---------- */
  var reveals = $$('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Back to top ---------- */
  var topBtn = $('#to-top');
  function onScroll() { topBtn.hidden = window.scrollY < 600; }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  topBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    var logo = $('.logo'); if (logo) logo.focus({ preventScroll: true });
  });

  /* ---------- Image fallback ---------- */
  $$('.img-box img').forEach(function (img) {
    function fail() { img.parentElement.classList.add('failed'); }
    img.addEventListener('error', fail);
    if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) fail();
  });
})();
