const express = require('express');

const uploadCtrl = require('../controllers/UploadContrllers');

const router = express.Router();

router.post('/', uploadCtrl.realizarUpload)



module.exports = router;