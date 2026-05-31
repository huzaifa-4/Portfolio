/* ═══════════════════════════════════════════
   HUZAIFA MUQEET — PORTFOLIO SCRIPTS
   ═══════════════════════════════════════════ */

/* ── CANVAS ANIMATED GRID ── */
const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');
let W, H, mouseX = -1000, mouseY = -1000;

function resizeCanvas() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

const GRID = 48;
const dots = [];

function buildDots() {
  dots.length = 0;
  const cols = Math.ceil(W / GRID) + 1;
  const rows = Math.ceil(H / GRID) + 1;
  for (let r = 0; r <= rows; r++) {
    for (let c = 0; c <= cols; c++) {
      dots.push({ x: c * GRID, y: r * GRID, ox: c * GRID, oy: r * GRID });
    }
  }
}
buildDots();
window.addEventListener('resize', buildDots);

function drawGrid() {
  ctx.clearRect(0, 0, W, H);
  const t = Date.now() / 1000;

  /* Grid Lines */
  ctx.beginPath();
  ctx.strokeStyle = 'rgba(0,180,220,0.07)';
  ctx.lineWidth = 0.5;
  const cols = Math.ceil(W / GRID) + 1;
  const rows = Math.ceil(H / GRID) + 1;
  for (let c = 0; c <= cols; c++) {
    ctx.moveTo(c * GRID, 0);
    ctx.lineTo(c * GRID, H);
  }
  for (let r = 0; r <= rows; r++) {
    ctx.moveTo(0, r * GRID);
    ctx.lineTo(W, r * GRID);
  }
  ctx.stroke();

  /* Glowing dots at intersections */
  dots.forEach(d => {
    const dist = Math.hypot(d.x - mouseX, d.y - mouseY);
    const proximity = Math.max(0, 1 - dist / 200);
    const wave = Math.sin(t * 1.5 + (d.ox + d.oy) * 0.015) * 0.5 + 0.5;
    const alpha = 0.08 + wave * 0.06 + proximity * 0.6;
    const r = 1.2 + proximity * 3 + wave * 0.5;
    ctx.beginPath();
    ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
    if (proximity > 0.1) {
      ctx.fillStyle = `rgba(0,212,255,${alpha})`;
    } else {
      ctx.fillStyle = `rgba(0,150,200,${alpha})`;
    }
    ctx.fill();
  });

  requestAnimationFrame(drawGrid);
}
drawGrid();

/* ── CUSTOM CURSOR ── */
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  dot.style.left = e.clientX + 'px';
  dot.style.top = e.clientY + 'px';
  rx = e.clientX;
  ry = e.clientY;
});

function animRing() {
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animRing);
}
animRing();

document.querySelectorAll('a, button, .skill-tag, .exp-item, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    dot.classList.add('hovered');
    ring.classList.add('hovered');
  });
  el.addEventListener('mouseleave', () => {
    dot.classList.remove('hovered');
    ring.classList.remove('hovered');
  });
});

/* ── TYPEWRITER ── */
const phrases = [
  'Full-Stack Developer_',
  'AI Platform Builder_',
  'React & Node.js Engineer_',
  'SaaS Product Creator_',
  'MERN Stack Developer_',
];
let pi = 0, ci = 0, deleting = false;
const tw = document.getElementById('typewriter');

function type() {
  const phrase = phrases[pi];
  if (!deleting) {
    ci++;
    if (ci > phrase.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    ci--;
    if (ci === 0) {
      deleting = false;
      pi = (pi + 1) % phrases.length;
    }
  }
  tw.innerHTML = `<span style="color:var(--cyan)">&gt; </span>${phrase.slice(0, ci)}<span class="typewriter-cursor">|</span>`;
  setTimeout(type, deleting ? 50 : 90);
}
type();

/* ── SCROLL REVEAL ── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── NAVBAR SCROLL ── */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', scrollY > 60);
});

/* ── MOBILE MENU ── */
function toggleMenu() {
  document.getElementById('mobile-menu').classList.toggle('open');
}

function closeMenu() {
  document.getElementById('mobile-menu').classList.remove('open');
}

/* ── CONTACT FORM ── */
function handleSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('fname').value;
  const email = document.getElementById('femail').value;
  const subject = document.getElementById('fsubject').value || 'Portfolio Inquiry';
  const msg = document.getElementById('fmsg').value;
  const body = encodeURIComponent(`Hi Huzaifa,\n\nMy name is ${name} (${email}).\n\n${msg}`);
  window.location.href = `mailto:huzaifamuqeet2@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
  document.getElementById('form-success').style.display = 'block';
  document.getElementById('fsubmit').textContent = '✓ Sent!';
}

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});