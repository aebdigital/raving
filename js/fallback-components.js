// Fallback components script - loads without ES6 modules
console.log('Loading fallback components...');

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFallbackComponents);
} else {
    initFallbackComponents();
}

function initFallbackComponents() {
    console.log('Initializing fallback components...');
    
    // Load header and footer
    loadHeaderFallback();
    loadFooterFallback();
    
    // Initialize mobile navigation
    initMobileNavigationFallback();
    
    // Initialize scroll effects
    initScrollEffectsFallback();
    
    // Initialize map scroll fix
    initMapScrollFix();
    
    // Initialize product carousel (mobile-only)
    initProductCarousel();
    
    // Initialize lightbox for project pages
    initLightboxFallback();
    
    console.log('Fallback components initialized');
}

function loadHeaderFallback() {
    console.log('Loading header fallback...');
    
    const currentPath = window.location.pathname;
    const isInProjektPage = currentPath.includes('/pages/projekt/');
    const isInPagesDir = currentPath.includes('/pages/') && !isInProjektPage;
    
    let basePath, pagesPath;
    if (isInProjektPage) {
        // We're in /pages/projekt/
        basePath = '../../';
        pagesPath = '../';
    } else if (isInPagesDir) {
        // We're in /pages/
        basePath = '../';
        pagesPath = '';
    } else {
        // We're in root directory
        basePath = '';
        pagesPath = 'pages/';
    }
    
    const navigationHTML = `
        <!-- Scroll Progress Indicator -->
        <div class="scroll-progress">
            <div class="scroll-progress-bar"></div>
        </div>

        <!-- Transparent Navigation -->
        <nav class="navbar navbar-transparent">
            <div class="nav-container">
                <ul class="nav-menu nav-menu-left">
                    <li><a href="${basePath}index.html" class="nav-link">Domov</a></li>
                    <li><a href="${pagesPath}o-nas.html" class="nav-link">O nás</a></li>
                </ul>
                <div class="nav-logo">
                    <a href="${basePath}index.html" class="logo-link">
                        <img src="${basePath}sources/logo2.png" alt="KP-WELD s.r.o." class="logo-image">
                    </a>
                </div>
                <ul class="nav-menu nav-menu-right">
                    <li><a href="${pagesPath}referencie.html" class="nav-link">Referencie</a></li>
                    <li><a href="${pagesPath}kontakt.html" class="nav-link">Kontakt</a></li>
                </ul>
                <div class="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </nav>

        <!-- Mobile Sidebar -->
        <div class="mobile-overlay"></div>
        <div class="mobile-sidebar">
            <div class="mobile-sidebar-header">
                <div class="mobile-sidebar-logo">
                    <img src="${basePath}sources/logo2.png" alt="KP-WELD">
                </div>
                <button class="mobile-close-btn">✕</button>
            </div>
            <ul class="mobile-nav-menu">
                <li><a href="${basePath}index.html" class="mobile-nav-link">Domov</a></li>
                <li><a href="${pagesPath}o-nas.html" class="mobile-nav-link">O nás</a></li>
                <li><a href="${pagesPath}referencie.html" class="mobile-nav-link">Referencie</a></li>
                <li><a href="${pagesPath}kontakt.html" class="mobile-nav-link">Kontakt</a></li>
            </ul>
        </div>
    `;
    
    const navigationContainer = document.getElementById('navigation-container');
    if (navigationContainer) {
        navigationContainer.innerHTML = navigationHTML;
        setActiveNavLink();
        
        // Ensure logo loads immediately
        setTimeout(() => {
            const logoImage = document.querySelector('.logo-image');
            if (logoImage && !logoImage.src) {
                logoImage.src = `${basePath}sources/logo2.png`;
                console.log('Logo source set to:', logoImage.src);
            }
        }, 100);
        
        console.log('Header loaded successfully');
    } else {
        console.error('Navigation container not found');
    }
}

