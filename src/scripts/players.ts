import { GameData } from './game-data.js';
import './nunjucks-init.js';
import { getUrl } from './url.js';
import { withTransition } from './view-transition.js';

function startGame() {
  GameData.startGame();
  location.href = getUrl('/game');
}

const form = document.querySelector<HTMLFormElement>('#players-form')!;
const playersCountSelector = form.querySelector<HTMLSelectElement>(
  '[name="players-count"]'
)!;
const playerNamesSection = form.querySelector('#player-names')!;

const gameState = GameData.state;

const playersCount = gameState.players.length;
if (playersCount !== 0) {
  playersCountSelector.value = playersCount.toString();
}

function renderPlayersNames(playersCount: number) {
  withTransition(() => {
    playerNamesSection.innerHTML = nunjucks.render('players-names.njk', {
      playersCount,
      players: gameState.players,
    });
  });
}

playersCountSelector.addEventListener('change', () => {
  const playersCount = Number(playersCountSelector.value);
  renderPlayersNames(playersCount);
});

renderPlayersNames(Number(playersCountSelector.value));

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const playersCount = Number(formData.get('players-count'));
  const players = Array.from(Array(playersCount), (_, i) =>
    formData.get(`player-${i}`)!.toString()
  );
  GameData.fillPlayersData(players);
  startGame();
});
