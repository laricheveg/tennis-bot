
const { signal } = require('../../socket');
const replay = require('../replayHelpers');

const TABLE_LOOKUP = {
  "1": "player 1",
  "2": "player 2",
  "3":"second service",
  "4": "smash",
  "5": "challenge"
}
async function mirrorButtonClick(req, res) {
    try {
    const { buttonId } = req.params;

      replay.successWithData(res, 'Button', buttonId);
      signal('Command: '+ (TABLE_LOOKUP[buttonId] ? TABLE_LOOKUP[buttonId] :  buttonId))
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