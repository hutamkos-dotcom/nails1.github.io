// ============================================
// CALENDAR MODAL
// ============================================

const HU_MONTHS = [
    'Január','Február','Március','Április','Május','Június',
    'Július','Augusztus','Szeptember','Október','November','December'
];

const HU_DAYS_SHORT = ['H','K','Sz','Cs','P','Szo','V'];
const HU_DAYS_FULL  = ['Hétfő','Kedd','Szerda','Csütörtök','Péntek','Szombat','Vasárnap'];

let calModal = {
    salonId: null,
    salonName: '',
    view: 'month',
    monthOffset: 0,
    weekOffset: 0,
    selectedDate: null,
};

// ============================================
// SEGÉDFÜGGVÉNYEK
// ============================================

function getWeekStart(weekOffset) {
    const today = new Date();
    today.setHours(0,0,0,0);
    const dow = today.getDay();
    const diffToMonday = (dow === 0) ? -6 : 1 - dow;
    const monday = new Date(today);
    monday.setDate(today.getDate() + diffToMonday + weekOffset * 7);
    return monday;
}

function getWeekDays(weekOffset) {
    const monday = getWeekStart(weekOffset);
    return Array.from({length: 7}, (_, i) => {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        return d;
    });
}

function toDateStr(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth()+1).padStart(2,'0');
    const d = String(date.getDate()).padStart(2,'0');
    return `${y}.${m}.${d}.`;
}

function isSameDay(a, b) {
    return a.getFullYear() === b.getFullYear() &&
           a.getMonth()    === b.getMonth()    &&
           a.getDate()     === b.getDate();
}

function getDaySlots(salonId, date) {
    const dow = date.getDay();
    const hours = defaultHoursData[dow];
    if (!hours) return null;

    const [open, close] = hours;
    const dateStr = toDateStr(date);
    const slots = [];

    for (let h = open; h < close; h++) {
        const slotSeed = hashString(salonId + '_slot_' + dateStr + '_' + h);
        const isBooked = (slotSeed % 3) === 0;
        const timeLabel = `${String(h).padStart(2,'0')}:00 – ${String(h+1).padStart(2,'0')}:00`;
        slots.push({ hour: h, label: timeLabel, booked: isBooked });
    }
    return slots;
}

function getMonthDayStatus(salonId, date) {
    const dow = date.getDay();
    const hours = defaultHoursData[dow];
    if (!hours) return 'closed';
    const dateStr = toDateStr(date);
    const seed = hashString(salonId + '_' + dateStr);
    const maxSlots = 4 + (seed % 2);
    const booked = seed % (maxSlots + 1);
    return booked >= maxSlots ? 'full' : 'available';
}

// ============================================
// RENDER
// ============================================

function renderCalendarModal() {
    const modal = document.getElementById('calendarModal');
    const content = modal.querySelector('.modal-content');

    // Felépítjük a teljes modal- tartalmát
    content.innerHTML = `
        <button class="modal-close" id="calendarModalClose">×</button>
        <div class="cal-modal-inner">
            <div class="cal-salon-name">${calModal.salonName}</div>
            <div class="cal-view-switcher">
                <button class="cal-view-btn ${calModal.view === 'month' ? 'active' : ''}" data-cal-view="month">Havi</button>
                <button class="cal-view-btn ${calModal.view === 'week'  ? 'active' : ''}" data-cal-view="week">Heti</button>
                <button class="cal-view-btn ${calModal.view === 'day'   ? 'active' : ''}" data-cal-view="day">Napi</button>
            </div>
            <div class="cal-nav">
                <button class="cal-nav-arrow" id="calNavPrev">‹</button>
                <div class="cal-nav-title" id="calNavTitle"></div>
                <button class="cal-nav-arrow" id="calNavNext">›</button>
            </div>
            <div class="cal-scroll-body" id="calScrollBody"></div>
        </div>`;

    // Bezáró gomb
    document.getElementById('calendarModalClose').addEventListener('click', closeCalendarModal);

    // Nézet váltók
    content.querySelectorAll('[data-cal-view]').forEach(btn => {
        btn.addEventListener('click', () => {
            calModal.view = btn.dataset.calView;
            renderCalendarModal();
        });
    });

    // Nav nyilak
    document.getElementById('calNavPrev').addEventListener('click', () => {
        if (calModal.view === 'month') calModal.monthOffset--;
        else if (calModal.view === 'week') calModal.weekOffset--;
        else if (calModal.view === 'day') {
            const d = new Date(calModal.selectedDate);
            d.setDate(d.getDate() - 1);
            calModal.selectedDate = d;
        }
        updateCalendarBody();
    });

    document.getElementById('calNavNext').addEventListener('click', () => {
        if (calModal.view === 'month') calModal.monthOffset++;
        else if (calModal.view === 'week') calModal.weekOffset++;
        else if (calModal.view === 'day') {
            const d = new Date(calModal.selectedDate);
            d.setDate(d.getDate() + 1);
            calModal.selectedDate = d;
        }
        updateCalendarBody();
    });

    updateCalendarBody();
}

