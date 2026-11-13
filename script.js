(() => {
  'use strict';
  const D = window.ORBITA || {};
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const esc = (t = '') => String(t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const waUrl = text => 'https://wa.me/' + D.whatsapp + (text ? '?text=' + encodeURIComponent(text) : '');
  const ico = id => `<svg class="ico"><use href="#${id}"/></svg>`;

  /* ---------- dados básicos ---------- */
  $$('[data-fill]').forEach(el => { el.textContent = D[el.dataset.fill] || ''; });
  $$('[data-wa]').forEach(a => { a.href = waUrl(a.dataset.wa); a.target = '_blank'; a.rel = 'noopener'; });
  if (D.instagram) { $('[data-if="instagram"]').hidden = false; const ig = $('#ig-link'); ig.href = D.instagram; const h = D.instagram.match(/instagram\.com\/([^/?#]+)/); if (h) ig.textContent = '@' + h[1]; }
  if (D.email) { $('[data-if="email"]').hidden = false; const m = $('#mail-link'); m.href = 'mailto:' + D.email; m.textContent = D.email; }
  $('#year').textContent = new Date().getFullYear();
  requestAnimationFrame(() => document.documentElement.classList.add('is-loaded'));

  /* ---------- menu ---------- */
  const menu = $('#menu'), menuBtn = $('.menu-btn');
  const setMenu = open => {
    menuBtn.setAttribute('aria-expanded', open);
    menuBtn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    document.body.classList.toggle('menu-open', open);
    if (open) { menu.hidden = false; requestAnimationFrame(() => requestAnimationFrame(() => menu.classList.add('is-open'))); }
    else { menu.classList.remove('is-open'); setTimeout(() => { if (!menu.classList.contains('is-open')) menu.hidden = true; }, 800); }
  };
  menuBtn.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
  $$('a', menu).forEach(a => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape' && menu.classList.contains('is-open')) setMenu(false); });

  /* ---------- marquee de logos ---------- */
  const clients = D.clients || [];
  const pills = clients.map(c => `<div class="logo-pill"><img src="${esc(c.image)}" alt="" width="44" height="44" loading="lazy"><span>${esc(c.name)}</span></div>`).join('');
  $('#logo-track').innerHTML = pills + pills;
  $$('.logo-pill', $('#logo-track')).slice(clients.length).forEach(p => p.setAttribute('aria-hidden', 'true'));

  /* ---------- "agora criando" ---------- */
  const nowWords = ['reels para o varejo', 'identidade visual', 'encartes da semana', 'jingles que grudam', 'sites que vendem no celular', 'fotos de produto', 'campanhas de fim de ano'];
  const nowEl = $('#now-word');
  if (!reduce) {
    let ni = 0;
    setInterval(() => {
      nowEl.classList.add('out');
      setTimeout(() => { ni = (ni + 1) % nowWords.length; nowEl.textContent = nowWords[ni]; nowEl.classList.remove('out'); }, 380);
    }, 2600);
  }

  /* ---------- manifesto: palavra por palavra ---------- */
  const man = $('#manifesto');
  const hlWords = ['estratégia,', 'design', 'audiovisual', 'únicas.', 'escuta.', 'cria.'];
  man.innerHTML = man.textContent.trim().split(/\s+/).map(w => `<span class="w${hlWords.includes(w) ? ' hl' : ''}">${esc(w)}</span>`).join(' ');
  const manWords = $$('.w', man);

  /* ---------- números ---------- */
  const countUp = el => {
    const to = +el.dataset.count; if (reduce) { el.textContent = to; return; }
    const t0 = performance.now(), dur = 1400;
    const step = t => { const k = Math.min(1, (t - t0) / dur); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  };

  /* ---------- serviços ---------- */
  const services = D.services || [];
  const pillars = D.pillars || {};
  const selected = new Set();
  const svcList = $('#svc-list');
  svcList.innerHTML = services.map((s, i) => `
    <li class="svc" data-pillar="${esc(s.pillar)}">
      <button class="svc-btn" aria-expanded="false" aria-controls="svc-${i}">
        <span class="svc-num">${String(i + 1).padStart(2, '0')}</span>
        <span class="svc-name">${esc(s.name)}</span>
        <span class="svc-plus">${ico('i-plus')}</span>
      </button>
      <div class="svc-body" id="svc-${i}" role="region"><div><div class="svc-inner">
        <span class="svc-pillar">${esc(pillars[s.pillar] || '')}</span>
        <p>${esc(s.description)}</p>
        <div class="svc-tags">${(s.tags || []).map(t => `<span>${esc(t)}</span>`).join('')}</div>
        <button class="svc-add" data-svc="${esc(s.name)}" type="button">${ico('i-plus')}<span>Adicionar à proposta</span></button>
      </div></div></div>
    </li>`).join('');
  $$('.svc-btn', svcList).forEach(btn => btn.addEventListener('click', () => {
    const li = btn.closest('.svc'), open = !li.classList.contains('is-open');
    $$('.svc.is-open', svcList).forEach(o => { if (o !== li) { o.classList.remove('is-open'); $('.svc-btn', o).setAttribute('aria-expanded', 'false'); } });
    li.classList.toggle('is-open', open); btn.setAttribute('aria-expanded', open);
  }));
  // abre o primeiro para mostrar como funciona
  $('.svc-btn', svcList)?.click();

  const pillarBox = $('#pillars');
  const pillarKeys = ['todos', ...Object.keys(pillars)];
  pillarBox.innerHTML = pillarKeys.map(k => {
    const n = k === 'todos' ? services.length : services.filter(s => s.pillar === k).length;
    return `<button class="chip" role="tab" aria-selected="${k === 'todos'}" data-k="${k}">${k === 'todos' ? 'Todos' : esc(pillars[k])}<sup>${n}</sup></button>`;
  }).join('');
  pillarBox.addEventListener('click', e => {
    const b = e.target.closest('.chip'); if (!b) return;
    $$('.chip', pillarBox).forEach(c => c.setAttribute('aria-selected', c === b));
    $$('.svc', svcList).forEach(li => li.classList.toggle('dim', b.dataset.k !== 'todos' && li.dataset.pillar !== b.dataset.k));
  });

  /* ---------- trabalhos (sites) ---------- */
  const sites = D.sites || [];
  const host = u => u.replace(/^https?:\/\//, '').replace(/\/$/, '');
  $('#cases').innerHTML = sites.map(s => `
    <article class="case" style="--accent:${esc(s.accent || '#1F6BFF')}">
      <div class="case-stage">
        <div class="browser"><div class="browser-bar"><i></i><i></i><i></i><span>${esc(host(s.url))}</span></div>
          <img src="${esc(s.desktop)}" alt="Site ${esc(s.client)} no computador" loading="lazy" width="1200" height="750"></div>
        <div class="device"><img src="${esc(s.mobile)}" alt="Site ${esc(s.client)} no celular" loading="lazy" width="508" height="1100"></div>
      </div>
      <div class="case-info">
        <span class="mono">${esc(s.segment)}</span>
        <div class="case-top"><h3>${esc(s.client)}</h3><span class="case-go">${ico('i-arrow')}</span></div>
        <p>${esc(s.highlight)}</p>
      </div>
      <a class="case-link" href="${esc(s.url)}" target="_blank" rel="noopener" aria-label="Visitar o site ${esc(s.client)}"></a>
    </article>`).join('');
  const cases = $('#cases'), dots = $('#cases-dots');
  dots.innerHTML = sites.map(() => '<i></i>').join('');
  const caseIndex = () => {
    const cards = $$('.case', cases); if (!cards.length) return 0;
    const w = cards[0].getBoundingClientRect().width + 16;
    return Math.max(0, Math.min(cards.length - 1, Math.round(cases.scrollLeft / w)));
  };
  const paintDots = () => { const i = caseIndex(); $$('i', dots).forEach((d, k) => d.classList.toggle('on', k === i)); };
  cases.addEventListener('scroll', () => requestAnimationFrame(paintDots), { passive: true });
  paintDots();
  $$('.cases-arrows .round-btn').forEach(b => b.addEventListener('click', () => {
    const cards = $$('.case', cases); const i = Math.max(0, Math.min(cards.length - 1, caseIndex() + +b.dataset.dir));
    cases.scrollTo({ left: cards[i].offsetLeft - cards[0].offsetLeft, behavior: reduce ? 'auto' : 'smooth' });
  }));

  /* ---------- clientes ---------- */
  const cats = ['Todos', ...new Set(clients.map(c => c.category))];
  const filterBox = $('#client-filters');
  filterBox.innerHTML = cats.map((c, i) => `<button class="chip" role="tab" aria-selected="${i === 0}" data-c="${esc(c)}">${esc(c)}</button>`).join('');
  $('#client-grid').innerHTML = clients.map(c => `
    <li class="client reveal" data-c="${esc(c.category)}">
      <img src="${esc(c.image)}" alt="Logo ${esc(c.name)}" width="64" height="64" loading="lazy">
      <div><span class="tag">${esc(c.category)}</span><b>${esc(c.name)}</b><small>${esc(c.work)}</small></div>
    </li>`).join('');
  filterBox.addEventListener('click', e => {
    const b = e.target.closest('.chip'); if (!b) return;
    $$('.chip', filterBox).forEach(c => c.setAttribute('aria-selected', c === b));
    $$('.client').forEach(li => li.classList.toggle('hide', b.dataset.c !== 'Todos' && li.dataset.c !== b.dataset.c));
  });

  /* ---------- processo ---------- */
  const stepsEl = $('#steps');
  stepsEl.insertAdjacentHTML('beforeend', (D.process || []).map((p, i) => `
    <li class="step"><span class="mono">Etapa ${String(i + 1).padStart(2, '0')}</span><h3>${esc(p.title)}</h3><p>${esc(p.text)}</p></li>`).join(''));
  const stepEls = $$('.step', stepsEl);

  /* ---------- proposta ---------- */
  const pick = $('#pick');
  pick.innerHTML = services.map(s => `<button type="button" aria-pressed="false" data-svc="${esc(s.name)}"><span class="box">${ico('i-check')}</span>${esc(s.name)}</button>`).join('');
  const fName = $('#f-name'), fCompany = $('#f-company'), fMsg = $('#f-msg'), bubble = $('#preview-bubble'), err = $('#form-error'), selCount = $('#sel-count');
  const buildMsg = () => {
    const name = fName.value.trim(), company = fCompany.value.trim(), msg = fMsg.value.trim();
    let t = `Olá, Órbita! ${name ? `Sou ${name}` : 'Vim pelo site'}${company ? `, da ${company}` : ''}.`;
    t += selected.size ? `\n\nTenho interesse em:\n${[...selected].map(s => '• ' + s).join('\n')}` : '\n\nQuero conversar sobre um projeto.';
    if (msg) t += `\n\nSobre o projeto: ${msg}`;
    return t;
  };
  const syncPreview = () => {
    bubble.textContent = buildMsg();
    bubble.style.animation = 'none'; void bubble.offsetWidth; bubble.style.animation = '';
    selCount.textContent = selected.size ? `(${selected.size} selecionado${selected.size > 1 ? 's' : ''})` : '(nenhum selecionado)';
    $$('button', pick).forEach(b => b.setAttribute('aria-pressed', selected.has(b.dataset.svc)));
    $$('.svc-add').forEach(b => {
      const on = selected.has(b.dataset.svc);
      b.classList.toggle('added', on);
      b.innerHTML = on ? `${ico('i-check')}<span>Na proposta — ver</span>` : `${ico('i-plus')}<span>Adicionar à proposta</span>`;
    });
    if (selected.size) err.hidden = true;
  };
  const toggleSvc = name => { selected.has(name) ? selected.delete(name) : selected.add(name); syncPreview(); };
  pick.addEventListener('click', e => { const b = e.target.closest('button'); if (b) toggleSvc(b.dataset.svc); });
  $$('.svc-add').forEach(b => b.addEventListener('click', () => {
    if (selected.has(b.dataset.svc)) { $('#proposta').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }); return; }
    toggleSvc(b.dataset.svc);
  }));
  [fName, fCompany, fMsg].forEach(f => f.addEventListener('input', syncPreview));
  $('#proposal-form').addEventListener('submit', e => {
    e.preventDefault();
    if (!selected.size) { err.hidden = false; pick.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' }); return; }
    window.open(waUrl(buildMsg()), '_blank', 'noopener');
  });
  syncPreview();

  /* ---------- reveal ---------- */
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (!en.isIntersecting) return;
    en.target.classList.add('in');
    $$('[data-count]', en.target).forEach(countUp);
    if (en.target.matches('[data-count]')) countUp(en.target);
    io.unobserve(en.target);
  }), { rootMargin: '0px 0px -8% 0px', threshold: .12 });
  const groups = new Map();
  $$('.reveal').forEach(el => {
    const p = el.parentElement; const k = groups.get(p) || 0; groups.set(p, k + 1);
    el.style.setProperty('--d', Math.min(k, 6) * 0.08 + 's');
    io.observe(el);
  });

  /* ---------- rolagem: nav, progresso, manifesto, processo ---------- */
  const nav = $('.nav'), bar = $('.progress'), waF = $('.wa-float'), hero = $('.hero');
  const navLinks = $$('.nav-links a');
  const sections = navLinks.map(a => $(a.getAttribute('href')));
  let lastY = scrollY, ticking = false;
  const onScroll = () => {
    const y = scrollY, vh = innerHeight, max = document.documentElement.scrollHeight - vh;
    bar.style.setProperty('--p', max > 0 ? y / max : 0);
    nav.classList.toggle('is-scrolled', y > 20);
    nav.classList.toggle('is-hidden', y > lastY && y > vh * .8 && !document.body.classList.contains('menu-open'));
    waF.classList.toggle('show', y > hero.offsetHeight * .7);
    lastY = y;

    // manifesto
    const mr = man.getBoundingClientRect();
    const k = Math.min(1, Math.max(0, (vh * .85 - mr.top) / (mr.height + vh * .35)));
    const on = Math.round(k * manWords.length);
    manWords.forEach((w, i) => w.classList.toggle('on', i < on));

    // processo
    const sr = stepsEl.getBoundingClientRect();
    const sp = Math.min(1, Math.max(0, (vh * .6 - sr.top) / sr.height));
    stepsEl.style.setProperty('--sp', sp.toFixed(4));
    const wide = innerWidth >= 1000;
    stepEls.forEach((s, i) => s.classList.toggle('on', wide ? sp >= i / stepEls.length + .02 : s.getBoundingClientRect().top < vh * .6));

    // link ativo
    let cur = -1; sections.forEach((s, i) => { if (s && s.getBoundingClientRect().top < vh * .4) cur = i; });
    navLinks.forEach((a, i) => a.classList.toggle('is-active', i === cur));
    ticking = false;
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  addEventListener('resize', onScroll);
  onScroll();

  /* ---------- cursor + botões magnéticos (só com mouse) ---------- */
  if (fine && !reduce) {
    const cur = $('.cursor'), dot = $('.cursor-dot'), ring = $('.cursor-ring');
    let mx = -100, my = -100, rx = -100, ry = -100;
    addEventListener('pointermove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate3d(${mx}px,${my}px,0)`;
      const t = e.target;
      cur.classList.toggle('is-hover', !!t.closest('a,button,.case'));
      cur.classList.toggle('is-light', !!t.closest('.light'));
    }, { passive: true });
    const loop = () => { rx += (mx - rx) * .18; ry += (my - ry) * .18; ring.style.transform = `translate3d(${rx}px,${ry}px,0)`; requestAnimationFrame(loop); };
    loop();
    $$('.magnetic').forEach(b => {
      b.addEventListener('pointermove', e => {
        const r = b.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
        b.style.transform = `translate(${(x - r.width / 2) * .18}px,${(y - r.height / 2) * .3}px)`;
        b.style.setProperty('--mx', x + 'px'); b.style.setProperty('--my', y + 'px');
      });
      b.addEventListener('pointerleave', () => { b.style.transform = ''; });
    });
  }

  /* ---------- canvas do hero: sistema orbital ---------- */
  const cv = $('.hero-canvas'), ctx = cv.getContext('2d');
  let W = 0, H = 0, DPR = 1, stars = [], visible = true, px = 0, py = 0, tx = 0, ty = 0;
  const TILT = -27 * Math.PI / 180;
  const orbits = [
    { r: .30, e: .42, speed: .00022, planets: [{ a: 0, s: 7, c: '#9CC0FF' }] },
    { r: .48, e: .40, speed: -.00014, planets: [{ a: 2.2, s: 5, c: '#5C96FF' }, { a: 4.6, s: 3.5, c: '#CFE0FF' }] },
    { r: .68, e: .38, speed: .00009, planets: [{ a: 1.1, s: 9, c: '#1F6BFF', ball: true }] },
    { r: .9, e: .36, speed: -.00006, planets: [{ a: 3.4, s: 3, c: '#A9C8FF' }] }
  ];
  const resize = () => {
    const r = cv.getBoundingClientRect(); DPR = Math.min(devicePixelRatio || 1, 2);
    W = r.width; H = r.height; cv.width = W * DPR; cv.height = H * DPR; ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    const n = Math.round(Math.min(180, W * H / 7000));
    stars = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, z: Math.random(), tw: Math.random() * 6.28 }));
  };
  const center = () => {
    const wide = W >= 768;
    return { cx: W * (wide ? .68 : .62) + px * 18, cy: H * (wide ? .45 : .2) + py * 14, R: Math.min(wide ? W * .42 : W * .78, wide ? H * .62 : H * .4) };
  };
  const pt = (cx, cy, rx, ry, t) => {
    const x = rx * Math.cos(t), y = ry * Math.sin(t);
    return [cx + x * Math.cos(TILT) - y * Math.sin(TILT), cy + x * Math.sin(TILT) + y * Math.cos(TILT), Math.sin(t)];
  };
  const draw = time => {
    ctx.clearRect(0, 0, W, H);
    px += (tx - px) * .05; py += (ty - py) * .05;
    // estrelas
    for (const s of stars) {
      const a = .25 + .55 * s.z * (.6 + .4 * Math.sin(time * .0012 + s.tw));
      ctx.fillStyle = `rgba(200,218,255,${a})`;
      const sx = s.x - px * 10 * s.z, sy = s.y - py * 8 * s.z;
      ctx.fillRect(sx, sy, s.z > .85 ? 1.8 : 1.1, s.z > .85 ? 1.8 : 1.1);
    }
    const { cx, cy, R } = center();
    // núcleo
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * .5);
    g.addColorStop(0, 'rgba(92,150,255,.30)'); g.addColorStop(.4, 'rgba(31,107,255,.10)'); g.addColorStop(1, 'rgba(31,107,255,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R * .5, 0, 6.283); ctx.fill();
    // órbitas + planetas
    const items = [];
    orbits.forEach((o, oi) => {
      const rx = R * o.r, ry = rx * o.e;
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(TILT);
      const lg = ctx.createLinearGradient(-rx, 0, rx, 0);
      lg.addColorStop(0, `rgba(120,165,255,${.35 - oi * .05})`); lg.addColorStop(.5, `rgba(120,165,255,${.08})`); lg.addColorStop(1, `rgba(120,165,255,${.3 - oi * .05})`);
      ctx.strokeStyle = lg; ctx.lineWidth = oi === 2 ? 1.4 : 1;
      ctx.beginPath(); ctx.ellipse(0, 0, rx, ry, 0, 0, 6.283); ctx.stroke();
      ctx.restore();
      o.planets.forEach(p => {
        const t = p.a + (reduce ? 0 : time * o.speed);
        // rastro
        for (let k = 1; k <= 14; k++) {
          const [x, y] = pt(cx, cy, rx, ry, t - Math.sign(o.speed) * k * .035);
          ctx.fillStyle = `rgba(150,190,255,${(1 - k / 14) * .22})`;
          ctx.beginPath(); ctx.arc(x, y, Math.max(.6, p.s * .28 * (1 - k / 16)), 0, 6.283); ctx.fill();
        }
        const [x, y, depth] = pt(cx, cy, rx, ry, t);
        items.push({ x, y, size: p.s * (.8 + .35 * (depth + 1) / 2), p });
      });
    });
    items.forEach(({ x, y, size, p }) => {
      const halo = ctx.createRadialGradient(x, y, 0, x, y, size * 4);
      halo.addColorStop(0, p.c + 'AA'); halo.addColorStop(1, p.c + '00');
      ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(x, y, size * 4, 0, 6.283); ctx.fill();
      if (p.ball) {
        const bg = ctx.createRadialGradient(x - size * .35, y - size * .4, size * .1, x, y, size);
        bg.addColorStop(0, '#CFE0FF'); bg.addColorStop(.35, '#2D6EF2'); bg.addColorStop(1, '#0A2470');
        ctx.fillStyle = bg;
      } else ctx.fillStyle = p.c;
      ctx.beginPath(); ctx.arc(x, y, size, 0, 6.283); ctx.fill();
    });
  };
  let raf = 0;
  const frame = t => { draw(t); raf = visible && !reduce ? requestAnimationFrame(frame) : 0; };
  resize(); draw(0);
  addEventListener('resize', () => { resize(); draw(performance.now()); });
  new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible && !raf && !reduce) raf = requestAnimationFrame(frame); }).observe(hero);
  if (!reduce) {
    raf = requestAnimationFrame(frame);
    if (fine) hero.addEventListener('pointermove', e => { tx = e.clientX / innerWidth - .5; ty = e.clientY / innerHeight - .5; }, { passive: true });
  }
})();
