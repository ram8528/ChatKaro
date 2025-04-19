const express = require('express');
const router = express.Router();
const { getBotResponse } = require('../controllers/chatbotController');

router.post('/', getBotResponse);

module.exports = router;
