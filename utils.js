// ============================================
// UTILS
// ============================================
const $ = (id) => document.getElementById(id);

// SCROLL LOCK
let savedScrollY = 0;
let modalOpenCount = 0;

function lockBodyScroll() {
    if (modalOpenCount === 0) {
        savedScrollY = window.scrollY;
        document.body.style.top = `-${savedScrollY}px`;
        document.body.classList.add('modal-open');
    }
    modalOpenCount++;
}

function unlockBodyScroll() {
    modalOpenCount = Math.max(0, modalOpenCount - 1);
    if (modalOpenCount === 0) {
        document.body.classList.remove('modal-open');
        document.body.style.top = '';
        window.scrollTo(0, savedScrollY);
    }
}

function forceUnlockBodyScroll() {
    modalOpenCount = 0;
    document.body.classList.remove('modal-open');
    document.body.style.top = '';
}

// STORAGE HELPERS
const LIKES_KEY = 'nails1_likes';
const SHARES_KEY = 'nails1_shares';
const LIKED_KEY = 'nails1_liked_ids';
const VIEWS_KEY = 'nails1_views';

function loadStore(key) {
    try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : {}; }
    catch(e) { return {}; }
}
function saveStore(key, obj) { try { localStorage.setItem(key, JSON.stringify(obj)); } catch(e) {} }

function loadLikedSet() {
    try { const raw = localStorage.getItem(LIKED_KEY); return new Set(raw ? JSON.parse(raw) : []); }
    catch(e) { return new Set(); }
}
function saveLikedSet(set) { try { localStorage.setItem(LIKED_KEY, JSON.stringify([...set])); } catch(e) {} }

function getLikeCount(id) {
    const s = loadStore(LIKES_KEY);
    if (s[id] === undefined) { s[id] = 20 + Math.floor(Math.random() * 480); saveStore(LIKES_KEY, s); }
    return s[id];
}
function getShareCount(id) {
    const s = loadStore(SHARES_KEY);
    if (s[id] === undefined) { s[id] = 5 + Math.floor(Math.random() * 120); saveStore(SHARES_KEY, s); }
    return s[id];
}
function bumpLike(id, delta = 1) {
    getLikeCount(id);
    const s = loadStore(LIKES_KEY);
    s[id] = Math.max(0, (s[id] || 0) + delta);
    saveStore(LIKES_KEY, s);
    return s[id];
}
function bumpShare(id) {
    getShareCount(id);
    const s = loadStore(SHARES_KEY);
    s[id] = (s[id] || 0) + 1;
    saveStore(SHARES_KEY, s);
    return s[id];
}
function isLikedByMe(id) { return loadLikedSet().has(String(id)); }
function toggleLikedByMe(id) {
    const set = loadLikedSet(); const key = String(id);
    if (set.has(key)) { set.delete(key); saveLikedSet(set); return false; }
    set.add(key); saveLikedSet(set); return true;
}

function showActionBadge(btn, text) {
    if (!btn) return;
    let badge = btn.querySelector('.action-badge');
    if (!badge) { badge = document.createElement('span'); badge.className = 'action-badge'; btn.appendChild(badge); }
    badge.textContent = text;
    badge.classList.remove('visible');
    void badge.offsetWidth;
    badge.classList.add('visible');
    clearTimeout(badge._hideTimer);
    badge._hideTimer = setTimeout(() => badge.classList.remove('visible'), 1400);
}

function getViewCount(id) {
    const v = loadStore(VIEWS_KEY);
    if (v[id] === undefined) { v[id] = 50 + Math.floor(Math.random() * 950); saveStore(VIEWS_KEY, v); }
    return v[id];
}
function incrementViewCount(id) {
    const v = loadStore(VIEWS_KEY);
    v[id] = (v[id] || 0) + 1;
    saveStore(VIEWS_KEY, v);
    return v[id];
}
function formatViewCount(n) { return n.toLocaleString('hu-HU').replace(/\s/g, '.'); }
function formatPrice(n) {
    return n.toLocaleString('hu-HU').replace(/\s/g, ' ') + ' Ft';
}

function hashString(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
        h = ((h << 5) - h) + str.charCodeAt(i);
        h |= 0;
    }
    return Math.abs(h);
}

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
