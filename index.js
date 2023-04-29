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

let continueGame = true;

const computerPlay = () =>
  arrayOfActions[Math.round(Math.random() * arrayOfActions.length)];

const playerChoice = () => {
  let playerActionValue = prompt(
    `Please select one of ${arrayOfActions.join(", ")}`
  );

  playerActionValue ? playerActionValue.trim().toLowerCase() : null;

  return (
    playerActionValue &&
    playerActionValue[0].toUpperCase() + playerActionValue.slice(1)
  );
};

const game = () => {
  const computerAction = computerPlay();
  const playerAction = playerChoice();

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
      case null:
        confirm("Do you want stop?")
          ? (continueGame = false)
          : (continueGame = true);
        break;
      default:
        alert("You have entered incorrect value");
    }
  }

  if (playerState.games % 5 === 0) {
    alert(
      `${
        playerState.games - playerState.points < playerState.points
          ? "You played 5 rounds and won!!!"
          : "You played 5 rounds and lose!!!"
      }`
    );

    continueGame = confirm("Do you want try again?");

    const setUserPoints =
      continueGame && confirm("Do you want delete your score?");
    if (setUserPoints) {
      playerState.games = 0;
      playerState.points = 0;
    }
  }
};

const start = confirm("Do you want play?");
start ? game() : (continueGame = false);

while (continueGame) game();

!continueGame && alert("Good luck you! See you soon!)))");
