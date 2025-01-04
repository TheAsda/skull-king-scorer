import './nunjucks.js';
import { GameData } from './game-data.js';
import {
  calculateScore,
  getPreviousRoundsTotal,
  getRoundCards,
} from './calculation.js';

if (GameData.state.complete) {
  location.href = '/results';
}
if (GameData.state.roundsCount === 0 || GameData.state.playersCount === 0) {
  location.href = '/new-game';
}

function getCurrentRound() {
  const round = new URLSearchParams(location.search).get('round');
  if (!round || Number(round) > 10 || Number(round) < 1) {
    const url = new URL(location.href);
    url.searchParams.set('round', 1);
    location.href = url.href;
    return 0;
  } else {
    return Number(round) - 1;
  }
}

const round = getCurrentRound();

const roundData = GameData.state.rounds[round] ?? [];

document.querySelector('#round').innerHTML = nunjucks.render('round.njk', {
  roundIndex: round,
  roundCards: GameData.state.roundsCards[round],
  rounds: GameData.state.roundsCount,
  players: GameData.state.players.map((name, i) => ({
    name,
    index: i,
    bet: roundData[i]?.bet,
    take: roundData[i]?.take,
    bonuses: roundData[i]?.bonuses,
  })),
});

const form = document.querySelector('#round-form');

function attachCalculation(row) {
  const playerIndex = Number(row.dataset.index);
  const betSelect = row.querySelector(`select[name="bet-${playerIndex}"]`);
  const takeSelect = row.querySelector(`select[name="take-${playerIndex}"]`);
  const bonusesInput = row.querySelector(
    `input[name="bonuses-${playerIndex}"]`
  );
  const result = row.querySelector('[data-result]');
  function recalculateScore() {
    if (betSelect.value === '' || takeSelect.value === '') {
      if (round === 0) {
        result.textContent = '-';
      } else {
        result.textContent = getPreviousRoundsTotal(round, playerIndex);
      }
      return;
    }
    const bet = takeSelect.value ? Number(betSelect.value) : undefined;
    const take = takeSelect.value ? Number(takeSelect.value) : undefined;
    const bonuses = bonusesInput.value ? Number(bonusesInput.value) : undefined;
    GameData.savePlayer(round, playerIndex, {
      bet,
      take,
      bonuses,
    });
    const roundScore = calculateScore(round, bet, take, bonuses);
    if (round === 0) {
      result.textContent = roundScore.toString();
    } else {
      const resultScore =
        getPreviousRoundsTotal(round, playerIndex) + roundScore;
      result.textContent = `${resultScore} (${roundScore})`;
    }
  }
  recalculateScore();
  betSelect.addEventListener('change', recalculateScore);
  takeSelect.addEventListener('change', recalculateScore);
  bonusesInput.addEventListener('change', recalculateScore);
}

form.querySelectorAll('tr[data-index]').forEach(attachCalculation);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const { players, rounds, roundsCount } = GameData.state;
  for (let i = 0; i < players.length; i++) {
    const bet = formData.get(`bet-${i}`);
    const take = formData.get(`take-${i}`);
    if (bet === '' || take === '') {
      alert(`Игрок ${players[i]} не заполнен`);
      return;
    }
  }
  const takesSum = rounds[round].reduce((a, b) => a + b.take, 0);
  const roundCards = getRoundCards(round);
  if (takesSum !== roundCards) {
    if (takesSum + 1 === roundCards) {
      const krakenConfirmed = confirm('Был ли кракен разыгран в этом раунде?');
      if (!krakenConfirmed) {
        alert('Тогда проверьте введенные данные');
        return;
      }
    } else {
      alert('Тогда проверьте введенные данные');
      return;
    }
  }
  if (round === roundsCount - 1) {
    const finishConfirmed = confirm('Завершить игру?');
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
  url.searchParams.set('round', round + 2);
  location.href = url.href;
}

function prevRound() {
  const url = new URL(location.href);
  url.searchParams.set('round', round);
  location.href = url.href;
}

function finishGame() {
  GameData.markComplete();
  location.href = '/results';
}

document
  .querySelector('#previous-round-button')
  ?.addEventListener('click', prevRound);