function updateCalendarBody() {
    const titleEl = document.getElementById('calNavTitle');
    const bodyEl  = document.getElementById('calScrollBody');
    if (!titleEl || !bodyEl) return;

    if (calModal.view === 'month') {
        const today = new Date();
        const base = new Date(today.getFullYear(), today.getMonth() + calModal.monthOffset, 1);
        titleEl.textContent = `${HU_MONTHS[base.getMonth()]} ${base.getFullYear()}`;
        bodyEl.innerHTML = buildMonthHTML(base);
        attachMonthEvents(bodyEl);

    } else if (calModal.view === 'week') {
        const days = getWeekDays(calModal.weekOffset);
        const mon = days[0], sun = days[6];
        const sameMonth = mon.getMonth() === sun.getMonth();
        titleEl.textContent = sameMonth
            ? `${HU_MONTHS[mon.getMonth()]} ${mon.getDate()}–${sun.getDate()}, ${mon.getFullYear()}`
            : `${mon.getDate()}. ${HU_MONTHS[mon.getMonth()]} – ${sun.getDate()}. ${HU_MONTHS[sun.getMonth()]}, ${mon.getFullYear()}`;
        bodyEl.innerHTML = buildWeekHTML(days);
        attachWeekEvents(bodyEl);

    } else {
        if (!calModal.selectedDate) {
            const t = new Date(); t.setHours(0,0,0,0);
            calModal.selectedDate = t;
        }
        titleEl.textContent = toDateStr(calModal.selectedDate);
        bodyEl.innerHTML = buildDayHTML(calModal.selectedDate);
    }
}

// ---- HAVI ----
function buildMonthHTML(base) {
    const today = new Date(); today.setHours(0,0,0,0);
    const year = base.getFullYear();
    const month = base.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay  = new Date(year, month + 1, 0);

    let startDow = firstDay.getDay();
    startDow = startDow === 0 ? 6 : startDow - 1;

    const totalCells = Math.ceil((startDow + lastDay.getDate()) / 7) * 7;

    const weekdaysHTML = HU_DAYS_SHORT.map((d, i) => {
        const cls = i === 5 ? 'sat' : i === 6 ? 'sun' : '';
        return `<div class="cal-month-weekday ${cls}">${d}</div>`;
    }).join('');

    let daysHTML = '';
    for (let i = 0; i < totalCells; i++) {
        const dayNum = i - startDow + 1;
        if (dayNum < 1 || dayNum > lastDay.getDate()) {
            daysHTML += `<div class="cal-month-day empty"></div>`;
            continue;
        }
        const date = new Date(year, month, dayNum);
        const isToday = isSameDay(date, today);
        const dow = date.getDay();
        const status = getMonthDayStatus(calModal.salonId, date);
        const cls = [
            isToday ? 'today' : '',
            dow === 6 ? 'sat' : '',
            dow === 0 ? 'sun' : '',
            `status-${status}`
        ].filter(Boolean).join(' ');

        daysHTML += `<div class="cal-month-day ${cls}" data-cal-ts="${date.getTime()}">${dayNum}</div>`;
    }

    return `
        <div class="cal-month-weekdays">${weekdaysHTML}</div>
        <div class="cal-month-days">${daysHTML}</div>`;
}

function attachMonthEvents(bodyEl) {
    bodyEl.querySelectorAll('.cal-month-day[data-cal-ts]').forEach(el => {
        el.addEventListener('click', () => {
            calModal.selectedDate = new Date(parseInt(el.dataset.calTs));
            calModal.view = 'day';
            renderCalendarModal();
        });
    });
}

