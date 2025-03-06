let guessDisplay = document.querySelector('.guess');
let resultDisplay = document.querySelector('.result');
let scoreDisplay = document.querySelector('.score');
let score = JSON.parse(localStorage.getItem('score')) || { Wins: 0, Losses: 0 };
let coMove = '';

function randomMove() {
    let raNum = Math.random();
    coMove = raNum < 0.5 ? 'Heads' : 'Tails';
}

function flipCoinAnimation(outcome) {
    let coin = document.createElement("div");
    coin.classList.add("coin");
    
    if (outcome === "Heads") {
        coin.classList.add("heads");
    } else {
        coin.classList.add("tails");
    }

    document.querySelector(".coin-container").appendChild(coin);

    // Show "Coin flipping, Wait..." while the coin is flipping
    resultDisplay.innerHTML = "Coin flipping, Wait...";
    resultDisplay.classList.remove("win", "lose");

    setTimeout(() => {
        coin.remove(); // Remove the coin after animation
        showResult(outcome); // Show the final result after the animation
    }, 2000); // Match this duration with the CSS animation duration
}

function showResult(outcome) {
    resultDisplay.innerHTML = `Coin landed on: <span class="highlight">${outcome}</span>`;
    resultDisplay.classList.add("highlight-effect");

    setTimeout(() => {
        resultDisplay.classList.remove("highlight-effect");
    }, 2000);
}

function updateScore(result) {
    if (result === "Win") {
        score.Wins += 1;
    } else {
        score.Losses += 1;
    }
    
    localStorage.setItem("score", JSON.stringify(score));
    scoreDisplay.innerHTML = `Wins: ${score.Wins} Losses: ${score.Losses}`;
}

function checkResult(guess) {
    randomMove();
    let result = coMove === guess ? "Win" : "Lose";
    updateScore(result);
    flipCoinAnimation(coMove);

    // Display the user's guess and the actual result after the coin lands
    setTimeout(() => {
        guessDisplay.innerHTML = `Your guess: ${guess}. Actual answer: ${coMove}.`;
        resultDisplay.innerHTML = `You ${result}!`;
        resultDisplay.classList.add(result === "Win" ? "win" : "lose");
    }, 2000); // Match this duration with the CSS animation duration
}

document.getElementById('headsBtn').addEventListener('click', () => checkResult('Heads'));
document.getElementById('tailsBtn').addEventListener('click', () => checkResult('Tails'));
document.getElementById('resetBtn').addEventListener('click', () => {
    score.Wins = 0;
    score.Losses = 0;
    localStorage.removeItem('score');
    scoreDisplay.innerHTML = `Wins: ${score.Wins} Losses: ${score.Losses}`;
});