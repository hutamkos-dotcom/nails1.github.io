// ============================================
// LIST RENDER
// ============================================
const SALON_ICONS = {
    about: `<svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    calendar: `<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
    price: `<svg viewBox="0 0 24 24"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
    hours: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    phone: `<svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/></svg>`,
    address: `<svg viewBox="0 0 24 24"><path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>`,
    web: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`
};

const SALON_ICON_ORDER = ['about', 'calendar', 'price', 'hours', 'phone', 'address', 'web'];

const ICON_INTRO = {
    about:    'Engedd meg, hogy bemutatkozzam!',
    calendar: 'Nézd meg, hogy van-e szabad időpontom!',
    price:    'Nézd meg az áraimat!',
    hours:    'Nézd meg a nyitvatartásomat!',
    phone:    'Hívj bátran, hátha tudok segíteni!',
    address:  'Látogass meg, hátha tudok segíteni!',
    web:      'Látogasd meg az oldalaimat!'
};

const FADE_DURATION = 700;
const itemUiState = {};

function renderDetailList() {
    const detailList = $('detailList');
    const detailListWrapper = $('detailListWrapper');
    const items = categoryLists[currentCategory] || [];
    const relevantIcons = categoryRelevantIcons[currentCategory] || [];
    const openNow = isSalonOpenNow();

    detailList.innerHTML = items.map((item) => {
        const isOnline = item.online === true || item.km === 0 || item.km === undefined;
        const isBook = item.isBook === true;
        const views = formatViewCount(getViewCount(item.id));
        const reviewData = getSalonReviews(item.id);
        const reviewText = `${reviewData.total}/${reviewData.percent}%`;

        let leftHTML, rightHTML;
        if (isBook) {
            leftHTML = `<span class="detail-list-status open">Könyv</span>`;
            rightHTML = `<span class="detail-list-km">${item.bookYear || 2020}</span>`;
        } else if (isOnline) {
            leftHTML = `<span class="detail-list-status open">0–24</span>`;
            rightHTML = `<span class="detail-list-km">online</span>`;
        } else {
            const kmClass = getKmClass(item.km);
            leftHTML = `<span class="detail-list-status ${openNow ? 'open' : 'closed'}">${openNow ? 'Nyitva' : 'Zárva'}</span>`;
            rightHTML = `<span class="detail-list-km ${kmClass}">${item.km} km</span>`;
        }

        const iconsHTML = SALON_ICON_ORDER.map(type => {
            const isRelevant = relevantIcons.includes(type);
            const disabledClass = isRelevant ? '' : 'disabled';
            return `<button class="salon-icon-btn ${disabledClass}" data-salon-icon="${type}" data-item-id="${item.id}" data-relevant="${isRelevant}" aria-label="${type}">${SALON_ICONS[type]}</button>`;
        }).join('');

        const detailsInner = `
            <div class="salon-icon-row">${iconsHTML}</div>
            <div class="salon-content" data-salon-content="${item.id}"></div>
            <div class="detail-list-stats-row">
                <button class="detail-list-views" data-action="views" data-item-id="${item.id}">Látták: <strong>${views}</strong></button>
                <button class="detail-list-reviews" data-action="reviews" data-item-id="${item.id}">Értékelések: <strong>${reviewText}</strong></button>
            </div>
        `;

        return `
            <div class="detail-list-item" data-item-id="${item.id}">
                <div class="detail-list-main">
                    ${leftHTML}
                    <span class="detail-list-name">${item.name}</span>
                    ${rightHTML}
                </div>
                <div class="detail-list-details">${detailsInner}</div>
            </div>`;
    }).join('');

    detailList.querySelectorAll('.detail-list-item').forEach(el => {
        el.addEventListener('click', (e) => {
            if (e.target.closest('[data-action]') ||
                e.target.closest('[data-salon-icon]') ||
                e.target.closest('.salon-content') ||
                e.target.closest('.salon-hours-arrow') ||
                e.target.closest('.salon-cal-arrow') ||
                e.target.closest('.salon-web-arrow') ||
                e.target.closest('.salon-price-display') ||
                e.target.closest('a')) return;
            const expanded = el.classList.contains('expanded');
            detailList.querySelectorAll('.detail-list-item.expanded').forEach(o => {
                if (o !== el) o.classList.remove('expanded');
            });
            el.classList.toggle('expanded', !expanded);

            if (!expanded) {
                const sid = el.dataset.itemId;
                const firstRelevant = relevantIcons[0] || 'about';
                if (!itemUiState[sid]) itemUiState[sid] = { activeIcon: firstRelevant, hoursDayOffset: 0, calendarDayOffset: 0, webLinkIdx: 0, phase: 'intro' };
                else {
                    if (!itemUiState[sid].activeIcon || !relevantIcons.includes(itemUiState[sid].activeIcon)) {
                        itemUiState[sid].activeIcon = firstRelevant;
                    }
                    itemUiState[sid].phase = 'intro';
                }
                renderItemContent(sid);
            }
        });
    });

    detailList.querySelectorAll('[data-salon-icon]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (btn.classList.contains('disabled')) return;
            const sid = btn.dataset.itemId;
            const type = btn.dataset.salonIcon;
            if (!itemUiState[sid]) itemUiState[sid] = { activeIcon: type, hoursDayOffset: 0, calendarDayOffset: 0, webLinkIdx: 0, phase: 'intro' };
            itemUiState[sid].activeIcon = type;
            itemUiState[sid].phase = 'intro';
            if (type === 'web') itemUiState[sid].webLinkIdx = 0;
            renderItemContent(sid);
        });
    });

    detailList.querySelectorAll('[data-action="views"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const c = incrementViewCount(btn.dataset.itemId);
            const strong = btn.querySelector('strong');
            if (strong) strong.textContent = formatViewCount(c);
        });
    });

    detailList.querySelectorAll('[data-action="reviews"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            openReviewsModal(btn.dataset.itemId);
        });
    });
}

