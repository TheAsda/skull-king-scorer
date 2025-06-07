import { Storage } from "./storage.js";
import { getUrl } from "./url.js";
const defaultState = {
  gameInProgress: false,
  players: [],
  roundsCards: [],
  rounds: [],
  gameFinished: false
};
const GAME_DATA_KEY = "gameData-v2";
const _state = loadState();
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
  fillRoundsData(roundsCards) {
    if (!areArraysEqual(roundsCards, this.state.roundsCards)) {
      _state.rounds = [];
    }
    _state.roundsCards = roundsCards;
    save();
  },
  fillPlayersData(players) {
    if (!areArraysEqual(players, this.state.players)) {
      _state.rounds = [];
    }
    _state.players = players;
    save();
  },
  savePlayer(roundIndex, playerIndex, data) {
    if (!this.state.gameInProgress) {
      throw new Error("Game is not in progress");
    }
    if (_state.rounds[roundIndex] === void 0) {
      _state.rounds[roundIndex] = [];
    }
    _state.rounds[roundIndex][playerIndex] = data;
    save();
  },
  newGame() {
    if (!this.state.gameFinished) {
      throw new Error("Game is not finished");
    }
    _state.gameFinished = false;
    _state.gameInProgress = false;
    _state.rounds = [];
    save();
  },
  stopPreviousGame() {
    if (this.state.gameFinished || this.state.gameInProgress) {
      if (confirm(
        "\u041E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u0430 \u043D\u0435\u0437\u0430\u0432\u0435\u0440\u0448\u0451\u043D\u043D\u0430\u044F \u0438\u0433\u0440\u0430. \u0425\u043E\u0442\u0438\u0442\u0435 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C \u0435\u0451? \u0415\u0441\u043B\u0438 \u043D\u0435 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C, \u0442\u0435\u043A\u0443\u0449\u0430\u044F \u0438\u0433\u0440\u0430 \u0431\u0443\u0434\u0435\u0442 \u0443\u0442\u0435\u0440\u044F\u043D\u0430."
      )) {
        location.href = getUrl("/game");
        return;
      }
      console.debug("Stopping previous game");
      _state.gameFinished = false;
      _state.gameInProgress = false;
      _state.rounds = [];
      save();
    }
  },
  startGame() {
    _state.gameInProgress = true;
    save();
  },
  markComplete() {
    _state.gameFinished = true;
    _state.gameInProgress = false;
    save();
  }
};
function areArraysEqual(a, b) {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}
function validateGameData(state) {
  return typeof state === "object" && state !== null && "gameInProgress" in state && typeof state.gameInProgress === "boolean" && "players" in state && Array.isArray(state.players) && "roundsCards" in state && Array.isArray(state.roundsCards) && "rounds" in state && Array.isArray(state.rounds) && "gameFinished" in state && typeof state.gameFinished === "boolean";
}
