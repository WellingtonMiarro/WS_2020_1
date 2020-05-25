const http = require('http');
const express = require('express')
const server = http.createServer();

const io = require('socket.io')(server);

const Twit = require('twit');

var T = new Twit({
    consumer_key: 'ClkspMmRMOTAJvysssMpylY56', // Copie/cole sua chave aqui 
    consumer_secret: '34qxajeFKcPTvMocYT5xMdOTZrQohbOAO1btgpRihJuA1tGxlM', // Copie/cole sua chave aqui
    access_token: '138086873-jMTpMLwOTPKRRDQ9MnlgUvwIollZTadG3i9ZnRlz', // Copie/cole sua chave aqui
    access_token_secret: 'xFdxY1bV2aRaxvy5AJ16i7kCxsVNe6MzThTr5QgJxJzwJ', // Copie/cole sua chave aqui
    timeout_ms: 60 * 1000,  //tempo limite opcional da solicitação HTTP para aplicar a todas as solicitações.
    strictSSL: true,     // opcional - requer que os certificados SSL sejam válidos.
});
let stream = T.stream('statuses/filter', { track: 'Maisa' }); //A palavra ou Teg do Twitter entra Aqui!


function getTweetObject(tweet) {
  let tweetText = (tweet.extended_tweet) ? tweet.extended_tweet.full_text : tweet.text;

  // verifique se há retweets
  if (tweet.text.includes('RT @') && tweet.retweeted_status) {
      tweetText = (tweet.retweeted_status.extended_tweet) ? tweet.retweeted_status.extended_tweet.full_text : tweet.retweeted_status.text;
  }

  let TweetObject = {
      text: tweetText,
      user: tweet.user.name,
      location: (tweet.user.location !== null) ? tweet.user.location : '',
      followers: tweet.user.followers_count,
      userImage: tweet.user.profile_image_url,
      timestamp: tweet.timestamp_ms,
  };

  return TweetObject;
}
let tweet = [];
io.on('connection', socket=> {
    socket.emit('mostrarTweet', tweet);

  socket.on('tweet', () => {
      stream.on('novoTweet', mostrarTweet => {
        tweet.push(mostrarTweet)
        socket.broadcast.emit('mostrarTweet', tweet);

          let TweetObject = getTweetObject(novoTweet);

          socket.emit('mostrarTweet', TweetObject);

      });   
  });
});

   

module.exports = server;