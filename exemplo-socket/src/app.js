const http = require('http');
const server = http.createServer();

//socket "plugar a aplicação cliente"
const io = require('socket.io')(server); // conectando nosso socket com o server

let mensagem = []; // vetor de mensagens 
io.on('connection', socket => {
    socket.emit('mensagensAnteriores', mensagem);

    socket.on('enviarMensagem', objetoMensagem =>{// on = ouvir a mensagem enviada 
        mensagem.push(objetoMensagem)
        socket.broadcast.emit('mensagemRecebida', objetoMensagem);
    }); 
})


module.exports = server;