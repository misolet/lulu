/* ═══════════════════════════════════════
   ПИСЬМО
═══════════════════════════════════════ */
const LETTERS = [
  "Ты — моё утро. Каждый день я просыпаюсь и думаю о тебе первым делом.",
  "Когда я смотрю на тебя, я вижу человека, которого я выбираю снова и снова — каждый день.",
  "Ты умнее, чем говоришь. Сильнее, чем думаешь. И нужнее мне, чем любые слова могут передать.",
  "Твоя улыбка — самое красивое, что я знаю на этом свете. Не убирай её.",
  "Ты достойна всего хорошего — без исключений, без условий. Просто потому что ты — ты.",
  "Ты не просто нужна мне. Ты та, без которой мой мир был бы совсем другим.",
  "Я горжусь тобой. Не за что-то особенное — а за то, что ты есть.",
  "Никакое расстояние не делает тебя дальше от моего сердца. Ты всегда рядом.",
  "Ты права в одном: тебя любят. Потому что я тебя люблю — сильно и по-настоящему.",
  "Твоя нежность — это редкий дар. Я рад каждый день, что ты делишься ею со мной.",
  "Ты — не обуза. Ты — якорь. Мой якорь. И я держусь за тебя.",
  "Когда ты сомневаешься в себе — помни: я не сомневаюсь в тебе никогда.",
  "Всё хорошее в моих днях как-то связано с тобой. Это не случайность.",
  "Ты сильная, даже когда устала. Я вижу это и ценю каждый раз.",
  "Твоё сердце такое большое — как ты умудряешься носить его в себе?",
  "Я замечаю тебя. Каждый раз. Всегда — даже когда ты думаешь, что незаметна.",
  "Ты заслуживаешь любовь без условий. Вот она — живая, настоящая, твоя.",
  "Рядом с тобой мир становится лучше. Это не случайность — это ты.",
  "Ты — моя любимая история, которую я хочу читать всю жизнь.",
  "Даже в самый обычный день ты делаешь его особенным — просто своим существованием.",
  "Твои руки, твой смех, твой взгляд — я скучаю по этому каждый раз, когда тебя нет рядом.",
  "Ты создана для любви. И я счастлив, что эта любовь — моя.",
  "Быть с тобой — это то, за что я благодарен каждый новый день.",
  "Ты моя тихая гавань в самый шумный и тяжёлый день.",
  "Я люблю тебя не за что-то — а просто потому что ты это ты.",
  "Твоя нежность лечит. Без лекарств, без слов — одним фактом своего существования.",
  "Знаешь, как выглядит счастье? Вот так — когда ты где-то рядом.",
  "Ты нужна мне. Просто так. Каждый день. Всегда.",
  "Ты та, о ком я думаю, когда мне хорошо — и та, кого я хочу рядом, когда трудно.",
  "Каждый день с тобой — это маленькое чудо, которое я не хочу принимать как само собой разумеющееся."
];

/* ═══════════════════════════════════════
   СТАТИСТИКА КОЛВО ДНЕЙ
═══════════════════════════════════════ */
const START_DATE = new Date('2025-09-26T00:00:00');

function updateStats() {
  const now  = new Date();
  const days = Math.max(0, Math.floor((now - START_DATE) / 86_400_000));
  document.getElementById('stat-days').textContent   = days;
  document.getElementById('stat-weeks').textContent  = Math.floor(days / 7);
  document.getElementById('stat-months').textContent = Math.floor(days / 30.44);
}
updateStats();

/* ═══════════════════════════════════════
  ЛОГИКА ПИСЬМА
═══════════════════════════════════════ */
let letterOpen = false;

function getDayIndex() {
  const days = Math.max(0, Math.floor((new Date() - START_DATE) / 86_400_000));
  return days % LETTERS.length;
}

function toggleLetter() {
  const card    = document.getElementById('letter-card');
  const chevron = document.getElementById('letter-chevron');
  const sub     = document.getElementById('letter-btn-sub');

  if (!letterOpen) {
    // populate
    const idx  = getDayIndex();
    const now  = new Date();
    const dateStr = now.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });

    document.getElementById('letter-body').textContent     = LETTERS[idx];
    document.getElementById('letter-date-label').textContent = dateStr;
    document.getElementById('letter-num-label').textContent  = `Письмо ${idx + 1} / ${LETTERS.length}`;

    card.classList.add('open');
    chevron.classList.add('flipped');
    sub.textContent = 'Завтра будет новое письмо';
    letterOpen = true;
    spawnFloatingHearts();
    setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 60);
  } else {
    card.classList.remove('open');
    chevron.classList.remove('flipped');
    sub.textContent = 'Нажми, чтобы открыть';
    letterOpen = false;
  }
}



/* ═══════════════════════════════════════
   ЗАГРУЗКА ФОТО
═══════════════════════════════════════ */
function loadPhoto(frameId, storageKey, input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    const src   = e.target.result;
    const frame = document.getElementById(frameId);
    frame.innerHTML = `<img src="${src}" alt=""><div class="photo-label">${frame.querySelector('.photo-label') ? '' : ''}</div>`;

    // rebuild label
    const labels = { 'frame-yana': 'Яна 🌸', 'frame-together': 'Мы 🤍' };
    frame.innerHTML = `<img src="${src}" alt=""><div class="photo-label">${labels[frameId] || ''}</div>`;

    try { localStorage.setItem('lulu_' + storageKey, src); } catch(e) {}
    showToast('Фото сохранено ✓');

    input.value = '';
  };
  reader.readAsDataURL(file);
}

