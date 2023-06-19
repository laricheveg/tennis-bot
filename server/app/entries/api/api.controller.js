
const { signal } = require('../../socket');
const replay = require('../replayHelpers');

async function mirrorButtonClick(req, res) {
    try {
    const { buttonId } = req.params;

      replay.successWithData(res, 'Button', buttonId);
      signal('Button'+ buttonId)
      console.log('Была нажата кнопка ', buttonId)
    } catch (err) {
      // eslint-disable-next-line
      console.log('getAllUserIds ERROR --->', err);
      replay.serverError(res);
    }
  }

  module.exports = {
    mirrorButtonClick
};