// ============================================
// DETAIL VIEW
// ============================================
let currentImageId = 0;
let currentTextIndex = 0;
let currentCategory = 'szalon';
let navigationHistory = [];
let mainScrollPosition = 0;
let textCardCollapsed = false;
let listCardCollapsed = false;
let imageOverlayActive = false;
let isArticleMode = false;
let textAnimating = false;
let listAnimating = false;

function loadImageIntoDetail(imageId) {
    const detailImage = $('detailImage');
    const detailImageOverlay = $('detailImageOverlay');
    const detailTitle = $('detailTitle');
    const detailDescription = $('detailDescription');
    const detailTitleBar = $('detailTitleBar');
    const detailTextCollapsedBtn = $('detailTextCollapsedBtn');
    const detailHeartBtn = $('detailHeartBtn');
    const detailDescriptionWrapper = $('detailDescriptionWrapper');
    const detailListWrapper = $('detailListWrapper');
    const detailCategories = $('detailCategories');
    const detailTextCard = $('detailTextCard');
    const detailListCard = $('detailListCard');

    const card = masonryCards.find(c => c.id === imageId);
    if (!card) return;

    currentImageId = imageId;
    isArticleMode = !!card.isArticle;
    detailImage.style.backgroundImage = `url('${card.image}')`;

    hideImageOverlay();
    renderImageInfo(card);

    if (isArticleMode) {
        detailTitle.textContent = card.articleTitle;
        detailDescription.textContent = card.articleText;
        detailTitleBar.classList.add('no-arrows');
        detailTextCollapsedBtn.textContent = 'Cikk';
    } else {
        detailTitleBar.classList.remove('no-arrows');
        detailTextCollapsedBtn.textContent = 'Tippek és tanácsok';
        currentTextIndex = 0;
        updateDetailText();
    }

    renderCategoryButtons();
    currentCategory = 'szalon';
    renderDetailList();

    detailHeartBtn.classList.toggle('active', isLikedByMe('img_' + currentImageId));
    applyCardStates();

    detailDescriptionWrapper.scrollTop = 0;
    detailListWrapper.scrollTop = 0;
    if (detailCategories) detailCategories.scrollLeft = 0;

    renderMasonryCards(masonryCards, $('detailMasonryGrid'), imageId);
}

function renderImageInfo(card) {
    const detailImageInfo = $('detailImageInfo');
    const keywords = (card.keywords || []).map(k => `#${k.replace(/\s+/g, '')}`).join(' ');
    detailImageInfo.innerHTML = `
        <h3>${card.title || 'Cím nélküli kép'}</h3>
        <p class="info-desc">${card.description || ''}</p>
        <p class="info-keywords">${keywords}</p>
        <div class="info-meta">
            <span>Stílus: ${card.style || '-'}</span>
            <span>Feltöltve: ${card.uploadDate || '-'}</span>
            <span>${card.aiGenerated ? 'AI-generált kép' : 'Fotó'}</span>
        </div>`;
}

function showImageOverlay() {
    $('detailImageOverlay').classList.add('active');
    imageOverlayActive = true;
}
function hideImageOverlay() {
    $('detailImageOverlay').classList.remove('active');
    imageOverlayActive = false;
}

function applyCardStates() {
    $('detailTextCard').classList.toggle('collapsed', textCardCollapsed);
    $('detailListCard').classList.toggle('collapsed', listCardCollapsed);
}

function openDetailView(imageId) {
    const detailView = $('detailView');
    const mainView = $('mainView');
    if (detailView.style.display === 'block') {
        navigationHistory.push({ imageId: currentImageId });
    } else {
        mainScrollPosition = window.scrollY;
    }
    loadImageIntoDetail(imageId);
    mainView.style.display = 'none';
    detailView.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'instant' });
    setTimeout(updateBottomNavVisibility, 50);
}

function updateDetailText() {
    const t = detailTexts[currentTextIndex];
    $('detailTitle').textContent = t.title;
    $('detailDescription').textContent = t.description;
}

function changeText(direction) {
    if (isArticleMode || textAnimating) return;
    const detailTitle = $('detailTitle');
    const detailDescriptionWrapper = $('detailDescriptionWrapper');
    textAnimating = true;
    detailTitle.classList.add('fade-out');
    detailDescriptionWrapper.classList.add('fade-out');
    setTimeout(() => {
        currentTextIndex = direction === 'next'
            ? (currentTextIndex + 1) % detailTexts.length
            : (currentTextIndex - 1 + detailTexts.length) % detailTexts.length;
        updateDetailText();
        detailDescriptionWrapper.scrollTop = 0;
        requestAnimationFrame(() => {
            detailTitle.classList.remove('fade-out');
            detailDescriptionWrapper.classList.remove('fade-out');
            setTimeout(() => { textAnimating = false; }, 150);
        });
    }, 150);
}

function renderCategoryButtons() {
    const detailCategories = $('detailCategories');
    const detailListWrapper = $('detailListWrapper');
    detailCategories.innerHTML = categoryOrder.map((cat, idx) => `
        <button class="detail-cat-btn ${idx === 0 ? 'active' : ''}" data-cat="${cat}">${categoryLabels[cat]}</button>
    `).join('');

    detailCategories.querySelectorAll('.detail-cat-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.dataset.cat === currentCategory || listAnimating) return;
            listAnimating = true;
            detailListWrapper.classList.add('fade-out');
            setTimeout(() => {
                detailCategories.querySelectorAll('.detail-cat-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentCategory = btn.dataset.cat;
                renderDetailList();
                detailListWrapper.scrollTop = 0;
                scrollActiveCatBtnIntoView();
                requestAnimationFrame(() => {
                    detailListWrapper.classList.remove('fade-out');
                    setTimeout(() => { listAnimating = false; }, 150);
                });
            }, 150);
        });
    });
}