function loadFooterFallback() {
    console.log('Loading footer fallback...');

    const currentPath = window.location.pathname;
    const isInProjektPage = currentPath.includes('/pages/projekt/');
    const isInPagesDir = currentPath.includes('/pages/') && !isInProjektPage;
    const isKontaktPage = currentPath.includes('kontakt.html');

    let basePath, pagesPath;
    if (isInProjektPage) {
        // We're in /pages/projekt/
        basePath = '../../';
        pagesPath = '../';
    } else if (isInPagesDir) {
        // We're in /pages/
        basePath = '../';
        pagesPath = '';
    } else {
        // We're in root directory
        basePath = '';
        pagesPath = 'pages/';
    }

    // No additional map sections needed - only show on contact page
    const mapSection = '';

    const footerHTML = `
        <footer id="footer" class="footer">
            <!-- CTA Section -->
            <div class="footer-cta-section">
                <div class="footer-cta-content">
                    <div class="footer-cta-left">
                        <h2>Hľadáte stavebnú spoločnosť s tradíciou a kvalitou?</h2>
                    </div>
                    <div class="footer-cta-right">
                        <a href="${pagesPath}kontakt.html" class="footer-cta-btn">Kontakt</a>
                    </div>
                </div>
            </div>

            ${mapSection}
            
            <!-- Footer Bottom -->
            <div class="footer-bottom">
                <div class="footer-main">
                    <div class="footer-logo">
                        <img src="${basePath}sources/logo2.png" alt="RAVING" class="footer-logo-image">
                    </div>
                    <div class="footer-navigation">
                        <h4>Navigácia</h4>
                        <div class="footer-nav-links">
                            <div class="footer-nav-col">
                                <a href="${basePath}index.html">Domov</a>
                                <a href="${pagesPath}o-nas.html">O nás</a>
                                <a href="${pagesPath}kontakt.html">Kontakt</a>
                                <a href="${pagesPath}referencie.html">Portfólio</a>
                            </div>
                           
                        </div>
                    </div>
                    <div class="footer-contact">
                        <div class="footer-location">
                            <h4>Stavebná spoločnosť RAVING a.s.</h4>
                            <p>Vrbovská cesta 2509/15<br>
                            921 01 Piešťany<br>
                            Slovensko</p>
                            <p><a href="mailto:raving@raving.sk">raving@raving.sk</a></p>
                        </div>
                        
                        <div class="footer-location">
                            <h4>Kontakt</h4>
                            <p><strong>Žeriavy a mechanizácia:</strong><br>
                            <a href="tel:+421905640754">0905 640 754</a></p>
                            <p><strong>Realizácie projektov:</strong><br>
                            <a href="tel:+421907271921">0907 271 921</a></p>
                        </div>
                    </div>
                    <div class="footer-social">
                        <!-- Social media links placeholder -->
                    </div>
                </div>
                
                <div class="footer-copyright">
                    <p>&copy; Stavebná spoločnosť RAVING a.s. 2025 &nbsp;&nbsp; <a href="#" onclick="openPrivacyPopup(); return false;">Ochrana osobných údajov</a> &nbsp;&nbsp; <a href="#" onclick="openCookieSettings(); return false;">Nastavenia cookies</a></p>
                </div>
            </div>
        </footer>
        
        <!-- Cookie Consent Popup -->
        <div id="cookie-consent" class="cookie-consent">
            <div class="cookie-consent-content">
                <div class="cookie-consent-text">
                    <div class="cookie-icon">🍪</div>
                    <div class="cookie-message">
                        Používame cookies na zlepšenie vašej používateľskej skúsenosti a na analýzu návštevnosti. Kliknutím na "Súhlasím" súhlasíte s používaním všetkých cookies.
                    </div>
                </div>
                <div class="cookie-actions">
                    <button class="cookie-btn settings" onclick="openCookieSettings()">Nastavenia</button>
                    <button class="cookie-btn accept" onclick="acceptAllCookies()">Súhlasím</button>
                </div>
            </div>
        </div>
        
        <!-- Cookie Settings Modal -->
        <div id="cookie-settings-modal" class="cookie-settings-modal">
            <div class="cookie-settings-content">
                <div class="cookie-settings-header">
                    <h2 class="cookie-settings-title">Nastavenia cookies</h2>
                    <button class="cookie-settings-close" onclick="closeCookieSettings()">&times;</button>
                </div>
                <div class="cookie-settings-body">
                    <div class="cookie-category">
                        <div class="cookie-category-header">
                            <h3 class="cookie-category-title">Nevyhnutné cookies</h3>
                            <div class="cookie-toggle">
                                <input type="checkbox" id="necessary-cookies" checked disabled>
                                <span class="cookie-toggle-slider"></span>
                            </div>
                        </div>
                        <p class="cookie-category-description">
                            Tieto cookies sú potrebné pre základnú funkčnosť stránky a nemožno ich vypnúť.
                        </p>
                    </div>
                    
                    <div class="cookie-category">
                        <div class="cookie-category-header">
                            <h3 class="cookie-category-title">Analytické cookies</h3>
                            <div class="cookie-toggle">
                                <input type="checkbox" id="analytics-cookies">
                                <span class="cookie-toggle-slider"></span>
                            </div>
                        </div>
                        <p class="cookie-category-description">
                            Pomáhajú nám pochopiť, ako návštevníci používajú našu stránku, aby sme ju mohli zlepšiť.
                        </p>
                    </div>
                    
                    <div class="cookie-category">
                        <div class="cookie-category-header">
                            <h3 class="cookie-category-title">Marketingové cookies</h3>
                            <div class="cookie-toggle">
                                <input type="checkbox" id="marketing-cookies">
                                <span class="cookie-toggle-slider"></span>
                            </div>
                        </div>
                        <p class="cookie-category-description">
                            Používajú sa na personalizáciu reklám a meranie ich účinnosti.
                        </p>
                    </div>
                </div>
                <div class="cookie-settings-footer">
                    <button class="cookie-settings-btn save" onclick="saveCookieSettings()">Uložiť nastavenia</button>
                    <button class="cookie-settings-btn accept-all" onclick="acceptAllCookies()">Súhlasím so všetkými</button>
                </div>
            </div>
        </div>
        
        <!-- Privacy Policy Popup -->
        <div id="privacy-popup" class="privacy-popup">
            <div class="privacy-popup-content">
                <div class="privacy-popup-header">
                    <h2>Ochrana osobných údajov</h2>
                    <button class="privacy-popup-close" onclick="closePrivacyPopup()">&times;</button>
                </div>
                <div class="privacy-popup-body">
                    <div class="company-info">
                        <strong>Stavebná spoločnosť RAVING a.s.</strong><br>
                        <a href="https://maps.google.com/?q=Vrbovsk%C3%A1+cesta+2509%2F15,+921+01+Pie%C5%A1%C5%A5any" target="_blank" rel="noopener" style="text-decoration: underline; color: rgb(240, 125, 0);">Vrbovská cesta 2509/15, 921 01 Piešťany</a><br>
                        Slovenská republika<br>
                        E-mail: raving@raving.sk<br>
                        Tel.: +421 905 640 754 (žeriavy a mechanizácia)<br>
                        Tel.: +421 907 271 921 (realizácie projektov)
                    </div>
                    
                    <p>Tieto Zásady ochrany osobných údajov (ďalej len „Zásady") popisujú, aké osobné údaje spracúvame v súvislosti s používaním našej webovej stránky a kontaktných formulárov.</p>
                    
                    <h3>I. Kontaktný formulár</h3>
                    <p>Na stránke www.raving.sk prevádzkujeme kontaktný formulár ktorého účelom je umožniť vám:</p>
                    <p>Položiť otázku k našim produktom a službám<br>
                    Požiadať o cenovú ponuku</p>
                    
                    <p><strong>Rozsah spracúvaných údajov:</strong></p>
                    <p>Meno a priezvisko<br>
                    E-mailová adresa<br>
                    Telefónne číslo<br>
                    Správu</p>
                    
                    <p><strong>Účel spracovania:</strong><br>
                    Spracúvame uvedené údaje, aby sme vás mohli kontaktovať a reagovať na váš dopyt.</p>
                    
                    <p><strong>Právny základ:</strong><br>
                    Článok 6 ods. 1 písm. b) GDPR – plnenie opatrení pred uzavretím zmluvy na žiadosť dotknutej osoby.</p>
                    
                    <p><strong>Doba uchovávania:</strong><br>
                    Osobné údaje budeme uchovávať maximálne 10 rokov od odozvy na váš dopyt, pokiaľ nevznikne ďalší zmluvný vzťah.</p>
                    
                    <h3>II. Súbory cookies</h3>
                    <p>Na našej webovej stránke používame cookies výlučne na nasledujúce účely:</p>
                    <p>Nevyhnutné cookies – zabezpečujú základnú funkčnosť stránky (napr. ukladanie relácie, nastavení prehliadača).<br>
                    Štatistické (analytické) cookies – pomáhajú nám pochopiť, ako návštevníci stránku používajú (nasadzujeme ich len so súhlasom používateľa).</p>
                    
                    <p><strong>Správa súhlasov:</strong><br>
                    Používateľ môže kedykoľvek odvolať súhlas s využívaním štatistických cookies prostredníctvom nastavení cookie lišty alebo priamo v prehliadači.</p>
                    
                    <h3>III. Práva dotknutej osoby</h3>
                    <p>Podľa nariadenia GDPR máte nasledujúce práva:</p>
                    <p>Prístup k osobným údajom, ktoré spracúvame<br>
                    Oprava nepresných alebo neúplných údajov<br>
                    Vymazanie („právo zabudnutia"), ak na spracovanie už nie je právny základ<br>
                    Obmedzenie spracovania<br>
                    Prenosnosť údajov<br>
                    Odvolanie súhlasu – stane sa účinným dňom odvolania<br>
                    Podanie sťažnosti u Úradu na ochranu osobných údajov SR (Hraničná 12, 820 07 Bratislava, www.dataprotection.gov.sk)</p>
                    
                    <p>V prípade otázok alebo uplatnenia Vašich práv nás môžete kontaktovať na raving@raving.sk alebo telefónnom čísle +421 905 640 754.</p>
                    
                    <p><strong>Tieto Zásady nadobúdajú účinnosť dňom 25. 7. 2025.</strong></p>
                </div>
            </div>
        </div>
    `;
    
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = footerHTML;
        initPrivacyModalFallback();
        console.log('Footer loaded successfully');
    } else {
        console.error('Footer container not found');
    }
}

