const arrayOfActions = ["Rock", "Paper", "Scissors"];
const playerState = {
  games: 0,
  points: 0,
  setGames(message) {
    this.games = this.games + 1;
    alert(
      message +
        ` You played ${this.games} ${
          this.games === 1 ? "game" : "games"
        } and won ${this.points}.`
    );
  },
  setPoints(message) {
    this.points = this.points + 1;
    this.setGames(message);
  },
};

const winMessage = (playerAction, computerAction) =>
  `You Win! ${playerAction} beats ${computerAction}.`;
const loseMessage = (playerAction, computerAction) =>
  `You Lose! ${computerAction} beats ${playerAction}.`;
const drawMessage = () => `Hahaha! Nobody won)))`;

const computerPlay = () =>
  arrayOfActions[Math.floor(Math.random() * arrayOfActions.length)];

let continueGame = false;

const game = () => {
  const computerAction = computerPlay();

  let playerActionValue = prompt(
    `Please select one of ${arrayOfActions.join(", ")}`
  );

  if (playerActionValue) {
    playerActionValue = playerActionValue.trim().toLowerCase();

    const playerAction =
      playerActionValue[0].toUpperCase() + playerActionValue.slice(1);

    if (playerAction === computerAction) {
      playerState.setGames(drawMessage());
    } else {
      switch (playerAction) {
        case "Rock":
          computerAction === "Paper"
            ? playerState.setGames(loseMessage(playerAction, computerAction))
            : playerState.setPoints(winMessage(playerAction, computerAction));
          break;
        case "Paper":
          computerAction === "Scissors"
            ? playerState.setGames(loseMessage(playerAction, computerAction))
            : playerState.setPoints(winMessage(playerAction, computerAction));
          break;

        case "Scissors":
          computerAction === "Rock"
            ? playerState.setGames(loseMessage(playerAction, computerAction))
            : playerState.setPoints(winMessage(playerAction, computerAction));
          break;
        default:
          alert("You have entered incorrect value");
      }
    }
  }
  continueGame = confirm("Do you want try again?");
};

const start = confirm("Do you want play?");

start && game();

while (continueGame) {
  game();
}

!continueGame && alert("Good luck you! See you soon!)))");
