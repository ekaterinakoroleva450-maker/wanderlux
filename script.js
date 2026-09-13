// ===================================================
// WanderLux — скрипты
// ===================================================

// ---------- БОКОВАЯ ПАНЕЛЬ ----------
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const sidebarClose = document.getElementById('sidebarClose');
const burger = document.getElementById('burger');

function openSidebar() {
    sidebar.classList.add('active');
    sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeSidebar() {
    sidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

if (burger) burger.addEventListener('click', openSidebar);
if (sidebarClose) sidebarClose.addEventListener('click', closeSidebar);
if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);

document.querySelectorAll('.sidebar-nav > a').forEach(link => {
    link.addEventListener('click', closeSidebar);
});

// ---------- ПРОГРЕСС-БАР + КНОПКА НАВЕРХ ----------
const toTop = document.getElementById('toTop');
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    if (scrollProgress) scrollProgress.style.width = scrolled + '%';

    if (window.scrollY > 400) toTop.classList.add('visible');
    else toTop.classList.remove('visible');
});
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===================================================
// ДАННЫЕ О ГОРОДАХ
// ===================================================
const cityData = {
    rome: { title: "Рим — Вечный город", country: "🇮🇹 Италия", image: "https://extraguide.ru/images/blog/2021/03-04-8azy54-kolizey.jpg", desc: "Рим — столица Италии и один из древнейших городов мира. Здесь переплетаются античность и современность.", sights: ["Колизей", "Ватикан и Собор Святого Петра", "Фонтан Треви", "Пантеон", "Римский форум"], days: "7 дней", price: "от 75 000 ₽" },
    venice: { title: "Венеция — город каналов", country: "🇮🇹 Италия", image: "https://cdn.nur.kz/images/1200x675/652f0f55ffa98337.jpeg", desc: "Венеция — уникальный город на воде, раскинувшийся на 118 островах.", sights: ["Площадь Сан-Марко", "Дворец Дожей", "Мост Риальто", "Остров Мурано", "Гранд-канал"], days: "5 дней", price: "от 62 000 ₽" },
    florence: { title: "Флоренция — колыбель Ренессанса", country: "🇮🇹 Италия", image: "https://extraguide.ru/images/pthumb/sp/25655dc413526d975a053da8e120baa13ba3d5c0.0f89f896.jpg", desc: "Флоренция — жемчужина Тосканы и родина итальянского Возрождения.", sights: ["Галерея Уффици", "Собор Санта-Мария-дель-Фьоре", "Понте-Веккьо", "Тосканские виноградники"], days: "6 дней", price: "от 68 000 ₽" },
    paris: { title: "Париж — город любви", country: "🇫🇷 Франция", image: "https://media-cdn.tripadvisor.com/media/photo-c/1280x250/17/15/6d/d6/paris.jpg", desc: "Париж — столица Франции и мировая столица моды, искусства и романтики.", sights: ["Эйфелева башня", "Лувр", "Нотр-Дам де Пари", "Монмартр", "Елисейские поля"], days: "5 дней", price: "от 80 000 ₽" },
    nice: { title: "Ницца — Лазурный берег", country: "🇫🇷 Франция", image: "https://static.tildacdn.com/lib/unsplash/2d24d9c3-3ee0-6c15-bcf3-b8378979306f/photo.jpg", desc: "Ницца — жемчужина Французской Ривьеры.", sights: ["Английская набережная", "Старый город", "Замковый холм", "Канны", "Монако"], days: "7 дней", price: "от 95 000 ₽" },
    provence: { title: "Прованс — лавандовые поля", country: "🇫🇷 Франция", image: "https://i.pinimg.com/originals/6f/55/d9/6f55d955c1185c4e39f7de3e217aca1f.jpg", desc: "Прованс — регион на юге Франции, известный лавандовыми полями.", sights: ["Лавандовые поля Валансоля", "Авиньон", "Экс-ан-Прованс", "Виноградники Кот-дю-Рон"], days: "6 дней", price: "от 72 000 ₽" },
    barcelona: { title: "Барселона — Гауди и море", country: "🇪🇸 Испания", image: "https://photos.admiral.md/c727a75f67898dd4f57c7dc1e0be8955.jpg", desc: "Барселона — столица Каталонии с уникальной архитектурой Гауди.", sights: ["Саграда Фамилия", "Парк Гуэль", "Готический квартал", "Пляж Барселонета", "Дом Бальо"], days: "6 дней", price: "от 70 000 ₽" },
    madrid: { title: "Мадрид — сердце Испании", country: "🇪🇸 Испания", image: "https://i.pinimg.com/originals/be/3c/36/be3c36d55fc90511170707e44cbbe43f.jpg", desc: "Мадрид — столица Испании, город музеев и королевских дворцов.", sights: ["Музей Прадо", "Королевский дворец", "Пуэрта-дель-Соль", "Парк Ретиро"], days: "5 дней", price: "от 65 000 ₽" },
    seville: { title: "Севилья — андалузская сказка", country: "🇪🇸 Испания", image: "https://i.pinimg.com/originals/27/96/19/279619951bcfe61edfea499fbd156fe8.jpg", desc: "Севилья — столица Андалусии и родина фламенко.", sights: ["Алькасар", "Кафедральный собор", "Площадь Испании", "Квартал Санта-Крус", "Шоу фламенко"], days: "5 дней", price: "от 60 000 ₽" },
    athens: { title: "Афины — колыбель цивилизации", country: "🇬🇷 Греция", image: "https://img.pac.ru/resorts/213097/247314/big/AEC9BFC07F0001017D432E7C889F2313.jpg", desc: "Афины — столица Греции с Акрополем и Парфеноном.", sights: ["Акрополь", "Парфенон", "Плака", "Храм Зевса Олимпийского", "Национальный музей"], days: "4 дня", price: "от 55 000 ₽" },
    santorini: { title: "Санторини — белый рай", country: "🇬🇷 Греция", image: "https://i.pinimg.com/originals/b3/93/81/b3938122aaad4a58428d6fb1b6b6647d.jpg", desc: "Санторини — вулканический остров с белоснежными домами и невероятными закатами.", sights: ["Город Ия и закаты", "Красный пляж", "Вулкан", "Раскопки Акротири", "Дегустация вин"], days: "7 дней", price: "от 110 000 ₽" },
    crete: { title: "Крит — остров легенд", country: "🇬🇷 Греция", image: "https://resize.tripster.ru/eyMEK-LdKkkH4hpLwg_4SgxBx64=/fit-in/1080x810/filters:no_upscale()/https://cdn.tripster.ru/photos/7248869d-4ccf-415a-9e6a-24ebb01ebf9c.jpg", desc: "Крит — крупнейший остров Греции и колыбель минойской цивилизации.", sights: ["Кносский дворец", "Ущелье Самарья", "Пляж Элафониси", "Ретимно", "Ираклион"], days: "8 дней", price: "от 85 000 ₽" },
    berlin: { title: "Берлин — город перемен", country: "🇩🇪 Германия", image: "https://i.pinimg.com/originals/86/ff/53/86ff530d9641d495f6b4ce592fe8cb65.jpg", desc: "Берлин — столица Германии и один из самых динамичных городов Европы.", sights: ["Бранденбургские ворота", "Рейхстаг", "Берлинская стена", "Музейный остров", "Александерплац"], days: "4 дня", price: "от 50 000 ₽" },
    bavaria: { title: "Бавария — сказочные замки", country: "🇩🇪 Германия", image: "https://travelask.ru/system/images/files/001/273/206/wysiwyg/753205_gallery.world1.jpg", desc: "Бавария — Альпы, замок Нойшванштайн и живописные деревни.", sights: ["Замок Нойшванштайн", "Мюнхен", "Альпы", "Озеро Кёнигсзе", "Октоберфест"], days: "6 дней", price: "от 78 000 ₽" },
    cologne: { title: "Кёльн и Рейн", country: "🇩🇪 Германия", image: "https://u-stena.ru/upload/iblock/835/835dc1a26a092c77848d653a99badb2f.jpg", desc: "Кёльн — древний город на Рейне с готическим собором.", sights: ["Кёльнский собор", "Круиз по Рейну", "Старый город", "Музей шоколада"], days: "5 дней", price: "от 58 000 ₽" }
};

