import { GameData } from './game-data.js';

if (GameData.state.complete) {
  document.querySelector('#results-button').classList.remove('hidden');
}
if(!GameData.state.complete && GameData.state.ready) {
  document.querySelector('#continue-button').classList.remove('hidden');
}