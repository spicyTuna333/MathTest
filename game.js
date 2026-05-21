


let highScore = parseInt(localStorage.getItem('highScore')) || 0
if (score > parseInt(highScore)) {
    localStorage.setItem('highScore', score);
    highScore = score
}
document.getElementById("highScoreDisplay").innerText = "Highscore : " + highScore
