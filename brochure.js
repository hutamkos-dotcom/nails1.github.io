// ============================================
// BROCHURE
// ============================================
let currentBrochureSalonId = null;
let brochureGalleryTab = 'own';
let brochureGalleryIdx = 0;

const BROCHURE_GALLERY_OWN = [
    'https://raw.githubusercontent.com/hutamkos-dotcom/images/refs/heads/main/Barack%20mandula%20k%C3%B6rm%C3%B6k%20k%C3%B6zepes%20m%C3%A9ret%20feh%C3%A9r%20vonalas%20lev%C3%A9l%20minta%202026%E2%80%9107%E2%80%9104%E2%80%9120%E2%80%9156%E2%80%9140%201792x2304%2034%20HQ.webp',
    'https://raw.githubusercontent.com/hutamkos-dotcom/images/refs/heads/main/Cseresznyevir%C3%A1g%20mandula%20k%C3%B6rm%C3%B6k%20k%C3%B6zepes%20m%C3%A9ret%20fekete%20r%C3%B3zsasz%C3%ADn%20akcentus%202026%E2%80%9107%E2%80%9105%E2%80%9119%E2%80%9152%E2%80%9140%201792x2304%2034%20HQ.webp',
    'https://raw.githubusercontent.com/hutamkos-dotcom/images/refs/heads/main/Fekete%20mandula%20k%C3%B6rm%C3%B6k%20k%C3%B6zepes%20m%C3%A9ret%20arany%20glitter%20b%C3%A9zs%20sz%C3%BCrke%20akcentus%202026%E2%80%9107%E2%80%9104%E2%80%9120%E2%80%9158%E2%80%9140%201792x2304%2034%20HQ.webp',
    'https://raw.githubusercontent.com/hutamkos-dotcom/images/refs/heads/main/Hossz%C3%BA%20mandula%20k%C3%B6rm%C3%B6k%20halv%C3%A1ny%20r%C3%B3zsasz%C3%ADn%20f%C3%A9nyes%20manik%C5%B1r%202026%E2%80%9106%E2%80%9123_14%E2%80%9107%E2%80%9100%201792x2304%20HQ.webp'
];

const BROCHURE_GALLERY_CANDOIT = [
    'https://raw.githubusercontent.com/hutamkos-dotcom/images/refs/heads/main/Firefly_A%20detailed%20beauty%20editorial%20close%E2%80%91up%20showcasing%20almond%E2%80%91shaped%20nails%20in%20a%20pastel%20laven%20280200%20(1).webp',
    'https://raw.githubusercontent.com/hutamkos-dotcom/images/refs/heads/main/Firefly_A%20photorealistic%20close%E2%80%91up%20of%20almond%E2%80%91shaped%20nails%20coated%20in%20a%20midnight%20sapphire%20lacque%20959665.webp',
    'https://raw.githubusercontent.com/hutamkos-dotcom/images/refs/heads/main/Firefly_Photorealistic%20close-up%20of%20elegant%20almond-shaped%20nails%20with%20a%20soft%20pearl%20pink%20glazed%20622578.webp'
];

const brochurePortraits = [
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop'
];

const brochureSalonPhotos = [
    'https://raw.githubusercontent.com/hutamkos-dotcom/images/refs/heads/main/Bl_Sheffield.webp'
];

const GALLERY_DESCRIPTIONS = {
    own: 'Kérlek nézd át az eddigi munkáim, és adj egy lehetőséget, hogy élőben is megmutassam tehetségem, munkám esztétikusságát és hosszan tartó minőségét.',
    candoit: 'Ezek nem a saját munkáim – inspirációként mentettem el őket, mert nagyon tetszenek. Ilyen körmöt még nem készítettem, de úgy érzem, a tudásom megvan hozzá.'
};

function getBrochureImages(tab) {
    return tab === 'candoit' ? BROCHURE_GALLERY_CANDOIT : BROCHURE_GALLERY_OWN;
}

