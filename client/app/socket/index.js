const io = require('socket.io-client');
const serialize = require('serialize-javascript');
const API_URL = process.env.API_URL || 'http://localhost:3000';
const socket = io(API_URL);

//const chatId = '-1001367063674'; // dev
const chatId = '-1001756182739'; // prod

var postQueue = [];

function startThread(bot) {
  setInterval(() => {
    if (postQueue.length > 0) {
      var postToSend = postQueue.shift();
      if (postToSend && postToSend.length > 0) {
        console.log(postToSend)
        try {
         bot.sendMessage(chatId, postToSend);
        }
        catch (err) {
          console.log(err)
        }
      }
    }
  }, 100) 
}

function start(bot) {

  startThread(bot);

  socket.on("connect", () => {
    console.log(socket.id, 111); // "G5p5..."
  });

  socket.on('data', (data) => {
    console.log(data)
    postQueue.push(data);
    console.log(postQueue)
  });

}

module.exports = {
  start,
};
