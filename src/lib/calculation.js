import { GameData } from '../game-data.js';

export function getRoundCards(round) {
  const { roundsCards } = GameData.get();
  const cards = roundsCards[round];
  if (typeof cards !== 'number') {
    throw new Error('Invalid max cards');
  }
  return cards;
}

export function calculateScore(round, bet, take, bonuses) {
  let score = bonuses;
  if (bet === 0) {
    const roundScore = 10 * getRoundCards(round);
    if (take === 0) {
      score += roundScore;
    } else {
      score -= roundScore;
    }
  } else if (take === bet) {
    score += bet * 20;
  } else {
    score -= Math.abs(bet - score) * 10;
  }
  return score;
}
