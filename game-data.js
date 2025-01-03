import { Storage } from './lib/storage.js';

const defaultState = {
  playersCount: 0,
  roundsCount: 0,
  ready: false,
  players: [],
  roundsCards: [],
  rounds: [],
};

export class GameData {
  static load() {
    const gameData = Storage.get('gameData');
    if (gameData) {
      this._state = gameData;
    } else {
      this._state = defaultState;
    }
  }

  static newGame(playersCount, roundsCount) {
    this._state = {
      ...defaultState,
      playersCount,
      roundsCount,
    };
    this.#save();
  }

  static get() {
    if (!this._state) {
      this.load();
    }
    return this._state;
  }

  static setPlayers(players) {
    if (this._state.ready) {
      throw new Error('Game already filled');
    }
    this._state.players = players;
    this.#save();
  }

  static setRoundsCards(rounds) {
    if (this._state.ready) {
      throw new Error('Game already filled');
    }
    this._state.roundsCards = rounds;
    this._state.ready = true;
    this.#save();
  }

  static saveRound(number, round) {
    if (!this._state.ready) {
      throw new Error('Game not filled');
    }
    this._state.rounds[number] = round;
    this.#save();
  }

  static get inProgress() {
    return this._state.ready;
  }

  static #save() {
    Storage.set('gameData', this._state);
  }
}