function setActiveNavLink() {
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    [...navLinks, ...mobileNavLinks].forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (currentPage === '/' || currentPage.includes('index.html')) {
            if (href.includes('index.html')) {
                link.classList.add('active');
            }
        } else if (currentPage.includes(href.split('/').pop())) {
            link.classList.add('active');
        }
    });
}

function initMobileNavigationFallback() {
    document.addEventListener('click', function(e) {
        // Toggle mobile sidebar
        if (e.target.closest('.hamburger')) {
            const hamburger = e.target.closest('.hamburger');
            const mobileSidebar = document.querySelector('.mobile-sidebar');
            const mobileOverlay = document.querySelector('.mobile-overlay');
            const navbar = document.querySelector('.navbar-transparent');
            
            hamburger.classList.toggle('active');
            mobileSidebar.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            
            if (hamburger.classList.contains('active')) {
                navbar.classList.add('mobile-menu-open');
                document.body.style.overflow = 'hidden';
            } else {
                navbar.classList.remove('mobile-menu-open');
                document.body.style.overflow = '';
            }
        }
        
        // Close mobile sidebar when clicking overlay, mobile link, or close button
        if (e.target.classList.contains('mobile-overlay') || e.target.classList.contains('mobile-nav-link') || e.target.classList.contains('mobile-close-btn')) {
            const mobileSidebar = document.querySelector('.mobile-sidebar');
            const mobileOverlay = document.querySelector('.mobile-overlay');
            const hamburger = document.querySelector('.hamburger');
            const navbar = document.querySelector('.navbar-transparent');
            
            if (mobileSidebar) mobileSidebar.classList.remove('active');
            if (mobileOverlay) mobileOverlay.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
            if (navbar) navbar.classList.remove('mobile-menu-open');
            document.body.style.overflow = '';
        }
    });
    
    // Close sidebar on window resize if screen becomes larger
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            const mobileSidebar = document.querySelector('.mobile-sidebar');
            const mobileOverlay = document.querySelector('.mobile-overlay');
            const hamburger = document.querySelector('.hamburger');
            const navbar = document.querySelector('.navbar-transparent');
            
            if (mobileSidebar && mobileSidebar.classList.contains('active')) {
                mobileSidebar.classList.remove('active');
                if (mobileOverlay) mobileOverlay.classList.remove('active');
                if (hamburger) hamburger.classList.remove('active');
                if (navbar) navbar.classList.remove('mobile-menu-open');
                document.body.style.overflow = '';
            }
        }
    });
}