// ===================================================
// МОДАЛКА ГОРОДА
// ===================================================
const modal = document.getElementById('cityModal');
const modalClose = document.getElementById('modalClose');

document.querySelectorAll('.tour-card').forEach(card => {
    card.addEventListener('click', e => {
        if (e.target.closest('.btn-book') || e.target.closest('.fav-toggle')) return;

        const cityKey = card.getAttribute('data-city');
        const city = cityData[cityKey];
        if (!city) return;

        document.getElementById('modalImage').src = city.image;
        document.getElementById('modalTitle').textContent = city.title;
        document.getElementById('modalCountry').textContent = city.country;
        document.getElementById('modalDesc').textContent = city.desc;
        document.getElementById('modalDays').textContent = city.days;
        document.getElementById('modalPrice').textContent = city.price;

        const sightsList = document.getElementById('modalSights');
        sightsList.innerHTML = '';
        city.sights.forEach(sight => {
            const li = document.createElement('li');
            li.textContent = sight;
            sightsList.appendChild(li);
        });

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
});
modal.addEventListener('click', e => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===================================================
// АВТОРИЗАЦИЯ
// ===================================================
const authModal = document.getElementById('authModal');
const openAuth = document.getElementById('openAuth');
const authClose = document.getElementById('authClose');
const userBox = document.getElementById('userBox');
const userName = document.getElementById('userName');
const logoutBtn = document.getElementById('logoutBtn');

const authTabs = document.querySelectorAll('.auth-tab');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const loginError = document.getElementById('loginError');
const regError = document.getElementById('regError');

function getUsers() {
    try { return JSON.parse(localStorage.getItem('wl_users') || '[]'); }
    catch { return []; }
}
function saveUsers(users) {
    localStorage.setItem('wl_users', JSON.stringify(users));
}
function getCurrentUser() {
    try { return JSON.parse(localStorage.getItem('wl_current') || 'null'); }
    catch { return null; }
}
function setCurrentUser(user) {
    if (user) localStorage.setItem('wl_current', JSON.stringify(user));
    else localStorage.removeItem('wl_current');
    updateAuthUI();
}
function updateAuthUI() {
    const user = getCurrentUser();
    if (user) {
        openAuth.style.display = 'none';
        userBox.style.display = 'flex';
        userName.textContent = '👤 ' + user.name;
    } else {
        openAuth.style.display = 'inline-flex';
        userBox.style.display = 'none';
    }
}
function openAuthModal() {
    authModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    loginError.textContent = '';
    regError.textContent = '';
}
function closeAuthModal() {
    authModal.classList.remove('active');
    document.body.style.overflow = '';
}

openAuth.addEventListener('click', openAuthModal);
authClose.addEventListener('click', closeAuthModal);
authModal.addEventListener('click', e => { if (e.target === authModal) closeAuthModal(); });

authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        authTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const target = tab.getAttribute('data-tab');
        if (target === 'login') {
            loginForm.classList.add('is-active');
            registerForm.classList.remove('is-active');
        } else {
            registerForm.classList.add('is-active');
            loginForm.classList.remove('is-active');
        }
        loginError.textContent = '';
        regError.textContent = '';
    });
});

