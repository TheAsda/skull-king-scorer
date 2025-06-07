import { GameData } from "./game-data.js";
import "./nunjucks-init.js";
import { getUrl } from "./url.js";
import { withTransition } from "./view-transition.js";
GameData.stopPreviousGame();
function startGame() {
  GameData.startGame();
  location.href = getUrl("/game");
}
const form = document.querySelector("#players-form");
const playersCountSelector = form.querySelector(
  '[name="players-count"]'
);
const playerNamesSection = form.querySelector("#player-names");
const gameState = GameData.state;
const playersCount = gameState.players.length;
if (playersCount !== 0) {
  playersCountSelector.value = playersCount.toString();
}
function renderPlayersNames(playersCount2) {
  withTransition(() => {
    playerNamesSection.innerHTML = nunjucks.render("players-names.njk", {
      playersCount: playersCount2,
      players: gameState.players
    });
  });
}
playersCountSelector.addEventListener("change", () => {
  const playersCount2 = Number(playersCountSelector.value);
  renderPlayersNames(playersCount2);
});
renderPlayersNames(Number(playersCountSelector.value));
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const playersCount2 = Number(formData.get("players-count"));
  const players = Array.from(
    Array(playersCount2),
    (_, i) => formData.get(`player-${i}`).toString()
  );
  GameData.fillPlayersData(players);
  startGame();
});
