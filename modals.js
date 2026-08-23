// ============================================
// MODALS
// ============================================
function buildModalStructure(modalEl, title, subtitle, innerHTML) {
    const closeBtnHTML = modalEl.querySelector('.modal-close')?.outerHTML || '<button class="modal-close">×</button>';
    const subtitleHTML = subtitle ? `<div class="modal-subtitle">${subtitle}</div>` : '';
    modalEl.querySelector('.modal-content').innerHTML = `
        ${closeBtnHTML}
        <div class="modal-header">
            <h2>${title}</h2>
            ${subtitleHTML}
        </div>
        <div class="modal-body">
            <div class="modal-fade-top"></div>
            <div class="modal-body-scroll">
                ${innerHTML}
                <div class="modal-body-spacer"></div>
            </div>
            <div class="modal-fade-bottom"></div>
        </div>
    `;
}

// RESULT MODAL
function showResult(html) {
    const resultModal = $('resultModal');
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const h2 = tempDiv.querySelector('h2');
    const title = h2 ? h2.textContent : 'Információ';
    if (h2) h2.remove();
    const bodyHTML = tempDiv.innerHTML.trim();
    buildModalStructure(resultModal, title, '', bodyHTML);
    const newClose = resultModal.querySelector('.modal-close');
    if (newClose) newClose.addEventListener('click', closeResultModal);
    resultModal.classList.add('active');
    lockBodyScroll();
    syncBottomNavWithOverlays();
}

function closeResultModal() {
    const resultModal = $('resultModal');
    if (!resultModal.classList.contains('active')) return;
    resultModal.classList.remove('active');
    unlockBodyScroll();
    syncBottomNavWithOverlays();
}

// PRICE INFO MODAL
function openPriceInfoModal(salonId) {
    const priceInfoModal = $('priceInfoModal');
    const stats = getSalonPriceStats(salonId);
    const regionAvg = getRegionAverage();
    const items = categoryLists[currentCategory] || [];
    const item = items.find(s => s.id === salonId);
    const salonName = item ? item.name : 'Szolgáltató';

    const servicesHTML = stats.services.map(s => `
        <div class="price-service-item">
            <div class="price-service-name">${s.name}</div>
            <div class="price-service-price">${formatPrice(s.price)}</div>
        </div>
    `).join('');

    const sortedPrices = stats.services.map(s => s.price).sort((a, b) => a - b);
    let medianExplain = '';
    const n = sortedPrices.length;
    if (n > 0) {
        const mid = Math.floor(n / 2);
        if (n % 2 === 0) {
            medianExplain = `Mivel ${n} szolgáltatás van (páros), a medián a két középső ár (${formatPrice(sortedPrices[mid - 1])} és ${formatPrice(sortedPrices[mid])}) átlaga.`;
        } else {
            medianExplain = `Mivel ${n} szolgáltatás van (páratlan), a medián a középső, sorba rendezett érték: ${formatPrice(sortedPrices[mid])}.`;
        }
    }

    const innerHTML = `
        <div class="price-info-region price-info-region-top">
            <div class="label">Régió átlaga</div>
            <div class="value">${formatPrice(regionAvg)}</div>
            <div class="sublabel">A körzetben található összes szalon átlagára</div>
        </div>
        <div class="price-info-salon-card">
            <div class="price-info-salon-name">${salonName}</div>
            <div class="price-info-stats">
                <div class="price-info-stat">
                    <div class="label">Átlagár</div>
                    <div class="value">${formatPrice(stats.avg)}</div>
                </div>
                <div class="price-info-stat">
                    <div class="label">Medián</div>
                    <div class="value">${formatPrice(stats.median)}</div>
                </div>
            </div>
            <div class="price-info-section-title">Szolgáltatások és árak</div>
            <div class="price-service-list">${servicesHTML}</div>
        </div>
        <div class="price-info-section-heading">Amit az árazásról tudni érdemes</div>
        <p class="price-info-desc">A megjelenített értékek a szolgáltató árlistája alapján készülnek. Minden szalon a saját szempontjai szerint bontja tételekre a szolgáltatásait, így az árlista hossza és összetétele változó lehet – a statisztika mindig a teljes, aktuális árlistára támaszkodik.</p>
        <div class="price-info-section-heading">Hogyan számoljuk?</div>
        <p class="price-info-desc"><strong>Átlagár:</strong> az árlistán szereplő tételek árait összeadjuk, majd elosztjuk a tételek számával.</p>
        <p class="price-info-desc"><strong>Medián:</strong> az árakat növekvő sorrendbe rendezzük, és a középső értéket vesszük. ${medianExplain}</p>
        <p class="price-info-desc"><strong>Régió átlaga:</strong> a környék összes szalonjának saját átlagárait vesszük, és ezek átlagát képezzük.</p>
        <div class="price-info-section-heading">Hogyan értelmezd?</div>
        <p class="price-info-desc">Ha az átlag és a medián közel áll egymáshoz, az árazás kiegyensúlyozott. Ha az átlag jóval magasabb, néhány drágább tétel húzza felfelé az összképet.</p>
        <div class="price-info-section-heading">Az árról – árnyaltabban</div>
        <p class="price-info-desc">Az alacsony ár önmagában nem feltétlenül jelenti azt, hogy a szolgáltató kevésbé tapasztalt, vagy a minőség gyengébb.</p>
        <p class="price-info-desc">Ugyanez fordítva is igaz: a magas ár önmagában nem garantálja a magasabb minőséget.</p>
        <div class="price-info-section-heading">A teljes kép</div>
        <p class="price-info-desc">Mindkét árkategóriában találni kimagasló és csalódást keltő példákat egyaránt. Ezért érdemes az árat mindig együtt nézni a vendégértékelésekkel, a portfólióval és a személyes benyomással.</p>
    `;

    buildModalStructure(priceInfoModal, 'Árak', '', innerHTML);
    const newClose = priceInfoModal.querySelector('.modal-close');
    if (newClose) newClose.addEventListener('click', closePriceInfoModal);
    priceInfoModal.querySelector('.modal-content').classList.add('price-info-modal-content');
    priceInfoModal.classList.add('active');
    lockBodyScroll();
    syncBottomNavWithOverlays();
}

