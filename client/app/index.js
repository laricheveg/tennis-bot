const TelegramBot = require('node-telegram-bot-api');
const { stripIndent, stripIndents } = require('common-tags');
const config = require('config');
const socket = require('./socket');

const helper = require('./helpers');

const {
  BUTTON_TEXT,
  MESSAGE_TEXT,
  CONTACT_LIST,
} = require('./languages').RU;

const { 'api-key': API_KEY, 'proxy-url': PROXY_URL } = config.get('settings');

// eslint-disable-next-line no-console
console.log('\n ===> Bot has been started !');

const bot = new TelegramBot(API_KEY, {
  polling: {
    interval: 300,
    autoStart: true,
    params: {
      timeout: 10,
    },
  },
  // request: {
  //   proxy: PROXY_URL,
  // },
});

console.log('\n ===> Bot has been started !', PROXY_URL);

try {
  socket.start(bot);
} catch (err) {
  // eslint-disable-next-line
  console.log('server err --->', err);
}
