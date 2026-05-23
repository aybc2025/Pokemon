// ===== NAVIGATION =====
function goTo(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(screenId);
  if (target) {
    target.classList.add('active');
    window.scrollTo(0, 0);
    target.scrollTop = 0;
  }
}

// ===== QUIZ DATA — based on real deck & lessons learned =====
const questions = [
  {
    icon: '🥚',
    text: 'בתור הראשון במשחק — מה הדבר הכי חשוב לעשות?',
    options: [
      'לתקוף מיד עם הפוקימון הפעיל',
      'לשים צ\'ארמנדר בספסל ולצרף לו אנרגיה',
      'לשחק Lillie\'s Determination',
      'לחכות ולא לעשות כלום'
    ],
    correct: 1,
    feedback: '✅ נכון! תור 1 = צ\'ארמנדר בספסל + אנרגיה עליו. ככה מתחילים לבנות את צ\'אריזארד!'
  },
  {
    icon: '💃',
    text: 'מה תפקידו של אוריקוריו בתחילת המשחק?',
    options: [
      'לשמור בספסל ולא לצאת',
      'לנצח את המשחק לבד',
      'לנלחם בחזית בזמן שצ\'אריזארד מתכונן בספסל',
      'לשלוף אנרגיות מהחפיסה'
    ],
    correct: 2,
    feedback: '✅ נכון! אוריקוריו מגן בחזית בזמן שצ\'אריזארד גדל בשקט. הוא מקבל כוח מכל קלף אימון שמשחקים!'
  },
  {
    icon: '🍬',
    text: 'מה עושה Rare Candy?',
    options: [
      'נותן לך אנרגיה',
      'מרפא פוקימון פצוע',
      'מצמיח צ\'ארמנדר ישר לצ\'אריזארד — בלי לחכות לצ\'ארמליאון!',
      'שולף קלפים מהחפיסה'
    ],
    correct: 2,
    feedback: '✅ נכון! Rare Candy קופץ מעל שלב ביניים ישר לצ\'אריזארד. זה הקלף הכי חשוב בחפיסה!'
  },
  {
    icon: '🔥',
    text: 'מה עושה Firebreather?',
    options: [
      'מזיק ליריב',
      'מביא 2 אנרגיות אש מהחפיסה ישר לצ\'אריזארד',
      'מערבב את יד היריב',
      'מחזיר פוקימון מהגנוזה'
    ],
    correct: 1,
    feedback: '✅ נכון! Firebreather טוען 2 אנרגיות בבת אחת — כמו לדלג על 2 תורות של הכנה!'
  },
  {
    icon: '👩',
    text: 'מתי הזמן הכי טוב לשחק Lillie\'s Determination?',
    options: [
      'תמיד בתור הראשון',
      'כשהיד ריקה ואין קלפים טובים',
      'כשיש כבר הרבה קלפים ביד',
      'רק בסוף המשחק'
    ],
    correct: 1,
    feedback: '✅ נכון! Lillie\'s Determination שולפת 8 קלפים — הכי טוב כשהיד ריקה ואין Rare Candy או אנרגיה!'
  },
  {
    icon: '👑',
    text: 'מתי הכי כדאי להשתמש ב-Boss\'s Orders?',
    options: [
      'בתור הראשון תמיד',
      'כשהיריב חזק מדי',
      'כשיש פוקימון של היריב בספסל שכבר קיבל נזק — שלוף אותו לקרב!',
      'כדי למשוך קלפים'
    ],
    correct: 2,
    feedback: '✅ נכון! Boss\'s Orders בוחר מי ייצא לקרב. שלוף את הפוקימון הכי חלש של היריב ותגמור אותו!'
  }
];

// ===== QUIZ STATE =====
let currentQ = 0;
let score = 0;
let answered = false;

function renderQuestion() {
  const q = questions[currentQ];
  document.getElementById('q-num').textContent = currentQ + 1;
  document.getElementById('q-total').textContent = questions.length;
  document.getElementById('q-icon').textContent = q.icon;
  document.getElementById('q-text').textContent = q.text;
  document.getElementById('q-feedback').textContent = '';
  document.getElementById('q-feedback').style.color = 'var(--fire-yellow)';

  // Progress bar
  const pct = (currentQ / questions.length) * 100;
  document.getElementById('progress-bar').style.width = pct + '%';

  const optContainer = document.getElementById('q-options');
  optContainer.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-opt';
    btn.textContent = opt;
    btn.onclick = () => selectAnswer(i);
    optContainer.appendChild(btn);
  });
  answered = false;
}

function selectAnswer(idx) {
  if (answered) return;
  answered = true;
  const q = questions[currentQ];
  const buttons = document.querySelectorAll('.quiz-opt');

  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correct) btn.classList.add('correct');
    else if (i === idx) btn.classList.add('wrong');
  });

  const feedback = document.getElementById('q-feedback');
  if (idx === q.correct) {
    score++;
    feedback.textContent = q.feedback;
    feedback.style.color = '#69db7c';
  } else {
    feedback.textContent = '❌ לא נכון. ' + q.feedback;
    feedback.style.color = '#ff6b6b';
  }

  setTimeout(() => {
    currentQ++;
    if (currentQ < questions.length) {
      renderQuestion();
    } else {
      showResult();
    }
  }, 2200);
}

function showResult() {
  document.getElementById('progress-bar').style.width = '100%';
  document.getElementById('quiz-area').classList.add('hidden');
  document.getElementById('quiz-result').classList.remove('hidden');

  const pct = score / questions.length;
  let icon, title, text;
  if (pct === 1) {
    icon = '🏆'; title = 'אלוף אמיתי!';
    text = `ענית נכון על כל ${questions.length} השאלות! צ'אריזארד גאה בך! 🔥`;
  } else if (pct >= 0.6) {
    icon = '⭐'; title = 'כל הכבוד!';
    text = `ענית נכון על ${score} מתוך ${questions.length}. עוד קצת תרגול ותהיה אלוף!`;
  } else {
    icon = '📚'; title = 'כמעט!';
    text = `ענית נכון על ${score} מתוך ${questions.length}. קרא שוב את המדריך ונסה שוב!`;
  }

  document.getElementById('result-icon').textContent = icon;
  document.getElementById('result-title').textContent = title;
  document.getElementById('result-text').textContent = text;
}

function restartQuiz() {
  currentQ = 0;
  score = 0;
  answered = false;
  document.getElementById('quiz-area').classList.remove('hidden');
  document.getElementById('quiz-result').classList.add('hidden');
  renderQuestion();
}

// Patch goTo to init quiz when entering
const _origGoTo = goTo;
window.goTo = function(screenId) {
  _origGoTo(screenId);
  if (screenId === 'screen-quiz') restartQuiz();
};

document.addEventListener('DOMContentLoaded', renderQuestion);
