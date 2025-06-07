import { GameData } from './game-data.js';

if (GameData.state.gameFinished) {
  document.querySelector('#results-button')!.classList.remove('hidden');
}
if(!GameData.state.gameFinished && GameData.state.gameInProgress) {
  document.querySelector('#continue-button')!.classList.remove('hidden');
}