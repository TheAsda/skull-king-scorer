import { GameData } from '../../game-data.js';
import { calculateScore } from '../../lib/calculation.js';

const { players, rounds } = GameData.get();

const rows = document.querySelector('tbody');

const template = document.querySelector('#result-row');

const results = [];

for (let i = 0; i < players.length; i++) {
  const name = players[i];
  const score = calculateTotalScore(i);

  results.push({ name, score });
}

results.sort((a, b) => b.score - a.score);

for (const { name, score } of results) {
  const row = template.content.cloneNode(true);
  row.querySelector('.player-name').textContent = name;
  row.querySelector('.score').textContent = score.toString();

  rows.appendChild(row);
}

const winnerScore = results[0].score;

const winners = results.filter(({ score }) => score === winnerScore);
document.querySelector('#winner-name').textContent = winners
  .map(({ name }) => name)
  .join(', ');


