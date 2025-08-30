let score = JSON.parse(localStorage.getItem('score'));
if (!score) {
  score = { wins: 0, losses: 0, ties: 0 };
}
updateScoreElement();

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = '';

  if (playerMove === computerMove) {
    result = 'Tie.';
  } else if (
    (playerMove === 'rock' && computerMove === 'scissors') ||
    (playerMove === 'paper' && computerMove === 'rock') ||
    (playerMove === 'scissors' && computerMove === 'paper')
  ) {
    result = 'You win.';
  } else {
    result = 'You lose.';
  }

  if (result === 'You win.') score.wins++;
  else if (result === 'You lose.') score.losses++;
  else score.ties++;

  localStorage.setItem('score', JSON.stringify(score));

  document.querySelector('.js-result').innerHTML = result;
  document.querySelector('.js-moves').innerHTML =
    `You <img src="images/${playerMove}-emoji.png" class="move-icon"> 
     <img src="images/${computerMove}-emoji.png" class="move-icon"> Computer`;

  updateScoreElement();
}

function updateScoreElement() {
  document.querySelector('.js-score').innerHTML =
    `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();
  if (randomNumber < 1 / 3) return 'rock';
  else if (randomNumber < 2 / 3) return 'paper';
  else return 'scissors';
}

function resetScore() {
  score = { wins: 0, losses: 0, ties: 0 };
  localStorage.removeItem('score');
  updateScoreElement();
}
