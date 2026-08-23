// ============================================
// SWIPE (shared)
// ============================================
function attachSwipe(el, onLeft, onRight, opts = {}) {
    const excludeSelector = opts.excludeSelector || null;
    const enabledFn = opts.enabledFn || (() => true);
    let startX = 0, startY = 0, startT = 0, tracking = false, direction = null;

    el.addEventListener('touchstart', (e) => {
        if (!enabledFn() || el.classList.contains('collapsed') || e.touches.length !== 1) return;
        if (excludeSelector && e.target.closest(excludeSelector)) return;
        if (e.target.closest('.detail-edge-zone')) return;
        const t = e.touches[0];
        startX = t.clientX; startY = t.clientY; startT = Date.now();
        tracking = true; direction = null;
    }, { passive: true });

    el.addEventListener('touchmove', (e) => {
        if (!tracking) return;
        const t = e.touches[0];
        const dx = t.clientX - startX, dy = t.clientY - startY;
        if (direction === null) {
            if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
            direction = Math.abs(dx) > Math.abs(dy) ? 'h' : 'v';
        }
        if (direction === 'h' && e.cancelable) e.preventDefault();
    }, { passive: false });

    el.addEventListener('touchend', (e) => {
        if (!tracking) return;
        tracking = false;
        const t = e.changedTouches[0];
        const dx = t.clientX - startX;
        const dt = Date.now() - startT;
        if (direction !== 'h' || dt > 700 || Math.abs(dx) < 50) return;
        if (dx < 0) onLeft && onLeft(); else onRight && onRight();
    }, { passive: true });

    el.addEventListener('touchcancel', () => { tracking = false; direction = null; }, { passive: true });
}

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    applyTheme('dark');
    initHero();
    initQuotes();
    initMasonry();
    initDetailView();
    initModals();
    initBrochure();
    initSearch();
    initNav();
    initLogin();
    initCalendarModal();
    initHoursModal();

    console.log('✨ Nails1.hu betöltve – frissített verzió');
});
