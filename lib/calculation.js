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
  if (bet === 0) {
    const roundScore = 10 * getRoundCards(round);
    if (take === 0) {
      return roundScore;
    } else {
      return -1 * roundScore;
    }
  } else if (take === bet) {
    return bet * 20 + bonuses;
  } else {
    return Math.abs(bet - take) * -10;
  }
}
