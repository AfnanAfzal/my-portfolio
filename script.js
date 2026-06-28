// ================================================
//   Afnan Afzal Portfolio — script.js
// ================================================


// ── 1. HAMBURGER MENU ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

function closeMenu() {
  hamburger.classList.remove('open');
  navLinks.classList.remove('open');
}


// ── 2. NAVBAR SCROLL EFFECT ──
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.style.background = 'rgba(26,0,8,0.97)';
    navbar.style.boxShadow  = '0 4px 30px rgba(0,0,0,0.5)';
    document.getElementById('backToTop').classList.add('visible');
  } else {
    navbar.style.background = 'rgba(26,0,8,0.80)';
    navbar.style.boxShadow  = 'none';
    document.getElementById('backToTop').classList.remove('visible');
  }
});


// ── 3. TYPING ANIMATION ──
const roles = [
  'Frontend Developer',
  'UI/UX Designer',
  'Python Developer',
  'AI-Assisted Engineer',
  'Problem Solver'
];

let roleIndex = 0, charIndex = 0, isDeleting = false;
const typedEl = document.getElementById('typed-text');

function typeRole() {
  const current = roles[roleIndex];
  if (!isDeleting) {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeRole, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting  = false;
      roleIndex   = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeRole, isDeleting ? 60 : 100);
}
typeRole();


// ── 4. SCROLL FADE-IN ──
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity   = 1;
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.service-card,.project-card,.testi-card,.highlight-card,.timeline-item,.process-step,.skill-bar-wrap,.contact-item'
).forEach(el => {
  el.style.opacity    = 0;
  el.style.transform  = 'translateY(22px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  fadeObserver.observe(el);
});


// ── 5. SKILL BARS ──
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar-fill').forEach((bar, i) => {
        setTimeout(() => { bar.style.width = bar.getAttribute('data-width') + '%'; }, i * 120);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const skillsSection = document.getElementById('skills');
if (skillsSection) skillObserver.observe(skillsSection);


// ── 6. ACTIVE NAV LINK ──
const sections    = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      allNavLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}` ? 'var(--gold)' : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));


// ── 7. PROJECT FILTER ──
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    document.querySelectorAll('.project-card').forEach(card => {
      const cats = card.getAttribute('data-cat') || '';
      if (filter === 'all' || cats.includes(filter)) {
        card.classList.remove('hidden');
        card.style.opacity = 0; card.style.transform = 'translateY(22px)';
        setTimeout(() => { card.style.opacity = 1; card.style.transform = 'translateY(0)'; }, 50);
      } else {
        card.classList.add('hidden');
      }
    });
  });
});


// ── 8. HIRE MODAL ──
function openHireModal() {
  document.getElementById('hireModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeHireModal() {
  document.getElementById('hireModal').classList.remove('open');
  document.body.style.overflow = '';
}
document.getElementById('hireModal').addEventListener('click', function(e) {
  if (e.target === this) closeHireModal();
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeHireModal(); });


// ── 9. EMAIL VALIDATION — Strict real email check ──
// This checks that the email looks genuinely real:
// must have text @ text . domain (at least 2 chars)
// blocks obvious fake/test patterns

function isValidEmail(email) {
  // Basic format check
  const formatOK = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email);
  if (!formatOK) return false;

  const lower = email.toLowerCase();

  // Block obviously fake domains
  const fakeDomains = [
    'test.com','fake.com','invalid.com','example.com','temp.com',
    'mailinator.com','guerrillamail.com','throwaway.com','yopmail.com',
    'trashmail.com','sharklasers.com','spam4.me','fakeinbox.com',
    'dispostable.com','mailnull.com','spamgourmet.com','mytemp.email',
    'tempmail.com','10minutemail.com','disposablemail.com','noreply.com',
    'nomail.com','abc.com','xyz.com','aaa.com','bbb.com','qwe.com',
    'asdf.com','test.test','foo.com','bar.com','blah.com'
  ];

  const domain = lower.split('@')[1];
  if (fakeDomains.includes(domain)) return false;

  // Block fake-looking local parts
  const local = lower.split('@')[0];
  const fakeLocals = ['test','fake','invalid','noreply','no-reply','admin123',
    'asdf','qwerty','aaaa','bbbb','xxxx','yyyy','zzzz','1234','abcd'];
  if (fakeLocals.includes(local)) return false;

  // Must have at least one dot in domain
  if (!domain.includes('.')) return false;

  // Domain extension must be 2+ chars
  const ext = domain.split('.').pop();
  if (ext.length < 2) return false;

  return true;
}

// Show inline error under email field
function showEmailError(inputEl, show) {
  let errEl = inputEl.parentNode.querySelector('.email-error');
  if (!errEl) {
    errEl = document.createElement('div');
    errEl.className = 'email-error';
    errEl.style.cssText = 'color:#ff6b6b;font-size:12px;margin-top:6px;display:none;';
    errEl.textContent = '⚠ Please enter a valid real email address';
    inputEl.parentNode.appendChild(errEl);
  }
  errEl.style.display = show ? 'block' : 'none';
  inputEl.style.borderColor = show ? '#ff6b6b' : '';
}

// Attach real-time email validation to all email inputs
document.querySelectorAll('input[type="email"]').forEach(input => {
  input.addEventListener('blur', () => {
    if (input.value.trim()) {
      showEmailError(input, !isValidEmail(input.value.trim()));
    }
  });
  input.addEventListener('input', () => {
    if (input.value.trim() && isValidEmail(input.value.trim())) {
      showEmailError(input, false);
      input.style.borderColor = 'var(--gold)';
    }
  });
});


// ── 10. FORM SUBMIT with real email gate ──
function handleFormSubmit(formId, btnId) {
  const form = document.getElementById(formId);
  const btn  = document.getElementById(btnId);
  if (!form) return;

  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Find and validate email field first
    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput && !isValidEmail(emailInput.value.trim())) {
      showEmailError(emailInput, true);
      emailInput.focus();
      emailInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return; // STOP — don't submit
    }

    btn.textContent = 'Sending...';
    btn.disabled    = true;

    const data = new FormData(form);

    try {
      const res = await fetch('https://formspree.io/f/mwvdboqq', {
        method:  'POST',
        body:    data,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        btn.textContent      = '✓ Sent Successfully!';
        btn.style.background = 'linear-gradient(135deg,#1a7a1a,#0d5c0d)';
        form.reset();
        document.querySelectorAll('.email-error').forEach(e => e.style.display = 'none');
        if (formId === 'hireForm') {
          setTimeout(() => {
            closeHireModal();
            btn.textContent      = 'Send Hire Request 🚀';
            btn.style.background = '';
            btn.disabled         = false;
          }, 2500);
        } else {
          setTimeout(() => {
            btn.textContent      = 'Send Message →';
            btn.style.background = '';
            btn.disabled         = false;
          }, 3000);
        }
      } else {
        throw new Error('Server error');
      }
    } catch {
      btn.textContent      = '⚠ Failed — Email us directly';
      btn.style.background = 'linear-gradient(135deg,#7a3a00,#5c2a00)';
      btn.disabled         = false;
      setTimeout(() => {
        btn.textContent      = formId === 'hireForm' ? 'Send Hire Request 🚀' : 'Send Message →';
        btn.style.background = '';
      }, 3500);
    }
  });
}

handleFormSubmit('contactForm', 'contactSubmitBtn');
handleFormSubmit('hireForm',    'hireSubmitBtn');