function initScrollEffectsFallback() {
    const scrollProgress = document.querySelector('.scroll-progress-bar');
    const transparentNavbar = document.querySelector('.navbar-transparent');
    
    // Set initial navbar state on page load
    updateNavbarBackgroundFallback();
    
    // Minimal scroll listener like template
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        // Update scroll progress (minimal calculation)
        if (scrollProgress) {
            const scrollPercentage = (scrollPosition / documentHeight) * 100;
            scrollProgress.style.height = scrollPercentage + '%';
        }
        
        // Update navbar background (lightweight)
        updateNavbarBackgroundFallback();
    });
}

function updateNavbarBackgroundFallback() {
    const scrollPosition = window.scrollY;
    const transparentNavbar = document.querySelector('.navbar-transparent');
    const logoImage = document.querySelector('.logo-image');

    if (!transparentNavbar) return;
    
    // Ensure logo image has correct src if it's empty
    if (logoImage && !logoImage.src) {
        const currentPath = window.location.pathname;
        const isInProjektPage = currentPath.includes('/pages/projekt/');
        const isInServicePage = currentPath.includes('/service-page/');
        const isInPagesDir = currentPath.includes('/pages/') && !isInServicePage && !isInProjektPage;
        
        let basePath;
        if (isInProjektPage) {
            basePath = '../../';
        } else if (isInServicePage) {
            basePath = '../../';
        } else if (isInPagesDir) {
            basePath = '../';
        } else {
            basePath = '';
        }
        logoImage.src = `${basePath}sources/logo2.png`;
    }

    // 8vh trigger point for all pages
    const triggerPoint = window.innerHeight * 0.08;

    // Determine logo path based on current location
    const currentPath = window.location.pathname;
    const isInProjektPage = currentPath.includes('/pages/projekt/');
    const isInServicePage = currentPath.includes('/service-page/');
    const isInPagesDir = currentPath.includes('/pages/') && !isInServicePage && !isInProjektPage;

    let basePath;
    if (isInProjektPage) {
        basePath = '../../';
    } else if (isInServicePage) {
        basePath = '../../';
    } else if (isInPagesDir) {
        basePath = '../';
    } else {
        basePath = '';
    }

    if (scrollPosition > triggerPoint) {
        transparentNavbar.classList.add('scrolled');
        if (logoImage) {
            logoImage.src = `${basePath}sources/logo2.png`;
        }
    } else {
        transparentNavbar.classList.remove('scrolled');
        if (logoImage) {
            logoImage.src = `${basePath}sources/logo2.png`;
        }
    }
}