function openBrochure(salon) {
    const brochureOverlay = $('brochureOverlay');
    const brochureScroll = $('brochureScroll');
    currentBrochureSalonId = salon.id;
    brochureGalleryTab = 'own';
    brochureGalleryIdx = 0;
    const portrait = brochurePortraits[hashString(salon.id) % brochurePortraits.length];
    const salonPhoto = brochureSalonPhotos[hashString(salon.id + '_photo') % brochureSalonPhotos.length];
    renderBrochureContent(salon.name, salon.address || '', portrait, salonPhoto);
    brochureOverlay.classList.add('active');
    brochureScroll.scrollTop = 0;
    lockBodyScroll();
    syncBottomNavWithOverlays();
}

function renderBrochureContent(name, address, portrait, salonPhoto) {
    const brochureScroll = $('brochureScroll');
    const galleryImages = getBrochureImages(brochureGalleryTab);
    const safeIdx = ((brochureGalleryIdx % galleryImages.length) + galleryImages.length) % galleryImages.length;

    const slidesHTML = galleryImages.map((url, i) => `
        <div class="brochure-gallery-slide ${i === safeIdx ? 'active' : ''}" style="background-image:url('${url}')"></div>
    `).join('');

    const dotsHTML = galleryImages.map((_, i) => `
        <span class="brochure-gallery-dot ${i === safeIdx ? 'active' : ''}" data-dot-idx="${i}"></span>
    `).join('');

    const salonKey = 'salon_' + currentBrochureSalonId;
    const isLiked = isLikedByMe(salonKey);
    const descriptionText = GALLERY_DESCRIPTIONS[brochureGalleryTab] || '';

    brochureScroll.innerHTML = `
        <div class="brochure-inner">
            <div class="brochure-hero-portrait">
                <div class="brochure-hero-portrait-img" style="background-image:url('${portrait}')"></div>
                <div class="brochure-hero-portrait-overlay">
                    <div class="brochure-hero-title-block">
                        <div class="subtitle">Nails1 · Budapest</div>
                        <div class="name">${name}</div>
                        <div class="role">Körömszakértő · 12+ év tapasztalat</div>
                    </div>
                </div>
            </div>
            <div class="brochure-section">
                <h3>Engedd meg, hogy bemutatkozzam</h3>
                <p>Szia, Anna vagyok, és őszintén hiszem, hogy egy szép manikűr sokkal többet ad, mint amit elsőre látni: önbizalmat, nyugalmat és egy apró, mindennapi ünnepet.</p>
                <p>Nyugodt, precíz és empatikus típus vagyok. Számomra minden vendég egyedi, ezért soha nem sietek.</p>
            </div>
            <div class="brochure-section"><h3>Szakmai út</h3></div>
            <div class="brochure-cv-list">
                <div class="brochure-cv-item">
                    <div class="brochure-cv-year">2012 – 2013</div>
                    <div class="brochure-cv-">
                        <div class="brochure-cv-title">Körömépítő OKJ képzés</div>
                        <div class="brochure-cv-place">Budapesti Szépségakadémia</div>
                    </div>
                </div>
                <div class="brochure-cv-item">
                    <div class="brochure-cv-year">2014 – 2016</div>
                    <div class="brochure-cv-content">
                        <div class="brochure-cv-title">Junior manikűrös</div>
                        <div class="brochure-cv-place">La Belle Nail Studio, Budapest</div>
                    </div>
                </div>
                <div class="brochure-cv-item">
                    <div class="brochure-cv-year">2017</div>
                    <div class="brochure-cv-content">
                        <div class="brochure-cv-title">Haladó géllakk mesterkurzus</div>
                        <div class="brochure-cv-place">CND Education – Bécs</div>
                    </div>
                </div>
                <div class="brochure-cv-item">
                    <div class="brochure-cv-year">2018</div>
                    <div class="brochure-cv-content">
                        <div class="brochure-cv-title">Nail Art specializáció</div>
                        <div class="brochure-cv-place">Nail Art Academy, Milánó</div>
                    </div>
                </div>
                <div class="brochure-cv-item">
                    <div class="brochure-cv-year">2019 – jelenleg</div>
                    <div class="brochure-cv-content">
                        <div class="brochure-cv-title">Saját szalon vezetése</div>
                        <div class="brochure-cv-place">${name}</div>
                    </div>
                </div>
                <div class="brochure-cv-item">
                    <div class="brochure-cv-year">2022</div>
                    <div class="brochure-cv-content">
                        <div class="brochure-cv-title">Év Körmöse – döntős</div>
                        <div class="brochure-cv-place">Magyar Kozmetikai Szövetség</div>
                    </div>
                </div>
                <div class="brochure-cv-item">
                    <div class="brochure-cv-year">2024</div>
                    <div class="brochure-cv-content">
                        <div class="brochure-cv-title">Oktatói minősítés</div>
                        <div class="brochure-cv-place">International Nail Academy</div>
                    </div>
                </div>
            </div>
            <div class="brochure-section">
                <h3>A szalonom</h3>
                <p>A szalon egy csendes belvárosi utcában bújik meg, a bejáratnál lágy fahéjas illatgyertya fogad.</p>
            </div>
            <div class="brochure-salon-photo" style="background-image:url('${salonPhoto}')"></div>
            <div class="brochure-section">
                <h3>Filozófia</h3>
                <p>Nem gyors trendeket követek, hanem tartós, viselhető szépséget építek.</p>
            </div>
            <div class="brochure-section"><h3>Munkáim</h3></div>
            <div class="brochure-gallery-tabs">
                <button class="brochure-gallery-tab ${brochureGalleryTab === 'own' ? 'active' : ''}" data-gallery-tab="own">Saját munkáim</button>
                <button class="brochure-gallery-tab ${brochureGalleryTab === 'candoit' ? 'active' : ''}" data-gallery-tab="candoit">Mentett inspirációk</button>
            </div>
            <div class="brochure-gallery-description">${descriptionText}</div>
            <div class="brochure-gallery-carousel">
                <div class="brochure-gallery-viewport">${slidesHTML}</div>
                <div class="brochure-gallery-dots-only">${dotsHTML}</div>
            </div>
            <div class="brochure-actions">
                <button class="brochure-action-btn ${isLiked ? 'active' : ''}" id="brochureSaveBtn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                    </svg>
                    <span>Elmentem a szakembert későbbre</span>
                </button>
                <button class="brochure-action-btn" id="brochureShareBtnNew">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                    </svg>
                    <span>Szakember megosztása</span>
                </button>
            </div>
            <div class="brochure-farewell">Köszönöm, hogy megnézted a bemutatkozásom.<br>Kérdés esetén keress bátran.</div>
        </div>`;

    brochureScroll.querySelectorAll('[data-gallery-tab]').forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.galleryTab;
            if (tab === brochureGalleryTab) return;
            brochureGalleryTab = tab;
            brochureGalleryIdx = 0;
            renderBrochureContent(name, address, portrait, salonPhoto);
        });
    });

    const viewport = brochureScroll.querySelector('.brochure-gallery-viewport');
    if (viewport) {
        attachSwipeSimple(viewport, () => {
            const imgs = getBrochureImages(brochureGalleryTab);
            brochureGalleryIdx = (brochureGalleryIdx + 1) % imgs.length;
            updateBrochureGallerySlides();
        }, () => {
            const imgs = getBrochureImages(brochureGalleryTab);
            brochureGalleryIdx = (brochureGalleryIdx - 1 + imgs.length) % imgs.length;
            updateBrochureGallerySlides();
        });
        viewport.addEventListener('click', () => {
            const imgs = getBrochureImages(brochureGalleryTab);
            brochureGalleryIdx = (brochureGalleryIdx + 1) % imgs.length;
            updateBrochureGallerySlides();
        });
    }

    brochureScroll.querySelectorAll('.brochure-gallery-dot').forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.stopPropagation();
            brochureGalleryIdx = parseInt(dot.dataset.dotIdx);
            updateBrochureGallerySlides();
        });
    });

    const saveBtn = document.getElementById('brochureSaveBtn');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            if (!currentBrochureSalonId) return;
            const id = 'salon_' + currentBrochureSalonId;
            const nowLiked = toggleLikedByMe(id);
            saveBtn.classList.toggle('active', nowLiked);
            const c = bumpLike(id, nowLiked ? 1 : -1);
            showActionBadge(saveBtn, `❤ ${formatViewCount(c)}`);
        });
    }

    const shareBtn = document.getElementById('brochureShareBtnNew');
    if (shareBtn) {
        shareBtn.addEventListener('click', async () => {
            if (!currentBrochureSalonId) return;
            const id = 'salon_' + currentBrochureSalonId;
            const c = bumpShare(id);
            showActionBadge(shareBtn, `↗ ${formatViewCount(c)}`);
            setTimeout(async () => {
                if (navigator.share) { try { await navigator.share({ title: 'Nails1.hu', url: window.location.href }); } catch(e){} }
                else if (navigator.clipboard) {
                    try { await navigator.clipboard.writeText(window.location.href); showResult(`<h2>Megosztás</h2><p>Link vágólapra másolva! 📋</p>`); } catch {}
                }
            }, 600);
        });
    }
}