function scrollActiveCatBtnIntoView() {
    const detailCategories = $('detailCategories');
    const activeBtn = detailCategories.querySelector('.detail-cat-btn.active');
    if (!activeBtn) return;
    const cr = detailCategories.getBoundingClientRect();
    const br = activeBtn.getBoundingClientRect();
    const target = detailCategories.scrollLeft + (br.left + br.width / 2) - (cr.left + cr.width / 2);
    const max = detailCategories.scrollWidth - detailCategories.clientWidth;
    detailCategories.scrollTo({ left: Math.max(0, Math.min(target, max)), behavior: 'smooth' });
}

function changeCategory(direction) {
    const detailListWrapper = $('detailListWrapper');
    const detailCategories = $('detailCategories');
    if (listAnimating) return;
    listAnimating = true;
    const idx = categoryOrder.indexOf(currentCategory);
    const newIdx = direction === 'next'
        ? (idx + 1) % categoryOrder.length
        : (idx - 1 + categoryOrder.length) % categoryOrder.length;

    detailListWrapper.classList.add('fade-out');
    setTimeout(() => {
        currentCategory = categoryOrder[newIdx];
        detailCategories.querySelectorAll('.detail-cat-btn').forEach(b => b.classList.remove('active'));
        detailCategories.querySelector(`.detail-cat-btn[data-cat="${currentCategory}"]`)?.classList.add('active');
        renderDetailList();
        detailListWrapper.scrollTop = 0;
        scrollActiveCatBtnIntoView();
        requestAnimationFrame(() => {
            detailListWrapper.classList.remove('fade-out');
            setTimeout(() => { listAnimating = false; }, 150);
        });
    }, 150);
}

function initDetailView() {
    const detailPrevText = $('detailPrevText');
    const detailNextText = $('detailNextText');
    const detailBackBtn = $('detailBackBtn');
    const detailHeartBtn = $('detailHeartBtn');
    const detailShareBtn = $('detailShareBtn');
    const detailTextCollapseArrow = $('detailTextCollapseArrow');
    const detailTextCollapsedBtn = $('detailTextCollapsedBtn');
    const detailListCollapseArrow = $('detailListCollapseArrow');
    const detailListCollapsedBtn = $('detailListCollapsedBtn');
    const detailTextCard = $('detailTextCard');
    const detailListCard = $('detailListCard');
    const detailImageCard = $('detailImageCard');
    const detailImageOverlay = $('detailImageOverlay');
    const detailDescriptionWrapper = $('detailDescriptionWrapper');
    const detailListWrapper = $('detailListWrapper');

    detailPrevText.addEventListener('click', () => changeText('prev'));
    detailNextText.addEventListener('click', () => changeText('next'));

    detailBackBtn.addEventListener('click', () => {
        const detailView = $('detailView');
        const mainView = $('mainView');
        if (navigationHistory.length > 0) {
            loadImageIntoDetail(navigationHistory.pop().imageId);
            window.scrollTo({ top: 0, behavior: 'instant' });
            return;
        }
        detailView.style.display = 'none';
        mainView.style.display = 'block';
        window.scrollTo({ top: mainScrollPosition, behavior: 'instant' });
        setTimeout(updateBottomNavVisibility, 50);
    });

    detailHeartBtn.addEventListener('click', () => {
        const id = 'img_' + currentImageId;
        const nowLiked = toggleLikedByMe(id);
        detailHeartBtn.classList.toggle('active', nowLiked);
        const c = bumpLike(id, nowLiked ? 1 : -1);
        showActionBadge(detailHeartBtn, `❤ ${formatViewCount(c)}`);
    });

    detailShareBtn.addEventListener('click', async () => {
        const card = masonryCards.find(c => c.id === currentImageId);
        const id = 'img_' + currentImageId;
        const c = bumpShare(id);
        showActionBadge(detailShareBtn, `↗ ${formatViewCount(c)}`);
        const shareData = {
            title: 'Nails1.hu',
            text: isArticleMode ? card.articleTitle : detailTexts[currentTextIndex].title,
            url: card ? card.image : window.location.href
        };
        setTimeout(async () => {
            if (navigator.share) { try { await navigator.share(shareData); } catch (err) {} }
            else if (navigator.clipboard) {
                try {
                    await navigator.clipboard.writeText(shareData.url);
                    showResult(`<h2>Megosztás</h2><p>A link a vágólapra másolva! 📋</p>`);
                } catch { showResult(`<h2>Megosztás</h2><p>Nem érhető el.</p>`); }
            }
        }, 600);
    });

    detailTextCollapseArrow.addEventListener('click', () => { detailTextCard.classList.add('collapsed'); textCardCollapsed = true; });
    detailTextCollapsedBtn.addEventListener('click', () => { detailTextCard.classList.remove('collapsed'); textCardCollapsed = false; $('detailDescriptionWrapper').scrollTop = 0; });
    detailListCollapseArrow.addEventListener('click', () => { detailListCard.classList.add('collapsed'); listCardCollapsed = true; });
    detailListCollapsedBtn.addEventListener('click', () => { detailListCard.classList.remove('collapsed'); listCardCollapsed = false; $('detailListWrapper').scrollTop = 0; });

    // Swipe
    attachSwipe(detailTextCard, () => changeText('next'), () => changeText('prev'), { enabledFn: () => !isArticleMode });
    attachSwipe(detailListCard, () => changeCategory('next'), () => changeCategory('prev'), { excludeSelector: '.detail-categories, .detail-list-item.expanded' });
    attachSwipe(detailImageCard, () => showImageOverlay(), () => hideImageOverlay());

    detailImageOverlay.addEventListener('click', () => { if (imageOverlayActive) hideImageOverlay(); });
}
