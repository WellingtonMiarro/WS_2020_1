const http = require('http');
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
let isStreamStopped = false;

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

io.on('connection', function (socket) {
  console.log('sockets conectado!');

  socket.on('tweet', () => {
      console.log('Reicinicair Tweets');
      stream.start();
      isStreamStopped = false;
  });

  socket.on('tweet', () => {
      console.log('começou a transmissão dos Tweets');

      if (!isStreamStopped) {
          stream.stop();
      }

      stream.on('tweet', function (tweet) {
          console.log('tweeting');

          let TweetObject = getTweetObject(tweet);

          socket.emit('latest tweets', TweetObject);
      });

      stream.start();

      isStreamStopped = false;
  });
});

module.exports = server;