function updateBrochureGallerySlides() {
    const brochureScroll = $('brochureScroll');
    const slides = brochureScroll.querySelectorAll('.brochure-gallery-slide');
    const dots = brochureScroll.querySelectorAll('.brochure-gallery-dot');
    slides.forEach((s, i) => s.classList.toggle('active', i === brochureGalleryIdx));
    dots.forEach((d, i) => d.classList.toggle('active', i === brochureGalleryIdx));
}

function closeBrochure() {
    const brochureOverlay = $('brochureOverlay');
    if (!brochureOverlay.classList.contains('active')) return;
    brochureOverlay.classList.remove('active');
    unlockBodyScroll();
    currentBrochureSalonId = null;
    syncBottomNavWithOverlays();
}

function initBrochure() {
    const brochureOverlay = $('brochureOverlay');
    const brochureCloseBtn = $('brochureCloseBtn');
    if (brochureCloseBtn) brochureCloseBtn.addEventListener('click', closeBrochure);
    brochureOverlay.addEventListener('click', (e) => { if (e.target === brochureOverlay) closeBrochure(); });
}

function attachSwipeSimple(el, onLeft, onRight) {
    let startX = 0, startY = 0, tracking = false, dir = null;
    el.addEventListener('touchstart', (e) => {
        if (e.touches.length !== 1) return;
        startX = e.touches[0].clientX; startY = e.touches[0].clientY;
        tracking = true; dir = null;
    }, { passive: true });
    el.addEventListener('touchmove', (e) => {
        if (!tracking) return;
        const dx = e.touches[0].clientX - startX;
        const dy = e.touches[0].clientY - startY;
        if (dir === null) {
            if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
            dir = Math.abs(dx) > Math.abs(dy) ? 'h' : 'v';
        }
        if (dir === 'h' && e.cancelable) e.preventDefault();
    }, { passive: false });
    el.addEventListener('touchend', (e) => {
        if (!tracking) return;
        tracking = false;
        const dx = e.changedTouches[0].clientX - startX;
        if (dir !== 'h' || Math.abs(dx) < 40) return;
        if (dx < 0) onLeft && onLeft(); else onRight && onRight();
    }, { passive: true });
    el.addEventListener('touchcancel', () => { tracking = false; dir = null; }, { passive: true });
}
