// ============================================
// DATA
// ============================================
const database = [
    { name: 'Klasszikus manikűr', category: 'manikur', price: 4500 },
    { name: 'Géllakkos manikűr', category: 'gel', price: 6500 },
    { name: 'Francia manikűr', category: 'manikur', price: 5500 },
    { name: 'Pedikűr wellness', category: 'pedikur', price: 7000 },
    { name: 'Géllakkos pedikűr', category: 'gel', price: 8500 },
    { name: 'Műköröm építés', category: 'mutakor', price: 12000 },
    { name: 'Műköröm töltés', category: 'mutakor', price: 8000 },
    { name: 'Díszítés kristályokkal', category: 'gel', price: 3000 },
    { name: 'Ombré körmök', category: 'gel', price: 9000 },
    { name: 'Nail art', category: 'manikur', price: 5000 }
];

const TRENDING_SEARCHES = [
    'Géllakkos manikűr',
    'Francia manikűr',
    'Mandula köröm',
    'Nail art',
    'Ombré körmök',
    'Pedikűr wellness'
];

const heightMap = { h1: 180, h2: 220, h3: 160, h4: 260, h5: 200, h6: 240 };

const articleContent = {
    id: 99, isArticle: true, bg: 'bg-nude', height: 'h4',
    image: 'https://raw.githubusercontent.com/hutamkos-dotcom/images/refs/heads/main/Minimalist%20Yellow%20Vase%20with%20Dried%20Flowers.jpg',
    title: 'Megéri még körmösnek tanulni?',
    description: 'Elemzés a magyar körmös piac jövőjéről.',
    keywords: ['körmös szakma', 'karrier', 'piac', 'statisztika', 'elemzés', 'jövő'],
    uploadDate: '2026.08.11', aiGenerated: false, style: 'Cikk',
    articleTitle: 'Megéri még körmösnek tanulni?',
    articleText: `Mennyi körmösre lenne szüksége Magyarországnak valójában?

A műkörmök világa ma már nem csupán divat, hanem egyfajta önkifejezés, rutin és közösségi élmény. Magyarországon a nők jelentős része rendszeresen jár körmöshöz, de eddig kevesen gondolták végig, hogy ez a szokás milyen méretű szakmai hátteret igényel. A KSH adatai alapján a 18–54 éves korosztályban él körülbelül 1,6–1,8 millió nő, akik potenciálisan igénybe veszik a műkörmös szolgáltatásokat. Ez a csoport a legtrendérzékenyebb, a legstabilabb és a legaktívabb szépségipari fogyasztó.

A 18–29 éves nők adják a legdinamikusabb réteget: ők követik a TikTok‑trendeket, a szezonális mintákat és a merészebb formákat. A 30–39 éves korosztály a körmösök igazi aranytartaléka: visszajáró, megbízható vendégek, akik a minőséget és az eleganciát keresik. A 40–54 éves nők pedig a tartósságot és az ápoltságot helyezik előtérbe, visszafogottabb stílusokkal, de ugyanolyan rendszerességgel.

Egy körmösnek átlagosan napi 4–5 vendégre van szüksége ahhoz, hogy stabil megélhetést biztosítson magának. Ha havonta 20–22 napot dolgozik, ez nagyjából 90–100 időpontot jelent. Mivel a legtöbb vendég 3–4 hetente tér vissza, egy körmösnek körülbelül 70–90 állandó női vendégre van szüksége ahhoz, hogy minden napja megteljen. Ez a szám meglepően alacsony ahhoz képest, hogy mennyire nagy a potenciális női célcsoport.

Ha a teljes, műkörmöt használó női réteget 1,6–1,8 millió főre tesszük, és egy körmös átlagosan 80 vendéget szolgál ki, akkor Magyarországnak körülbelül 18–20 ezer körmösre lenne szüksége ahhoz, hogy minden nő könnyen találjon szakembert, és minden körmösnek stabil vendégköre legyen. Ez a szám jól mutatja, hogy a körmös szakma nem csupán népszerű, hanem komoly gazdasági súllyal is bír.

A körmösök tehát nem csak szépséget adnak, hanem egy olyan szolgáltatási hálót működtetnek, amely több százezer nő mindennapjait érinti. A számítások alapján a szakma stabil, növekvő és hosszú távon is fenntartható. A kérdés már csak az: ki lesz az a körmös, aki a következő 80 nő kedvenc szakembere lesz?`
};