function closePriceInfoModal() {
    const priceInfoModal = $('priceInfoModal');
    if (!priceInfoModal.classList.contains('active')) return;
    priceInfoModal.classList.remove('active');
    unlockBodyScroll();
    syncBottomNavWithOverlays();
}

// REVIEWS MODAL
let currentReviewsFilter = null;
let currentReviewsSalonId = null;

function openReviewsModal(salonId) {
    const reviewsModal = $('reviewsModal');
    currentReviewsSalonId = salonId;
    currentReviewsFilter = null;
    renderReviewsModal();
    reviewsModal.querySelector('.modal-content').classList.add('reviews-modal-content');
    reviewsModal.classList.add('active');
    lockBodyScroll();
    syncBottomNavWithOverlays();
}

function renderReviewsModal() {
    const reviewsModal = $('reviewsModal');
    if (!currentReviewsSalonId) return;
    const data = getSalonReviews(currentReviewsSalonId);
    const items = categoryLists[currentCategory] || [];
    const item = items.find(s => s.id === currentReviewsSalonId);
    const salonName = item ? item.name : 'Szolgáltató';

    var posClass = currentReviewsFilter === 'positive' ? 'active positive' : '';
    var negClass = currentReviewsFilter === 'negative' ? 'active negative' : '';

    var filtered = [];
    if (currentReviewsFilter === 'positive') {
        filtered = data.reviews.filter(r => r.type === 'positive');
    } else if (currentReviewsFilter === 'negative') {
        filtered = data.reviews.filter(r => r.type === 'negative');
    } else {
        var pos = data.reviews.filter(r => r.type === 'positive');
        var neg = data.reviews.filter(r => r.type === 'negative');
        var maxLen = Math.max(pos.length, neg.length);
        for (var i = 0; i < maxLen; i++) {
            if (pos[i]) filtered.push(pos[i]);
            if (neg[i]) filtered.push(neg[i]);
        }
    }

    var reviewsHTML = filtered.length > 0 ? filtered.map(r => {
        const badgeText = r.type === 'positive' ? 'Pozitív' : 'Negatív';
        return `<div class="review-item ${r.type}">
            <div class="review-item-header">
                <span class="review-item-author">${r.author}</span>
                <span class="review-item-badge">${badgeText}</span>
            </div>
            <div class="review-item-date">${r.date}</div>
            <div class="review-item-text">${r.text}</div>
        </div>`;
    }).join('') : '<p style="text-align:center; padding: 20px 0; color: var(--text-secondary);">Nincs megjeleníthető értékelés.</p>';

    const verdict = getSalonVerdict(data.percent);
    const avgStars = Math.round(data.percent / 20);
    let starsHTML = '';
    for (let si = 1; si <= 5; si++) {
        starsHTML += `<span class="summary-star ${si <= avgStars ? 'filled' : ''}">★</span>`;
    }

    const innerHTML = `
        <div class="reviews-summary">
            <div class="reviews-summary-salon-name">${salonName}</div>
            <div class="reviews-summary-stars">${starsHTML}</div>
            <div class="reviews-summary-percent">${data.percent}%</div>
            <div class="reviews-summary-label">Pozitív értékelés</div>
            <div class="reviews-summary-count">Összesen ${data.total} vélemény · ${data.positiveCount} pozitív · ${data.negativeCount} negatív</div>
            <div class="reviews-verdict ${verdict.cls}">${verdict.text}</div>
        </div>
        <button class="new-review-btn" id="newReviewBtn">Új értékelés létrehozása</button>
        <div class="reviews-filter">
            <button class="reviews-filter-btn ${posClass}" data-review-filter="positive"><span class="dot pos-dot"></span> Pozitív (${data.positiveCount})</button>
            <button class="reviews-filter-btn ${negClass}" data-review-filter="negative"><span class="dot neg-dot"></span> Negatív (${data.negativeCount})</button>
        </div>
        <div class="reviews-list">${reviewsHTML}</div>
    `;

    buildModalStructure(reviewsModal, 'Értékelések', '', innerHTML);
    const newClose = reviewsModal.querySelector('.modal-close');
    if (newClose) newClose.addEventListener('click', closeReviewsModal);

    reviewsModal.querySelectorAll('[data-review-filter]').forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.reviewFilter;
            currentReviewsFilter = currentReviewsFilter === filter ? null : filter;
            renderReviewsModal();
        });
    });

    const newReviewBtn = reviewsModal.querySelector('#newReviewBtn');
    if (newReviewBtn) newReviewBtn.addEventListener('click', openNewReviewModal);
}

