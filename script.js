/* =============================================
   NOIR STUDIO — script.js
   Animations, Interactions & Behaviors
   ============================================= */

// ── Custom Cursor ──────────────────────────────
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;
let animFrame;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

function animateCursorFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;

    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';

    animFrame = requestAnimationFrame(animateCursorFollower);
}
animateCursorFollower();

// Cursor hover states
const hoverTargets = document.querySelectorAll(
    'a, button, .service-card, .portfolio-item, .tag, input, textarea, select'
);
hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});


// ── Navbar Scroll Effect ───────────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});


// ── Mobile Menu ────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburger.addEventListener('click', toggleMenu);

function toggleMenu() {
    const isOpen = mobileMenu.classList.contains('open');
    if (isOpen) {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
    } else {
        mobileMenu.classList.add('open');
        hamburger.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
}

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
    });
});


// ── Smooth Scroll Navigation ───────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});


// ── Scroll Reveal (IntersectionObserver) ──────
const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));


// ── Counter Animation ──────────────────────────
const statNums = document.querySelectorAll('.stat-num');
let countersStarted = false;

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersStarted) {
            countersStarted = true;
            animateCounters();
        }
    });
}, { threshold: 0.5 });

if (statNums.length > 0) {
    counterObserver.observe(statNums[0]);
}

function animateCounters() {
    statNums.forEach(el => {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 1800;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeOutExpo(progress);
            const value = Math.round(eased * target);

            el.textContent = value;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    });
}

function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}


// ── Active Nav Link Highlighting ──────────────
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.style.color = '';
                if (link.getAttribute('href') === `#${id}`) {
                    link.style.color = 'var(--gold)';
                }
            });
        }
    });
}, {
    threshold: 0.5
});

sections.forEach(sec => sectionObserver.observe(sec));


