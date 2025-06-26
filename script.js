let currentIndex = 0;
let totalScore = 0;
let questionScore = 100;
let revealed = [];
let globalTime = 240;
let globalInterval = null;
let finalTime = 10;
let finalInterval = null;

const totalTimeEl = document.getElementById('total-time');
const startButton = document.getElementById('start-button');
const gameSection = document.getElementById('game');
const startScreen = document.getElementById('start-screen');
const clueEl = document.getElementById('clue');
const wordDisplayEl = document.getElementById('word-display');
const questionScoreEl = document.getElementById('question-score');
const finalTimerEl = document.getElementById('final-timer');
const guessInput = document.getElementById('guess');
const requestBtn = document.getElementById('request-letter');
const stopBtn = document.getElementById('stop-timer');
const submitBtn = document.getElementById('submit-answer');
const passBtn = document.getElementById('pass-question');
const messageEl = document.getElementById('message');
const finalScoreEl = document.getElementById('final-score');

function startGame() {
    startScreen.classList.add('hidden');
    gameSection.classList.remove('hidden');
    globalInterval = setInterval(() => {
        globalTime--;
        updateTotalTime();
        if (globalTime <= 0) {
            endGame();
        }
    }, 1000);
    showQuestion();
}

function updateTotalTime() {
    totalTimeEl.textContent = globalTime;
}

function showQuestion() {
    if (currentIndex >= questions.length) {
        endGame();
        return;
    }
    const q = questions[currentIndex];
    clueEl.textContent = q.clue;
    questionScore = 100;
    questionScoreEl.textContent = questionScore;
    revealed = [];
    renderWord();
    messageEl.textContent = '';
    guessInput.value = '';
    guessInput.disabled = false;
    requestBtn.disabled = false;
    stopBtn.disabled = false;
    submitBtn.disabled = false;
    finalTimerEl.classList.add('hidden');
}

function renderWord() {
    const answer = questions[currentIndex].answer;
    const chars = answer.split('');
    const display = chars
        .map((ch, idx) => (revealed.includes(idx) ? ch.toUpperCase() : '_'))
        .join(' ');
    wordDisplayEl.textContent = display;
}

function requestLetter() {
    const answer = questions[currentIndex].answer;
    if (revealed.length >= answer.length - 1) return;
    let idx;
    do {
        idx = Math.floor(Math.random() * answer.length);
    } while (revealed.includes(idx));
    revealed.push(idx);
    questionScore = Math.max(0, questionScore - 10);
    questionScoreEl.textContent = questionScore;
    renderWord();
}

function stopTimer() {
    requestBtn.disabled = true;
    stopBtn.disabled = true;
    finalTime = 10;
    finalTimerEl.textContent = finalTime;
    finalTimerEl.classList.remove('hidden');
    finalInterval = setInterval(() => {
        finalTime--;
        finalTimerEl.textContent = finalTime;
        if (finalTime <= 0) {
            clearInterval(finalInterval);
            submitAnswer(true);
        }
    }, 1000);
}

function submitAnswer(timeout = false) {
    clearInterval(finalInterval);
    finalTimerEl.classList.add('hidden');
    guessInput.disabled = true;
    submitBtn.disabled = true;
    const correct = questions[currentIndex].answer.toLowerCase();
    const userAnswer = guessInput.value.trim().toLowerCase();
    if (!timeout && userAnswer === correct) {
        totalScore += questionScore;
        messageEl.textContent = 'Do\u011fru!';
    } else {
        messageEl.textContent = `Yanl\u0131\u015f! Do\u011fru cevap: ${questions[currentIndex].answer}`;
    }
    setTimeout(() => {
        currentIndex++;
        showQuestion();
    }, 1000);
}

function passQuestion() {
    const q = questions.splice(currentIndex, 1)[0];
    questions.push(q);
    showQuestion();
}

function endGame() {
    clearInterval(globalInterval);
    clearInterval(finalInterval);
    gameSection.classList.add('hidden');
    finalScoreEl.classList.remove('hidden');
    finalScoreEl.textContent = `Oyun bitti! Toplam Puan: ${totalScore}`;
}

startButton.addEventListener('click', startGame);
requestBtn.addEventListener('click', requestLetter);
stopBtn.addEventListener('click', stopTimer);
submitBtn.addEventListener('click', () => submitAnswer(false));
passBtn.addEventListener('click', passQuestion);