const masonryCardsBase = [
    { id: 0, bg: 'bg-pink', height: 'h2',
        image: 'https://raw.githubusercontent.com/hutamkos-dotcom/images/refs/heads/main/Barack%20mandula%20k%C3%B6rm%C3%B6k%20k%C3%B6zepes%20m%C3%A9ret%20feh%C3%A9r%20vonalas%20lev%C3%A9l%20minta%202026%E2%80%9107%E2%80%9104%E2%80%9120%E2%80%9156%E2%80%9140%201792x2304%2034%20HQ.webp',
        title: 'Barack mandula körmök',
        description: 'Elegáns barack színű mandula formájú körmök finom fehér levél mintával.',
        keywords: ['mandula köröm', 'barack szín', 'levél minta', 'közepes hossz', 'nőies', 'elegáns'],
        uploadDate: '2026.07.04', aiGenerated: true, style: 'Természetes' },
    { id: 1, bg: 'bg-purple', height: 'h1',
        image: 'https://raw.githubusercontent.com/hutamkos-dotcom/images/refs/heads/main/Cseresznyevir%C3%A1g%20mandula%20k%C3%B6rm%C3%B6k%20k%C3%B6zepes%20m%C3%A9ret%20fekete%20r%C3%B3zsasz%C3%ADn%20akcentus%202026%E2%80%9107%E2%80%9105%E2%80%9119%E2%80%9152%E2%80%9140%201792x2304%2034%20HQ.webp',
        title: 'Cseresznyevirág mandula',
        description: 'Fekete-rózsaszín akcentusos cseresznyevirág mintás mandula körmök.',
        keywords: ['cseresznyevirág', 'fekete', 'rózsaszín', 'akcentus', '*****án stílus', 'virág'],
        uploadDate: '2026.07.05', aiGenerated: true, style: 'Extravagáns' },
    { id: 2, bg: 'bg-peach', height: 'h4',
        image: 'https://raw.githubusercontent.com/hutamkos-dotcom/images/refs/heads/main/Cseresznyevir%C3%A1g%20mandula%20k%C3%B6rm%C3%B6k%20k%C3%B6zepes%20m%C3%A9ret%20fekete%20r%C3%B3zsasz%C3%ADn%20feh%C3%A9r%20akcentus%202026%E2%80%9107%E2%80%9105%E2%80%9119%E2%80%9153%E2%80%9140%201792x2304%2034%20HQ.webp',
        title: 'Cseresznyevirág fehér akcentus',
        description: 'Fekete, rózsaszín és fehér akcentusú cseresznyevirág körmök.',
        keywords: ['cseresznyevirág', 'fekete', 'rózsaszín', 'fehér', 'akcentus', 'kontraszt'],
        uploadDate: '2026.07.05', aiGenerated: true, style: 'Modern' },
    { id: 3, bg: 'bg-lavender', height: 'h3',
        image: 'https://raw.githubusercontent.com/hutamkos-dotcom/images/refs/heads/main/Fekete%20mandula%20k%C3%B6rm%C3%B6k%20k%C3%B6zepes%20m%C3%A9ret%20arany%20glitter%20b%C3%A9zs%20sz%C3%BCrke%20akcentus%202026%E2%80%9107%E2%80%9104%E2%80%9120%E2%80%9158%E2%80%9140%201792x2304%2034%20HQ.webp',
        title: 'Fekete mandula arany glitter',
        description: 'Fekete mandula körmök arany glitterrel.',
        keywords: ['fekete', 'arany glitter', 'béžs', 'szürke', 'luxus', 'estélyi'],
        uploadDate: '2026.07.04', aiGenerated: true, style: 'Estélyi' },
    { id: 4, bg: 'bg-rose', height: 'h5',
        image: 'https://raw.githubusercontent.com/hutamkos-dotcom/images/refs/heads/main/Fekete%20sz%C3%B6gletes%20k%C3%B6rm%C3%B6k%20k%C3%B6zepes%20m%C3%A9ret%20feh%C3%A9r%20m%C3%A1rv%C3%A1ny%20arany%20f%C3%B3lia%202026%E2%80%9107%E2%80%9104%E2%80%9120%E2%80%9147%E2%80%9140%201792x2304%2034%20HQ.webp',
        title: 'Fekete szögletes márvány',
        description: 'Fekete szögletes körmök fehér márvány mintával és arany fóliával.',
        keywords: ['fekete', 'szögletes', 'márvány', 'arany fólia', 'modern', 'kifinomult'],
        uploadDate: '2026.07.04', aiGenerated: true, style: 'Kortárs' },
    { id: 5, bg: 'bg-mint', height: 'h3',
        image: 'https://raw.githubusercontent.com/hutamkos-dotcom/images/refs/heads/main/Fekete%20sz%C3%B6gletes%20k%C3%B6rm%C3%B6k%20k%C3%B6zepes%20m%C3%A9ret%20m%C3%A1rv%C3%A1ny%20arany%20f%C3%B3lia%202026%E2%80%9107%E2%80%9104%E2%80%9120%E2%80%9148%E2%80%9140%201792x2304%2034%20HQ.webp',
        title: 'Fekete márvány arany',
        description: 'Fekete szögletes körmök márvány textúrával és arany fóliával.',
        keywords: ['fekete', 'szögletes', 'márvány', 'arany', 'időtlen', 'merész'],
        uploadDate: '2026.07.04', aiGenerated: true, style: 'Klasszikus' },
    { id: 6, bg: 'bg-coral', height: 'h6',
        image: 'https://raw.githubusercontent.com/hutamkos-dotcom/images/refs/heads/main/Hossz%C3%BA%20mandula%20k%C3%B6rm%C3%B6k%20halv%C3%A1ny%20r%C3%B3zsasz%C3%ADn%20f%C3%A9nyes%20manik%C5%B1r%202026%E2%80%9106%E2%80%9123_14%E2%80%9107%E2%80%9100%201792x2304%20HQ.webp',
        title: 'Hosszú mandula rózsaszín',
        description: 'Halvány rózsaszín hosszú mandula körmök fényes manikűrrel.',
        keywords: ['hosszú köröm', 'mandula', 'halvány rózsaszín', 'fényes', 'nőies', 'romantikus'],
        uploadDate: '2026.06.23', aiGenerated: true, style: 'Romantikus' },
    { id: 7, bg: 'bg-nude', height: 'h2',
        image: 'https://raw.githubusercontent.com/hutamkos-dotcom/images/refs/heads/main/K%C3%B6zepes%20mandula%20k%C3%B6rm%C3%B6k%20fekete%20sz%C3%BCrke%20feh%C3%A9r%20p%C3%B6tty%C3%B6s%20manik%C5%B1r%202026%E2%80%9106%E2%80%9123_14%E2%80%9129%E2%80%9140%201792x2304%2034%20HQ.webp',
        title: 'Közepes pöttyös manikűr',
        description: 'Közepes hosszú mandula körmök fekete, szürke, fehér pöttyös mintával.',
        keywords: ['közepes hossz', 'mandula', 'pöttyös', 'fekete', 'szürke', 'fehér'],
        uploadDate: '2026.06.23', aiGenerated: true, style: 'Játékos' },
    { id: 8, bg: 'bg-lavender', height: 'h4',
        image: 'https://raw.githubusercontent.com/hutamkos-dotcom/images/refs/heads/main/Firefly_A%20detailed%20beauty%20editorial%20close%E2%80%91up%20showcasing%20almond%E2%80%91shaped%20nails%20in%20a%20pastel%20laven%20280200%20(1).webp',
        title: 'Pasztell levendula mandula',
        description: 'Részletes szépség editorial közeli felvétel pasztell levendula színű mandula körmökről.',
        keywords: ['mandula köröm', 'pasztell', 'levendula', 'editorial', 'romantikus'],
        uploadDate: '2026.08.09', aiGenerated: true, style: 'Editorial' },
    { id: 9, bg: 'bg-blush', height: 'h2',
        image: 'https://raw.githubusercontent.com/hutamkos-dotcom/images/refs/heads/main/Firefly_A%20detailed%20beauty%20editorial%20close%E2%80%91up%20showcasing%20almond%E2%80%91shaped%20nails%20in%20a%20pastel%20laven%2093286.webp',
        title: 'Levendula editorial close-up',
        description: 'Pasztell levendula árnyalatú mandula körmök editorial fotózással.',
        keywords: ['mandula', 'levendula', 'pasztell', 'prémium', 'editorial'],
        uploadDate: '2026.08.09', aiGenerated: true, style: 'Prémium' },
    { id: 10, bg: 'bg-plum', height: 'h3',
        image: 'https://raw.githubusercontent.com/hutamkos-dotcom/images/refs/heads/main/Firefly_A%20photorealistic%20close%E2%80%91up%20of%20almond%E2%80%91shaped%20nails%20coated%20in%20a%20midnight%20sapphire%20lacque%20959665.webp',
        title: 'Éjféli zafír mandula',
        description: 'Fotorealisztikus közeli felvétel mandula körmökről, éjféli zafírkék lakkozással.',
        keywords: ['mandula', 'zafír', 'sötétkék', 'éjféli', 'elegáns'],
        uploadDate: '2026.08.09', aiGenerated: true, style: 'Elegáns' },
    { id: 11, bg: 'bg-champagne', height: 'h5',
        image: 'https://raw.githubusercontent.com/hutamkos-dotcom/images/refs/heads/main/Firefly_A%20photorealistic%20close%E2%80%91up%20of%20refined%20almond%E2%80%91shaped%20nails%20coated%20in%20a%20luminous%20milky%E2%80%91w%20148160.webp',
        title: 'Tejfehér ragyogó mandula',
        description: 'Kifinomult mandula körmök ragyogó tejfehér lakkozással.',
        keywords: ['mandula', 'tejfehér', 'ragyogó', 'letisztult', 'időtlen'],
        uploadDate: '2026.08.09', aiGenerated: true, style: 'Minimalista' },
    { id: 12, bg: 'bg-nude', height: 'h2',
        image: 'https://raw.githubusercontent.com/hutamkos-dotcom/images/refs/heads/main/Firefly_A%20photorealistic%20macro%20composition%20of%20almond%E2%80%91shaped%20nails%20painted%20in%20a%20warm%20honey%E2%80%91nud%20618432.webp',
        title: 'Meleg mézes-nude mandula',
        description: 'Fotorealisztikus makró kompozíció mandula körmökről meleg mézes-nude árnyalatban.',
        keywords: ['mandula', 'nude', 'méz szín', 'meleg', 'természetes'],
        uploadDate: '2026.08.09', aiGenerated: true, style: 'Természetes' },
    { id: 13, bg: 'bg-peach', height: 'h4',
        image: 'https://raw.githubusercontent.com/hutamkos-dotcom/images/refs/heads/main/Firefly_Close-up%20of%20a%20hand%20with%20white%20nails%2C%20wearing%20a%20gold%20watch%2C%20next%20to%20a%20phone%20on%20a%20light%20606020%20(1).webp',
        title: 'Fehér körmök arany órával',
        description: 'Közeli felvétel egy kézről fehér körmökkel, arany karóra és telefon.',
        keywords: ['fehér köröm', 'arany óra', 'lifestyle', 'modern', 'minimalista'],
        uploadDate: '2026.08.09', aiGenerated: true, style: 'Lifestyle' },
    { id: 14, bg: 'bg-rose', height: 'h3',
        image: 'https://raw.githubusercontent.com/hutamkos-dotcom/images/refs/heads/main/Firefly_Macro%20photography%20of%20short%20square%20natural%20nails%20with%20thin%20pink%20micro-French%20tips%2C%20cle%20512149.webp',
        title: 'Rövid mikro-francia',
        description: 'Rövid, szögletes természetes körmök vékony rózsaszín mikro-francia csúcsokkal.',
        keywords: ['rövid köröm', 'szögletes', 'mikro francia', 'rózsaszín', 'természetes'],
        uploadDate: '2026.08.09', aiGenerated: true, style: 'Természetes' },
    { id: 15, bg: 'bg-blush', height: 'h5',
        image: 'https://raw.githubusercontent.com/hutamkos-dotcom/images/refs/heads/main/Firefly_Photorealistic%20close-up%20of%20elegant%20almond-shaped%20nails%20with%20a%20soft%20pearl%20pink%20glazed%20622578.webp',
        title: 'Gyöngyházfényű rózsaszín',
        description: 'Elegáns mandula körmök lágy gyöngyházfényű rózsaszín mázas kivitellel.',
        keywords: ['mandula', 'gyöngyházfény', 'rózsaszín', 'glazed', 'elegáns'],
        uploadDate: '2026.08.09', aiGenerated: true, style: 'Elegáns' },
    { id: 16, bg: 'bg-pink', height: 'h2',
        image: 'https://raw.githubusercontent.com/hutamkos-dotcom/images/refs/heads/main/Firefly_Photorealistic%20close-up%20of%20elegant%20almond-shaped%20nails%20with%20a%20soft%20pearl%20pink%20glazed%20671208.webp',
        title: 'Gyöngyházfényű mandula',
        description: 'Elegáns mandula formájú körmök gyöngyházfényű rózsaszín mázzal.',
        keywords: ['mandula', 'gyöngyházfény', 'rózsaszín', 'romantikus', 'nőies'],
        uploadDate: '2026.08.09', aiGenerated: true, style: 'Romantikus' },
    { id: 17, bg: 'bg-berry', height: 'h4',
        image: 'https://raw.githubusercontent.com/hutamkos-dotcom/images/refs/heads/main/Firefly_Photorealistic%20close-up%20of%20elegant%20almond-shaped%20nails%20with%20a%20soft%20pearl%20pink%20glazed%20834044.webp',
        title: 'Lágy gyöngy rózsaszín',
        description: 'Fotorealisztikus close-up: elegáns mandula körmök lágy gyöngyházfényű rózsaszínnel.',
        keywords: ['mandula', 'gyöngy', 'rózsaszín', 'glazed', 'elegáns'],
        uploadDate: '2026.08.09', aiGenerated: true, style: 'Kifinomult' },
    { id: 18, bg: 'bg-plum', height: 'h3',
        image: 'https://raw.githubusercontent.com/hutamkos-dotcom/images/refs/heads/main/R%C3%B6vid%20kocka%20k%C3%B6rm%C3%B6k%20s%C3%B6t%C3%A9tsz%C3%BCrke%20matt%20manik%C5%B1r%202026%E2%80%9106%E2%80%9123_14%E2%80%9128%E2%80%9150%201792x2304%2034%20HQ.webp',
        title: 'Rövid kocka sötétszürke matt',
        description: 'Rövid, szögletes kocka körmök sötétszürke matt manikűrrel.',
        keywords: ['rövid köröm', 'kocka forma', 'sötétszürke', 'matt', 'minimalista'],
        uploadDate: '2026.06.23', aiGenerated: true, style: 'Minimalista' }
];

