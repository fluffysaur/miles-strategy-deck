/**
 * Bobo & Bubba Miles Strategy Deck - Seamless Navigation & Interactive Bullets
 */

const SLIDES = [
    { file: 'slide-1-welcome.html', title: '1. Welcome ✨', shortName: 'welcome' },
    { file: 'slide-2-our-card-portfolio.html', title: '2. Our Card Portfolio 💳', shortName: 'our-card-portfolio' },
    { file: 'slide-3-citi-rewards.html', title: '3. Citi Rewards Card 🛍️', shortName: 'citi-rewards' },
    { file: 'slide-4-citi-premiermiles.html', title: '4. Citi PremierMiles Card ✈️', shortName: 'citi-premiermiles' },
    { file: 'slide-5-uob-preferred-platinum-visa.html', title: '5. UOB Preferred Visa 📱', shortName: 'uob-preferred-platinum-visa' },
    { file: 'slide-6-uob-ladys-card.html', title: "6. UOB Lady's Card 🍽️", shortName: 'uob-ladys-card' },
    { file: 'slide-7-krisflyer-uob.html', title: '7. KrisFlyer UOB Card 🛫', shortName: 'krisflyer-uob' },
    { file: 'slide-8-hsbc-revolution.html', title: '8. HSBC Revolution Card 🏨', shortName: 'hsbc-revolution' },
    { file: 'slide-9-sc-journey.html', title: '9. SC Journey Card 🗺️', shortName: 'sc-journey' },
    { file: 'slide-10-heymax-optimization-guide.html', title: '10. HeyMax Guide 🪄', shortName: 'heymax-optimization-guide' },
    { file: 'slide-11-strategy-cheatsheet.html', title: '11. Strategy Cheatsheet 📊', shortName: 'strategy-cheatsheet' }
];

const TOTAL_SLIDES = SLIDES.length;
const slideCache = new Map();
let currentSlideIndex = 0;
let isTransitioning = false;

/**
 * Get slide index (0-based) from URL/filename
 */
function getSlideIndexFromUrl(url) {
    const pathname = url || window.location.pathname || window.location.href;
    const filename = pathname.substring(pathname.lastIndexOf('/') + 1) || 'slide-1-welcome.html';
    
    if (filename === 'index.html') return 0;
    
    const index = SLIDES.findIndex(s => s.file === filename);
    if (index !== -1) return index;
    
    // Fallback if numbered legacy format
    const match = filename.match(/slide-(\d+)/);
    if (match) {
        const num = parseInt(match[1], 10);
        if (num >= 1 && num <= TOTAL_SLIDES) return num - 1;
    }
    return 0;
}

currentSlideIndex = getSlideIndexFromUrl();

/**
 * Preload all slide contents into memory map for 0ms instant transitions
 */
async function preloadSlides() {
    const currentFile = SLIDES[currentSlideIndex].file;
    slideCache.set(currentFile, document.cloneNode(true));

    const slideUrls = SLIDES.map(s => s.file);

    for (const url of slideUrls) {
        if (!slideCache.has(url)) {
            try {
                const response = await fetch(url);
                if (response.ok || (response.status === 0 && response.type === 'opaque')) {
                    const html = await response.text();
                    if (html) {
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(html, 'text/html');
                        slideCache.set(url, doc);
                    }
                }
            } catch (err) {
                // file:// protocol fallback
            }
        }
    }
}

/**
 * Render/sync the interactive slide bullets with hover tooltips in .slide-dots
 */
function renderSlideBullets(activeIndex) {
    const dotsContainer = document.querySelector('.slide-dots');
    if (!dotsContainer) return;

    dotsContainer.innerHTML = '';
    SLIDES.forEach((slide, idx) => {
        const wrap = document.createElement('div');
        wrap.className = 'slide-dot-wrap';

        const dot = document.createElement('a');
        dot.className = `slide-dot ${idx === activeIndex ? 'active' : ''}`;
        dot.href = slide.file;
        dot.setAttribute('aria-label', slide.title);
        dot.dataset.index = idx;

        const tooltip = document.createElement('div');
        tooltip.className = 'slide-dot-tooltip';
        tooltip.innerText = slide.title;

        wrap.appendChild(dot);
        wrap.appendChild(tooltip);
        dotsContainer.appendChild(wrap);
    });
}

/**
 * Swap DOM content smoothly without full page reload/flicker
 */
