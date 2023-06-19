const fetch = require('node-fetch');
const config = require('config');

const [isTrue, isFalse] = ['✔', '✘'];
const { server } = config.get('settings');
const strategyNames = config.get('strategies');


async function getStrategies(userId) {
  if (!userId) return false;

  try {
    const url = `${server}/strategies/${userId}`;
    const response = await fetch(url, { timeout: 2000 });
    const strategies = (await response.json()).data;

    return strategies;
  } catch (error) {
    // if error is not network timeout
    if (error.message.indexOf('network timeout') !== -1) {
      // eslint-disable-next-line no-console
      console.log('GET STRATEGIES => error ->', 'network timeout');
    } else {
      // eslint-disable-next-line no-console
      console.log('GET STRATEGIES => error ->', error);

      return false;
    }
  }

  return false;
}

async function getOptions() {

  try {
    const url = `${server}/settings/`;
    const response = await fetch(url, { timeout: 2000 });
    const settings = (await response.json());

    return settings;
  } catch (error) {
    // if error is not network timeout
    if (error.message.indexOf('network timeout') !== -1) {
      // eslint-disable-next-line no-console
      console.log('GET STRATEGIES => error ->', 'network timeout');
    } else {
      // eslint-disable-next-line no-console
      console.log('GET STRATEGIES => error ->', error);

      return false;
    }
  }

  return false;
}


async function verifyUserById(userId) {
  if (!userId) return false;

  try {
    const url = `${server}/users/${userId}`;
    const response = await fetch(url, { timeout: 2000 });
    const respObj = (await response.json());

    if (!respObj.success) return false;

    const role = (respObj.data.is_admin === true) ? 'admin' : 'user';

    return { role };
  } catch (error) {
    // if error is not network timeout
    if (error.message.indexOf('network timeout') !== -1) {
      // eslint-disable-next-line no-console
      console.log('GET IDS => error ->', 'network timeout');
    } else {
      // eslint-disable-next-line no-console
      console.log('GET IDS => error ->', error);
    }

    return false;
  }
}


async function addNewUser(userId, userName) {
  if (!userId) return false;

  try {
    const url = `${server}/users`;
    const body = { userId, username: `@${userName}` };
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },

      timeout: 2000,
    });
    const result = await response.json();
    console.log(result)

    return result;
  } catch (error) {
    // if error is not network timeout
    if (error.message.indexOf('network timeout') !== -1) {
      // eslint-disable-next-line no-console
      console.log('CREATE USER => error ->', 'network timeout');
    } else {
      // eslint-disable-next-line no-console
      console.log('CREATE USER => error ->', error);
    }
  }

  return false;
}


async function deleteUser(userId, userName) {
  if (!userId) return false;

  try {
    const url = `${server}/users`;
    const body = { userId, username: userName };
    const response = await fetch(url, {
      method: 'DELETE',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },

      timeout: 2000,
    });
    const result = await response.json();

    return result;
  } catch (error) {
    // if error is not network timeout
    if (error.message.indexOf('network timeout') !== -1) {
      // eslint-disable-next-line no-console
      console.log('DELETE USER => error ->', 'network timeout');
    } else {
      // eslint-disable-next-line no-console
      console.log('DELETE USER => error ->', error);
    }
  }

  return false;
}


async function listOfUsers() {
  try {
    const url = `${server}/users`;
    const response = await fetch(url, { timeout: 2000 });
    const listObj = (await response.json());

    return listObj;
  } catch (error) {
    // if error is not network timeout
    if (error.message.indexOf('network timeout') !== -1) {
      // eslint-disable-next-line no-console
      console.log('GET USERS => error ->', 'network timeout');
    } else {
      // eslint-disable-next-line no-console
      console.log('GET USERS => error ->', error);
    }
  }

  return false;
}


async function switchStrategy(userId, strategy, action) {
  try {
    const url = `${server}/strategies/switch`;
    const body = { userId, strategy, action };
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },

      timeout: 2000,
    });
    const result = await response.json();

    if (!result.success) return 'Ошибка';

    const message = `Стратегия ${strategy.slice(3)} ${action ? 'включена' : 'выключена'} !`;

    return message;
  } catch (error) {
    // if error is not network timeout
    if (error.message.indexOf('network timeout') !== -1) {
      // eslint-disable-next-line no-console
      console.log('GET IDS => error ->', 'network timeout');
    } else {
      // eslint-disable-next-line no-console
      console.log('GET IDS => error ->', error);
    }
  }

  return false;
}


function debug(obj = {}) {
  return JSON.stringify(obj, null, 4);
}


function printStrategies(strategies) {
  let result = '';
  Object.keys(strategies).forEach((key) => {
    result += `\n${strategies[key] ? isTrue : isFalse} ${strategyNames[key]}`;
  });

  return result;
}


function convertStrategiesToInlineKeyboard(strategies) {
  const result = [];
  Object.keys(strategies).forEach((key) => {
    const action = strategies[key] ? 'Выключить' : 'Включить';
    const strCode = strategyNames[key].split(':')[0];
    result.push(
      [
        {
          text: `${action} ${strCode}`,
          callback_data: JSON.stringify({
            code: key,
            action: strategies[key] ? 'disable' : 'enable',
          }),
        },
      ],
    );
  });


  return result;
}


module.exports = {
  debug,
  printStrategies,
  convertStrategiesToInlineKeyboard,

  verifyUserById,
  addNewUser,
  deleteUser,
  listOfUsers,
  getOptions,
  getStrategies,
  switchStrategy,
};
