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

  let playerAction = prompt(
    `Please select one of ${arrayOfActions.join(", ")}`,
    "Rock"
  );

  if (playerAction) {
    playerAction =
      playerAction[0].toUpperCase() + playerAction.slice(1).toLowerCase();

    switch (playerAction) {
      case "Rock":
        computerAction === "Paper"
          ? playerState.setGames(loseMessage(playerAction, computerAction))
          : computerAction === "Scissors"
          ? playerState.setPoints(winMessage(playerAction, computerAction))
          : playerState.setGames(drawMessage());
        break;
      case "Paper":
        computerAction === "Paper"
          ? playerState.setGames(drawMessage())
          : computerAction === "Scissors"
          ? playerState.setGames(loseMessage(playerAction, computerAction))
          : playerState.setPoints(winMessage(playerAction, computerAction));
        break;

      case "Scissors":
        computerAction === "Paper"
          ? playerState.setPoints(winMessage(playerAction, computerAction))
          : computerAction === "Scissors"
          ? playerState.setGames(drawMessage())
          : playerState.setGames(loseMessage(playerAction, computerAction));
        break;
      default:
        alert("You have entered incorrect value");
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
