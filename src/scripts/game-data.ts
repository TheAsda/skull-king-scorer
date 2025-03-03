import { Storage } from './storage.js';

export type RoundData = {
  bet: number;
  take: number;
  bonuses: number;
};

export type State = {
  gameInProgress: boolean;
  players: string[];
  roundsCards: number[];
  rounds: RoundData[][];
  gameFinished: boolean;
};

const defaultState: State = {
  gameInProgress: false,
  players: [],
  roundsCards: [],
  rounds: [],
  gameFinished: false,
};

const GAME_DATA_KEY = 'gameData-v2';

const _state: State = loadState();

function loadState() {
  const gameData = Storage.get(GAME_DATA_KEY);
  if (gameData && validateGameData(gameData)) {
    return gameData;
  }
  return defaultState;
}

function save() {
  Storage.set(GAME_DATA_KEY, _state);
}

export const GameData = {
  get state() {
    return _state;
  },
  fillRoundsData(roundsCards: number[]) {
    if (!areArraysEqual(roundsCards, this.state.roundsCards)) {
      _state.rounds = [];
    }
    _state.roundsCards = roundsCards;
    save();
  },
  fillPlayersData(players: string[]) {
    if (!areArraysEqual(players, this.state.players)) {
      _state.rounds = [];
    }
    _state.players = players;
    save();
  },
  savePlayer(roundIndex: number, playerIndex: number, data: RoundData) {
    if (!this.state.gameInProgress) {
      throw new Error('Game is not in progress');
    }
    if (_state.rounds[roundIndex] === undefined) {
      _state.rounds[roundIndex] = [];
    }
    _state.rounds[roundIndex][playerIndex] = data;
    save();
  },
  startGame() {
    _state.gameInProgress = true;
    save();
  },
  markComplete() {
    _state.gameFinished = true;
    save();
  },
};

function areArraysEqual<T>(a: T[], b: T[]) {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

function validateGameData(state: unknown): state is State {
  return (
    typeof state === 'object' &&
    state !== null &&
    'gameInProgress' in state &&
    typeof state.gameInProgress === 'boolean' &&
    'players' in state &&
    Array.isArray(state.players) &&
    'roundsCards' in state &&
    Array.isArray(state.roundsCards) &&
    'rounds' in state &&
    Array.isArray(state.rounds) &&
    'gameFinished' in state &&
    typeof state.gameFinished === 'boolean'
  );
}
