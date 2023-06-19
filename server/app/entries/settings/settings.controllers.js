const { stripIndent } = require('common-tags');
const db = require('../../db/connection');
const replay = require('../replayHelpers');
const oldSettings = require('../../parser/settings');
const controllers = require('../admins/admins.controllers');


// enable or disable strategy
async function postSettings(req, res) {
  const token = req.headers['auth'] ? req.headers['auth'] : '';


  var users = await controllers.findByToken(token);
  if (users.length == 0) {

    replay.serverError(res, '401 error');
    return;
   } 
   
   var processed = {};
      Object.keys(req.body).forEach(key => {
        processed[key.toLowerCase()] = req.body[key]
      })
   
      let success;
      try {
        success = await db('settings')
          .where('id', '=', 1)
          .update(processed);

          oldSettings.optionsHelper(processed);
      } catch (err) {
        replay.serverError(res, 'Database error!');
    
        return;
      }


  replay.successWithData(res, 'Users have been received!', success);

}


// get strategie
async function getSettings(req, res) {
  const settings = await db
  .select('*')
  .from('settings')
  .first();

  replay.successWithData(res, 'Users have been received!', settings);
}

async function getSettingsSelf() {
   var data =  await db
    .select('*')
    .from('settings')
    .first();

    return data;

}


module.exports = {
  getSettings,
  postSettings,
  getSettingsSelf
};
