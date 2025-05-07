const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.get('/cities', gameController.getCities);
router.get('/vehicles', gameController.getVehicles);
router.get('/cops', gameController.getCops);
router.post('/start-game', gameController.startGame);
router.post('/cop-selection', gameController.copSelection);
router.post('/game/result', gameController.getGameResult);

module.exports = router;