const masonryCards = [...masonryCardsBase];
masonryCards.splice(Math.floor(masonryCards.length / 2), 0, articleContent);

const detailTexts = [
    { title: 'Alkalmi köröm kiválasztása',
      description: 'Az alkalmi köröm kiválasztásánál érdemes figyelembe venni az esemény hangulatát, hiszen egy elegánsabb alkalomhoz visszafogottabb, letisztultabb dizájn illik, míg egy lazább vagy bulis esemény bátrabban elbírja a színeket és a csillogást. Fontos, hogy a körmöd harmonizáljon az öltözéked színvilágával és stílusával.' },
    { title: 'Trendi színek 2026-ban',
      description: 'Az idei év trendszínei a lágy pasztellek és a merész, telített árnyalatok érdekes kombinációja. A halvány rózsaszín, barack és krémfehér tökéletes a hétköznapokra, míg a mélyvörös, burgundi és fekete az esti alkalmakhoz illenek.' },
    { title: 'Körömforma és arcforma',
      description: 'A körömforma kiválasztása nemcsak esztétikai kérdés. A mandula forma megnyújtja az ujjakat, elegáns benyomást kelt. A ballerina forma modern és merész. A kocka forma karakteres, erőteljes megjelenést ad.' }
];

const categoryOrder = ['szalon', 'kellekbolt', 'webaruhaz', 'tanfolyam', 'digitalis', 'nyomda'];

