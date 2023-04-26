const arrayOfActions = ["Rock", "Paper", "Scissors"];
const userState = {
  games: 0,
  points: 0,
  setGames(message) {
    this.games = this.games + 1;
    alert(
      message +
        ` You played ${userState.games} ${
          userState.games === 1 ? "game" : "games"
        } and won ${userState.points}.`
    );
  },
  setPoints(message) {
    this.points = this.points + 1;
    this.setGames(message);
  },
};

let continueGame = false;

const winMessage = (playerAction, computerAction) =>
  `You Win! ${playerAction} beats ${computerAction}.`;
const loseMessage = (playerAction, computerAction) =>
  `You Lose! ${computerAction} beats ${playerAction}.`;
const drawMessage = () => `Hahaha! Nobody won)))`;

const computerPlay = () => {
  const computerAction =
    arrayOfActions[Math.floor(Math.random() * arrayOfActions.length)];
  return computerAction;
};

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
          ? userState.setGames(loseMessage(playerAction, computerAction))
          : computerAction === "Scissors"
          ? userState.setPoints(winMessage(playerAction, computerAction))
          : userState.setGames(drawMessage());
        break;
      case "Paper":
        computerAction === "Paper"
          ? userState.setGames(drawMessage()) 
          : computerAction === "Scissors"
          ? userState.setGames(loseMessage(playerAction, computerAction)) 
          : userState.setPoints(winMessage(playerAction, computerAction)) ;
        break;

      case "Scissors":
        computerAction === "Paper"
          ? userState.setPoints(winMessage(playerAction, computerAction)) 
          : computerAction === "Scissors"
          ? userState.setGames(drawMessage()) 
          : userState.setGames(loseMessage(playerAction, computerAction)) ;
        break;
      default:
        alert("You have entered incorrect value");
    }
  }
  continueGame = confirm("Do you want try again?");
};

confirm("Do you want play?") && game ()

while (continueGame) {
  game()
}

!continueGame && alert("Good luck you! See you soon!)))");
