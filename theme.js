// ============================================
// THEME
// ============================================
const THEME_KEY = 'nails1_theme';
const themes = ['light', 'dark'];
const themeLabels = { light: 'világos', dark: 'sötét' };

function getCurrentTheme() {
    if (document.body.classList.contains('theme-dark')) return 'dark';
    return 'light';
}

function updateThemeMenuLabel() {
    const themeMenuItem = $('themeMenuItem');
    if (themeMenuItem) themeMenuItem.textContent = `Téma: ${themeLabels[getCurrentTheme()]}`;
}

function applyTheme(theme) {
    document.body.classList.remove('theme-light', 'theme-dark');
    if (theme === 'dark') document.body.classList.add('theme-dark');
    else document.body.classList.add('theme-light');
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'light' ? '#f5f1ea' : '#000000');
    try { localStorage.setItem(THEME_KEY, theme); } catch(e) {}
    updateThemeMenuLabel();
}

function cycleTheme() {
    const idx = themes.indexOf(getCurrentTheme());
    applyTheme(themes[(idx + 1) % themes.length]);
}