const categoryLists = {
    szalon: [
        { id: 'sz1', km: 3, name: 'The nail salon', address: '1052 Budapest, Petőfi u. 5.', phone: '+36 1 234 5601', web: 'https://thenailsalon.hu', facebook: 'https://facebook.com/thenailsalon', instagram: 'https://instagram.com/thenailsalon', tiktok: 'https://tiktok.com/@thenailsalon' },
        { id: 'sz2', km: 3, name: 'Nails to me salon', address: '1075 Budapest, Király u. 27.', phone: '+36 1 234 5602', web: 'https://nailstome.hu', facebook: 'https://facebook.com/nailstome', instagram: 'https://instagram.com/nailstome', tiktok: 'https://tiktok.com/@nailstome' },
        { id: 'sz3', km: 5, name: 'Mona körmei szalon', address: '1085 Budapest, József krt. 12.', phone: '+36 1 234 5603', web: 'https://monakormei.hu', facebook: 'https://facebook.com/monakormei', instagram: 'https://instagram.com/monakormei', tiktok: 'https://tiktok.com/@monakormei' },
        { id: 'sz4', km: 7, name: 'Saint Marie körömstúdió', address: '1136 Budapest, Balzac u. 42.', phone: '+36 1 234 5604', web: 'https://saintmarie.hu', facebook: 'https://facebook.com/saintmarie', instagram: 'https://instagram.com/saintmarie', tiktok: 'https://tiktok.com/@saintmarie' },
        { id: 'sz5', km: 9, name: 'Anita körömszalon', address: '1145 Budapest, Amerikai út 15.', phone: '+36 1 234 5605', web: 'https://anitakorom.hu', facebook: 'https://facebook.com/anitakorom', instagram: 'https://instagram.com/anitakorom', tiktok: 'https://tiktok.com/@anitakorom' },
        { id: 'sz6', km: 11, name: 'The salon of nails', address: '1183 Budapest, Üllői út 340.', phone: '+36 1 234 5606', web: 'https://salonofnails.hu', facebook: 'https://facebook.com/salonofnails', instagram: 'https://instagram.com/salonofnails', tiktok: 'https://tiktok.com/@salonofnails' },
        { id: 'sz7', km: 11, name: 'Nails 4 you', address: '1191 Budapest, Vak Bottyán u. 88.', phone: '+36 1 234 5607', web: 'https://nails4you.hu', facebook: 'https://facebook.com/nails4you', instagram: 'https://instagram.com/nails4you', tiktok: 'https://tiktok.com/@nails4you' }
    ],
    kellekbolt: [
        { id: 'kb1', km: 2, name: 'Nail Kellékbolt Központ', address: '1051 Budapest, Október 6. u. 4.', phone: '+36 1 345 6701', web: 'https://nailkellek.hu' },
        { id: 'kb2', km: 4, name: 'Beauty Supply Shop', address: '1074 Budapest, Rákóczi út 55.', phone: '+36 1 345 6702', web: 'https://beautysupply.hu' },
        { id: 'kb3', km: 6, name: 'Profi Körömkellék', address: '1097 Budapest, Ferenc krt. 22.', phone: '+36 1 345 6703', web: 'https://profikorom.hu' },
        { id: 'kb4', km: 8, name: 'Nails Store Budapest', address: '1132 Budapest, Váci út 105.', phone: '+36 1 345 6704', web: 'https://nailsstore.hu' },
        { id: 'kb5', km: 10, name: 'Manikűr Kellékek Boltja', address: '1152 Budapest, Szentmihályi út 133.', phone: '+36 1 345 6705', web: 'https://manikurkellek.hu' },
        { id: 'kb6', km: 12, name: 'Nail Art Shop', address: '1173 Budapest, Pesti út 12.', phone: '+36 1 345 6706', web: 'https://nailartshop.hu' }
    ],
    webaruhaz: [
        { id: 'wa1', online: true, name: 'nailshop.hu', web: 'https://nailshop.hu', phone: '+36 1 456 7801' },
        { id: 'wa2', online: true, name: 'körömkellék.hu', web: 'https://körömkellék.hu', phone: '+36 1 456 7802' },
        { id: 'wa3', online: true, name: 'beautywebshop.hu', web: 'https://beautywebshop.hu', phone: '+36 1 456 7803' },
        { id: 'wa4', online: true, name: 'manikur24.hu', web: 'https://manikur24.hu', phone: '+36 1 456 7804' },
        { id: 'wa5', online: true, name: 'nailsonline.hu', web: 'https://nailsonline.hu', phone: '+36 1 456 7805' }
    ],
    tanfolyam: [
        { id: 'tf1', km: 4, name: 'Kezdő körömépítő tanfolyam', address: '1077 Budapest, Wesselényi u. 33.', phone: '+36 1 567 8901', web: 'https://kezdotanfolyam.hu' },
        { id: 'tf2', km: 6, name: 'Haladó géllakk mesterkurzus', address: '1094 Budapest, Tűzoltó u. 41.', phone: '+36 1 567 8902', web: 'https://gellakkmester.hu' },
        { id: 'tf3', km: 8, name: 'Nail art workshop', address: '1141 Budapest, Fogarasi út 21.', phone: '+36 1 567 8903', web: 'https://nailartworkshop.hu' },
        { id: 'tf4', km: 10, name: 'Pedikűr szakoktatás', address: '1155 Budapest, Bem u. 8.', phone: '+36 1 567 8904', web: 'https://pedikurokt.hu' },
        { id: 'tf5', km: 12, name: 'Profi körömdíszítő képzés', address: '1182 Budapest, Üllői út 512.', phone: '+36 1 567 8905', web: 'https://profikepzes.hu' }
    ],
    digitalis: [
        { id: 'dg1', online: true, name: 'Nails1 mobilalkalmazás', web: 'https://nails1.hu/app' },
        { id: 'dg2', online: true, name: 'AR köröm-előnézet', web: 'https://nails1.hu/ar' },
        { id: 'dg3', online: true, name: 'Online konzultáció', web: 'https://nails1.hu/konzultacio' },
        { id: 'dg4', online: true, name: 'Digitális köröm-katalógus', web: 'https://nails1.hu/katalogus' },
        { id: 'dg5', online: true, name: 'AI dizájn generátor', web: 'https://nails1.hu/ai' }
    ],
    nyomda: [
        { id: 'ny1', online: true, isBook: true, bookYear: 2010, name: 'Nail Art Design Bible', web: 'https://konyvek.hu/nailart', phone: '+36 1 678 9001' },
        { id: 'ny2', online: true, isBook: true, bookYear: 2015, name: 'A modern manikűr kézikönyve', web: 'https://konyvek.hu/manikur', phone: '+36 1 678 9002' },
        { id: 'ny3', online: true, isBook: true, bookYear: 2017, name: 'Géllakk technikák enciklopédiája', web: 'https://konyvek.hu/gellakk', phone: '+36 1 678 9003' },
        { id: 'ny4', online: true, isBook: true, bookYear: 2019, name: 'Körömépítés lépésről lépésre', web: 'https://konyvek.hu/koromepites', phone: '+36 1 678 9004' },
        { id: 'ny5', online: true, isBook: true, bookYear: 2024, name: 'Nail Trends 2026 – A jövő körmei', web: 'https://konyvek.hu/trends', phone: '+36 1 678 9005' },
        { id: 'ny6', online: true, isBook: true, bookYear: 2022, name: 'Professzionális pedikűr atlasz', web: 'https://konyvek.hu/pedikur', phone: '+36 1 678 9006' }
    ]
};

