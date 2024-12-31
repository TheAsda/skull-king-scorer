import { GameData } from './game-data.js';
import { Router } from './lib/router.js';
import { NewGamePage } from './page/new-game-page.js';
import { PlayersPage } from './page/players-page.js';
import { StartPage } from './page/start-page.js';

GameData.load();

const router = new Router();
router.addPage(new StartPage(router));
router.addPage(new NewGamePage(router));
router.addPage(new PlayersPage(router));
router.navigate('start-page');
