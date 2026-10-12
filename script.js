/* Content & Personal Branding — interactions */
(function () {
  'use strict';

  document.documentElement.classList.add('js');

  /* ---------- sticky header ---------- */
  var header = document.getElementById('siteHeader');
  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 10); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- mobile menu ---------- */
  var toggle = document.getElementById('menuToggle');
  var menu = document.getElementById('mobileMenu');
  toggle.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- resources dropdown ---------- */
  var dd = document.querySelector('.dd');
  if (dd) {
    var ddBtn = dd.querySelector('.dd-btn');
    ddBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = dd.classList.toggle('open');
      ddBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('click', function (e) {
      if (!dd.contains(e.target)) {
        dd.classList.remove('open');
        ddBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- scroll spy ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-links > a'));
  var pairs = links.map(function (a) {
    return { a: a, sec: document.querySelector(a.getAttribute('href')) };
  }).filter(function (p) { return p.sec; });
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      links.forEach(function (l) { l.classList.remove('active'); });
      var hit = pairs.filter(function (p) { return p.sec === e.target; })[0];
      if (hit) hit.a.classList.add('active');
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  pairs.forEach(function (p) { spy.observe(p.sec); });

  /* ---------- reveal on scroll ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  /* ---------- animated counters ---------- */
  var co = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target;
      co.unobserve(el);
      var end = parseFloat(el.getAttribute('data-count')) || 0;
      var suffix = el.getAttribute('data-suffix') || '';
      var dur = 1400;
      var t0 = performance.now();
      function step(t) {
        var p = Math.min((t - t0) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(end * eased) + suffix;
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = end + suffix;
      }
      requestAnimationFrame(step);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(function (el) { co.observe(el); });

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var btn = item.querySelector('.faq-q');
    var ans = item.querySelector('.faq-a');
    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (o) {
        o.classList.remove('open');
        o.querySelector('.faq-a').style.maxHeight = null;
        o.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        ans.style.maxHeight = ans.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------- registration form (demo submit) ---------- */
  var form = document.getElementById('registerForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      form.style.display = 'none';
      var ok = document.getElementById('formSuccess');
      ok.style.display = 'block';
      ok.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  /* ---------- contact form (Web3Forms AJAX submit) ---------- */
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    var submitBtn = document.getElementById('contactSubmit');
    var okBox = document.getElementById('contactSuccess');
    var errBox = document.getElementById('contactError');
    var btnLabel = submitBtn.textContent;

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!contactForm.checkValidity()) { contactForm.reportValidity(); return; }

      okBox.style.display = 'none';
      errBox.style.display = 'none';
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      fetch(contactForm.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(contactForm)
      })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (data.success) {
            contactForm.reset();
            okBox.style.display = 'block';
            okBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
          } else {
            errBox.style.display = 'block';
          }
        })
        .catch(function () { errBox.style.display = 'block'; })
        .then(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = btnLabel;
        });
    });
  }
})();