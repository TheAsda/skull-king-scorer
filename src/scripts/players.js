import { GameData } from './game-data.js';
import './nunjucks.js';
import { getUrl } from './url.js';
import { withTransition } from './view-transition.js';

function startGame() {
  location.href = getUrl('/game');
}

const form = document.querySelector('#players-form');
const playersCountSelector = form.querySelector('[name="players-count"]');
const playerNamesSection = form.querySelector('#player-names');

function renderPlayersNames(playersCount) {
  withTransition(() => {
    playerNamesSection.innerHTML = nunjucks.render('players-names.njk', {
      playersCount,
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
    formData.get(`player-${i}`)
  );
  console.log(playersCount, players);
  GameData.startGame(playersCount, players);
  startGame();
});