registerForm.addEventListener('submit', e => {
    e.preventDefault();
    regError.textContent = '';
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim().toLowerCase();
    const password = document.getElementById('regPassword').value;
    const password2 = document.getElementById('regPassword2').value;

    if (name.length < 2) { regError.textContent = 'Имя должно содержать минимум 2 символа'; return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { regError.textContent = 'Введите корректный email'; return; }
    if (password.length < 6) { regError.textContent = 'Пароль должен содержать минимум 6 символов'; return; }
    if (password !== password2) { regError.textContent = 'Пароли не совпадают'; return; }

    const users = getUsers();
    if (users.some(u => u.email === email)) { regError.textContent = 'Пользователь с таким email уже существует'; return; }

    users.push({ name, email, password });
    saveUsers(users);
    setCurrentUser({ name, email });
    registerForm.reset();
    closeAuthModal();
    alert('✅ Регистрация успешна! Добро пожаловать, ' + name + '!');
});

loginForm.addEventListener('submit', e => {
    e.preventDefault();
    loginError.textContent = '';
    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value;

    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) { loginError.textContent = 'Неверный email или пароль'; return; }

    setCurrentUser({ name: user.name, email: user.email });
    loginForm.reset();
    closeAuthModal();
    alert('✅ Добро пожаловать, ' + user.name + '!');
});

logoutBtn.addEventListener('click', () => {
    setCurrentUser(null);
    alert('Вы вышли из аккаунта');
});

// ===================================================
// МОДАЛКА СВЯЗИ
// ===================================================
const contactModal = document.getElementById('contactModal');
const openContact = document.getElementById('openContact');
const openContactHero = document.getElementById('openContactHero');
const contactClose = document.getElementById('contactClose');
const contactForm = document.getElementById('contactForm');

