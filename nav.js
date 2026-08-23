// ============================================
// NAV
// ============================================
function isAnyOverlayOpen() {
    return $('brochureOverlay').classList.contains('active') ||
           $('aboutOverlay').classList.contains('active') ||
           $('contactOverlay').classList.contains('active') ||
           $('menuModal').classList.contains('active') ||
           $('resultModal').classList.contains('active') ||
           $('priceInfoModal').classList.contains('active') ||
           $('reviewsModal').classList.contains('active') ||
           $('calendarModal').classList.contains('active');
           $('hoursModal').classList.contains('active');
}

function syncBottomNavWithOverlays() {
    $('bottomNav').classList.toggle('hidden-by-overlay', isAnyOverlayOpen());
}

function updateBottomNavVisibility() {
    const detailView = $('detailView');
    const bottomNav = $('bottomNav');
    const isDetail = detailView.style.display === 'block';
    const threshold = isDetail ? 550 : 250;
    bottomNav.classList.toggle('visible', window.scrollY > threshold);
    syncBottomNavWithOverlays();
}

function initNav() {
    const menuBtn = $('menuBtn');
    const menuModal = $('menuModal');
    const modalClose = $('modalClose');
    const aboutOverlay = $('aboutOverlay');
    const aboutClose = $('aboutClose');
    const contactOverlay = $('contactOverlay');
    const contactClose = $('contactClose');
    const bottomNavBtns = document.querySelectorAll('.bottom-nav-btn');

    // Scroll
    let scrollTicking = false;
    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            window.requestAnimationFrame(() => { updateBottomNavVisibility(); scrollTicking = false; });
            scrollTicking = true;
        }
    }, { passive: true });

    updateBottomNavVisibility();

    // Bottom nav buttons
    bottomNavBtns.forEach(btn => {
        const handler = (e) => {
            e.preventDefault(); e.stopPropagation();
            const nav = btn.dataset.nav;
            const detailView = $('detailView');
            const mainView = $('mainView');
            if (nav === 'home' || nav === 'search') {
                if (detailView.style.display === 'block') {
                    detailView.style.display = 'none';
                    mainView.style.display = 'block';
                    navigationHistory = [];
                }
                window.scrollTo({ top: 0, behavior: 'smooth' });
                if (nav === 'search') setTimeout(() => $('searchInput').focus(), 500);
            } else if (nav === 'profile') {
                if (detailView.style.display === 'block') {
                    detailView.style.display = 'none';
                    mainView.style.display = 'block';
                    navigationHistory = [];
                    setTimeout(() => document.querySelector('.login-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
                } else {
                    document.querySelector('.login-section')?.scrollIntoView({ behavior: 'smooth' });
                }
            }
        };
        btn.addEventListener('click', handler);
        btn.addEventListener('touchend', (e) => { if (e.cancelable) e.preventDefault(); handler(e); }, { passive: false });
    });

    // Menu modal
    menuBtn.addEventListener('click', () => {
        menuModal.classList.add('active');
        lockBodyScroll();
        syncBottomNavWithOverlays();
    });

    modalClose.addEventListener('click', () => {
        menuModal.classList.remove('active');
        unlockBodyScroll();
        syncBottomNavWithOverlays();
    });

    menuModal.addEventListener('click', (e) => {
        if (e.target === menuModal) {
            menuModal.classList.remove('active');
            unlockBodyScroll();
            syncBottomNavWithOverlays();
        }
    });

    document.querySelectorAll('.menu-nav ul li a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.dataset.page;
            if (page === 'theme') { cycleTheme(); return; }
            menuModal.classList.remove('active');
            unlockBodyScroll();
            setTimeout(() => {
                const detailView = $('detailView');
                const mainView = $('mainView');
                if (page === 'about') {
                    aboutOverlay.classList.add('active');
                    lockBodyScroll();
                    syncBottomNavWithOverlays();
                } else if (page === 'contact') {
                    contactOverlay.classList.add('active');
                    lockBodyScroll();
                    syncBottomNavWithOverlays();
                } else if (page === 'home') {
                    if (detailView.style.display === 'block') {
                        detailView.style.display = 'none';
                        mainView.style.display = 'block';
                        navigationHistory = [];
                    }
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    syncBottomNavWithOverlays();
                } else {
                    showResult(`<h2>${link.textContent}</h2><p>Ez a(z) ${link.textContent} oldal tartalma.</p>`);
                }
            }, 200);
        });
    });

    // About / Contact overlays
    aboutClose.addEventListener('click', () => {
        aboutOverlay.classList.remove('active');
        unlockBodyScroll();
        syncBottomNavWithOverlays();
    });
    aboutOverlay.addEventListener('click', (e) => {
        if (e.target === aboutOverlay) {
            aboutOverlay.classList.remove('active');
            unlockBodyScroll();
            syncBottomNavWithOverlays();
        }
    });

    contactClose.addEventListener('click', () => {
        contactOverlay.classList.remove('active');
        unlockBodyScroll();
        syncBottomNavWithOverlays();
    });
    contactOverlay.addEventListener('click', (e) => {
        if (e.target === contactOverlay) {
            contactOverlay.classList.remove('active');
            unlockBodyScroll();
            syncBottomNavWithOverlays();
        }
    });

    // Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if ($('menuModal').classList.contains('active')) { $('menuModal').classList.remove('active'); unlockBodyScroll(); }
            if ($('resultModal').classList.contains('active')) closeResultModal();
            if ($('priceInfoModal').classList.contains('active')) closePriceInfoModal();
            if ($('reviewsModal').classList.contains('active')) closeReviewsModal();
            if ($('calendarModal').classList.contains('active')) closeCalendarModal();
            if ($('aboutOverlay').classList.contains('active')) { $('aboutOverlay').classList.remove('active'); unlockBodyScroll(); }
            if ($('contactOverlay').classList.contains('active')) { $('contactOverlay').classList.remove('active'); unlockBodyScroll(); }
            if ($('brochureOverlay').classList.contains('active')) closeBrochure();
            if ($('hoursModal').classList.contains('active')) closeHoursModal();
            const suggestionsList = $('suggestions');
            suggestionsList.classList.remove('active');
            suggestionsList.classList.remove('trending');
            document.body.classList.remove('search-focused');
            $('searchInput').blur();
            hideImageOverlay();
            syncBottomNavWithOverlays();
        }
    });
}
