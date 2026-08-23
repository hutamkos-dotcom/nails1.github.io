// ============================================
// MASONRY
// ============================================
let currentFilter = 'all';

function getFilteredMainCards() {
    if (currentFilter === 'inspiration') return masonryCards.filter(c => !c.isArticle);
    if (currentFilter === 'article') return masonryCards.filter(c => c.isArticle);
    return masonryCards;
}

function setFilter(filter, rerender = true) {
    currentFilter = filter;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('active', b.dataset.filter === filter));
    if (rerender) renderMasonryCards(getFilteredMainCards(), $('masonryGrid'));
}

function renderMasonryCards(cards, gridEl, excludeId = null) {
    const filtered = excludeId !== null ? cards.filter(c => c.id !== excludeId) : cards;
    const colCount = 2;
    gridEl.innerHTML = '';
    const columns = [];
    const heights = [];
    for (let i = 0; i < colCount; i++) {
        const col = document.createElement('div');
        col.className = 'masonry-column';
        gridEl.appendChild(col);
        columns.push(col);
        heights.push(0);
    }
    filtered.forEach(card => {
        const bgStyle = card.image ? `style="background-image: url('${card.image}')"` : '';
        const bgClass = card.image ? '' : card.bg;
        const cardHTML = `
            <div class="masonry-card" data-card-id="${card.id}">
                <div class="masonry-card-image ${card.height} ${bgClass}" ${bgStyle}></div>
            </div>`;
        const cardHeight = heightMap[card.height] || 200;
        let minIdx = 0;
        for (let i = 1; i < heights.length; i++) if (heights[i] < heights[minIdx]) minIdx = i;
        columns[minIdx].insertAdjacentHTML('beforeend', cardHTML);
        heights[minIdx] += cardHeight;
    });
    gridEl.querySelectorAll('.masonry-card').forEach(cardEl => {
        cardEl.addEventListener('click', () => openDetailView(parseInt(cardEl.dataset.cardId)));
    });
}

function initMasonry() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => setFilter(btn.dataset.filter));
    });
    renderMasonryCards(getFilteredMainCards(), $('masonryGrid'));
}
