import './nunjucks.js';
import { GameData } from './game-data.js';
import { calculateTotalScore } from './calculation.js';

const { players, complete } = GameData.state;

if (!complete) {
  location.href = getUrl('/game');
}

const results = [];
for (let i = 0; i < players.length; i++) {
  const name = players[i];
  const score = calculateTotalScore(i);

  results.push({ name, score });
}

results.sort((a, b) => b.score - a.score);

const winnerScore = results[0].score;
const winners = results.filter(({ score }) => score === winnerScore);

document.querySelector('#results').innerHTML = nunjucks.render('results.njk', {
  winner: winners.map(({ name }) => name).join(', '),
  players: results,
});
