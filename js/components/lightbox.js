// Lightbox Component
class Lightbox {
    constructor() {
        this.currentIndex = 0;
        this.images = [];
        this.isOpen = false;
        this.init();
    }

    init() {
        this.createLightboxHTML();
        this.bindEvents();
        this.findGalleryImages();
    }

    createLightboxHTML() {
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

    findGalleryImages() {
        // Find all images that should open in lightbox (project detail pages only)
        const galleryImages = document.querySelectorAll('.modal-gallery img, .project-gallery img, .project-gallery-grid img, #gallery-grid img');
        this.images = Array.from(galleryImages);
        
        // Add click handlers to gallery images
        this.images.forEach((img, index) => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation(); // Prevent any parent link navigation
                this.open(index);
            });
        });
    }

    bindEvents() {
        const lightbox = document.getElementById('lightbox');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');
        const overlay = lightbox.querySelector('.lightbox-overlay');

        // Close lightbox
        closeBtn.addEventListener('click', () => this.close());
        overlay.addEventListener('click', () => this.close());

        // Navigation
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

        // Touch/swipe support for mobile
        let startX = 0;
        let startY = 0;
        const lightboxContent = lightbox.querySelector('.lightbox-content');
        
        lightboxContent.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });

        lightboxContent.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            
            const deltaX = startX - endX;
            const deltaY = startY - endY;
            
            // Only trigger if horizontal swipe is dominant
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }
            
            startX = 0;
            startY = 0;
        });
    }

    open(index = 0) {
        if (this.images.length === 0) return;
        
        this.currentIndex = index;
        this.isOpen = true;
        
        const lightbox = document.getElementById('lightbox');
        const image = lightbox.querySelector('.lightbox-image');
        const caption = lightbox.querySelector('.lightbox-caption');
        const current = lightbox.querySelector('.lightbox-current');
        const total = lightbox.querySelector('.lightbox-total');
        
        // Show lightbox with fade in
        document.body.style.overflow = 'hidden';
        lightbox.style.display = 'flex';
        
        // Force reflow for smooth animation
        lightbox.offsetHeight;
        
        lightbox.classList.add('lightbox-active');
        
        // Load image with smooth transition
        this.loadImage(this.images[index], image, caption);
        
        // Update counter
        current.textContent = index + 1;
        total.textContent = this.images.length;
        
        // Update navigation button visibility
        this.updateNavigation();
    }

    close() {
        const lightbox = document.getElementById('lightbox');
        
        this.isOpen = false;
        lightbox.classList.remove('lightbox-active');
        
        // Wait for animation to complete
        setTimeout(() => {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }

    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        } else {
            this.currentIndex = this.images.length - 1;
        }
        this.updateImage();
    }

    next() {
        if (this.currentIndex < this.images.length - 1) {
            this.currentIndex++;
        } else {
            this.currentIndex = 0;
        }
        this.updateImage();
    }

    updateImage() {
        const lightbox = document.getElementById('lightbox');
        const image = lightbox.querySelector('.lightbox-image');
        const caption = lightbox.querySelector('.lightbox-caption');
        const current = lightbox.querySelector('.lightbox-current');
        
        // Fade out current image
        image.style.opacity = '0';
        
        setTimeout(() => {
            this.loadImage(this.images[this.currentIndex], image, caption);
            current.textContent = this.currentIndex + 1;
            this.updateNavigation();
            
            // Fade in new image
            setTimeout(() => {
                image.style.opacity = '1';
            }, 50);
        }, 150);
    }

    loadImage(imgElement, targetImg, captionElement) {
        const src = imgElement.src;
        const alt = imgElement.alt || '';
        
        // Create new image for preloading
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
    }

    updateNavigation() {
        const lightbox = document.getElementById('lightbox');
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');
        
        // Show/hide navigation based on number of images
        if (this.images.length <= 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';
        }
    }
}

// Initialize lightbox when DOM is loaded
export function initLightbox() {
    if (typeof window.lightboxInstance === 'undefined') {
        window.lightboxInstance = new Lightbox();
    } else {
        // Re-scan for new images if lightbox already exists
        window.lightboxInstance.findGalleryImages();
    }
}

// Auto-initialize for fallback
if (typeof window !== 'undefined') {
    window.initLightbox = initLightbox;
    
    // Auto-init if document is already loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLightbox);
    } else {
        // DOM already loaded
        initLightbox();
    }
}