const mongoose = require('mongoose');

const dbURI = 'mongodb://localhost/imagem';

mongoose.connect(dbURI, {
    userNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () => console.log('Mongoose! conectado em ' +dbURI));

mongoose.connection.on('disconnected', () => console.log('Mongoose! desconectado em ' +dbURI))

mongoose.connection.on('error', (erro) => console.log('Mongoose! Erro na conexão '+ erro))


process.on('SIGINT', () =>{
    mongoose.connection.close(()=> {
        console.log("Mongoose! desconectado pelo termino da aplicação");
        process.exit(0);
    });
});


