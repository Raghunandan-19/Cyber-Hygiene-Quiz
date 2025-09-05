// DOM Elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const progressBar = document.getElementById('progress-bar');
const currentQuestionElement = document.getElementById('current-question');
const scoreElement = document.getElementById('score');
const scoreTextElement = document.getElementById('score-text');
const feedbackElement = document.getElementById('feedback');

// Quiz state
let currentQuestionIndex = 0;
let score = 0;
let questions = [];
let selectedOption = null;

// Sample questions (in a real app, this would be loaded from questions.json)
const sampleQuestions = [
    {
        "question": "Which of the following is the strongest password?",
        "options": ["123456", "Password1", "MyC@tIsC00l!", "qwerty"],
        "answer": "MyC@tIsC00l!"
    },
    {
        "question": "What should you do if you receive a suspicious email from your bank?",
        "options": [
            "Click the link to check your account",
            "Reply with personal info",
            "Delete it or report as phishing",
            "Forward to friends"
        ],
        "answer": "Delete it or report as phishing"
    },
    {
        "question": "Enabling two-factor authentication (2FA) helps to:",
        "options": [
            "Make your password shorter",
            "Add an extra layer of security",
            "Share passwords safely",
            "Automatically update your system"
        ],
        "answer": "Add an extra layer of security"
    },
    {
        "question": "What is the best practice for using public Wi-Fi?",
        "options": [
            "Access sensitive accounts without concern",
            "Use a VPN when connecting to public Wi-Fi",
            "Disable your firewall for better speed",
            "Share your login credentials with friends"
        ],
        "answer": "Use a VPN when connecting to public Wi-Fi"
    },
    {
        "question": "What is a common sign of a phishing attempt?",
        "options": [
            "A legitimate-looking email from a known company",
            "Urgent requests for personal information",
            "Poor grammar and spelling errors",
            "All of the above"
        ],
        "answer": "All of the above"
    },
    {
        "question": "How often should you update your passwords?",
        "options": [
            "Every week",
            "Every 3-6 months",
            "Once a year",
            "Only when you forget them"
        ],
        "answer": "Every 3-6 months"
    },
    {
        "question": "What is the purpose of a password manager?",
        "options": [
            "To store all your passwords in one secure place",
            "To generate strong, unique passwords for each account",
            "To automatically fill in login forms",
            "All of the above"
        ],
        "answer": "All of the above"
    },
    {
        "question": "What should you do if you suspect your account has been hacked?",
        "options": [
            "Change your password immediately",
            "Enable two-factor authentication",
            "Check for any unauthorized activity",
            "All of the above"
        ],
        "answer": "All of the above"
    },
    {
        "question": "What is the purpose of a firewall?",
        "options": [
            "To block unauthorized access to your network",
            "To speed up your internet connection",
            "To create strong passwords",
            "To scan for viruses"
        ],
        "answer": "To block unauthorized access to your network"
    },
    {
        "question": "What is the most secure way to share sensitive files?",
        "options": [
            "Email them as attachments",
            "Use a secure file sharing service with encryption",
            "Post them on social media",
            "Store them on a public cloud without a password"
        ],
        "answer": "Use a secure file sharing service with encryption"
    }
];

// Initialize the quiz
function init() {
    // In a real app, we would load questions from questions.json
    // For now, we'll use the sample questions
    questions = getRandomQuestions(sampleQuestions, 5);
    
    // Set up event listeners
    startBtn.addEventListener('click', startQuiz);
    nextBtn.addEventListener('click', nextQuestion);
    restartBtn.addEventListener('click', restartQuiz);
    
    // Show start screen
    showScreen('start');
}

// Get a random selection of questions
function getRandomQuestions(questionPool, count) {
    const shuffled = [...questionPool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Show a specific screen
function showScreen(screenName) {
    // Hide all screens
    startScreen.classList.add('hidden');
    quizScreen.classList.add('hidden');
    resultScreen.classList.add('hidden');
    
    // Show the requested screen
    switch(screenName) {
        case 'start':
            startScreen.classList.remove('hidden');
            break;
        case 'quiz':
            quizScreen.classList.remove('hidden');
            break;
        case 'result':
            resultScreen.classList.remove('hidden');
            break;
    }
}

// Start the quiz
function startQuiz() {
    // Reset quiz state
    currentQuestionIndex = 0;
    score = 0;
    
    // Show first question
    showQuestion();
    
    // Show quiz screen
    showScreen('quiz');
    
    // Update progress
    updateProgress();
}

// Show the current question
function showQuestion() {
    const question = questions[currentQuestionIndex];
    
    // Set question text
    questionElement.textContent = question.question;
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    
    // Reset selected option
    selectedOption = null;
    
    // Create option buttons
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.dataset.option = index;
        button.addEventListener('click', selectOption);
        optionsContainer.appendChild(button);
    });
    
    // Disable next button until an option is selected
    nextBtn.disabled = true;
}