function initPrivacyModalFallback() {
    // Make privacy functions globally available
    let privacyScrollPosition = 0;

    window.openPrivacyPopup = function() {
        const popup = document.getElementById('privacy-popup');
        if (popup) {
            popup.classList.add('active');
            // Save scroll position and prevent scrolling
            privacyScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            document.body.style.top = `-${privacyScrollPosition}px`;
            document.body.classList.add('no-scroll');
        }
    };

    window.closePrivacyPopup = function() {
        const popup = document.getElementById('privacy-popup');
        if (popup) {
            popup.classList.remove('active');
            // Restore scrolling and scroll position
            document.body.classList.remove('no-scroll');
            document.body.style.top = '';
            window.scrollTo(0, privacyScrollPosition);
        }
    };

    // Close popup when clicking outside
    document.addEventListener('click', function(e) {
        const popup = document.getElementById('privacy-popup');
        if (popup && e.target === popup) {
            window.closePrivacyPopup();
        }
    });

    // Close popup with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            window.closePrivacyPopup();
        }
    });
}

// Mobile-only product tabs carousel
function initProductCarousel() {
    // Only initialize on mobile
    if (window.innerWidth > 768) return;
    
    const container = document.querySelector('.product-tabs-container');
    const leftArrow = document.querySelector('.carousel-arrow-left');
    const rightArrow = document.querySelector('.carousel-arrow-right');
    
    if (!container || !leftArrow || !rightArrow) return;
    
    let currentIndex = 0;
    const totalTabs = 6;
    
    // Tab data for redirects
    const tabData = [
        { tab: 'dvere', text: 'Dvere' },
        { tab: 'zarubne', text: 'Zárubne' },
        { tab: 'drevo-schody', text: 'Drevené schody' },
        { tab: 'nabytok', text: 'Nábytok na mieru' },
        { tab: 'celoskla', text: 'Celosklá' },
        { tab: 'obklady', text: 'Obklady' }
    ];
    
    function updateCarousel() {
        const translateX = -(currentIndex * 16.666); // Move by 1/6 of container width
        container.style.transform = `translateX(${translateX}%)`;
        
        // Update active tab
        const tabs = document.querySelectorAll('.product-tab-hero');
        tabs.forEach((tab, index) => {
            tab.classList.toggle('active', index === currentIndex);
        });
    }
    
    function redirectToTab(index) {
        const currentPath = window.location.pathname;
        const isInPagesDir = currentPath.includes('/pages/');
        const basePath = isInPagesDir ? '' : 'pages/';
        
        window.location.href = `${basePath}produkty-sluzby.html?tab=${tabData[index].tab}`;
    }
    
    leftArrow.addEventListener('click', () => {
        const newIndex = currentIndex > 0 ? currentIndex - 1 : totalTabs - 1;
        redirectToTab(newIndex);
    });
    
    rightArrow.addEventListener('click', () => {
        const newIndex = currentIndex < totalTabs - 1 ? currentIndex + 1 : 0;
        redirectToTab(newIndex);
    });
    
    // Initialize
    updateCarousel();
}

