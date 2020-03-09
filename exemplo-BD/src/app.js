//Importes externos
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const bodyParser = require('body-parser');
//Importes internos
require('./db/config');

const app = express();

app.use(cors());
app.use(logger('dev'));

// Define que os dados recebidos no corpo da requisição devem estar no fromato JSON 
app.use(bodyParser.json());

//Protege os acesso ao BD contra injeções de consultas maliciosas
app.use(mongoSanitize());

//Para teste inicial
app.get('/', (req, res)=> res.send('Ola'));

module.exports = app;