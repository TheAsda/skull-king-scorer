import { GameData } from '../../game-data.js';
import { router } from '../../router.js';

const form = document.querySelector('#rounds-form');
const fieldTemplate = document.querySelector('#round-field');
const nextButton = form.querySelector('#next');
const { roundsCount } = GameData.get();
for (let i = 0; i < roundsCount; i++) {
  const field = fieldTemplate.content.cloneNode(true);
  const fieldName = `round-${i}`;
  const label = field.querySelector('label');
  label.setAttribute('for', fieldName);
  label.textContent = `Раунд ${i + 1}`;
  const input = field.querySelector('input');
  input.setAttribute('name', `round-${i}`);
  input.defaultValue = i + 1;
  input.addEventListener('click', (e) => {
    input.select();
  });
  form.insertBefore(field, nextButton);
}
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const rounds = Array.from(Array(roundsCount), (_, i) =>
    Number(formData.get(`round-${i}`))
  );
  GameData.setRoundsCards(rounds);
  router.navigate('/game');
});
