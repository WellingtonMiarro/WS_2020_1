const express = require('express');

const downloadCtrl = require('../controllers/DownloadController');

const router = express.Router();

router.get('/listar', downloadCtrl.listarTodosArquivos);
router.get('/:id', downloadCtrl.realizzarDownload);

module.exports = router;