// Handle option selection
function selectOption(e) {
    // Remove selected class from all options
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Add selected class to clicked option
    const selectedButton = e.target;
    selectedButton.classList.add('selected');
    
    // Store selected option
    selectedOption = selectedButton.textContent;
    
    // Enable next button
    nextBtn.disabled = false;
}

// Move to next question or show results
function nextQuestion() {
    // Check if answer is correct
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.answer;
    
    // Update score if correct
    if (isCorrect) {
        score++;
    }
    
    // Show feedback for the current question
    showFeedback(isCorrect, currentQuestion.answer);
    
    // Move to next question after a delay
    setTimeout(() => {
        currentQuestionIndex++;
        
        // Check if quiz is complete
        if (currentQuestionIndex < questions.length) {
            showQuestion();
            updateProgress();
        } else {
            showResults();
        }
    }, 1500);
}

// Show feedback for the current question
function showFeedback(isCorrect, correctAnswer) {
    // Disable all options
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.disabled = true;
        
        // Highlight correct answer
        if (btn.textContent === correctAnswer) {
            btn.classList.add('correct');
        }
        
        // Highlight incorrect selection
        if (btn.classList.contains('selected') && !isCorrect && btn.textContent !== correctAnswer) {
            btn.classList.add('incorrect');
        }
    });
}

// Update progress bar and question counter
function updateProgress() {
    const progress = ((currentQuestionIndex) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
    currentQuestionElement.textContent = currentQuestionIndex + 1;
}

// Show quiz results
function showResults() {
    // Update score
    scoreElement.textContent = score;
    
    // Set score text and feedback based on performance
    let feedback = '';
    
    if (score <= 2) {
        scoreTextElement.textContent = "⚠️ You need to improve your cybersecurity hygiene.";
        feedback = `
            <p>Your score indicates that you should focus more on cybersecurity best practices. Here are some tips to improve:</p>
            <ul>
                <li>Use strong, unique passwords for each account</li>
                <li>Enable two-factor authentication (2FA) wherever possible</li>
                <li>Be cautious of suspicious emails and links</li>
                <li>Keep your software and devices updated</li>
                <li>Learn about common cyber threats and how to avoid them</li>
            </ul>
        `;
    } else if (score <= 4) {
        scoreTextElement.textContent = "⚠️ Moderate hygiene, some improvement needed.";
        feedback = `
            <p>You have a good basic understanding of cybersecurity, but there's room for improvement:</p>
            <ul>
                <li>Review your password practices and consider using a password manager</li>
                <li>Make sure all your devices have security software installed</li>
                <li>Be extra cautious with sensitive information online</li>
                <li>Regularly back up your important data</li>
            </ul>
        `;
    } else {
        scoreTextElement.textContent = "✅ Excellent cybersecurity hygiene awareness!";
        feedback = `
            <p>Great job! You demonstrate strong cybersecurity awareness. Keep it up by:</p>
            <ul>
                <li>Staying informed about the latest security threats</li>
                <li>Regularly reviewing your privacy settings on social media and other accounts</li>
                <li>Sharing your knowledge with friends and family</li>
                <li>Continuing to practice good security habits</li>
            </ul>
        `;
    }
    
    // Add additional tips based on missed questions
    feedback += `
        <div class="additional-tips">
            <h3>Additional Tips:</h3>
            <ul>
                <li>Always verify the sender's email address before clicking on links</li>
                <li>Use a VPN when connecting to public Wi-Fi networks</li>
                <li>Regularly review your bank and credit card statements for unauthorized transactions</li>
                <li>Be cautious of social engineering attempts, both online and offline</li>
                <li>Keep your operating system and applications updated with the latest security patches</li>
            </ul>
        </div>
    `;
    
    feedbackElement.innerHTML = feedback;
    
    // Show results screen
    showScreen('result');
}

// Restart the quiz
function restartQuiz() {
    // Get new random questions
    questions = getRandomQuestions(sampleQuestions, 5);
    
    // Restart the quiz
    startQuiz();
}

// Load questions from JSON file (in a real app)
async function loadQuestions() {
    try {
        const response = await fetch('questions.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading questions:', error);
        return sampleQuestions; // Fallback to sample questions
    }
}

// Initialize the quiz when the page loads
document.addEventListener('DOMContentLoaded', init);
