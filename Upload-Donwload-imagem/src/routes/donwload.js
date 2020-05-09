const express = require('express');

const downloadCtrl = require('../controllers/DonwloadControllers');

const router = express.Router();

router.get('/listar', downloadCtrl.listar);
router.get('/normal/:id', downloadCtrl.normal);
router.get('/thumb/:id', downloadCtrl.thumb);



module.exports = router;