function restorePhoto(frameId, storageKey) {
  const src = localStorage.getItem('lulu_' + storageKey);
  if (!src) return;
  const labels = { 'frame-yana': 'Яна 🌸', 'frame-together': 'Мы 🤍' };
  const frame = document.getElementById(frameId);
  frame.innerHTML = `<img src="${src}" alt=""><div class="photo-label">${labels[frameId] || ''}</div>`;
}

['yana','together'].forEach(key => {
  const frameMap = { yana: 'frame-yana', together: 'frame-together' };
  const storeMap = { yana: 'photo-yana', together: 'photo-together' };
  restorePhoto(frameMap[key], storeMap[key]);
});

/* ═══════════════════════════════════════
   ГАЛЛЛЕРИЯ
═══════════════════════════════════════ */
const GALLERY_KEY = 'lulu_gallery_v2';
let gallery = [];

try { gallery = JSON.parse(localStorage.getItem(GALLERY_KEY) || '[]'); } catch(e) {}

function renderGallery() {
  const grid = document.getElementById('gallery-grid');
  grid.innerHTML = '';

  if (gallery.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'gallery-empty';
    empty.textContent = 'Добавьте ваши совместные фото ♡';
    grid.appendChild(empty);
  } else {
    gallery.forEach((src, i) => {
      const thumb = document.createElement('div');
      thumb.className = 'gallery-thumb';

      const img = document.createElement('img');
      img.src = src;
      img.alt = '';
      img.onclick = () => openLightbox(src);

      const del = document.createElement('button');
      del.className = 'gallery-del';
      del.innerHTML = '×';
      del.title = 'Удалить';
      del.onclick = e => { e.stopPropagation(); removeGalleryPhoto(i); };

      thumb.appendChild(img);
      thumb.appendChild(del);
      grid.appendChild(thumb);
    });
  }

  // КПОПКА ДОБАВЛЕНИЯ
  const addDiv = document.createElement('div');
  addDiv.className = 'gallery-add';
  addDiv.textContent = '+';
  addDiv.onclick = () => document.getElementById('inp-gallery').click();
  grid.appendChild(addDiv);
}

function addToGallery(input) {
  const files = Array.from(input.files);
  let loaded  = 0;
  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = e => {
      gallery.push(e.target.result);
      loaded++;
      if (loaded === files.length) {
        saveGallery();
        renderGallery();
        showToast(`Добавлено ${files.length} фото 📷`);
      }
    };
    reader.readAsDataURL(file);
  });
  input.value = '';
}

function removeGalleryPhoto(i) {
  gallery.splice(i, 1);
  saveGallery();
  renderGallery();
}

function saveGallery() {
  try {
    localStorage.setItem(GALLERY_KEY, JSON.stringify(gallery));
  } catch(e) {
    showToast('Хранилище заполнено — удали старые фото');
  }
}

renderGallery();

/* ═══════════════════════════════════════
   LB
═══════════════════════════════════════ */
function openLightbox(src) {
  document.getElementById('lb-img').src = src;
  document.getElementById('lightbox').classList.add('active');
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

/* ═══════════════════════════════════════
   КНОПКА СЕРДЦА
═══════════════════════════════════════ */
const HEART_MSGS = [
  'Думаю о тебе прямо сейчас 💕',
  'Ты моя любимая 🌸',
  'Скучаю по тебе ✨',
  'Всё хорошо — ты со мной 💗',
  'Любовь — это ты 🌷',
  'Ты моя 💓'
];

function sendHeart() {
  const msg = HEART_MSGS[Math.floor(Math.random() * HEART_MSGS.length)];
  showToast(msg);
  spawnFloatingHearts();
}

/* ═══════════════════════════════════════
   АНИМАЦИЯ СЕРДЕЦ
═══════════════════════════════════════ */
const HEART_EMOJIS = ['💕', '🌸', '✨', '💗', '🌷', '💓'];

function spawnFloatingHearts() {
  const count = 8;
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const el       = document.createElement('div');
      const emoji    = HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)];
      const size     = 16 + Math.random() * 20;
      const left     = 15 + Math.random() * 70;
      const rot      = (Math.random() - 0.5) * 30 + 'deg';
      const rot2     = (Math.random() - 0.5) * 40 + 'deg';
      const duration = 1.2 + Math.random() * 0.6;

      el.textContent = emoji;
      el.style.cssText = `
        position: fixed;
        left: ${left}%;
        bottom: 25%;
        font-size: ${size}px;
        pointer-events: none;
        z-index: 500;
        --r: ${rot};
        --r2: ${rot2};
        animation: floatHeart ${duration}s ease forwards;
      `;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), duration * 1000 + 100);
    }, i * 80);
  }
}

/* ═══════════════════════════════════════
   T
═══════════════════════════════════════ */
let toastTimer = null;

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
}

/* ═══════════════════════════════════════
   ЦВЕТОШКИ
═══════════════════════════════════════ */
const PETAL_CHARS = ['🌸', '🌷', '✿', '❀'];

function createPetals() {
  const container = document.getElementById('petals');
  for (let i = 0; i < 16; i++) {
    const p    = document.createElement('div');
    p.className = 'petal';
    const char = PETAL_CHARS[Math.floor(Math.random() * PETAL_CHARS.length)];
    const dur  = 9 + Math.random() * 12;
    const left = Math.random() * 100;
    const size = 12 + Math.random() * 14;
    const sway = (Math.random() - 0.5) * 220;
    const rot  = Math.random() * 600;

    p.textContent = char;
    p.style.cssText = `
      left: ${left}%;
      font-size: ${size}px;
      animation-duration: ${dur}s;
      animation-delay: -${Math.random() * dur}s;
      --sway: ${sway}px;
      --rot: ${rot}deg;
    `;
    container.appendChild(p);
  }
}

createPetals();
