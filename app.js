// ===== NAVIGATION =====
function goTo(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(screenId);
  if (target) {
    target.classList.add('active');
    target.scrollTop = 0;
  }
}

// ===== QUIZ DATA =====
const questions = [
  {
    icon: '🃏',
    text: 'כמה קלפים לוקחים בתחילת המשחק?',
    options: ['5 קלפים', '7 קלפים', '10 קלפים', '3 קלפים'],
    correct: 1,
    feedback: '✅ נכון! לוקחים 7 קלפים ליד בתחילת המשחק.'
  },
  {
    icon: '⚡',
    text: 'כמה אנרגיה אפשר לצרף בכל תור?',
    options: ['כמה שרוצים', '2 אנרגיות', 'אנרגיה אחת בלבד', 'בכלל אי אפשר'],
    correct: 2,
    feedback: '✅ נכון! בכל תור מצרפים אנרגיה אחת בלבד לפוקימון.'
  },
  {
    icon: '🥇',
    text: 'כמה קלפי פרס צריך לאסוף כדי לנצח?',
    options: ['3 קלפים', '4 קלפים', '5 קלפים', '6 קלפים'],
    correct: 3,
    feedback: '✅ נכון! צריך לאסוף 6 קלפי פרס כדי לנצח!'
  },
  {
    icon: '🍬',
    text: 'מה עושה הקלף "Rare Candy"?',
    options: [
      'נותן לך אנרגיה',
      'מצמיח פוקימון בסיסי ישר לשלב 2',
      'מרפא פוקימון פצוע',
      'מגרע קלפים ליריב'
    ],
    correct: 1,
    feedback: '✅ נכון! Rare Candy מצמיח צ\'ארמנדר ישר לצ\'אריזארד!'
  },
  {
    icon: '🏆',
    text: 'כמה קלפי פרס נותן EX פוקימון כשמנצחים אותו?',
    options: ['קלף אחד', '2 קלפים', '3 קלפים', 'אפס קלפים'],
    correct: 1,
    feedback: '✅ נכון! EX פוקימון נותן 2 קלפי פרס!'
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
    else if (i === idx)  btn.classList.add('wrong');
  });

  const feedback = document.getElementById('q-feedback');
  if (idx === q.correct) {
    score++;
    feedback.textContent = q.feedback;
  } else {
    feedback.textContent = '❌ לא נכון... ' + q.feedback;
    feedback.style.color = '#ff6b6b';
  }

  setTimeout(() => {
    currentQ++;
    if (currentQ < questions.length) {
      renderQuestion();
      document.getElementById('q-feedback').style.color = 'var(--fire-yellow)';
    } else {
      showResult();
    }
  }, 2000);
}

function showResult() {
  document.getElementById('quiz-area').classList.add('hidden');
  document.getElementById('quiz-result').classList.remove('hidden');

  const pct = score / questions.length;
  let icon, title, text;

  if (pct === 1) {
    icon = '🏆'; title = 'מושלם!';
    text = `ענית נכון על כל ${questions.length} השאלות! אתה אלוף הפוקימון! 🔥`;
  } else if (pct >= 0.6) {
    icon = '⭐'; title = 'כל הכבוד!';
    text = `ענית נכון על ${score} מתוך ${questions.length}. עוד קצת תרגול ותהיה אלוף!`;
  } else {
    icon = '📚'; title = 'כמעט!';
    text = `ענית נכון על ${score} מתוך ${questions.length}. נסה לעיין שוב במדריך ואז נסה שוב!`;
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
  document.getElementById('q-feedback').style.color = 'var(--fire-yellow)';
  renderQuestion();
}

// Init quiz when screen is shown (patch goTo)
const _goTo = goTo;
window.goTo = function(screenId) {
  _goTo(screenId);
  if (screenId === 'screen-quiz') {
    restartQuiz();
  }
};

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  renderQuestion();
});