// Fix Google Maps scroll interference
function initMapScrollFix() {
    const mapContainers = document.querySelectorAll('.location-map-container');
    
    mapContainers.forEach(container => {
        container.addEventListener('click', function() {
            this.classList.add('active');
        });
        
        // Deactivate when clicking outside
        document.addEventListener('click', function(e) {
            if (!container.contains(e.target)) {
                container.classList.remove('active');
            }
        });
    });
}

// Cookie Consent Functions
function showCookieConsent() {
    const cookieConsent = localStorage.getItem('cookie-consent');
    if (!cookieConsent) {
        document.getElementById('cookie-consent').classList.add('show');
    }
}

function acceptAllCookies() {
    localStorage.setItem('cookie-consent', 'accepted');
    localStorage.setItem('analytics-cookies', 'true');
    localStorage.setItem('marketing-cookies', 'true');
    document.getElementById('cookie-consent').classList.remove('show');
    closeCookieSettings();
}

let cookieScrollPosition = 0;

function openCookieSettings() {
    // Load current settings
    const analyticsEnabled = localStorage.getItem('analytics-cookies') === 'true';
    const marketingEnabled = localStorage.getItem('marketing-cookies') === 'true';

    document.getElementById('analytics-cookies').checked = analyticsEnabled;
    document.getElementById('marketing-cookies').checked = marketingEnabled;

    document.getElementById('cookie-settings-modal').classList.add('show');
    // Save scroll position and prevent scrolling
    cookieScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    document.body.style.top = `-${cookieScrollPosition}px`;
    document.body.classList.add('no-scroll');
}

