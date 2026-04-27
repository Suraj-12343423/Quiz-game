
// Questions Array
const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "High Tech Modern Language", correct: false },
            { text: "Hyper Transfer Machine Language", correct: false },
            { text: "Home Tool Markup Language", correct: false }
        ]
    },
    {
        question: "Which language is used for styling?",
        answers: [
            { text: "HTML", correct: false },
            { text: "CSS", correct: true },
            { text: "Java", correct: false },
            { text: "Python", correct: false }
        ]
    },
    {
        question: "Which is a JavaScript framework?",
        answers: [
            { text: "React", correct: true },
            { text: "Django", correct: false },
            { text: "Flask", correct: false },
            { text: "Laravel", correct: false }
        ]
    },
    {
        question: "Which is NOT a programming language?",
        answers: [
            { text: "Python", correct: false },
            { text: "Java", correct: false },
            { text: "HTML", correct: true },
            { text: "C++", correct: false }
        ]
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        answers: [
            { text: "//", correct: true },
            { text: "##", correct: false },
            { text: "<!-- -->", correct: false },
            { text: "**", correct: false }
        ]
    }
];

// Elements
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");

const currentQuestionEl = document.getElementById("current-question");
const totalQuestionsEl = document.getElementById("total-questions");
const scoreEl = document.getElementById("score");

const progressBar = document.getElementById("progress");

const finalScoreEl = document.getElementById("final-score");
const maxScoreEl = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");

// State
let currentQuestionIndex = 0;
let score = 0;

// Start Quiz
startBtn.addEventListener("click", startQuiz);

function startQuiz() {
    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    currentQuestionIndex = 0;
    score = 0;

    totalQuestionsEl.textContent = questions.length;
    scoreEl.textContent = score;

    showQuestion();
}

// Show Question
function showQuestion() {
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    currentQuestionEl.textContent = currentQuestionIndex + 1;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");

        if (answer.correct) {
            button.dataset.correct = true;
        }

        button.addEventListener("click", selectAnswer);
        answersContainer.appendChild(button);
    });

    updateProgress();
}

// Reset Answer Buttons
function resetState() {
    answersContainer.innerHTML = "";
}

// Handle Answer Click
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        score++;
        scoreEl.textContent = score;
    }

    Array.from(answersContainer.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        } else {
            button.classList.add("incorrect");
        }
        button.disabled = true;
    });

    setTimeout(() => {
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 1000);
}

// Update Progress Bar
function updateProgress() {
    const progressPercent = ((currentQuestionIndex) / questions.length) * 100;
    progressBar.style.width = progressPercent + "%";
}

// Show Result
function showResult() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreEl.textContent = score;
    maxScoreEl.textContent = questions.length;

    // Message Logic
    if (score === questions.length) {
        resultMessage.textContent = "Excellent!";
    } else if (score >= questions.length / 2) {
        resultMessage.textContent = "Good job!";
    } else {
        resultMessage.textContent = "Keep practicing!";
    }

    progressBar.style.width = "100%";
}

// Restart Quiz
restartBtn.addEventListener("click", () => {
    resultScreen.classList.remove("active");
    startScreen.classList.add("active");
});