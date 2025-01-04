import { Storage } from './storage.js';

const defaultState = {
  playersCount: 0,
  roundsCount: 0,
  ready: false,
  players: [],
  roundsCards: [],
  rounds: [],
  complete: false,
};

let _state;

function load() {
  const gameData = Storage.get('gameData');
  if (gameData) {
    _state = gameData;
  } else {
    _state = defaultState;
  }
}

function save() {
  Storage.set('gameData', _state);
}

export const GameData = {
  get state() {
    if (_state === undefined) {
      load();
    }
    return _state;
  },
  newGame(roundsCount, roundsCards) {
    if (roundsCount !== roundsCards.length) {
      throw new Error('Invalid rounds count');
    }
    _state = {
      ...defaultState,
      roundsCount,
      roundsCards,
    };
    save();
  },
  startGame(playersCount, players) {
    if (playersCount !== players.length) {
      throw new Error('Invalid players count');
    }
    if (this.state.ready) {
      throw new Error('Game already filled');
    }
    _state.playersCount = playersCount;
    _state.players = players;
    _state.ready = true;
    save();
  },
  savePlayer(roundIndex, playerIndex, data) {
    if (!this.state.ready) {
      throw new Error('Game not filled');
    }
    if (_state.rounds[roundIndex] === undefined) {
      _state.rounds[roundIndex] = [];
    }
    _state.rounds[roundIndex][playerIndex] = data;
    save();
  },
  markComplete() {
    _state.complete = true;
    save();
  },
};
