const express = require('express');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

require('./controllers/authControllers')(app); // repassar o app, o app é como se fosse objeto definido uma vez

app.listen(3000);