(()=>{'use strict';
const data=window.ORBITA;if(!data){console.error('Dados da Órbita não carregados');return}
const $=s=>document.querySelector(s),$$=s=>Array.from(document.querySelectorAll(s));
const escapeHtml=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const whatsappUrl=(text)=>'https://wa.me/'+data.whatsapp+(text?'?text='+encodeURIComponent(text):'');
const defaultMsg='Olá! Conheci a Órbita Virtual pelo portfólio digital e gostaria de saber mais sobre os serviços.';
$$('[data-whatsapp]').forEach(a=>a.href=whatsappUrl(defaultMsg));
const icons=['◎','✳','▻','✂','◉','◈','♫','⌘','◇','✦'];
const grid=$('#services-grid');
if(grid){grid.innerHTML=data.services.map((s,i)=>`<article class="service-card reveal"><div class="service-number">${String(i+1).padStart(2,'0')} / SERVIÇOS</div><div class="service-icon" aria-hidden="true">${icons[i%icons.length]}</div><h3>${escapeHtml(s.name)}</h3><p>${escapeHtml(s.description)}</p><a class="service-link" href="#proposta" data-select-service="${i}">Tenho interesse ↗</a></article>`).join('')}
const options=$('#service-options');
if(options){options.innerHTML=[...data.services,{name:'Outro serviço'}].map((s,i)=>`<label class="service-option"><input type="checkbox" name="service" value="${escapeHtml(s.name)}"><span>${escapeHtml(s.name)}</span></label>`).join('')}
const checked=()=>$$('#service-options input:checked').map(i=>i.value);
function updateCount(){const el=$('#selection-count'),n=checked().length;if(el)el.textContent=`${n} selecionado${n===1?'':'s'}`;}
options?.addEventListener('change',()=>{updateCount();const e=$('#form-error');if(e)e.hidden=true});
document.addEventListener('click',event=>{const link=event.target.closest('[data-select-service]');if(!link)return;const idx=Number(link.dataset.selectService);const input=$$('#service-options input')[idx];if(input){input.checked=true;updateCount();}});
$('#proposal-form')?.addEventListener('submit',event=>{event.preventDefault();const selected=checked();if(!selected.length){$('#form-error').hidden=false;options?.querySelector('input')?.focus();return}const name=$('#customer-name').value.trim(),msg=$('#customer-message').value.trim();let text='Olá! Conheci a Órbita Virtual pelo site e tenho interesse nos seguintes serviços:\n\n'+selected.map(s=>'• '+s).join('\n')+'\n\nGostaria de solicitar uma proposta personalizada.';if(name)text+='\n\nMeu nome é '+name+'.';if(msg)text+='\n\nSobre meu projeto: '+msg;window.open(whatsappUrl(text),'_blank','noopener,noreferrer');});
const filters=$('#portfolio-filters'),portfolio=$('#portfolio-grid'),empty=$('#portfolio-empty');
const cats=['Todos',...new Set(data.projects.map(p=>p.category))];
function renderProjects(category='Todos'){
 const projects=data.projects.filter(p=>category==='Todos'||p.category===category);
 portfolio.innerHTML=projects.map(p=>`<article class="project-card reveal visible" data-theme="${escapeHtml(p.theme)}"><div class="project-art">${p.image?`<img src="${escapeHtml(p.image)}" alt="Projeto da ${escapeHtml(p.client)}" loading="lazy">`:`<span class="project-art-label" aria-hidden="true">${escapeHtml(p.initials)}</span>`}</div><div class="project-info"><div><h3>${escapeHtml(p.client)}</h3><p>${escapeHtml(p.type)}</p></div><span class="project-category">${escapeHtml(p.category)}</span></div></article>`).join('');
 if(empty)empty.hidden=projects.length>0;
}
if(filters&&portfolio){filters.innerHTML=cats.map((c,i)=>`<button class="filter-btn ${i===0?'active':''}" type="button" data-category="${escapeHtml(c)}" aria-pressed="${i===0}">${escapeHtml(c)}</button>`).join('');filters.addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(!b)return;$$('.filter-btn').forEach(el=>{const a=el===b;el.classList.toggle('active',a);el.setAttribute('aria-pressed',String(a))});renderProjects(b.dataset.category)});renderProjects()}
const diff=$('#differentials-grid');if(diff)diff.innerHTML=data.differentials.map((d,i)=>`<article class="diff-card reveal"><div class="diff-icon">${['◎','✳','◇','↗'][i%4]}</div><h3>${escapeHtml(d.title)}</h3><p>${escapeHtml(d.text)}</p></article>`).join('');
const process=$('#process-grid');if(process)process.innerHTML=data.process.map((d,i)=>`<article class="process-card reveal"><span class="process-number">${String(i+1).padStart(2,'0')}</span><h4>${escapeHtml(d.title)}</h4><p>${escapeHtml(d.text)}</p></article>`).join('');
const clients=$('#clients-grid');if(clients)clients.innerHTML=data.clients.map(name=>`<div class="client-tile reveal">${escapeHtml(name)}</div>`).join('');
const metricsSection=$('#resultados'),metrics=$('#metrics-grid');
if(data.metrics?.length&&metricsSection&&metrics){metricsSection.hidden=false;metrics.innerHTML=data.metrics.map(m=>`<article class="metric"><strong data-number="${Number(m.value)||0}" data-suffix="${escapeHtml(m.suffix||'')}">0</strong><span>${escapeHtml(m.label)}</span><p>${escapeHtml(m.context||'')}</p></article>`).join('');const numberObserver=new IntersectionObserver((entries,o)=>entries.forEach(e=>{if(!e.isIntersecting)return;const el=e.target,final=Number(el.dataset.number),duration=1100,start=performance.now(),fmt=new Intl.NumberFormat('pt-BR');function tick(t){const x=Math.min((t-start)/duration,1);el.textContent=fmt.format(Math.round(final*(1-Math.pow(1-x,3))))+el.dataset.suffix;if(x<1)requestAnimationFrame(tick)}requestAnimationFrame(tick);o.unobserve(el)}));$$('[data-number]').forEach(x=>numberObserver.observe(x))}
const testimonials=$('#testimonials-grid'),testimonialsSection=$('#depoimentos');
if(data.testimonials?.length&&testimonials&&testimonialsSection){testimonialsSection.hidden=false;testimonials.innerHTML=data.testimonials.map(t=>`<article class="testimonial"><p>“${escapeHtml(t.quote)}”</p><strong>${escapeHtml(t.person)}</strong><p>${escapeHtml(t.company)}</p></article>`).join('')}
if(data.instagram){const el=$('#instagram-contact'),a=$('#instagram-contact-link');if(el&&a){el.hidden=false;a.href=data.instagram}}
if(data.email){const el=$('#email-contact'),a=$('#email-contact-link');if(el&&a){el.hidden=false;a.href='mailto:'+data.email;a.textContent=data.email}}
const year=$('#current-year');if(year)year.textContent=new Date().getFullYear();
const menuBtn=$('.menu-toggle'),mobile=$('#mobile-nav');function closeMenu(){if(mobile&&menuBtn){mobile.hidden=true;menuBtn.setAttribute('aria-expanded','false');menuBtn.setAttribute('aria-label','Abrir menu')}}
menuBtn?.addEventListener('click',()=>{const open=menuBtn.getAttribute('aria-expanded')==='true';mobile.hidden=open;menuBtn.setAttribute('aria-expanded',String(!open));menuBtn.setAttribute('aria-label',open?'Abrir menu':'Fechar menu')});
mobile?.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if('IntersectionObserver' in window&&!reduced){const revealObserver=new IntersectionObserver((entries,o)=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');o.unobserve(e.target)}}),{threshold:.08,rootMargin:'0px 0px -25px 0px'});$$('.reveal').forEach(el=>revealObserver.observe(el));}else $$('.reveal').forEach(el=>el.classList.add('visible'));
if(!reduced&&window.matchMedia('(pointer:fine)').matches){const glow=$('.cursor-glow');document.addEventListener('pointermove',e=>{if(glow){glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'}},{passive:true})}
})();