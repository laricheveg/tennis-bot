const socketIo = require('socket.io');
const db = require('../db/connection');

let globalSocket;

/* eslint-disable no-console */
const signal = async (data) => {

  try {
    globalSocket.emit('data', data);
  } catch (err) {
    console.log('Failed send signal, probably bot disconnected!');
  }
};

function init(server) {
  const io = socketIo.listen(server);

  io.on('connection', (socket) => {
    globalSocket = socket;
    // setInterval(() => socket.emit('data', { data: 'hi there!' }), 1000);
    console.log('xbet-bot connected!');

    socket.on('disconnect', () => {
      console.log('xbet-bot disconnected!');
    });
  });
}

module.exports = {
  init,
  signal,
};
