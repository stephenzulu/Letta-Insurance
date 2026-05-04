/* ═══════════════════════════════════════════
   LETTA INSURANCE - SHARED COMPONENTS
   Injects navbar, footer, social float, preloader
   Include this in every page: <script src="js/components.js"></script>
   ═══════════════════════════════════════════ */

// Detect base path from the script's own URL (works on GitHub Pages, local server, and file://)
const basePath = (function() {
    const scripts = document.querySelectorAll('script[src*="components.js"]');
    const src = scripts.length ? scripts[scripts.length - 1].getAttribute('src') : '';
    // Script is loaded as "js/components.js" (root) or "../js/components.js" (subdir)
    return src.replace('js/components.js', '');
})();
const isFile = window.location.protocol === 'file:';
function pageLink(dir) {
    return basePath + dir + (isFile ? 'index.html' : '');
}

// Detect current page for active nav link
function isActive(page) {
    const path = window.location.pathname;
    if (page === 'index.html') {
        // Home is active if we're NOT in a known subdirectory
        return !(/\/(about|services|team|contact)(\/|$)/.test(path)) ? 'active' : '';
    }
    const section = page.replace('.html', '').replace('/', '');
    return path.includes('/' + section) ? 'active' : '';
}

// ═══════ FAVICON ═══════
function injectFavicon() {
    const head = document.head;
    const favicons = [
        { rel: 'icon', type: 'image/x-icon', href: basePath + 'img/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: basePath + 'img/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: basePath + 'img/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: basePath + 'img/apple-touch-icon.png' }
    ];
    favicons.forEach(f => {
        const link = document.createElement('link');
        link.rel = f.rel;
        if (f.type) link.type = f.type;
        if (f.sizes) link.sizes = f.sizes;
        link.href = f.href;
        head.appendChild(link);
    });
}

// ═══════ PRELOADER ═══════
function injectPreloader() {
    const div = document.createElement('div');
    div.id = 'preloader';
    div.innerHTML = '<div class="loader-ring"></div>';
    document.body.insertBefore(div, document.body.firstChild);
}

// ═══════ NAVBAR ═══════
function injectNavbar() {
    const nav = document.createElement('nav');
    nav.className = 'navbar navbar-expand-lg navbar-custom fixed-top';
    nav.innerHTML = `
    <div class="container">
        <a class="navbar-brand d-flex align-items-center" href="${basePath}">
            <img src="${basePath}img/logo.png" alt="LIBL" class="nav-logo">
            <div class="d-flex flex-column">
                <span class="nav-brand-text">Letta Insurance</span>
                <span class="nav-brand-text">Brokers Limited</span>
            </div>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navMenu">
            <ul class="navbar-nav align-items-lg-center gap-lg-1">
                <li class="nav-item"><a class="nav-link ${isActive('index.html')}" href="${basePath}${isFile ? 'index.html' : ''}">Home</a></li>
                <li class="nav-item"><a class="nav-link ${isActive('about')}" href="${pageLink('about/')}">About</a></li>
                <li class="nav-item"><a class="nav-link ${isActive('services')}" href="${pageLink('services/')}">Services</a></li>
                <li class="nav-item"><a class="nav-link ${isActive('team')}" href="${pageLink('team/')}">Leadership</a></li>
                <li class="nav-item"><a class="nav-link ${isActive('contact')}" href="${pageLink('contact/')}">Contact</a></li>
                <li class="nav-item ms-lg-2"><a class="btn btn-nav-cta" href="${pageLink('contact/')}">Contact Us</a></li>
                <li class="nav-item ms-lg-2">
                    <button class="theme-toggle" id="themeToggle" title="Toggle theme">
                        <i class="fas fa-sun"></i><i class="fas fa-moon"></i>
                    </button>
                </li>
            </ul>
        </div>
    </div>`;
    document.body.insertBefore(nav, document.getElementById('preloader').nextSibling);
}

// ═══════ SOCIAL FLOAT ═══════
function injectSocialFloat() {
    const div = document.createElement('div');
    div.className = 'social-float';
    div.id = 'socialFloat';
    div.innerHTML = `
        <div class="social-float-line"></div>
        <a href="https://web.facebook.com/profile.php?id=61579554008790" target="_blank" class="sf-fb" title="Facebook"><i class="fab fa-facebook-f"></i></a>
        <a href="https://x.com/LettaBrokers" target="_blank" class="sf-x" title="X"><i class="fab fa-x-twitter"></i></a>
        <a href="https://www.instagram.com/lettainsurancebrokerslimited/" target="_blank" class="sf-ig" title="Instagram"><i class="fab fa-instagram"></i></a>
        <a href="https://www.linkedin.com/company/letta-insurance-brokers-limited" target="_blank" class="sf-li" title="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
        <a href="https://wa.me/260961047599" target="_blank" class="sf-wa" title="WhatsApp"><i class="fab fa-whatsapp"></i></a>
        <a href="mailto:lettainsurancebrokerslimited@gmail.com" class="sf-em" title="Email"><i class="fas fa-envelope"></i></a>
        <div class="social-float-line"></div>`;
    document.body.appendChild(div);
}

// ═══════ FOOTER ═══════
function injectFooter() {
    const footer = document.createElement('footer');
    footer.innerHTML = `
    <div class="container">
        <div class="row g-4">
            <div class="col-lg-4">
                <div class="footer-brand mb-2">Letta Insurance Brokers Limited</div>
                <p style="font-size:.8rem;line-height:1.7;max-width:280px">Your trusted partner in insurance broking. We strive to be the preferred and reliable supplier of choice.</p>
                <p style="font-size:.75rem;margin-top:1rem">
                    <strong style="color:rgba(255,255,255,.8)">PACRA:</strong> 120251029885<br>
                    <strong style="color:rgba(255,255,255,.8)">TPIN:</strong> 2003989361
                </p>
            </div>
            <div class="col-6 col-lg-2">
                <h6 style="font-size:.75rem;text-transform:uppercase;letter-spacing:1.5px;color:rgba(255,255,255,.8);margin-bottom:1rem">Pages</h6>
                <div class="footer-links d-flex flex-column gap-2">
                   <a href="${basePath}${isFile ? 'index.html' : ''}">Home</a>
                   <a href="${pageLink('about/')}">About</a>
                   <a href="${pageLink('services/')}">Services</a>
                   <a href="${pageLink('team/')}">Leadership</a>
                   <a href="${pageLink('contact/')}">Contact</a>
                </div>
            </div>
            <div class="col-6 col-lg-3">
                <h6 style="font-size:.75rem;text-transform:uppercase;letter-spacing:1.5px;color:rgba(255,255,255,.8);margin-bottom:1rem">Services</h6>
                <div class="footer-links d-flex flex-column gap-2">
                    <a href="${pageLink('services/')}">General Insurance</a>
                    <a href="${pageLink('services/')}">Health & Funeral Insurance</a>
                    <a href="${pageLink('services/')}">Group Life Assurance</a>
                    <a href="${pageLink('services/')}">Risk Advisory</a>
                </div>
            </div>
            <div class="col-lg-3">
                <h6 style="font-size:.75rem;text-transform:uppercase;letter-spacing:1.5px;color:rgba(255,255,255,.8);margin-bottom:1rem">Motto</h6>
                <p style="font-family:'Cinzel',serif;font-size:1.1rem;color:var(--gold);font-style:italic">"Cover with Confidence"</p>
                <div class="footer-social d-flex gap-2 mt-3">
                    <a href="https://web.facebook.com/profile.php?id=61579554008790" target="_blank" class="fs-fb"><i class="fab fa-facebook-f"></i></a>
                    <a href="https://www.instagram.com/lettainsurancebrokerslimited/" target="_blank" class="fs-ig"><i class="fab fa-instagram"></i></a>
                    <a href="https://x.com/LettaBrokers" target="_blank" class="fs-x"><i class="fab fa-x-twitter"></i></a>
                    <a href="https://www.linkedin.com/company/letta-insurance-brokers-limited" target="_blank" class="fs-li"><i class="fab fa-linkedin-in"></i></a>
                    <a href="https://wa.me/260961047599" target="_blank" class="fs-wa"><i class="fab fa-whatsapp"></i></a>
                </div>
            </div>
        </div>
        <div class="footer-bottom text-center">
            <p>&copy; ${new Date().getFullYear()} Letta Insurance Brokers Limited. All rights reserved. | Plot No. 211, Buteko Avenue, Ndola, Zambia</p>
        </div>
    </div>`;
    document.body.appendChild(footer);
}

// ═══════ BACK TO TOP ═══════
function injectBackToTop() {
    const btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.id = 'backToTop';
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.appendChild(btn);
}

// ═══════ INJECT ALL ═══════
document.addEventListener('DOMContentLoaded', function () {
    injectFavicon();
    injectPreloader();
    injectNavbar();
    injectSocialFloat();
    injectFooter();
    injectBackToTop();
});