const categoryLabels = {
    szalon: 'Szalonok',
    kellekbolt: 'Kellékboltok',
    webaruhaz: 'Webáruházak',
    tanfolyam: 'Tanfolyamok',
    digitalis: 'Digitális eszközök',
    nyomda: 'Könyvek'
};

const categoryRelevantIcons = {
    szalon: ['about', 'calendar', 'price', 'hours', 'phone', 'address', 'web'],
    kellekbolt: ['about', 'hours', 'phone', 'address', 'web'],
    webaruhaz: ['about', 'phone', 'web'],
    tanfolyam: ['about', 'calendar', 'hours', 'phone', 'address', 'web'],
    digitalis: ['about', 'web'],
    nyomda: ['about', 'phone', 'web']
};

const ICON_HINTS = {
    about:    { first: 'Engedd meg, hogy bemutatkozzam.', cta: 'Bemutatkozás megnyitása…' },
    calendar: { first: 'Nézd meg, van-e még szabad időpontom.', cta: 'Naptár megnyitása…' },
    price:    { first: 'Nézd meg áraimat.', cta: 'Árlista megnyitása…' },
    hours:    { first: 'Nézd meg nyitvatartási időmet.', cta: 'Nyitvatartás megnyitása…' },
    phone:    { first: 'Hívj bátran, hátha tudok segíteni.', cta: 'Hívás indítása…' },
    address:  { first: 'Látogass meg, hátha tudok segíteni.', cta: 'Térkép megnyitása…' },
    web:      { first: 'Látogasd meg az oldalaimat.', cta: 'Oldalak megnyitása…' }
};