// ── Parallax: Hero Background Text ────────────
const heroBgText = document.querySelector('.hero-bg-text');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (heroBgText) {
        heroBgText.style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.25}px))`;
    }
});


// ── Service Card Tilt ──────────────────────────
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)';
    });
});


// ── Portfolio Item Shimmer ─────────────────────
document.querySelectorAll('.portfolio-visual').forEach(visual => {
    visual.addEventListener('mousemove', (e) => {
        const rect = visual.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        visual.style.setProperty('--mx', `${x}%`);
        visual.style.setProperty('--my', `${y}%`);
    });
});


// ── Contact Form ───────────────────────────────
const contactForm = document.getElementById('contactForm');
const btnLoader = document.getElementById('btnLoader');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = contactForm.querySelector('.submit-btn');
        const btnSpan = btn.querySelector('span');

        // Show loader
        btnLoader.classList.add('active');
        btnSpan.textContent = 'Sending...';
        btn.disabled = true;

        // Simulate sending
        setTimeout(() => {
            btnLoader.classList.remove('active');
            btnSpan.textContent = 'Sent!';
            btn.style.background = 'var(--mid)';

            formSuccess.classList.add('show');
            contactForm.reset();

            setTimeout(() => {
                btnSpan.textContent = 'Send Message';
                btn.disabled = false;
                btn.style.background = '';
                formSuccess.classList.remove('show');
            }, 4000);
        }, 1800);
    });

    // Floating label effect
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.querySelector('label').style.color = 'var(--gold-light)';
        });
        input.addEventListener('blur', () => {
            input.parentElement.querySelector('label').style.color = '';
        });
    });
}


// ── Marquee Pause on Hover ────────────────────
const marqueeTrack = document.querySelector('.marquee-track');
const marqueeStrip = document.querySelector('.marquee-strip');

if (marqueeStrip && marqueeTrack) {
    marqueeStrip.addEventListener('mouseenter', () => {
        marqueeTrack.style.animationPlayState = 'paused';
    });
    marqueeStrip.addEventListener('mouseleave', () => {
        marqueeTrack.style.animationPlayState = 'running';
    });
}


// ── Nav Logo Click → Top ──────────────────────
const navLogo = document.querySelector('.nav-logo');
if (navLogo) {
    navLogo.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}


// ── Keyboard Accessibility: Close Menu on Escape ──
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
    }
});


// ── Page Load Entrance Animation ─────────────
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.6s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 50);

    // Trigger initial visible reveals
    setTimeout(() => {
        document.querySelectorAll('#home .reveal-up').forEach(el => {
            el.classList.add('visible');
        });
    }, 300);
});


// =============================================
// LOGIN MODAL LOGIC
// =============================================

const loginOverlay  = document.getElementById('loginOverlay');
const loginModal    = document.getElementById('loginModal');
const loginClose    = document.getElementById('loginClose');
const loginBtnNav   = document.getElementById('loginBtn');
const mobileLoginBtn = document.getElementById('mobileLoginBtn');

// Open modal
function openLogin() {
    loginOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    // Close mobile menu if open
    const mMenu = document.getElementById('mobileMenu');
    const hburg = document.getElementById('hamburger');
    if (mMenu) mMenu.classList.remove('open');
    if (hburg) hburg.classList.remove('open');
}

// Close modal
function closeLogin() {
    loginOverlay.classList.remove('open');
    document.body.style.overflow = '';
    // Reset after close
    setTimeout(resetLoginModal, 400);
}

function resetLoginModal() {
    // Show signin by default
    switchTab('signin');
    // Hide success
    const successEl = document.getElementById('loginSuccess');
    if (successEl) successEl.classList.remove('show');
    const signinF = document.getElementById('signinForm');
    const signupF = document.getElementById('signupForm');
    if (signinF) { signinF.style.display = ''; signinF.classList.add('active'); }
    if (signupF) { signupF.classList.remove('active'); }
    // Clear fields
    loginOverlay.querySelectorAll('input').forEach(i => i.value = '');
    const sf = document.getElementById('strengthFill');
    const sl = document.getElementById('strengthLabel');
    if (sf) { sf.className = 'strength-fill'; }
    if (sl) { sl.textContent = ''; }
}

if (loginBtnNav)   loginBtnNav.addEventListener('click', openLogin);
if (mobileLoginBtn) mobileLoginBtn.addEventListener('click', (e) => { e.preventDefault(); openLogin(); });
if (loginClose)    loginClose.addEventListener('click', closeLogin);

// Click outside to close
loginOverlay.addEventListener('click', (e) => {
    if (e.target === loginOverlay) closeLogin();
});

// ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && loginOverlay.classList.contains('open')) closeLogin();
});

// ── Tab Switching ──
const loginTabs = document.querySelectorAll('.login-tab');
loginTabs.forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
});

function switchTab(tabName) {
    loginTabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tabName));
    const signinF = document.getElementById('signinForm');
    const signupF = document.getElementById('signupForm');
    if (tabName === 'signin') {
        if (signinF) signinF.classList.add('active');
        if (signupF) signupF.classList.remove('active');
    } else {
        if (signupF) signupF.classList.add('active');
        if (signinF) signinF.classList.remove('active');
    }
}

// ── Password Toggle ──
document.querySelectorAll('.toggle-pass').forEach(btn => {
    btn.addEventListener('click', () => {
        const input = document.getElementById(btn.dataset.target);
        if (!input) return;
        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        const showEye = btn.querySelector('.show-eye');
        const hideEye = btn.querySelector('.hide-eye');
        if (showEye) showEye.style.display = isPassword ? 'none' : 'block';
        if (hideEye) hideEye.style.display = isPassword ? 'block' : 'none';
    });
});

// ── Password Strength ──
const signupPassInput = document.getElementById('signup-pass');
const strengthFill    = document.getElementById('strengthFill');
const strengthLabel   = document.getElementById('strengthLabel');

if (signupPassInput) {
    signupPassInput.addEventListener('input', () => {
        const val = signupPassInput.value;
        const score = getPasswordStrength(val);
        const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
        const classes = ['', 'weak', 'fair', 'good', 'strong'];

        if (strengthFill) {
            strengthFill.className = 'strength-fill ' + (val.length ? classes[score] : '');
        }
        if (strengthLabel) {
            strengthLabel.textContent = val.length ? labels[score] : '';
            strengthLabel.style.color = val.length ? getStrengthColor(score) : '';
        }
    });
}

function getPasswordStrength(p) {
    let score = 0;
    if (p.length >= 8)  score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return Math.max(score, p.length > 0 ? 1 : 0);
}

function getStrengthColor(score) {
    return ['', '#c94c4c', '#c9a84c', '#8cc94c', '#4cc97a'][score] || '';
}

// ── Sign In Submit ──
const signinSubmit = document.getElementById('signinSubmit');
const signinLoader = document.getElementById('signinLoader');

if (signinSubmit) {
    signinSubmit.addEventListener('click', () => {
        const email = document.getElementById('signin-email').value.trim();
        const pass  = document.getElementById('signin-pass').value.trim();
        if (!email || !pass) {
            shakeForm('signinForm');
            return;
        }
        startLoader(signinSubmit, signinLoader, 'Signing in...');
        setTimeout(() => {
            stopLoader(signinSubmit, signinLoader, 'Sign In');
            showLoginSuccess();
        }, 1800);
    });
}

// ── Sign Up Submit ──
const signupSubmit = document.getElementById('signupSubmit');
const signupLoader = document.getElementById('signupLoader');

if (signupSubmit) {
    signupSubmit.addEventListener('click', () => {
        const fname = document.getElementById('signup-fname').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const pass  = document.getElementById('signup-pass').value.trim();
        const terms = document.getElementById('terms').checked;
        if (!fname || !email || !pass || !terms) {
            shakeForm('signupForm');
            return;
        }
        startLoader(signupSubmit, signupLoader, 'Creating...');
        setTimeout(() => {
            stopLoader(signupSubmit, signupLoader, 'Create Account');
            showLoginSuccess();
        }, 2000);
    });
}

function startLoader(btn, loader, text) {
    const span = btn.querySelector('span');
    if (span) span.textContent = text;
    if (loader) loader.classList.add('active');
    btn.disabled = true;
}

function stopLoader(btn, loader, text) {
    const span = btn.querySelector('span');
    if (span) span.textContent = text;
    if (loader) loader.classList.remove('active');
    btn.disabled = false;
}

function showLoginSuccess() {
    const signinF = document.getElementById('signinForm');
    const signupF = document.getElementById('signupForm');
    const successEl = document.getElementById('loginSuccess');
    const tabs = document.querySelector('.login-tabs');

    if (signinF) signinF.style.display = 'none';
    if (signupF) signupF.style.display = 'none';
    if (tabs)    tabs.style.display = 'none';
    if (successEl) successEl.classList.add('show');

    // Auto close after 2.5s
    setTimeout(() => {
        closeLogin();
        if (tabs) tabs.style.display = '';
        if (signinF) signinF.style.display = '';
        if (signupF) signupF.style.display = '';
    }, 2500);
}

function shakeForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    form.style.animation = 'none';
    form.style.transform = 'translateX(0)';
    // Shake keyframes via JS
    let start = null;
    const duration = 400;
    const shakeAmounts = [0, -8, 8, -6, 6, -4, 4, 0];

    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = (timestamp - start) / duration;
        if (progress < 1) {
            const idx = Math.floor(progress * shakeAmounts.length);
            form.style.transform = `translateX(${shakeAmounts[idx] || 0}px)`;
            requestAnimationFrame(step);
        } else {
            form.style.transform = '';
        }
    }
    requestAnimationFrame(step);
}

// ── Cursor hover for login elements ──
document.querySelectorAll('.login-tab, .login-close, .toggle-pass, .lsubmit-btn, .social-auth-btn, .login-btn, .checkbox-wrap, .forgot-link').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});