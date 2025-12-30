// Pool of cricket questions
const allQuestions = [
    {
        question: "What is Software Engineering?",
        options: [
            "Designing hardware systems",
            "Systematic approach to software development",
            "Writing programs only",
            "Testing hardware devices"
        ],
        answer: "Systematic approach to software development"
    },
    {
        question: "Which phase of SDLC converts requirements into a blueprint?",
        options: [
            "Requirement Analysis",
            "Design",
            "Coding",
            "Testing"
        ],
        answer: "Design"
    },
    {
        question: "Which model emphasizes risk analysis?",
        options: [
            "Waterfall Model",
            "RAD Model",
            "Spiral Model",
            "V-Model"
        ],
        answer: "Spiral Model"
    },
    {
        question: "Which Agile practice involves writing tests before code?",
        options: [
            "Pair Programming",
            "Refactoring",
            "Test-Driven Development",
            "Daily Stand-up"
        ],
        answer: "Test-Driven Development"
    },
    {
        question: "Which metric is used to estimate software size?",
        options: [
            "MTBF",
            "Cyclomatic Complexity",
            "LOC",
            "Defect Rate"
        ],
        answer: "LOC"
    },
    {
        question: "Which testing level tests individual modules?",
        options: [
            "System Testing",
            "Integration Testing",
            "Unit Testing",
            "Acceptance Testing"
        ],
        answer: "Unit Testing"
    },
    {
        question: "Which type of testing is performed by end users?",
        options: [
            "System Testing",
            "Unit Testing",
            "Acceptance Testing",
            "Integration Testing"
        ],
        answer: "Acceptance Testing"
    },
    {
        question: "Which type of cohesion is the worst?",
        options: [
            "Functional",
            "Sequential",
            "Logical",
            "Coincidental"
        ],
        answer: "Coincidental"
    },
    {
        question: "Which coupling type is the best?",
        options: [
            "Content coupling",
            "Common coupling",
            "Control coupling",
            "Data coupling"
        ],
        answer: "Data coupling"
    },
    {
        question: "What is the main objective of Software Quality Assurance?",
        options: [
            "Finding bugs",
            "Fixing errors",
            "Preventing defects",
            "Writing test cases"
        ],
        answer: "Preventing defects"
    },
    {
        question: "Which document defines project scheduling and resources?",
        options: [
            "SRS",
            "SPMP",
            "Test Plan",
            "User Manual"
        ],
        answer: "SPMP"
    },
    {
        question: "Which SCM activity keeps track of versions?",
        options: [
            "Change Control",
            "Configuration Audit",
            "Version Control",
            "Status Accounting"
        ],
        answer: "Version Control"
    },
    {
        question: "Which DevOps practice focuses on frequent code integration?",
        options: [
            "Continuous Monitoring",
            "Continuous Integration",
            "Continuous Deployment",
            "Containerization"
        ],
        answer: "Continuous Integration"
    },
    {
        question: "Which model is best for rapid development with user involvement?",
        options: [
            "Waterfall Model",
            "RAD Model",
            "Spiral Model",
            "V-Model"
        ],
        answer: "RAD Model"
    },
    {
        question: "Component-Based Software Engineering mainly promotes?",
        options: [
            "Manual coding",
            "Rewriting software",
            "Reusing components",
            "Heavy documentation"
        ],
        answer: "Reusing components"
    }
];




let currentQuestions = [];

/**
 * Fisher-Yates shuffle
 */
function shuffleArray(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

/**
 * Build a fresh quiz
 */
function initQuiz() {
    const quizForm = document.getElementById("quizForm");
    const out = document.getElementById("out");
    const progressText = document.getElementById("progressText");

    // Clear previous content
    quizForm.innerHTML = "";
    out.textContent = "";

    // Pick 5 random questions
    const shuffled = shuffleArray(allQuestions);
    currentQuestions = shuffled.slice(0, 5);

    // Update subtitle / progress
    progressText.textContent = `You have ${currentQuestions.length} questions. All the best!`;

    // Create question blocks
    currentQuestions.forEach((q, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.className = "question";
        questionDiv.dataset.index = index;

        const p = document.createElement("p");
        p.textContent = `${index + 1}. ${q.question}`;
        questionDiv.appendChild(p);

        q.options.forEach(optionText => {
            const label = document.createElement("label");
            label.className = "option";

            const input = document.createElement("input");
            input.type = "radio";
            input.name = `q${index}`;
            input.value = optionText;

            label.appendChild(input);
            label.appendChild(document.createTextNode(optionText));

            questionDiv.appendChild(label);
        });

        quizForm.appendChild(questionDiv);
    });

    // Add submit button
    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.textContent = "Submit Answers";
    submitBtn.className = "submit-btn";
    quizForm.appendChild(submitBtn);

    // Attach submit handler (overwrite any previous)
    quizForm.onsubmit = function (e) {
        e.preventDefault();
        gradeQuiz();
    };
}

/**
 * Grade the current quiz
 */
function gradeQuiz() {
    const out = document.getElementById("out");
    const quizForm = document.getElementById("quizForm");

    let score = 0;

    // Remove previous highlighting
    const questionDivs = quizForm.querySelectorAll(".question");
    questionDivs.forEach(div => {
        div.classList.remove("correct", "incorrect");
    });

    currentQuestions.forEach((q, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        const questionDiv = quizForm.querySelector(`.question[data-index="${index}"]`);

        if (selected && selected.value === q.answer) {
            score++;
            questionDiv.classList.add("correct");
        } else {
            questionDiv.classList.add("incorrect");
        }
    });

    out.textContent = `You scored ${score} / ${currentQuestions.length} 🎯`;

    // Disable further changes to prevent re-submitting
    const inputs = quizForm.querySelectorAll("input[type='radio']");
    inputs.forEach(i => i.disabled = true);
}

/**
 * Set up Start & Restart behavior
 */
document.addEventListener("DOMContentLoaded", () => {
    const startScreen = document.getElementById("startScreen");
    const quizScreen = document.getElementById("quizScreen");
    const startBtn = document.getElementById("startBtn");
    const restartBtn = document.getElementById("restartBtn");

    startBtn.addEventListener("click", () => {
        startScreen.classList.add("hidden");
        quizScreen.classList.remove("hidden");
        initQuiz();
    });

    restartBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        initQuiz();
    });
});
