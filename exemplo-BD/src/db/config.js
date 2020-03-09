const mongoose = require('mongoose');

const URI_DB = process.env.MONGODB_URI || 'mongodb://localhost/agenda'; // pega o valor caso ele exista 

mongoose
    .connect(URI_DB, { useNewUrlParser: true })
    .then(() => console.log("MongoDB Conectado!"))
    .catch( erro => console.log(erro));