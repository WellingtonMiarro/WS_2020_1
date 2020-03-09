const express = require('express');

const hellouCtrl = require('../Controllers/hellou_controllers');
const router = express.Router();

//  Web Services / endpoint 

router.get('/', hellouCtrl.sendHellou); // passo o caminho unico 

module.exports  = router;