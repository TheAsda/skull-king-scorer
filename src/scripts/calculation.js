import { GameData } from './game-data.js';

export function getRoundCards(round) {
  const { roundsCards } = GameData.state;
  const cards = roundsCards[round];
  if (typeof cards !== 'number') {
    throw new Error('Invalid max cards');
  }
  return cards;
}

export function calculateScore(round, bet, take, bonuses = 0) {
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

export function getPreviousRoundsTotal(round, playerIndex) {
  const { rounds } = GameData.state;
  return rounds
    .slice(0, round)
    .reduce(
      (a, b, i) =>
        a +
        calculateScore(
          i,
          b[playerIndex].bet,
          b[playerIndex].take,
          b[playerIndex].bonuses
        ),
      0
    );
}

export function calculateTotalScore(playerIndex) {
  const { rounds } = GameData.state;
  return rounds.reduce(
    (a, b, i) =>
      a +
      calculateScore(
        i,
        b[playerIndex].bet,
        b[playerIndex].take,
        b[playerIndex].bonuses
      ),
    0
  );
}