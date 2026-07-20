const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flightController');
const trainController = require('../controllers/trainController');
const busController = require('../controllers/busController');
const hotelController = require('../controllers/hotelController');
const validateSearch = require('../middleware/validationMiddleware');

router.get('/flight', validateSearch, flightController.searchFlights);
router.get('/train', validateSearch, trainController.searchTrains);
router.get('/bus', validateSearch, busController.searchBuses);
router.get('/hotel', validateSearch, hotelController.searchHotels);

module.exports = router;
