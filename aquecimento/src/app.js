//Importes externos 
const express = require('express');
 const cors = require('cors');
 const logger = require('morgan');

 //Importes Internos
 const hellou = require('./Routes/hellou')

 //Controla O nosso app de backend
 const app = express();
 /**
  *  Configuração de permissao de acesso  aos nosso web Services / endpoint 
  * No caso iremos deixar nosso WS público
  */
app.use(cors());

//Configuracao dos Logs da aplicação
app.use(logger('dev'));

/**
 * Organiza todos os serviços relacionados a boas vindas (Hellou) no caminho /hellou
 */
app.use('/hellou',hellou);

module.exports = app;
