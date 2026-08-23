// ============================================
// HOURS MODAL
// ============================================

const HU_HOLIDAYS = [
    { date: '01.01', name: 'Újév', display: '2027. jan. 1.' },
    { date: '03.15', name: 'Március 15.', display: '2027. márc. 15.' },
    { date: '04.18', name: 'Nagypéntek', display: '2027. ápr. 18.' },
    { date: '04.21', name: 'Húsvéthétfő', display: '2027. ápr. 21.' },
    { date: '05.01', name: 'Munka ünnepe', display: '2027. máj. 1.' },
    { date: '06.09', name: 'Pünkösdhétfő', display: '2027. jún. 9.' },
    { date: '08.20', name: 'Augusztus 20.', display: '2027. aug. 20.' },
    { date: '10.23', name: 'Október 23.', display: '2027. okt. 23.' },
    { date: '11.01', name: 'Mindenszentek', display: '2027. nov. 1.' },
    { date: '12.25', name: 'Karácsony (1. nap)', display: '2027. dec. 25.' },
    { date: '12.26', name: 'Karácsony (2. nap)', display: '2027. dec. 26.' },
];

function openHoursModal(itemId) {
    const hoursModal = $('hoursModal');

    let salonName = '';
    Object.values(categoryLists).forEach(list => {
        const found = list.find(s => s.id === itemId);
        if (found) salonName = found.name;
    });

    const weekDayNames = ['Vasárnap', 'Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat'];
    const orderedDows = [1, 2, 3, 4, 5, 6, 0];

    const weekHTML = orderedDows.map(dow => {
        const h = defaultHoursData[dow];
        const timeStr = h
            ? `${String(h[0]).padStart(2,'0')}:00 – ${String(h[1]).padStart(2,'0')}:00`
            : 'Zárva';
        const isClosed = !h;
        return `
            <div class="hours-modal-row">
                <span class="hours-modal-day">${weekDayNames[dow]}</span>
                <span class="hours-modal-time ${isClosed ? 'hours-closed' : ''}">${timeStr}</span>
            </div>`;
    }).join('');

    const holidaysHTML = HU_HOLIDAYS.map(hol => {
        const seed = hashString(itemId + '_holiday_' + hol.date);
        const works = (seed % 3) !== 0;
        const label = works ? 'Igen' : 'Nem';
        const cls = works ? 'hours-holiday-yes' : 'hours-holiday-no';
        return `
            <div class="hours-modal-row">
                <span class="hours-modal-day">${hol.name} <span style="opacity:0.5; font-size:11px;">${hol.display}</span></span>
                <span class="hours-modal-time ${cls}">${label}</span>
            </div>`;
    }).join('');

    const seed = hashString(itemId + '_extsat');
    const extraWorks = (seed % 3) !== 0;
    const extraLabel = extraWorks ? 'Igen' : 'Nem';
    const extraCls = extraWorks ? 'hours-holiday-yes' : 'hours-holiday-no';
    const extraSaturdaysHTML = `
        <div class="hours-modal-row">
            <span class="hours-modal-day">Ledolgozandó szombatok</span>
            <span class="hours-modal-time ${extraCls}">${extraLabel}</span>
        </div>`;

    const innerHTML = `
        <div class="hours-modal-section">
            <div class="hours-modal-section-title">Heti nyitvatartás</div>
            <div class="hours-modal-table">${weekHTML}</div>
        </div>
        <div class="hours-modal-section">
            <div class="hours-modal-section-title">Munkaszüneti napok</div>
            <div class="hours-modal-table">${holidaysHTML}</div>
        </div>
        <div class="hours-modal-section">
            <div class="hours-modal-section-title">Ledolgozandó szombatok</div>
            <div class="hours-modal-table">${extraSaturdaysHTML}</div>
        </div>
    `;

    buildModalStructure(hoursModal, salonName, '', innerHTML);

    const closeBtn = hoursModal.querySelector('.modal-close');
    if (closeBtn) closeBtn.addEventListener('click', closeHoursModal);

    hoursModal.querySelector('.modal-content').classList.add('price-info-modal-');
    hoursModal.classList.add('active');
    lockBodyScroll();
    syncBottomNavWithOverlays();
}

function closeHoursModal() {
    const hoursModal = $('hoursModal');
    if (!hoursModal.classList.contains('active')) return;
    hoursModal.classList.remove('active');
    unlockBodyScroll();
    syncBottomNavWithOverlays();
}

function initHoursModal() {
    const hoursModal = $('hoursModal');
    hoursModal.addEventListener('click', (e) => {
        if (e.target === hoursModal) closeHoursModal();
    });
}