function renderItemContent(itemId) {
    const detailList = $('detailList');
    const items = categoryLists[currentCategory] || [];
    const item = items.find(s => s.id === itemId);
    if (!item) return;
    const contentEl = detailList.querySelector(`[data-salon-content="${itemId}"]`);
    if (!contentEl) return;

    const state = itemUiState[itemId] || { activeIcon: 'about', hoursDayOffset: 0, calendarDayOffset: 0, webLinkIdx: 0, phase: 'intro' };
    const type = state.activeIcon || 'about';
    const phase = state.phase || 'intro';

    const itemEl = detailList.querySelector(`.detail-list-item[data-item-id="${itemId}"]`);
    if (itemEl) {
        itemEl.querySelectorAll('.salon-icon-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.salonIcon === type && !b.classList.contains('disabled'));
        });
    }

    if (phase === 'intro') {
        const introText = ICON_INTRO[type] || '';
        contentEl.innerHTML = `
            <button class="salon-content-btn salon-intro-btn" data-intro-btn="${itemId}">
                <span class="btn-label">${introText}</span>
            </button>`;

        const introBtn = contentEl.querySelector('[data-intro-btn]');
        if (introBtn) {
            introBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const label = introBtn.querySelector('.btn-label');
                if (label) {
                    label.style.transition = `opacity ${FADE_DURATION}ms ease`;
                    label.style.opacity = '0';
                }
                setTimeout(() => {
                    state.phase = 'final';
                    itemUiState[itemId] = state;
                    renderItemContent(itemId);
                    const contentElAfter = detailList.querySelector(`[data-salon-content="${itemId}"]`);
                    if (contentElAfter) {
                        const textSelectors = '.btn-label, .day-name, .day-time, .price-label, .price-value';
                        const els = contentElAfter.querySelectorAll(textSelectors);
                        els.forEach(el => {
                            el.style.opacity = '0';
                            el.style.transition = `opacity ${FADE_DURATION}ms ease`;
                        });
                        requestAnimationFrame(() => {
                            requestAnimationFrame(() => {
                                els.forEach(el => { el.style.opacity = '1'; });
                            });
                        });
                    }
                }, FADE_DURATION);
            });
        }
        return;
    }

    let html = '';
    if (type === 'about') {
        html = `<button class="salon-content-btn" data-action="item-about" data-item-id="${itemId}"><span class="btn-label">Bemutatkozás megnyitása</span></button>`;
    } else if (type === 'calendar') {
        html = renderCalendarNavHTML(itemId, state.calendarDayOffset || 0);
    } else if (type === 'price') {
        html = renderPriceHTML(itemId);
    } else if (type === 'hours') {
        html = renderHoursNavHTML(itemId, state.hoursDayOffset || 0);
    } else if (type === 'phone') {
        const tel = (item.phone || '').replace(/\s+/g,'');
        html = tel
            ? `<a href="tel:${tel}" class="salon-content-btn" data-tel="${tel}"><span class="btn-label">${item.phone}</span></a>`
            : `<button class="salon-content-btn"><span class="btn-label">Telefonszám hamarosan</span></button>`;
    } else if (type === 'address') {
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.address || '')}`;
        html = item.address
            ? `<button class="salon-content-btn" data-action="item-address" data-url="${mapsUrl}"><span class="btn-label">${item.address}</span></button>`
            : `<button class="salon-content-btn"><span class="btn-label">Cím hamarosan</span></button>`;
    } else if (type === 'web') {
        html = renderWebNavHTML(itemId, item, state.webLinkIdx || 0);
    }

    contentEl.innerHTML = html;
    attachItemContentListeners(itemId, item);
}

function attachItemContentListeners(itemId, item) {
    const detailList = $('detailList');
    const contentEl = detailList.querySelector(`[data-salon-content="${itemId}"]`);
    if (!contentEl) return;
    const state = itemUiState[itemId];

    contentEl.querySelectorAll('[data-action]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const action = btn.dataset.action;
            if (action === 'item-about') {
                openBrochure({ name: item.name, address: item.address || '', id: item.id });
            } else if (action === 'item-address' || action === 'item-web') {
                const url = btn.dataset.url;
                if (url) window.open(url, '_blank', 'noopener');
            }
        });
    });

    const telAnchor = contentEl.querySelector('a[href^="tel:"]');
    if (telAnchor) telAnchor.addEventListener('click', (e) => e.stopPropagation());

    const prevH = contentEl.querySelector('.salon-hours-prev');
    const nextH = contentEl.querySelector('.salon-hours-next');
    if (prevH) prevH.addEventListener('click', (e) => {
        e.stopPropagation();
        state.hoursDayOffset = ((state.hoursDayOffset || 0) - 1 + 7) % 7;
        itemUiState[itemId] = state;
        updateHoursOnly(itemId);
    });
    if (nextH) nextH.addEventListener('click', (e) => {
        e.stopPropagation();
        state.hoursDayOffset = ((state.hoursDayOffset || 0) + 1) % 7;
        itemUiState[itemId] = state;
        updateHoursOnly(itemId);
    });

    // Hours modal megnyitása a középső szövegre kattintva
    const hoursCenter = contentEl.querySelector('.salon-hours-text');
    if (hoursCenter && state.activeIcon === 'hours') {
        hoursCenter.style.cursor = 'pointer';
        hoursCenter.addEventListener('click', (e) => {
            e.stopPropagation();
            openHoursModal(itemId);
        });
    }

    // Naptár modal megnyitása a középső szövegre kattintva
    const calCenter = contentEl.querySelector('.salon-hours-text');
    if (calCenter && state.activeIcon === 'calendar') {
        calCenter.style.cursor = 'pointer';
        calCenter.addEventListener('click', (e) => {
            e.stopPropagation();
            openCalendarModal(itemId);
        });
    }

    const prevC = contentEl.querySelector('.salon-cal-prev');
    const nextC = contentEl.querySelector('.salon-cal-next');
    if (prevC) prevC.addEventListener('click', (e) => {
        e.stopPropagation();
        state.calendarDayOffset = Math.max(0, (state.calendarDayOffset || 0) - 1);
        itemUiState[itemId] = state;
        updateCalendarOnly(itemId);
    });
    if (nextC) nextC.addEventListener('click', (e) => {
        e.stopPropagation();
        state.calendarDayOffset = Math.min(60, (state.calendarDayOffset || 0) + 1);
        itemUiState[itemId] = state;
        updateCalendarOnly(itemId);
    });

    const prevW = contentEl.querySelector('.salon-web-prev');
    const nextW = contentEl.querySelector('.salon-web-next');
    if (prevW) prevW.addEventListener('click', (e) => {
        e.stopPropagation();
        const links = getWebLinks(item);
        if (links.length === 0) return;
        state.webLinkIdx = ((state.webLinkIdx || 0) - 1 + links.length) % links.length;
        itemUiState[itemId] = state;
        renderItemContent(itemId);
    });
    if (nextW) nextW.addEventListener('click', (e) => {
        e.stopPropagation();
        const links = getWebLinks(item);
        if (links.length === 0) return;
        state.webLinkIdx = ((state.webLinkIdx || 0) + 1) % links.length;
        itemUiState[itemId] = state;
        renderItemContent(itemId);
    });

    const webCenter = contentEl.querySelector('.salon-web-center');
    if (webCenter) {
        webCenter.addEventListener('click', (e) => {
            e.stopPropagation();
            const url = webCenter.dataset.url;
            if (url) window.open(url, '_blank', 'noopener');
        });
    }

    const priceDisplay = contentEl.querySelector('.salon-price-display');
    if (priceDisplay) {
        priceDisplay.addEventListener('click', (e) => {
            e.stopPropagation();
            openPriceInfoModal(itemId);
        });
    }
}

function updateHoursOnly(itemId) {
    const detailList = $('detailList');
    const state = itemUiState[itemId];
    if (!state) return;
    const contentEl = detailList.querySelector(`[data-salon-content="${itemId}"]`);
    if (!contentEl) return;
    const today = new Date();
    const todayDow = today.getDay();
    const targetDow = (todayDow + (state.hoursDayOffset || 0)) % 7;
    const dayName = HU_DAYS[targetDow];
    const time = formatHoursForDay(targetDow);
    const dayNameEl = contentEl.querySelector('.day-name');
    const dayTimeEl = contentEl.querySelector('.day-time');
    if (dayNameEl) dayNameEl.textContent = dayName;
    if (dayTimeEl) dayTimeEl.textContent = time;
}

function updateCalendarOnly(itemId) {
    const detailList = $('detailList');
    const state = itemUiState[itemId];
    if (!state) return;
    const contentEl = detailList.querySelector(`[data-salon-content="${itemId}"]`);
    if (!contentEl) return;
    const info = getCalendarInfoForDay(itemId, state.calendarDayOffset || 0);
    const dateEl = contentEl.querySelector('.cal-date');
    const bookedEl = contentEl.querySelector('.cal-booked');
    if (dateEl) dateEl.textContent = info.dateStr;
    if (bookedEl) {
        if (info.closed) {
            bookedEl.textContent = 'Zárva';
            bookedEl.className = 'cal-booked day-time closed-cal';
        } else {
            const free = info.maxSlots - info.booked;
            bookedEl.textContent = `${info.maxSlots} időpont / ${info.booked} foglalt`;
            bookedEl.className = free > 0 ? 'cal-booked day-time available' : 'cal-booked day-time full';
        }
    }
}

function renderHoursNavHTML(itemId, offset) {
    const today = new Date();
    const todayDow = today.getDay();
    const targetDow = (todayDow + offset) % 7;
    const dayName = HU_DAYS[targetDow];
    const time = formatHoursForDay(targetDow);
    return `
        <div class="salon-hours-nav">
            <button class="salon-hours-arrow salon-hours-prev" aria-label="Előző nap">‹</button>
            <div class="salon-hours-text" style="cursor:pointer">
                <span class="day-name">${dayName}</span>
                <span class="day-time">${time}</span>
            </div>
            <button class="salon-hours-arrow salon-hours-next" aria-label="Következő nap">›</button>
        </div>`;
}

function renderCalendarNavHTML(itemId, offset) {
    const info = getCalendarInfoForDay(itemId, offset);
    let bookedText, bookedClass;
    if (info.closed) {
        bookedText = 'Zárva';
        bookedClass = 'closed-cal';
    } else {
        const free = info.maxSlots - info.booked;
        bookedText = `${info.maxSlots} időpont / ${info.booked} foglalt`;
        bookedClass = free > 0 ? 'available' : 'full';
    }
    return `
        <div class="salon-hours-nav">
            <button class="salon-hours-arrow salon-cal-prev" aria-label="Előző nap">‹</button>
            <div class="salon-hours-text" style="cursor:pointer">
                <span class="cal-date day-name">${info.dateStr}</span>
                <span class="cal-booked day-time ${bookedClass}">${bookedText}</span>
            </div>
            <button class="salon-hours-arrow salon-cal-next" aria-label="Következő nap">›</button>
        </div>`;
}

function renderPriceHTML(itemId) {
    const stats = getSalonPriceStats(itemId);
    return `
        <div class="salon-price-display" role="button" tabindex="0">
            <span class="price-label">Átl.:</span>
            <span class="price-value">${formatPrice(stats.avg)}</span>
            <span class="price-label">Med.:</span>
            <span class="price-value">${formatPrice(stats.median)}</span>
        </div>`;
}

function getWebLinks(item) {
    const links = [];
    if (item.web) links.push({ label: 'Weboldal', url: item.web });
    if (item.facebook) links.push({ label: 'Facebook', url: item.facebook });
    if (item.instagram) links.push({ label: 'Instagram', url: item.instagram });
    if (item.tiktok) links.push({ label: 'TikTok', url: item.tiktok });
    return links;
}

function renderWebNavHTML(itemId, item, idx) {
    const links = getWebLinks(item);
    if (links.length === 0) {
        return `<button class="salon-content-btn"><span class="btn-label">Weboldal hamarosan</span></button>`;
    }
    const safeIdx = ((idx % links.length) + links.length) % links.length;
    const current = links[safeIdx];
    if (links.length === 1) {
        return `<button class="salon-content-btn salon-web-center" data-url="${current.url}"><span class="btn-label">${current.label}</span></button>`;
    }
    return `
        <div class="salon-hours-nav">
            <button class="salon-hours-arrow salon-web-prev" aria-label="Előző platform">‹</button>
            <div class="salon-hours-text salon-web-center" data-url="${current.url}" style="cursor:pointer">
                <span class="day-name">${current.label}</span>
            </div>
            <button class="salon-hours-arrow salon-web-next" aria-label="Következő platform">›</button>
        </div>`;
}
