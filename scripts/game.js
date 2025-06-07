import "./nunjucks-init.js";
import { GameData } from "./game-data.js";
import {
  calculateScore,
  getPreviousRoundsTotal,
  getRoundCards
} from "./calculation.js";
import { getUrl } from "./url.js";
if (GameData.state.gameFinished) {
  location.href = getUrl("/results");
}
if (!GameData.state.gameInProgress) {
  location.href = getUrl("/new-game");
}
function getCurrentRound() {
  const round2 = new URLSearchParams(location.search).get("round");
  if (!round2 || Number(round2) > 10 || Number(round2) < 1) {
    const url = new URL(location.href);
    url.searchParams.set("round", 1 .toString());
    location.href = url.href;
    return 0;
  } else {
    return Number(round2) - 1;
  }
}
const round = getCurrentRound();
const roundData = GameData.state.rounds[round] ?? [];
document.querySelector("#round").innerHTML = nunjucks.render("round.njk", {
  roundIndex: round,
  roundCards: GameData.state.roundsCards[round],
  rounds: GameData.state.roundsCards.length,
  players: GameData.state.players.map((name, i) => ({
    name,
    index: i,
    bet: roundData[i]?.bet,
    take: roundData[i]?.take,
    bonuses: roundData[i]?.bonuses
  }))
});
document.querySelector("#header-title").replaceChildren(
  document.querySelector("#round-header").content.cloneNode(true)
);
const form = document.querySelector("#round-form");
function attachCalculation(row) {
  const playerIndex = Number(row.dataset.index);
  const betSelect = row.querySelector(
    `select[name="bet-${playerIndex}"]`
  );
  const takeSelect = row.querySelector(
    `select[name="take-${playerIndex}"]`
  );
  const bonusesInput = row.querySelector(
    `input[name="bonuses-${playerIndex}"]`
  );
  const result = row.querySelector("[data-result]");
  function recalculateScore() {
    if (betSelect.value === "" || takeSelect.value === "") {
      if (round === 0) {
        result.textContent = "-";
      } else {
        result.textContent = getPreviousRoundsTotal(
          round,
          playerIndex
        ).toString();
      }
      return;
    }
    const bet = takeSelect.value ? Number(betSelect.value) : 0;
    const take = takeSelect.value ? Number(takeSelect.value) : 0;
    const bonuses = bonusesInput.value ? Number(bonusesInput.value) : 0;
    GameData.savePlayer(round, playerIndex, {
      bet,
      take,
      bonuses
    });
    const roundScore = calculateScore(round, bet, take, bonuses);
    if (round === 0) {
      result.textContent = roundScore.toString();
    } else {
      const resultScore = getPreviousRoundsTotal(round, playerIndex) + roundScore;
      result.textContent = `${resultScore} (${roundScore})`;
    }
  }
  recalculateScore();
  betSelect.addEventListener("change", recalculateScore);
  takeSelect.addEventListener("change", recalculateScore);
  bonusesInput.addEventListener("change", recalculateScore);
}
form.querySelectorAll("tr[data-index]").forEach(attachCalculation);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const { players, rounds, roundsCards } = GameData.state;
  for (let i = 0; i < players.length; i++) {
    const bet = formData.get(`bet-${i}`);
    const take = formData.get(`take-${i}`);
    if (bet === "" || take === "") {
      alert(`\u0418\u0433\u0440\u043E\u043A ${players[i]} \u043D\u0435 \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D`);
      return;
    }
  }
  const takesSum = rounds[round].reduce((a, b) => a + b.take, 0);
  const roundCards = getRoundCards(round);
  if (takesSum !== roundCards) {
    if (takesSum + 1 === roundCards) {
      const krakenConfirmed = confirm("\u0411\u044B\u043B \u043B\u0438 \u043A\u0440\u0430\u043A\u0435\u043D \u0440\u0430\u0437\u044B\u0433\u0440\u0430\u043D \u0432 \u044D\u0442\u043E\u043C \u0440\u0430\u0443\u043D\u0434\u0435?");
      if (!krakenConfirmed) {
        alert("\u0422\u043E\u0433\u0434\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0432\u0432\u0435\u0434\u0435\u043D\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435");
        return;
      }
    } else {
      alert(`\u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0432\u0432\u0435\u0434\u0435\u043D\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 (${takesSum} \u0438\u0437 ${roundCards})`);
      return;
    }
  }
  if (round === roundsCards.length - 1) {
    const finishConfirmed = confirm("\u0417\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u044C \u0438\u0433\u0440\u0443?");
    if (!finishConfirmed) {
      return;
    }
    finishGame();
  } else {
    nextRound();
  }
});
function nextRound() {
  const url = new URL(location.href);
  url.searchParams.set("round", (round + 2).toString());
  document.querySelector("#round").classList.add("transition-forwards");
  location.href = url.href;
}
function prevRound() {
  const url = new URL(location.href);
  url.searchParams.set("round", round.toString());
  document.querySelector("#round").classList.add("transition-backwards");
  location.href = url.href;
}
function finishGame() {
  GameData.markComplete();
  location.href = getUrl("/results");
}
document.querySelector("#previous-round-button")?.addEventListener("click", prevRound);