const HU_DAYS = ['Vasárnap', 'Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat'];

const defaultHoursData = [
    null,
    [9, 19],
    [9, 19],
    [9, 19],
    [9, 20],
    [9, 20],
    [10, 16]
];

function formatHoursForDay(dowIndex) {
    const h = defaultHoursData[dowIndex];
    if (!h) return 'Zárva';
    const pad = (n) => n < 10 ? '0' + n : '' + n;
    return `${pad(h[0])}:00 – ${pad(h[1])}:00`;
}

function isSalonOpenNow() {
    const now = new Date();
    const dow = now.getDay();
    const h = defaultHoursData[dow];
    if (!h) return false;
    const cur = now.getHours() + now.getMinutes() / 60;
    return cur >= h[0] && cur < h[1];
}

function getKmClass(km) {
    if (km === undefined || km === null) return '';
    if (km <= 1) return 'km-1';
    if (km <= 2) return 'km-2';
    if (km <= 3) return 'km-3';
    if (km <= 4) return 'km-4';
    if (km <= 5) return 'km-5';
    if (km <= 6) return 'km-6';
    if (km <= 7) return 'km-7';
    if (km <= 8) return 'km-8';
    if (km <= 9) return 'km-9';
    if (km <= 10) return 'km-10';
    return 'km-far';
}