function closeCookieSettings() {
    document.getElementById('cookie-settings-modal').classList.remove('show');
    // Restore scrolling and scroll position
    document.body.classList.remove('no-scroll');
    document.body.style.top = '';
    window.scrollTo(0, cookieScrollPosition);
}

function saveCookieSettings() {
    const analyticsEnabled = document.getElementById('analytics-cookies').checked;
    const marketingEnabled = document.getElementById('marketing-cookies').checked;
    
    localStorage.setItem('cookie-consent', 'custom');
    localStorage.setItem('analytics-cookies', analyticsEnabled.toString());
    localStorage.setItem('marketing-cookies', marketingEnabled.toString());
    
    document.getElementById('cookie-consent').classList.remove('show');
    closeCookieSettings();
}

// Close modal when clicking on backdrop
document.addEventListener('click', function(e) {
    if (e.target.id === 'cookie-settings-modal') {
        closeCookieSettings();
    }
});

// Show cookie consent on page load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(showCookieConsent, 1000); // Show after 1 second
});


// Lightbox functionality for project detail pages
function initLightboxFallback() {
    // Only initialize on project pages
    if (!window.location.pathname.includes('/projekt/')) {
        return;
    }

    // Create lightbox HTML if it doesn't exist
    if (!document.getElementById('lightbox')) {
        const lightboxHTML = `
            <div id="lightbox" class="lightbox">
                <div class="lightbox-overlay"></div>
                <div class="lightbox-container">
                    <button class="lightbox-close" aria-label="Zavrieť">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                    <button class="lightbox-prev" aria-label="Predchádzajúci obrázok">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="15,18 9,12 15,6"></polyline>
                        </svg>
                    </button>
                    <button class="lightbox-next" aria-label="Nasledujúci obrázok">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9,18 15,12 9,6"></polyline>
                        </svg>
                    </button>
                    <div class="lightbox-content">
                        <img class="lightbox-image" src="" alt="" />
                        <div class="lightbox-caption"></div>
                        <div class="lightbox-counter">
                            <span class="lightbox-current">1</span> / <span class="lightbox-total">1</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    }

    // Initialize lightbox
    const lightbox = {
        currentIndex: 0,
        images: [],
        isOpen: false,

        init: function() {
            this.findGalleryImages();
            this.bindEvents();
        },

        findGalleryImages: function() {
            const galleryImages = document.querySelectorAll('.modal-gallery img, .project-gallery img, .project-gallery-grid img, #gallery-grid img');
            this.images = Array.from(galleryImages);
            
            this.images.forEach((img, index) => {
                img.style.cursor = 'pointer';
                img.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.open(index);
                });
            });
        },

        bindEvents: function() {
            const lightboxEl = document.getElementById('lightbox');
            const closeBtn = lightboxEl.querySelector('.lightbox-close');
            const prevBtn = lightboxEl.querySelector('.lightbox-prev');
            const nextBtn = lightboxEl.querySelector('.lightbox-next');
            const overlay = lightboxEl.querySelector('.lightbox-overlay');

            closeBtn.addEventListener('click', () => this.close());
            overlay.addEventListener('click', () => this.close());
            prevBtn.addEventListener('click', () => this.prev());
            nextBtn.addEventListener('click', () => this.next());

            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (!this.isOpen) return;
                
                switch(e.key) {
                    case 'Escape':
                        this.close();
                        break;
                    case 'ArrowLeft':
                        this.prev();
                        break;
                    case 'ArrowRight':
                        this.next();
                        break;
                }
            });
        },

        open: function(index) {
            if (this.images.length === 0) return;
            
            this.currentIndex = index;
            this.isOpen = true;
            
            const lightboxEl = document.getElementById('lightbox');
            const image = lightboxEl.querySelector('.lightbox-image');
            const caption = lightboxEl.querySelector('.lightbox-caption');
            const current = lightboxEl.querySelector('.lightbox-current');
            const total = lightboxEl.querySelector('.lightbox-total');
            
            document.body.style.overflow = 'hidden';
            lightboxEl.style.display = 'flex';
            
            setTimeout(() => {
                lightboxEl.classList.add('lightbox-active');
            }, 10);
            
            this.loadImage(this.images[index], image, caption);
            
            current.textContent = index + 1;
            total.textContent = this.images.length;
            
            this.updateNavigation();
        },

        close: function() {
            const lightboxEl = document.getElementById('lightbox');
            
            this.isOpen = false;
            lightboxEl.classList.remove('lightbox-active');
            
            setTimeout(() => {
                lightboxEl.style.display = 'none';
                document.body.style.overflow = '';
            }, 300);
        },

        prev: function() {
            if (this.currentIndex > 0) {
                this.currentIndex--;
            } else {
                this.currentIndex = this.images.length - 1;
            }
            this.updateImage();
        },

        next: function() {
            if (this.currentIndex < this.images.length - 1) {
                this.currentIndex++;
            } else {
                this.currentIndex = 0;
            }
            this.updateImage();
        },

        updateImage: function() {
            const lightboxEl = document.getElementById('lightbox');
            const image = lightboxEl.querySelector('.lightbox-image');
            const caption = lightboxEl.querySelector('.lightbox-caption');
            const current = lightboxEl.querySelector('.lightbox-current');
            
            image.style.opacity = '0';
            
            setTimeout(() => {
                this.loadImage(this.images[this.currentIndex], image, caption);
                current.textContent = this.currentIndex + 1;
                this.updateNavigation();
                
                setTimeout(() => {
                    image.style.opacity = '1';
                }, 50);
            }, 150);
        },

        loadImage: function(imgElement, targetImg, captionElement) {
            const src = imgElement.src;
            const alt = imgElement.alt || '';
            
            const newImg = new Image();
            
            newImg.onload = () => {
                targetImg.src = src;
                targetImg.alt = alt;
                captionElement.textContent = alt;
                targetImg.style.opacity = '1';
            };
            
            newImg.onerror = () => {
                console.error('Failed to load image:', src);
                targetImg.style.opacity = '1';
            };
            
            targetImg.style.opacity = '0';
            newImg.src = src;
        },

        updateNavigation: function() {
            const lightboxEl = document.getElementById('lightbox');
            const prevBtn = lightboxEl.querySelector('.lightbox-prev');
            const nextBtn = lightboxEl.querySelector('.lightbox-next');
            
            if (this.images.length <= 1) {
                prevBtn.style.display = 'none';
                nextBtn.style.display = 'none';
            } else {
                prevBtn.style.display = 'flex';
                nextBtn.style.display = 'flex';
            }
        }
    };

    // Initialize lightbox
    lightbox.init();
    
    // Make it globally available
    window.lightboxFallback = lightbox;
}

// Initialize lightbox on project pages
document.addEventListener('DOMContentLoaded', function() {
    initLightboxFallback();
});

// Minimal fallback - no complex animations that could conflict
console.log('Fallback: Using minimal approach like template');