function updateDOMWithDoc(targetDoc, targetFilename) {
    const newContainer = targetDoc.querySelector('.presentation-container');
    const newControls = targetDoc.querySelector('.controls');
    const newTitle = targetDoc.querySelector('title');

    const currentContainer = document.querySelector('.presentation-container');
    const currentControls = document.querySelector('.controls');

    if (newTitle) {
        document.title = newTitle.innerText;
    }

    if (newContainer && currentContainer) {
        currentContainer.innerHTML = newContainer.innerHTML;
        const currentSlideEl = currentContainer.querySelector('.slide');
        if (currentSlideEl) {
            currentSlideEl.classList.remove('slide-fade-out');
            currentSlideEl.classList.add('slide-fade-in');
        }
    }

    if (newControls && currentControls) {
        currentControls.innerHTML = newControls.innerHTML;
    }

    currentSlideIndex = getSlideIndexFromUrl(targetFilename);
    renderSlideBullets(currentSlideIndex);

    // Update history state
    try {
        window.history.pushState({ url: targetFilename }, '', targetFilename);
    } catch (e) {
        // file:// pushState fallback
    }
}

/**
 * Seamless Slide Navigation
 */
async function smoothNavigateTo(targetUrl) {
    const filename = targetUrl.substring(targetUrl.lastIndexOf('/') + 1) || 'slide-1-welcome.html';
    const targetIdx = getSlideIndexFromUrl(filename);
    
    if (targetIdx === currentSlideIndex && slideCache.has(filename)) {
        return;
    }

    if (isTransitioning) {
        await new Promise(r => setTimeout(r, 60));
    }
    isTransitioning = true;

    try {
        let targetDoc = slideCache.get(filename);
        if (!targetDoc) {
            const response = await fetch(filename);
            const html = await response.text();
            const parser = new DOMParser();
            targetDoc = parser.parseFromString(html, 'text/html');
            slideCache.set(filename, targetDoc);
        }

        if (document.startViewTransition) {
            await document.startViewTransition(() => {
                updateDOMWithDoc(targetDoc, filename);
            }).finished;
        } else {
            const currentSlideEl = document.querySelector('.slide');
            if (currentSlideEl) {
                currentSlideEl.classList.add('slide-fade-out');
                await new Promise((r) => setTimeout(r, 80));
            }
            updateDOMWithDoc(targetDoc, filename);
        }
    } catch (e) {
        window.location.href = filename;
    } finally {
        isTransitioning = false;
    }
}

function goToSlide(n) {
    if (n < 1 || n > TOTAL_SLIDES) return;
    const targetFile = SLIDES[n - 1].file;
    smoothNavigateTo(targetFile);
}

function nextSlide() {
    if (currentSlideIndex < TOTAL_SLIDES - 1) {
        goToSlide(currentSlideIndex + 2);
    }
}

function prevSlide() {
    if (currentSlideIndex > 0) {
        goToSlide(currentSlideIndex);
    }
}

/**
 * Global click interceptor for internal slide links and slide dots
 */
document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href || href === '#' || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
        return;
    }

    const isSlideLink = SLIDES.some(s => s.file === href || href.endsWith(s.file));
    if (isSlideLink) {
        e.preventDefault();
        smoothNavigateTo(href);
    }
});

/**
 * Handle browser Back / Forward buttons seamlessly
 */
window.addEventListener('popstate', (e) => {
    const targetUrl = (e.state && e.state.url) || window.location.pathname;
    const filename = targetUrl.substring(targetUrl.lastIndexOf('/') + 1) || 'slide-1-welcome.html';
    smoothNavigateTo(filename);
});

/**
 * Keyboard Navigation Listeners
 */
document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        nextSlide();
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevSlide();
    } else if (e.key === 'Home') {
        e.preventDefault();
        goToSlide(1);
    } else if (e.key === 'End') {
        e.preventDefault();
        goToSlide(TOTAL_SLIDES);
    }
});

/**
 * Generate cute floating background particles
 */
function initCuteParticles() {
    if (document.querySelector('.cute-particles-container')) return;

    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'cute-particles-container';
    particlesContainer.setAttribute('aria-hidden', 'true');
    
    const emojis = ['💖', '✨', '🛫', '⭐', '☁️', '🌸', '🪄', '💳'];
    const count = 15;
    
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.animationDuration = `${10 + Math.random() * 12}s`;
        particle.style.animationDelay = `${Math.random() * 8}s`;
        particle.style.fontSize = `${14 + Math.random() * 12}px`;
        particle.style.opacity = `${0.12 + Math.random() * 0.22}`;
        particlesContainer.appendChild(particle);
    }
    
    document.body.appendChild(particlesContainer);
}

/**
 * Initialize on page load
 */
document.addEventListener('DOMContentLoaded', () => {
    initCuteParticles();
    renderSlideBullets(currentSlideIndex);
    preloadSlides();
});