function getCalendarInfoForDay(salonId, offsetDays) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(today);
    target.setDate(today.getDate() + offsetDays);

    const yyyy = target.getFullYear();
    const mm = String(target.getMonth() + 1).padStart(2, '0');
    const dd = String(target.getDate()).padStart(2, '0');
    const dateStr = `${yyyy}.${mm}.${dd}.`;

    const dow = target.getDay();
    const closed = !defaultHoursData[dow];

    const seed = hashString(salonId + '_' + dateStr);
    const maxSlots = 4 + (seed % 2);
    const booked = closed ? 0 : (seed % (maxSlots + 1));

    return { dateStr, maxSlots, booked, closed };
}

// PRICE STATS
const SERVICE_CATALOG = [
    { key: 'klasszikus',   name: 'Klasszikus manikűr',  basePrice: 4500  },
    { key: 'gellakk',      name: 'Géllakkos manikűr',   basePrice: 6500  },
    { key: 'francia',      name: 'Francia manikűr',     basePrice: 7000  },
    { key: 'epites',       name: 'Műköröm építés',      basePrice: 12000 },
    { key: 'toltes',       name: 'Műköröm töltés',      basePrice: 8500  },
    { key: 'nailart',      name: 'Nail art díszítés',   basePrice: 3500  }
];

function getSalonServices(salonId) {
    const seed = hashString(salonId + '_services_v3');
    return SERVICE_CATALOG.map((s, i) => {
        const localSeed = (seed >> (i * 3)) & 0xFF;
        const factor = 0.8 + (localSeed / 255) * 0.4;
        const price = Math.round((s.basePrice * factor) / 100) * 100;
        return { ...s, price };
    });
}

function getSalonPriceStats(salonId) {
    const services = getSalonServices(salonId);
    const count = services.length;
    const sum = services.reduce((acc, s) => acc + s.price, 0);
    const avgRaw = count > 0 ? sum / count : 0;
    const avg = Math.round(avgRaw / 100) * 100;
    const sortedPrices = services.map(s => s.price).sort((a, b) => a - b);
    let median = 0;
    if (sortedPrices.length > 0) {
        const mid = Math.floor(sortedPrices.length / 2);
        const medianRaw = sortedPrices.length % 2 === 0
            ? (sortedPrices[mid - 1] + sortedPrices[mid]) / 2
            : sortedPrices[mid];
        median = Math.round(medianRaw / 100) * 100;
    }
    return { avg, median, count, services, sum };
}

function getRegionAverage() {
    const salons = categoryLists.szalon || [];
    if (salons.length === 0) return 0;
    let total = 0;
    salons.forEach(s => { total += getSalonPriceStats(s.id).avg; });
    const raw = total / salons.length;
    return Math.round(raw / 100) * 100;
}

