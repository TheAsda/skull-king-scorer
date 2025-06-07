import "./nunjucks-init.js";
import { GameData } from "./game-data.js";
import { getUrl } from "./url.js";
import { withTransition } from "./view-transition.js";
GameData.stopPreviousGame();
const form = document.querySelector("#new-game-form");
const roundCardsSection = form.querySelector("#round-cards");
const roundsSelector = form.querySelector(
  '[name="rounds-count"]'
);
const gameState = GameData.state;
const roundsCount = gameState.roundsCards.length;
if (roundsCount !== 0) {
  roundsSelector.value = roundsCount.toString();
}
function nextStep() {
  location.href = getUrl("/players");
}
function renderRoundCards(roundsCount2, initialValue = []) {
  withTransition(() => {
    roundCardsSection.innerHTML = nunjucks.render("round-cards.njk", {
      roundsCount: roundsCount2,
      initialValue
    });
  });
}
roundsSelector.addEventListener("change", () => {
  const roundsCount2 = Number(roundsSelector.value);
  renderRoundCards(roundsCount2);
});
renderRoundCards(Number(roundsSelector.value), gameState.roundsCards);
document.querySelectorAll(".preset-button").values().forEach((button) => {
  const rounds = Number(button.dataset.rounds);
  const cards = JSON.parse(button.dataset.cards ?? "[]");
  button.addEventListener("click", () => {
    form["rounds-count"].value = rounds.toString();
    renderRoundCards(rounds, cards);
  });
});
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const roundsCount2 = Number(formData.get("rounds-count"));
  const roundsCards = Array.from(Array(roundsCount2), (_, i) => {
    return Number(formData.get(`round-${i}`));
  });
  GameData.fillRoundsData(roundsCards);
  nextStep();
});