function closeReviewsModal() {
    const reviewsModal = $('reviewsModal');
    if (!reviewsModal.classList.contains('active')) return;
    reviewsModal.classList.remove('active');
    currentReviewsSalonId = null;
    currentReviewsFilter = null;
    unlockBodyScroll();
    syncBottomNavWithOverlays();
}

// NEW REVIEW MODAL
let newReviewType = null;

function openNewReviewModal() {
    newReviewType = null;
    renderNewReviewModal();
    const modal = $('newReviewModal');
    modal.classList.add('active');
    lockBodyScroll();
    syncBottomNavWithOverlays();
}

function renderNewReviewModal() {
    const modal = $('newReviewModal');
    if (!modal) return;
    const posActive = newReviewType === 'positive' ? 'active positive' : '';
    const negActive = newReviewType === 'negative' ? 'active negative' : '';
    const newReviewStars = typeof window.newReviewStars !== 'undefined' ? window.newReviewStars : 0;
    const now = new Date();
    const dateStr = `${now.getFullYear()}.${String(now.getMonth()+1).padStart(2,'0')}.${String(now.getDate()).padStart(2,'0')}.`;

    let starsHTML = '';
    for (let s = 1; s <= 5; s++) {
        starsHTML += `<button class="new-review-star ${s <= newReviewStars ? 'filled' : ''}" data-star="${s}">★</button>`;
    }

    const innerHTML = `
        <div class="new-review-guide">Kérlek válaszd ki, hogy <strong>pozitív</strong> vagy <strong>negatív</strong> hangvételű értékelést fogsz adni.</div>
        <div class="new-review-type-row">
            <button class="reviews-filter-btn ${posActive}" id="newReviewPos"><span class="dot pos-dot"></span> Pozitív</button>
            <button class="reviews-filter-btn ${negActive}" id="newReviewNeg"><span class="dot neg-dot"></span> Negatív</button>
        </div>
        <div class="new-review-stars-label">Csillagos értékelés</div>
        <div class="new-review-stars-row" id="newReviewStarsRow">${starsHTML}</div>
        <div class="new-review-textarea-wrap">
            <textarea id="newReviewText" class="new-review-textarea" placeholder="Írd le tapasztalatod úgy, hogy másoknak is segítsen a döntésben!" maxlength="300"></textarea>
            <div class="new-review-char-count"><span id="newReviewCharCount">0</span>/300</div>
        </div>
        <div class="new-review-meta">
            <span>Értékelő: <strong>Anna K.</strong></span>
            <span>Dátum: ${dateStr}</span>
        </div>
        <button class="new-review-submit-btn" id="newReviewSubmit" disabled>Mentés</button>
    `;

    buildModalStructure(modal, 'Új értékelés', '', innerHTML);
    const newClose = modal.querySelector('.modal-close');
    if (newClose) newClose.addEventListener('click', closeNewReviewModal);

    const posBtn = modal.querySelector('#newReviewPos');
    const negBtn = modal.querySelector('#newReviewNeg');
    const textarea = modal.querySelector('#newReviewText');
    const charCount = modal.querySelector('#newReviewCharCount');
    const submitBtn = modal.querySelector('#newReviewSubmit');
    const starsRow = modal.querySelector('#newReviewStarsRow');

    function checkSubmitState() {
        const hasType = newReviewType !== null;
        const hasText = textarea && textarea.value.trim().length >= 5;
        if (submitBtn) submitBtn.disabled = !(hasType && hasText);
    }

    if (starsRow) {
        starsRow.querySelectorAll('.new-review-star').forEach(btn => {
            btn.addEventListener('click', () => {
                const val = parseInt(btn.dataset.star);
                window.newReviewStars = window.newReviewStars === val ? 0 : val;
                starsRow.querySelectorAll('.new-review-star').forEach(b => {
                    b.classList.toggle('filled', parseInt(b.dataset.star) <= window.newReviewStars);
                });
            });
        });
    }

    if (posBtn) posBtn.addEventListener('click', () => { newReviewType = newReviewType === 'positive' ? null : 'positive'; renderNewReviewModal(); });
    if (negBtn) negBtn.addEventListener('click', () => { newReviewType = newReviewType === 'negative' ? null : 'negative'; renderNewReviewModal(); });

    if (textarea && charCount) {
        textarea.addEventListener('input', () => {
            charCount.textContent = textarea.value.length;
            checkSubmitState();
        });
    }

    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            if (submitBtn.disabled) return;
            window.newReviewStars = 0;
            closeNewReviewModal();
            showResult('<h2>Köszönjük!</h2><p>Az értékelésed beérkezett, és hamarosan megjelenik. 💅</p>');
        });
    }
}

function closeNewReviewModal() {
    const modal = $('newReviewModal');
    if (!modal || !modal.classList.contains('active')) return;
    modal.classList.remove('active');
    newReviewType = null;
    unlockBodyScroll();
    syncBottomNavWithOverlays();
}

function initModals() {
    const resultModal = $('resultModal');
    const priceInfoModal = $('priceInfoModal');
    const reviewsModal = $('reviewsModal');
    const newReviewModal = $('newReviewModal');

    resultModal.addEventListener('click', (e) => { if (e.target === resultModal) closeResultModal(); });
    priceInfoModal.addEventListener('click', (e) => { if (e.target === priceInfoModal) closePriceInfoModal(); });
    reviewsModal.addEventListener('click', (e) => { if (e.target === reviewsModal) closeReviewsModal(); });
    newReviewModal.addEventListener('click', (e) => { if (e.target === newReviewModal) closeNewReviewModal(); });
}
