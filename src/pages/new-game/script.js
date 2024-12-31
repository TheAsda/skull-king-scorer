import { router } from '../../router.js';
import { GameData } from '../../game-data.js';

const form = document.querySelector('#new-game-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const playersCount = Number(formData.get('players-count'));
  const roundsCount = Number(formData.get('rounds-count'));
  GameData.newGame(playersCount, roundsCount);
  router.navigate('/players');
});
