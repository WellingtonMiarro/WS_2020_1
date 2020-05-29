const http = require('http');
const server = http.createServer();
const io = require('socket.io')(server);

io.on('connection', socket => {
    
    var Twitter = require('node-tweet-stream')
        socket = new Twitter({
      consumer_key: '', // cole sua chave Aqui 
      consumer_secret: '', // cole sua chave Aqui 
      token: '', // cole sua chave Aqui 
      token_secret: '' // cole sua chave Aqui 
    })

    socket.track('socket.io');
    socket.track('Telegram'); // o Tweets

    socket.on('tweet', function (tweet) { 
        io.emit('tweet', tweet);
        console.log('tweet received', tweet);
      })
       
      socket.on('error', function (err) {
        console.log('Error', err)
      })
});

module.exports = server;

