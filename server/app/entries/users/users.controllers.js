const { stripIndent } = require('common-tags');

const db = require('../../db/connection');
const replay = require('../replayHelpers');
const { notifyUsers } = require('../../socket');


// get user by userId
async function getUserById(req, res) {
  const { id: userId } = req.params;
  let user;
  try {
    user = await db.select('*')
      .from('users')
      .where('id', '=', userId);
  } catch (err) {
    replay.serverError(res, 'Database error!');

    return;
  }

  if (user.length) {
    const message = stripIndent`
      User by id ${userId} have been received!
    `;
    const data = user[0];
    replay.successWithData(res, message, data);

    return;
  }

  replay.notFound(res, 'User not found!');
}

async function getAllUserIds(req, res) {
  try {
    let ids = await db.select('id').from('users');
    ids = ids.map(el => el.id);

    replay.successWithData(res, 'User ids have been received!', ids);
  } catch (err) {
    // eslint-disable-next-line
    console.log('getAllUserIds ERROR --->', err);
    replay.serverError(res);
  }
}

async function getAllUsers(req, res) {
  const users = await db.select('id', 'username', 'is_admin').from('users');
  console.log(users)

  replay.successWithData(res, 'Users have been received!', users);
}



async function updateDateForUser(req, res) {
  const { id: userId } = req.params;
  var date = req.body['date']
  
  success = await db('users')
  .where('id', '=', userId)
  .update({ 'expireddate': date, });

  if (new Date(date).getTime() > new Date().getTime() ) {
  success1 = await db('strategies')
  .where('user_id', '=', userId)
  .update({ 'str84': true, })
  }
  

  replay.successWithData(res, 'Users have been received!', success);


}

async function getStatsByUsers(req, res) {
  var dateNow = new Date().toISOString();

  console.log('test', dateNow)
  const users = await db.raw(`
    SELECT
        count(active) as Active,
        count(inactive) as inActive
    FROM (
        SELECT
          CASE WHEN expireddate >=  '${dateNow}' THEN 1 END active,
          CASE WHEN expireddate <  '${dateNow}' THEN 1 END inactive
        FROM users
    ) users;`)

  replay.successWithData(res, 'Users have been received!', users);

}



async function updateExpiredUsers() {

  var dateNow = new Date().toISOString();

  

  const users = await db.select('id', 'str84')
  .from('users')
  .leftOuterJoin('strategies', 'users.id', 'strategies.user_id')
  .where('expireddate', '<', `${dateNow}`)
  .andWhere('is_admin', '=', 'false')
  .andWhere(function() {
    this.where('str84', '=', true)
  })

  var userIds = [];

  var result = users.map(async user => {
   success = await db('strategies')
    .where('user_id', '=',  user['id'])
    .update({ 'str84': false });

    userIds.push(user.id)
  })

  console.log(userIds)
  Promise.all(result).then(data => {
    notifyUsers({userIds: userIds})
  })
 

}


async function createUser(req, res) {
  const { userId, username } = req.body;

  if (!userId || !username) {
    replay.invalidData(res, 'Required userId and username!');

    return;
  }

  try {
    await db('users').insert({ id: userId, username });
    await db('strategies').insert({ user_id: userId });
  } catch (err) {
    if (err.code === 'SQLITE_CONSTRAINT') {
      replay.invalidData(res, 'User already exist!');
    } else {
      replay.serverError(res);
    }
он
    return;
  }

  replay.successOnly(res, 'User has been created!');
}

async function deleteUser(req, res) {
  const { userId } = req.body;

  if (!userId) {
    replay.invalidData(res, 'Required userId!');

    return;
  }

  try {
    await db('strategies').where({ user_id: userId }).del();
    await db('users').where({ id: userId }).del();
  } catch (err) {
    replay.serverError(res);
    // eslint-disable-next-line
    console.log('DELETE USER --->', err);

    return;
  }

  replay.successOnly(res, 'User has been removed!');
}

module.exports = {
  getUserById,
  getAllUserIds,
  getAllUsers,
  createUser,
  deleteUser,
  updateExpiredUsers,
  getStatsByUsers,
  updateDateForUser
};
