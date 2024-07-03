let currentWord = '';
let currentTopic = '';
let guessedLetters = [];
let lives = 10;
let points = 0;
let rounds = 0;
let hintUsed = false;
let username = '';
let words = {};

async function loadWords() {
    try {
        const response = await fetch('words.json');
        words = await response.json();
    } catch (error) {
        console.error('Error loading words:', error);
    }
}

function startGame() {
    username = document.getElementById('username-input').value;
    if (username) {
        document.getElementById('welcome-screen').style.display = 'none';
        document.getElementById('topic-selection').style.display = 'block';
        document.getElementById('welcome-message').innerText = `Welcome, ${username}!`;
    } else {
        alert('Please enter your name.');
    }
}

function selectTopic(topic) {
    currentTopic = topic;
    document.getElementById('topic-selection').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    nextWord();
}

function nextWord() {
    const wordsList = words[currentTopic];
    currentWord = wordsList[Math.floor(Math.random() * wordsList.length)].toUpperCase();
    guessedLetters = [];
    lives = 10;
    hintUsed = false;
    document.getElementById('topic-title').innerText = currentTopic.toUpperCase();
    document.getElementById('word-display').innerText = '_ '.repeat(currentWord.length).trim();
    document.getElementById('lives').innerText = lives;
    document.getElementById('used-letters').innerText = '';
    document.getElementById('message').innerText = '';
    document.getElementById('hint').style.display = 'none';
    updatePoints();
    focusInput();
}

function guessLetter() {
    const input = document.getElementById('letter-input').value.toUpperCase();
    if (input && !guessedLetters.includes(input)) {
        guessedLetters.push(input);
        if (currentWord.includes(input)) {
            updateWordDisplay();
            points += hintUsed ? 5 : 10;
            if (isWordComplete()) {
                rounds++;
                if (rounds < 5) {
                    nextWord();
                } else {
                    endGame();
                }
            }
        } else {
            lives--;
            document.getElementById('lives').innerText = lives;
            if (lives === 0) {
                document.getElementById('message').innerText = `Game Over! The word was ${currentWord}`;
                document.getElementById('game').style.display = 'none';
                endGame();
            }
        }
        document.getElementById('used-letters').innerText = guessedLetters.join(' ');
    }
    document.getElementById('letter-input').value = '';
    focusInput();
}

function updateWordDisplay() {
    let display = '';
    for (const letter of currentWord) {
        display += guessedLetters.includes(letter) ? letter + ' ' : '_ ';
    }
    document.getElementById('word-display').innerText = display.trim();
}

function isWordComplete() {
    return currentWord.split('').every(letter => guessedLetters.includes(letter));
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        guessLetter();
    }
}

function showHint() {
    if (!hintUsed) {
        hintUsed = true;
        const hint = currentWord[0];
        document.getElementById('hint').innerText = `Hint: The word starts with ${hint}`;
        document.getElementById('hint').style.display = 'block';
    }
}

function updatePoints() {
    document.getElementById('total-points').innerText = points;
}

function endGame() {
    document.getElementById('game').style.display = 'none';
    document.getElementById('high-scores').style.display = 'block';
    saveScore();
    fetchHighScores();
}

function saveScore() {
    const data = { username, points };
    fetch('php/save_score.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

function fetchHighScores() {
    fetch('php/fetch_high_scores.php')
        .then(response => response.json())
        .then(data => {
            const highScoreList = document.getElementById('high-score-list');
            highScoreList.innerHTML = '';
            data.forEach(score => {
                const listItem = document.createElement('li');
                listItem.textContent = `${score.username} - ${score.points}`;
                highScoreList.appendChild(listItem);
            });
        });
}

function restartGame() {
    document.getElementById('high-scores').style.display = 'none';
    document.getElementById('topic-selection').style.display = 'block';
    points = 0;
    rounds = 0;
    updatePoints();
}

function focusInput() {
    document.getElementById('letter-input').focus();
}

// Load words from JSON file when the page loads
window.onload = loadWords;