// ---- HETI ----
function buildWeekHTML(days) {
    const today = new Date(); today.setHours(0,0,0,0);

    // Közös időablak
    let minHour = 23, maxHour = 0;
    days.forEach(d => {
        const h = defaultHoursData[d.getDay()];
        if (h) { minHour = Math.min(minHour, h[0]); maxHour = Math.max(maxHour, h[1]); }
    });
    if (minHour > maxHour) { minHour = 9; maxHour = 19; }

    // Fejléc
    const headerHTML = `
        <div class="cal-week-header-spacer"></div>
        ${days.map((d, i) => {
            const isToday = isSameDay(d, today);
            const dow = d.getDay();
            const cls = [
                isToday ? 'today' : '',
                dow === 6 ? 'sat' : '',
                dow === 0 ? 'sun' : ''
            ].filter(Boolean).join(' ');
            return `<div class="cal-week-day-header ${cls}" data-cal-ts="${d.getTime()}">
                <span class="cal-week-day-name">${HU_DAYS_SHORT[i]}</span>
                <span class="cal-week-day-num">${d.getDate()}</span>
            </div>`;
        }).join('')}`;

    // Időoszlop
    let timeColHTML = '';
    for (let h = minHour; h < maxHour; h++) {
        const lbl = `${String(h).padStart(2,'0')}:00–${String(h+1).padStart(2,'0')}:00`;
        timeColHTML += `<div class="cal-week-time-label">${lbl}</div>`;
    }

    // Nap oszlopok
    const dayColsHTML = days.map(d => {
        const dow = d.getDay();
        const hours = defaultHoursData[dow];
        const dateStr = toDateStr(d);
        let colHTML = '';
        for (let h = minHour; h < maxHour; h++) {
            if (!hours || h < hours[0] || h >= hours[1]) {
                colHTML += `<div class="cal-week-slot closed"></div>`;
            } else {
                const slotSeed = hashString(calModal.salonId + '_slot_' + dateStr + '_' + h);
                const isBooked = (slotSeed % 3) === 0;
                colHTML += `<div class="cal-week-slot ${isBooked ? 'booked' : 'free'}"></div>`;
            }
        }
        return `<div class="cal-week-day-col">${colHTML}</div>`;
    }).join('');

    return `
        <div class="cal-week-container">
            <div class="cal-week-header">${headerHTML}</div>
            <div class="cal-week-grid">
                <div class="cal-week-time-col">${timeColHTML}</div>
                ${dayColsHTML}
            </div>
        </div>`;
}

function attachWeekEvents(bodyEl) {
    bodyEl.querySelectorAll('.cal-week-day-header[data-cal-ts]').forEach(el => {
        el.addEventListener('click', () => {
            calModal.selectedDate = new Date(parseInt(el.dataset.calTs));
            calModal.view = 'day';
            renderCalendarModal();
        });
    });
}

// ---- NAPI ----
function buildDayHTML(date) {
    const dow = date.getDay();
    const dayIdx = dow === 0 ? 6 : dow - 1;
    const dayName = HU_DAYS_FULL[dayIdx];
    const slots = getDaySlots(calModal.salonId, date);

    if (!slots) {
        return `
            <div class="cal-day-header-info">
                <div class="day-full-name">${dayName}, ${toDateStr(date)}</div>
            </div>
            <div class="cal-day-closed-msg">Ezen a napon zárva vagyunk.</div>`;
    }

    const freeCount  = slots.filter(s => !s.booked).length;
    const totalCount = slots.length;

    const slotsHTML = slots.map(s => {
        const cls = s.booked ? 'booked' : 'free';
        const lbl = s.booked ? 'Foglalt' : 'Szabad';
        return `<div class="cal-day-slot">
            <div class="cal-day-slot-time">${s.label}</div>
            <div class="cal-day-slot-bar ${cls}">${lbl}</div>
        </div>`;
    }).join('');

    return `
        <div class="cal-day-header-info">
            <div class="day-full-name">${dayName}, ${toDateStr(date)}</div>
            <div class="day-summary">
                ${totalCount} időpont &nbsp;·&nbsp;
                <span style="color:var(--status-available)">${freeCount} szabad</span>
                &nbsp;·&nbsp;
                <span style="color:var(--status-closed)">${totalCount - freeCount} foglalt</span>
            </div>
        </div>
        <div class="cal-day-slots">${slotsHTML}</div>`;
}

// ============================================
// MEGNYITÁS / ZÁRÁS
// ============================================
function openCalendarModal(salonId) {
    // Szalon neve megkeresése
    let salonName = '';
    Object.values(categoryLists).forEach(list => {
        const found = list.find(s => s.id === salonId);
        if (found) salonName = found.name;
    });

    calModal.salonId      = salonId;
    calModal.salonName    = salonName;
    calModal.view         = 'month';
    calModal.monthOffset  = 0;
    calModal.weekOffset   = 0;
    calModal.selectedDate = null;

    renderCalendarModal();

    const modal = document.getElementById('calendarModal');
        modal.querySelector('.modal-content').classList.add('calendar-modal-content'); // ← ez az új sor
    modal.classList.add('active');
    lockBodyScroll();
    syncBottomNavWithOverlays();
}

function closeCalendarModal() {
    const modal = document.getElementById('calendarModal');
    if (!modal.classList.contains('active')) return;
    modal.classList.remove('active');
    unlockBodyScroll();
    syncBottomNavWithOverlays();
}

function initCalendarModal() {
    const modal = document.getElementById('calendarModal');
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeCalendarModal();
    });
}
