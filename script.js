// --- 10 Вопросов ---
const questions = [
  {
    question: "Когда мы начали встречаться?",
    options: ["07.12.2024", "14.02.2024", "01.09.2024", "25.12.2024"],
    correctIndex: 0
  },
  {
    question: "Моя дата рождения?",
    options: ["13.10.2008", "15.11.2008", "01.01.2008", "23.02.2008"],
    correctIndex: 0
  },
  {
    question: "Моё любимое блюдо?",
    options: ["Паста карбонара", "Суши", "Пюре", "Борщ"],
    correctIndex: 2
  },
  {
    question: "Моя любимая игра (на данный момент)?",
    options: ["Minecraft", "Dota 2", "CS2", "GTA V"],
    correctIndex: 2
  },
  {
    question: "Сколько у меня максимум звезд в мл (Mobile Legends)?",
    options: ["25 звезд", "39 звезд", "50 звезд", "12 звезд"],
    correctIndex: 1
  },
  {
    question: "Как зовут мою маму?",
    options: ["Ольга", "Наташа", "Лена", "Света"],
    correctIndex: 2
  },
  {
    question: "Как зовут моего лучшего друга?",
    options: ["Дима", "Никита", "Максим", "Влад"],
    correctIndex: 1
  },
  {
    question: "Какой самый дорогой подарок я дарил тебе?",
    options: ["Брелок", "Фонарик", "Кольцо", "Серьги"],
    correctIndex: 2
  },
  {
    question: "Какой у меня рейтинг в шахматах по рапиду?",
    options: ["1000-1200", "1700-1800", "2200-2300", "1300-1400"],
    correctIndex: 1
  },
  {
    question: "Какая у меня мечта?",
    options: ["Стать миллионером", "Съездить в Японию", "Встретиться с тобой", "Купить машину"],
    correctIndex: 2
  }
];

// --- 5 Подарков ---
const giftTiers = {
  tier1: {
    title: "Милый плюшевый котёнок 🐈‍⬛",
    image: "https://ekt-basket-cdn-12.geobasket.ru/vol11384/part1138421/1138421683/images/big/1.webp?picsUpdate=0",
    description: "Твой подарок: Мягкий и уютный черный котик! Цена: 269 ₽"
  },
  tier2: {
    title: "Кольцо «Аметистовый дракон» 💍",
    image: "https://ekt-basket-cdn-11.geobasket.ru/vol2203/part220324/220324452/images/big/1.webp?picsUpdate=0",
    description: "Твой подарок: Стильное кольцо с аметистом и кельтским узором. Цена: 400 ₽"
  },
  tier3: {
    title: "Проводные наушники с микрофоном 🎧",
    image: "https://ekt-basket-cdn-17.geobasket.ru/vol3373/part337336/337336928/images/big/1.webp?picsUpdate=3",
    description: "Твой подарок: Наушники с объемным 3D звуком и хорошим микрофоном. Цена: 417 ₽"
  },
  tier4: {
    title: "Оверсайз футболка «Черная птица» 👕",
    image: "https://ekt-basket-cdn-17.geobasket.ru/vol4396/part439665/439665778/images/big/1.webp?picsUpdate=0",
    description: "Твой подарок: Стильная футболка с принтом гитариста-кота. Цена: 993 ₽"
  },
  tier5: {
    title: "Мини-принтер для печати фото 📸",
    image: "https://ekt-basket-cdn-10.geobasket.ru/vol5788/part578822/578822471/images/big/1.webp?picsUpdate=0",
    description: "Твой ГРАН-ПРИ: Портативный мини-принтер для мгновенной печати фотографий! Цена: 1217 ₽"
  }
};

let currentQuestion = 0;
let score = 0;

// Переход со страницы 1 на страницу 2
function goToPoem() {
  document.getElementById('intro-screen').classList.add('hidden');
  document.getElementById('poem-screen').classList.remove('hidden');
}

// Переход со страницы 2 на квиз
function startQuiz() {
  document.getElementById('poem-screen').classList.add('hidden');
  document.getElementById('quiz-screen').classList.remove('hidden');
  currentQuestion = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  const q = questions[currentQuestion];
  document.getElementById('question-number').innerText = `Вопрос ${currentQuestion + 1} из ${questions.length}`;
  document.getElementById('question-text').innerText = q.question;
  
  const progressPercent = ((currentQuestion) / questions.length) * 100;
  document.getElementById('progress').style.width = `${progressPercent}%`;

  const optionsContainer = document.getElementById('options-container');
  optionsContainer.innerHTML = '';

  q.options.forEach((option, index) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerText = option;
    btn.onclick = () => selectAnswer(index);
    optionsContainer.appendChild(btn);
  });
}

function selectAnswer(selectedIndex) {
  if (selectedIndex === questions[currentQuestion].correctIndex) {
    score++;
  }

  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById('quiz-screen').classList.add('hidden');
  document.getElementById('result-screen').classList.remove('hidden');

  document.getElementById('result-score').innerText = `Ты ответила правильно на ${score} из 10 вопросов!`;

  let gift;
  
  if (score >= 9) {
    gift = giftTiers.tier5;
  } else if (score >= 7) {
    gift = giftTiers.tier4;
  } else if (score >= 5) {
    gift = giftTiers.tier3;
  } else if (score >= 3) {
    gift = giftTiers.tier2;
  } else {
    gift = giftTiers.tier1;
  }

  document.getElementById('gift-image').src = gift.image;
  document.getElementById('gift-name').innerText = gift.title;
  document.getElementById('gift-description').innerText = gift.description;
}

// Перезапуск всего с самого начала (на экран поздравления)
function restartAll() {
  document.getElementById('result-screen').classList.add('hidden');
  document.getElementById('intro-screen').classList.remove('hidden');
}

function createParticles() {
  const container = document.getElementById('particles-container');
  const particleTypes = ['💜', '💖', '🎂', '✨', '🎈', '🎉', '🧁', '💙'];
  
  for (let i = 0; i < 25; i++) {
    const particle = document.createElement('div');
    particle.className = 'bg-particle';
    particle.innerText = particleTypes[Math.floor(Math.random() * particleTypes.length)];
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.animationDuration = `${6 + Math.random() * 6}s`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    particle.style.fontSize = `${16 + Math.random() * 20}px`;
    container.appendChild(particle);
  }
}

// Запуск при загрузке страницы
createParticles();
