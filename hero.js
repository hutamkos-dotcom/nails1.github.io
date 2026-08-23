// ============================================
// HERO
// ============================================
const heroBackgrounds = [
    'https://raw.githubusercontent.com/hutamkos-dotcom/images/refs/heads/main/Elegant%20Nail%20Polish%20Display%20(1).png',
    'https://raw.githubusercontent.com/hutamkos-dotcom/images/refs/heads/main/Confident%20Professional.webp',
    'https://raw.githubusercontent.com/hutamkos-dotcom/images/refs/heads/main/Modern%20Stylish%20Interior%20Space.webp',
    'https://raw.githubusercontent.com/hutamkos-dotcom/images/refs/heads/main/Smiling%20Woman%20Portrait.webp',
    'https://raw.githubusercontent.com/hutamkos-dotcom/images/refs/heads/main/Serene%20Contemplation.webp',
    'https://raw.githubusercontent.com/hutamkos-dotcom/images/refs/heads/main/Serene%20Portrait%20of%20a%20Woman.webp'
];
let currentHeroBgIdx = 0;

function initHero() {
    const heroCard = $('heroCard');
    const heroBackground = $('heroBackground');
    const brandLogo = $('brandLogo');

    heroBackgrounds.forEach(url => { const img = new Image(); img.src = url; });

    heroCard.addEventListener('click', (e) => {
        if (e.target.closest('.menu-btn, .brand-logo, .search-section, .quote-section, input, button, a')) return;
        currentHeroBgIdx = (currentHeroBgIdx + 1) % heroBackgrounds.length;
        heroBackground.style.backgroundImage = `url('${heroBackgrounds[currentHeroBgIdx]}')`;
    });

    // Brand logo
    let brandLogoTimer = null;
    if (brandLogo) {
        brandLogo.addEventListener('click', (e) => {
            e.stopPropagation();
            brandLogo.classList.add('expanded');
            clearTimeout(brandLogoTimer);
            brandLogoTimer = setTimeout(() => {
                brandLogo.classList.remove('expanded');
            }, 2200);
        });
    }
}

// QUOTES
const quotes = [
    { text: '„Nem leszünk képesek megoldani a világ összes baját, de sose becsüljük alá saját jelentőségünket!"', author: 'Michelle Obama' },
    { text: '„Amiben az emberi elme hinni tud, azt meg is tudja valósítani."', author: 'Napoleon Hill' },
    { text: '„A nők nemcsak családokat, hanem közösségeket és nemzeteket is építenek."', author: 'Hillary Clinton' },
    { text: '„A nők mindennap újraírják a lehetetlent."', author: 'Serena Williams' },
    { text: '„Légy olyan nő, akinek a jelenléte inspirálja a többit."', author: 'Maya Angelou' },
    { text: '„A nők nem azért erősek, mert nincs félelmük, hanem mert szembenéznek vele."', author: 'J.K. Rowling' }
];
let currentQuoteIdx = -1;

function renderQuote(animate = false) {
    const quoteSection = $('quoteSection');
    const quoteText = $('quoteText');
    const quoteAuthor = $('quoteAuthor');
    let idx;
    do { idx = Math.floor(Math.random() * quotes.length); } while (idx === currentQuoteIdx && quotes.length > 1);
    currentQuoteIdx = idx;
    const q = quotes[idx];
    if (animate) {
        quoteSection.classList.add('fade-out');
        setTimeout(() => {
            quoteText.textContent = q.text;
            quoteAuthor.textContent = q.author;
            quoteSection.classList.remove('fade-out');
        }, 250);
    } else {
        quoteText.textContent = q.text;
        quoteAuthor.textContent = q.author;
    }
}

function initQuotes() {
    const quoteSection = $('quoteSection');
    renderQuote(false);
    quoteSection.addEventListener('click', (e) => { e.stopPropagation(); renderQuote(true); });
}