function openContactModal() {
    closeSidebar();
    contactModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeContactModal() {
    contactModal.classList.remove('active');
    document.body.style.overflow = '';
}

if (openContact) openContact.addEventListener('click', openContactModal);
if (openContactHero) openContactHero.addEventListener('click', openContactModal);
if (contactClose) contactClose.addEventListener('click', closeContactModal);
contactModal.addEventListener('click', e => { if (e.target === contactModal) closeContactModal(); });

contactForm.addEventListener('submit', e => {
    e.preventDefault();
    alert('✅ Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.');
    contactForm.reset();
    closeContactModal();
});

// ===================================================
// АНИМИРОВАННЫЕ СЧЁТЧИКИ
// ===================================================
const statNums = document.querySelectorAll('.stat-num');
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.target, 10);
            const hasDecimal = el.dataset.decimal;
            const duration = 1600;
            const start = performance.now();

            function tick(now) {
                const p = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - p, 3);
                const value = Math.floor(eased * target);
                if (hasDecimal) {
                    el.textContent = (value / 10).toFixed(1);
                } else {
                    el.textContent = value.toLocaleString('ru-RU') + (target >= 1000 ? '+' : '');
                }
                if (p < 1) requestAnimationFrame(tick);
                else {
                    if (hasDecimal) el.textContent = (target / 10).toFixed(1);
                    else el.textContent = target.toLocaleString('ru-RU') + (target >= 1000 ? '+' : '');
                }
            }
            requestAnimationFrame(tick);
            statObserver.unobserve(el);
        }
    });
}, { threshold: 0.4 });
statNums.forEach(el => statObserver.observe(el));

// ===================================================
// FAQ АККОРДЕОН
// ===================================================
document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    q.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
    });
});

// ===================================================
// ИЗБРАННОЕ
// ===================================================
const favModal = document.getElementById('favModal');
const openFavorites = document.getElementById('openFavorites');
const favClose = document.getElementById('favClose');
const favList = document.getElementById('favList');
const favCount = document.getElementById('favCount');

function getFavs() {
    try { return JSON.parse(localStorage.getItem('wl_favs') || '[]'); }
    catch { return []; }
}
function saveFavs(favs) {
    localStorage.setItem('wl_favs', JSON.stringify(favs));
    updateFavUI();
}
function updateFavUI() {
    const favs = getFavs();
    favCount.textContent = favs.length;

    document.querySelectorAll('.fav-toggle').forEach(btn => {
        const id = btn.dataset.id;
        btn.classList.toggle('active', favs.includes(id));
    });
}

function renderFavList() {
    const favs = getFavs();
    if (!favs.length) {
        favList.innerHTML = '<div class="fav-empty">Пока пусто. Нажмите ♥ на карточке тура, чтобы добавить в избранное.</div>';
        return;
    }
    favList.innerHTML = '';
    favs.forEach(id => {
        const city = cityData[id];
        if (!city) return;
        const item = document.createElement('div');
        item.className = 'fav-item';
        item.innerHTML = `
            <img src="${city.image}" alt="${city.title}">
            <div class="fav-item-info">
                <h5>${city.title}</h5>
                <span>${city.country} · ${city.days} · ${city.price}</span>
            </div>
            <button class="fav-item-remove" data-id="${id}" aria-label="Удалить">×</button>
        `;
        favList.appendChild(item);
    });

    favList.querySelectorAll('.fav-item-remove').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            saveFavs(getFavs().filter(x => x !== id));
            renderFavList();
        });
    });
}

document.querySelectorAll('.fav-toggle').forEach(btn => {
    btn.addEventListener('click', e => {
        e.stopPropagation();
        const id = btn.dataset.id;
        let favs = getFavs();
        if (favs.includes(id)) favs = favs.filter(x => x !== id);
        else favs.push(id);
        saveFavs(favs);
    });
});

if (openFavorites) openFavorites.addEventListener('click', () => {
    renderFavList();
    favModal.classList.add('active');
    document.body.style.overflow = 'hidden';
});
if (favClose) favClose.addEventListener('click', () => {
    favModal.classList.remove('active');
    document.body.style.overflow = '';
});
favModal.addEventListener('click', e => {
    if (e.target === favModal) {
        favModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ---------- Escape закрывает всё ----------
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        modal.classList.remove('active');
        authModal.classList.remove('active');
        contactModal.classList.remove('active');
        favModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ---------- Инициализация ----------
updateAuthUI();
updateFavUI();