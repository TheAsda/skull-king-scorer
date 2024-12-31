import { GameData } from '../../game-data.js';
import { router } from '../../router.js';

const form = document.querySelector('#players-form');
const fieldTemplate = document.querySelector('#player-field');
const nextButton = form.querySelector('#next');
const { playersCount } = GameData.get();
for (let i = 0; i < playersCount; i++) {
  const field = fieldTemplate.content.cloneNode(true);
  const fieldName = `player-name-${i}`;
  const label = field.querySelector('label');
  label.setAttribute('for', fieldName);
  label.textContent = `Игрок ${i + 1}`;
  const input = field.querySelector('input');
  input.setAttribute('name', `player-${i}`);
  input.defaultValue = `Игрок ${i + 1}`;
  input.addEventListener('click', (e) => {
    input.select();
  });
  form.insertBefore(field, nextButton);
}
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const players = Array.from(Array(playersCount), (_, i) =>
    formData.get(`player-${i}`)
  );
  GameData.setPlayers(players);
  router.navigate('/rounds');
});
