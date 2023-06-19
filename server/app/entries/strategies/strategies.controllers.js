const { stripIndent } = require('common-tags');
const db = require('../../db/connection');
const replay = require('../replayHelpers');


// enable or disable strategy
async function switchStrategy(req, res) {
  const { userId, strategy, action } = req.body;

  if (!userId || !strategy || action === undefined) {
    const message = 'Required userId, strategy and action!';
    replay.notFound(res, message);

    return;
  }

  let success;
  try {
    success = await db('strategies')
      .where('user_id', '=', userId)
      .update({ [strategy]: action });
  } catch (err) {
    replay.serverError(res, 'Database error!');

    return;
  }

  if (success) {
    const message = stripIndent`
      ${strategy.toUpperCase()} with user_id ${userId} has been ${action ? 'enabled' : 'disabled'}!
    `;
    replay.successOnly(res, message);

    return;
  }

  replay.notFound(res, 'User or strategy not found!');
}


// get strategies for user
async function getStrategiesByUserId(req, res) {
  const { userId } = req.params;
  let strategies;
  try {
    strategies = await db.select('str84')
      .from('strategies')
      .where('user_id', '=', userId);
  } catch (err) {
    replay.serverError(res, 'Database error!');

    return;
  }

  if (strategies.length) {
    const message = stripIndent`
      Strategies for user_id ${userId} have been received!
    `;
    const data = strategies[0];
    replay.successWithData(res, message, data);

    return;
  }

  replay.notFound(res, 'User not found!');
}

module.exports = {
  switchStrategy,
  getStrategiesByUserId,
};
