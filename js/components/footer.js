// Footer Component - Footer content and privacy functionality

export function initFooter() {
    loadFooter();
    initPrivacyModal();
}

function ensureFooterCSSLoaded() {
    // Check if footer CSS is already loaded
    const existingLink = document.querySelector('link[href*="footer.css"]');
    if (existingLink) return;
    
    // Determine CSS path based on current location
    const currentPath = window.location.pathname;
    const isInProjektPage = currentPath.includes('/pages/projekt/');
    const isInServicePage = currentPath.includes('/service-page/');
    const isInPagesDir = currentPath.includes('/pages/') && !isInServicePage && !isInProjektPage;
    
    let cssPath;
    if (isInProjektPage) {
        cssPath = '../../css/components/footer.css?v=1.4';
    } else if (isInServicePage) {
        cssPath = '../../css/components/footer.css?v=1.4';
    } else if (isInPagesDir) {
        cssPath = '../css/components/footer.css?v=1.4';
    } else {
        cssPath = 'css/components/footer.css?v=1.4';
    }
    
    // Create and inject CSS link
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssPath;
    document.head.appendChild(link);
}

function loadFooter() {
    // Ensure footer CSS is loaded
    ensureFooterCSSLoaded();
    
    // Determine current location and set appropriate paths
    const currentPath = window.location.pathname;
    const isInProjektPage = currentPath.includes('/pages/projekt/');
    const isInServicePage = currentPath.includes('/service-page/');
    const isInPagesDir = currentPath.includes('/pages/') && !isInServicePage && !isInProjektPage;
    
    // Set navigation paths based on current location
    let basePath, pagesPath;
    
    if (isInProjektPage) {
        // We're in /pages/projekt/
        basePath = '../../';  // To reach root for index.html
        pagesPath = '../';    // To reach /pages/ directory
    } else if (isInServicePage) {
        // We're in /pages/service-page/ - need different paths for different targets
        basePath = '../../';  // To reach root for index.html
        pagesPath = '../';    // To reach /pages/ directory (go up one level from service-page)
    } else if (isInPagesDir) {
        // We're in /pages/ - stay in pages directory for other pages
        basePath = '../';     // To reach root for index.html
        pagesPath = '';       // Other pages are in same directory
    } else {
        // We're in root directory
        basePath = '';
        pagesPath = 'pages/';
    }
    
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
            
            
            <div class="footer-divider"></div>
            
            <!-- Footer Bottom -->
            <div class="footer-bottom">
                <div class="footer-main">
                    <div class="footer-logo">
                        <img src="${basePath}sources/logo2.png" alt="RAVING" class="footer-logo-image">
                    </div>
                    <div class="footer-nav-col">
                        <a href="${basePath}index.html">Domov</a>
                        <a href="${pagesPath}o-nas.html">O nás</a>
                        <a href="${pagesPath}kontakt.html">Kontakt</a>
                        <a href="${pagesPath}referencie.html">Portfólio</a>
                    </div>
                   
                    <div class="footer-contact">
                        <div class="footer-location">
                            <h4>Sídlo spoločnosti</h4>
                            <p>Vrbovská cesta 2509/15<br>
                            921 01 Piešťany</p>
                            <p><a href="tel:+421905640754">Žeriavy: 0905 640 754</a><br>
                            <a href="tel:+421907271921">Projekty: 0907 271 921</a><br>
                            <a href="mailto:raving@raving.sk">raving@raving.sk</a></p>
                        </div>
                        
                        <div class="footer-location">
                            <h4>Kvalita od roku 1991</h4>
                            <p>Rodinná stavebná spoločnosť<br>
                            s tradíciou a skúsenosťami<br>
                            vo všetkých druhoch stavebných prác</p>
                            <p>Značka RAVING je osvedčenou<br>
                            známkou kvality</p>
                        </div>
                    </div>
                    <div class="footer-social">
                        <a href="https://www.instagram.com/wensdoor" target="_blank">
                            <img src="${basePath}sources/instagram-icon-white.svg" alt="Instagram" style="width: 20px; height: 20px;">
                        </a>
                    </div>
                </div>
                
                <div class="footer-copyright">
                    <p>&copy; Stavebná spoločnosť RAVING a.s. 2025 &nbsp;&nbsp; <a href="#" onclick="openPrivacyPopup(); return false;">Ochrana osobných údajov</a> &nbsp;&nbsp; <a href="#" onclick="openCookieSettings(); return false;">Nastavenia cookies</a></p>
                </div>
            </div>
        </footer>
        
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
    }
}

function initPrivacyModal() {
    let privacyScrollPosition = 0;

    // Make privacy functions globally available
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

// Make functions globally available for fallback
if (typeof window !== 'undefined') {
    window.loadFooter = loadFooter;
    window.initPrivacyModal = initPrivacyModal;
    window.ensureFooterCSSLoaded = ensureFooterCSSLoaded;
}