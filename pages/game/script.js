import { GameData } from '../../game-data.js';
import { router } from '../../router.js';
import { calculateScore, getRoundCards } from '../../lib/calculation.js';

function getCurrentRound() {
  const { rounds } = GameData.get();
  if (rounds.length === 0) {
    return 0;
  }
  return rounds.length;
}

let currentRound = getCurrentRound();

const form = document.querySelector('#round-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const { players } = GameData.get();
  const round = [];
  for (let i = 0; i < players.length; i++) {
    const bet = formData.get(`bet-${i}`);
    const take = formData.get(`take-${i}`);
    const bonuses = formData.get(`bonuses-${i}`) || '0';
    if (bet === '' || take === '') {
      alert(`Игрок ${players[i]} не заполнен`);
      return;
    }
    round.push({
      bet: Number(bet),
      take: Number(take),
      bonuses: Number(bonuses),
    });
  }
  const takesSum = round.reduce((a, b) => a + b.take, 0);
  const roundCards = getRoundCards(currentRound);
  if (takesSum === roundCards) {
    GameData.saveRound(currentRound, round);
  } else if (takesSum + 1 === roundCards) {
    const krakenConfirmed = confirm('Был ли кракен разыгран в этом раунде?');
    if (krakenConfirmed) {
      GameData.saveRound(currentRound, round);
    } else {
      alert('Тогда проверьте введенные данные');
      return;
    }
  } else {
    alert(
      `Проверьте введенные данные, всего взяток должно быть ${roundCards}, но было ${takesSum}`
    );
    return;
  }
  nextRound();
});
const roundNumber = document.querySelector('#round-number');
const rows = form.querySelector('tbody');
const rowTemplate = document.querySelector('#player-row');

function renderRound(round) {
  roundNumber.textContent = `Раунд ${currentRound + 1}`;
  rows.innerHTML = '';
  const { players } = GameData.get();
  const roundData = getRoundData(round);
  for (let i = 0; i < players.length; i++) {
    const name = players[i];
    const row = rowTemplate.content.cloneNode(true);
    row.querySelector('.player-name').textContent = name;
    const betSelect = row.querySelector('select[name="bet"]');
    betSelect.name = `bet-${i}`;
    createOptions(betSelect, round);
    const takeSelect = row.querySelector('select[name="take"]');
    takeSelect.name = `take-${i}`;
    createOptions(takeSelect, round);
    takeSelect.addEventListener('change', (e) => {});
    const bonusesInput = row.querySelector('input[name="bonuses"]');
    bonusesInput.name = `bonuses-${i}`;

    if (roundData) {
      const { bet, take, bonuses } = roundData[i];
      betSelect.value = bet;
      takeSelect.value = take;
      bonusesInput.value = bonuses;
    }

    const result = row.querySelector('.result');

    recalculateScore();
    betSelect.addEventListener('change', recalculateScore);
    takeSelect.addEventListener('change', recalculateScore);
    bonusesInput.addEventListener('change', recalculateScore);
    function recalculateScore() {
      if (betSelect.value === '' || takeSelect.value === '') {
        if (round === 0) {
          result.textContent = '-';
        } else {
          result.textContent = getPreviousRoundsTotal(round, i);
        }
        return;
      }
      const bet = Number(betSelect.value);
      const take = Number(takeSelect.value);
      const bonuses = Number(bonusesInput.value || 0);
      const roundScore = calculateScore(currentRound, bet, take, bonuses);
      if (round === 0) {
        result.textContent = roundScore.toString();
      } else {
        result.textContent = `${
          getPreviousRoundsTotal(round, i) + roundScore
        } (${roundScore})`;
      }
    }
    rows.appendChild(row);
  }
}

function getRoundData(round) {
  const { rounds } = GameData.get();
  return rounds[round];
}

function getPreviousRoundsTotal(round, playerIndex) {
  const { rounds } = GameData.get();
  return rounds
    .slice(0, round)
    .reduce(
      (a, b, i) =>
        a +
        calculateScore(
          i,
          b[playerIndex].bet,
          b[playerIndex].take,
          b[playerIndex].bonuses
        ),
      0
    );
}

function createOptions(select, round) {
  const maxCards = getRoundCards(round);
  const option = document.createElement('option');
  option.value = '';
  option.textContent = '-';
  select.appendChild(option);

  for (let i = 0; i <= maxCards; i++) {
    const option = document.createElement('option');
    option.value = i.toString();
    option.textContent = i.toString();
    select.appendChild(option);
  }
}

renderRound(currentRound);

function nextRound() {
  currentRound++;
  if (currentRound === GameData.get().roundsCount) {
    router.navigate('/results');
    return;
  }
  renderRound(currentRound);
}

function prevRound() {
  currentRound = Math.max(0, currentRound - 1);
  renderRound(currentRound);
}

document
  .getElementById('previous-round-button')
  .addEventListener('click', prevRound);
