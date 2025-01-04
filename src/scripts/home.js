import { GameData } from './game-data.js';

if (GameData.state.complete) {
  document.querySelector('#results-button').classList.remove('hidden');
}
