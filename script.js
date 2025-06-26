const questions = [
    { clue: "Türkiye'nin başkenti", answer: "ankara" },
    { clue: "En uzun nehir", answer: "nil" },
    { clue: "Kıtalararası İstanbul'un sembol köprüsü", answer: "bogazici" },
    { clue: "Ünlü Türk kahramanı, Çanakkale kahramanı", answer: "atatürk" },
    { clue: "Bu oyunun adı", answer: "kelime" }
];

let current = 0;
let score = 0;

const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const resultEl = document.getElementById('result');
const scoreEl = document.getElementById('score-value');
const submitBtn = document.getElementById('submit');
const nextBtn = document.getElementById('next');

function showQuestion() {
    const q = questions[current];
    questionEl.textContent = q.clue;
    answerEl.value = '';
    resultEl.textContent = '';
}

function checkAnswer() {
    const userAnswer = answerEl.value.trim().toLowerCase();
    const correct = questions[current].answer.toLowerCase();
    if (userAnswer === correct) {
        resultEl.textContent = 'Doğru!';
        score += correct.length;
        scoreEl.textContent = score;
    } else {
        resultEl.textContent = `Yanlış! Doğru cevap: ${questions[current].answer}`;
    }
    submitBtn.disabled = true;
    nextBtn.disabled = false;
}

function nextQuestion() {
    current++;
    if (current < questions.length) {
        submitBtn.disabled = false;
        nextBtn.disabled = true;
        showQuestion();
    } else {
        questionEl.textContent = 'Oyun bitti!';
        answerEl.style.display = 'none';
        submitBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        resultEl.textContent = `Toplam Puan: ${score}`;
    }
}

submitBtn.addEventListener('click', checkAnswer);
nextBtn.addEventListener('click', nextQuestion);

// ilk soru
document.addEventListener('DOMContentLoaded', () => {
    nextBtn.disabled = true;
    showQuestion();
});
