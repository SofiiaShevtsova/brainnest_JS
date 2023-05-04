const gameField = document.querySelector(".game-field");
const btnField = document.querySelector(".player-choice");
const round = document.querySelector(".game-field__round");
const points = document.querySelector(".game-field__points");
const result = document.querySelector(".result-game");

const arrayOfActions = ["Rock", "Paper", "Scissors"];

const playerState = {
  games: 0,
  points: 0,
  setGames() {
    this.games = this.games + 1;
  },
  setPoints() {
    this.points = this.points + 1;
    this.setGames();
  },
  setState() {
    this.games = 0;
    this.points = 0;
  },
};

const showRound = () => {
  round.textContent = `Round ${playerState.games + 1}`;
};

const showPoints = () => {
  points.textContent =
    playerState.games !== 0
      ? `You played ${playerState.games} ${
          playerState.games === 1 ? "game" : "games"
        } and won ${playerState.points}.`
      : "";
};

const addBtn = () => {
  const radioBtn = `${arrayOfActions
    .map((item) => `<button type="button" id="${item}">${item}</button>`)
    .join(" ")}
    `;
  btnField.insertAdjacentHTML("afterBegin", radioBtn);
};

const winMessage = (playerAction, computerAction) => {
  result.innerHTML = `<p class="win">You Win! ${playerAction} beats ${computerAction}.</p>`;
  playerState.setPoints();
};
const loseMessage = (playerAction, computerAction) => {
  result.innerHTML = `<p class="lose">You Lose! ${computerAction} beats ${playerAction}.</p>`;
  playerState.setGames();
};
const drawMessage = () => {
  result.innerHTML = `<p class="lose">Hahaha! Nobody won)))</p>`;
  playerState.setGames();
};
const resultMessage = () => {
  result.innerHTML =
    playerState.games - playerState.points < playerState.points
      ? `${result.innerHTML}<p class="win">You played ${playerState.games} rounds and won!!!</p>`
      : `${result.innerHTML}<p class="lose">You played ${playerState.games} rounds and lose!!!</p>`;
};

const computerPlay = () =>
  arrayOfActions[Math.floor(Math.random() * arrayOfActions.length)];

const game = (playerAction) => {
  const computerAction = computerPlay();

  if (playerAction === computerAction) {
    drawMessage();
  } else {
    switch (playerAction) {
      case "Rock":
        computerAction === "Paper"
          ? loseMessage(playerAction, computerAction)
          : winMessage(playerAction, computerAction);
        break;
      case "Paper":
        computerAction === "Scissors"
          ? loseMessage(playerAction, computerAction)
          : winMessage(playerAction, computerAction);
        break;
      case "Scissors":
        computerAction === "Rock"
          ? loseMessage(playerAction, computerAction)
          : winMessage(playerAction, computerAction);
        break;
    }
  }
  if (playerState.games === 5) {
    resultMessage();
    playerState.setState();
  }
  result.classList.add("open");
};

const playerChoice = (e) => {
  if (e.target.type === "button") {
    const playerAction = e.target.id;

    game(playerAction);

    showRound();
    showPoints();
  }
};

addBtn();

btnField.addEventListener("click", playerChoice);
result.addEventListener("click", () => {
  result.classList.remove("open");
});
