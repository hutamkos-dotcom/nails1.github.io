// ============================================
// SEARCH
// ============================================
function showTrendingSuggestions() {
    const suggestionsList = $('suggestions');
    const header = `<li class="suggestions-header">Felkapott keresések</li>`;
    const items = TRENDING_SEARCHES.slice(0, 5).map(t => `<li data-name="${t}">${t}</li>`).join('');
    suggestionsList.innerHTML = header + items;
    suggestionsList.classList.add('active');
    suggestionsList.classList.add('trending');
}

function scrollSearchIntoView() {
    const searchSection = document.querySelector('.search-section');
    if (!searchSection) return;
    const rect = searchSection.getBoundingClientRect();
    const targetTop = window.scrollY + rect.top - 5;
    window.scrollTo({ top: targetTop, behavior: 'smooth' });
}

function performSearch() {
    const searchInput = $('searchInput');
    const suggestionsList = $('suggestions');
    const q = searchInput.value.trim().toLowerCase();
    suggestionsList.classList.remove('active');
    suggestionsList.classList.remove('trending');
    if (!q) { showResult('<h2>Kereső</h2><p>Adj meg egy keresőkifejezést!</p>'); return; }
    const results = database.filter(i => i.name.toLowerCase().includes(q));
    if (results.length === 0) {
        showResult(`<h2>Nincs találat</h2><p>Nem találtunk eredményt: "${searchInput.value}"</p>`);
    } else {
        const items = results.map(r => `<div class="result-item"><strong>${r.name}</strong>Kategória: ${r.category} | Ár: ${r.price.toLocaleString('hu-HU')} Ft</div>`).join('');
        showResult(`<h2>Találatok (${results.length})</h2>${items}`);
    }
}

function initSearch() {
    const searchInput = $('searchInput');
    const searchBtn = $('searchBtn');
    const suggestionsList = $('suggestions');

    searchInput.addEventListener('focus', () => {
        document.body.classList.add('search-focused');
        if (!searchInput.value.trim()) showTrendingSuggestions();
        setTimeout(() => scrollSearchIntoView(), 300);
    });

    searchInput.addEventListener('input', (e) => {
        const q = e.target.value.trim().toLowerCase();
        if (q.length < 1) { showTrendingSuggestions(); return; }
        suggestionsList.classList.remove('trending');
        if (q.length < 2) { suggestionsList.classList.remove('active'); suggestionsList.innerHTML = ''; return; }
        const matches = database.filter(i => i.name.toLowerCase().includes(q));
        if (matches.length > 0) {
            suggestionsList.innerHTML = matches.slice(0, 5).map(i => `<li data-name="${i.name}">${i.name} (${i.price} Ft)</li>`).join('');
            suggestionsList.classList.add('active');
        } else {
            suggestionsList.innerHTML = '<li>Nincs találat</li>';
            suggestionsList.classList.add('active');
        }
    });

    suggestionsList.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI' && e.target.dataset.name) {
            searchInput.value = e.target.dataset.name;
            suggestionsList.classList.remove('active');
            suggestionsList.classList.remove('trending');
            performSearch();
        }
    });

    searchInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); performSearch(); } });

    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        searchInput.value = '';
        searchInput.focus();
        showTrendingSuggestions();
        setTimeout(() => scrollSearchIntoView(), 300);
    });

    searchInput.addEventListener('blur', () => {
        setTimeout(() => {
            if (document.activeElement !== searchInput) {
                document.body.classList.remove('search-focused');
                suggestionsList.classList.remove('active');
                suggestionsList.classList.remove('trending');
            }
        }, 200);
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-section')) {
            suggestionsList.classList.remove('active');
            suggestionsList.classList.remove('trending');
            if (document.activeElement !== searchInput) {
                document.body.classList.remove('search-focused');
            }
        }
    });
}