// REVIEWS DATA
const HU_FIRST_NAMES = [
    'Anna', 'Eszter', 'Katalin', 'Zsófia', 'Nóra', 'Boglárka', 'Petra', 'Réka',
    'Vivien', 'Bianka', 'Dóra', 'Fanni', 'Kinga', 'Laura', 'Enikő', 'Bettina',
    'Mónika', 'Adél', 'Emese', 'Panna', 'Júlia', 'Kata', 'Lilla', 'Melinda',
    'Orsolya', 'Tímea', 'Virág', 'Zsuzsanna', 'Barbara', 'Csenge'
];

const HU_LAST_INITIALS = ['K.', 'N.', 'Sz.', 'H.', 'V.', 'T.', 'B.', 'M.', 'F.', 'P.', 'R.', 'L.', 'G.', 'D.'];

const REVIEW_SAMPLES_POSITIVE = [
    'Nagyon precíz munkát végzett, elégedett vagyok!',
    'Kedves fogadtatás, kiváló eredmény.',
    'Tiszta szalon, profi szakember – ajánlom!',
    'Csodás körmök, egy hónapja tartanak.',
    'Barátságos hangulat, gyors kiszolgálás.',
    'Kreatív ötleteivel elvarázsolt!',
    'Igényes munka, tisztaság, kedves személyzet.',
    'Már többször voltam, mindig tökéletes.',
    'Nyugodt környezet, remek eredmény.',
    'Odafigyel a részletekre, ez sokat számít.',
    'Pontos időpontok, kellemes légkör.',
    'Nagyszerű élmény, biztosan visszatérek!'
];

const REVIEW_SAMPLES_NEGATIVE = [
    'Sokat kellett várnom a foglalt időpontomra.',
    'A köröm 2 hét után elkezdett törni.',
    'Kicsit sietősen dolgozott, nem figyelt eléggé.',
    'Az ár magas a kapott minőséghez képest.',
    'Nem sikerült pontosan úgy, ahogy kértem.',
    'Foglalás után lemondták az időpontomat.',
    'Kevésbé volt tiszta a munkaeszköz.',
    'A díszítés hamar lekopott.',
    'Nem éreztem magam kényelmesen.',
    'A megbeszélt szín eltért a végeredménytől.'
];

function generateReviewerName(seed, i) {
    const firstIdx = (seed + i * 13) % HU_FIRST_NAMES.length;
    const lastIdx = (seed + i * 7) % HU_LAST_INITIALS.length;
    return `${HU_FIRST_NAMES[firstIdx]} ${HU_LAST_INITIALS[lastIdx]}`;
}

function getSalonVerdict(percent) {
    if (percent >= 85) return { text: 'Nagy valószínűséggel kiváló szakember.', cls: 'verdict-positive' };
    if (percent >= 70) return { text: 'Többnyire pozitív visszajelzések, de érdemes utánanézni.', cls: 'verdict-mixed' };
    if (percent >= 50) return { text: 'Vegyes visszajelzések – a döntés előtt olvasd el a véleményeket.', cls: 'verdict-mixed' };
    return { text: 'Több negatív visszajelzés érkezett – körültekintően válaszd.', cls: 'verdict-negative' };
}

function getSalonReviews(salonId) {
    const seed = hashString(salonId + '_reviews');
    const total = 30 + (seed % 90);
    const positiveCount = Math.floor(total * (0.55 + ((seed % 40) / 100)));
    const negativeCount = total - positiveCount;
    const percent = Math.round((positiveCount / total) * 100);
    const reviews = [];
    const dateBase = new Date();
    const posShow = Math.min(positiveCount, 8);
    const negShow = Math.min(negativeCount, 6);

    for (let i = 0; i < posShow; i++) {
        const idx = (seed + i * 7) % REVIEW_SAMPLES_POSITIVE.length;
        const daysAgo = ((seed >> (i + 1)) % 90) + 1;
        const d = new Date(dateBase);
        d.setDate(d.getDate() - daysAgo);
        reviews.push({
            type: 'positive',
            author: generateReviewerName(seed, i),
            text: REVIEW_SAMPLES_POSITIVE[idx],
            date: `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')}.`
        });
    }
    for (let i = 0; i < negShow; i++) {
        const idx = (seed + i * 5) % REVIEW_SAMPLES_NEGATIVE.length;
        const daysAgo = ((seed >> (i + 2)) % 120) + 5;
        const d = new Date(dateBase);
        d.setDate(d.getDate() - daysAgo);
        reviews.push({
            type: 'negative',
            author: generateReviewerName(seed + 100, i),
            text: REVIEW_SAMPLES_NEGATIVE[idx],
            date: `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')}.`
        });
    }
    return { total, positiveCount, negativeCount, percent, reviews };
}
