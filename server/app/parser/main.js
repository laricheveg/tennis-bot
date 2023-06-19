const { signal } = require('../socket');
const log = require('simple-node-logger').createSimpleFileLogger('project.log');
const path = require('path');
const easyvk = require('easyvk')


var initialDate =  new Date();
//var dateMinusDay = initialDate.setDate(initialDate.getDate() - 1)

const delayForGroup = 10000;
const baseDelayMs = 60000;

const groups = [
  // {
  //   name: "@Formatica",
  //   id: "-45407543",
  //   lastUpdateDate: initialDate,
  //   source: "https://vk.com/formatica"
  // },
  // {
  //   name: "@Волосатая фольга",
  //   id: "-144854483",
  //   lastUpdateDate: initialDate,
  //   source: "https://vk.com/volosataia_folga"
  // },
  {
    name: "@MDK",
    id: "-57846937",
    lastUpdateDate: initialDate,
    source: "https://vk.com/mudakoff"
  },
  {
    name: "@Злой Школьник",
    id: "-29544671",
    lastUpdateDate: initialDate,
    source: "https://vk.com/zloyshkolnik"
  },
  {
    name: "@Бот Максим",
    id: "-135209264",
    lastUpdateDate: initialDate,
    source: "https://vk.com/bot_maxim"
  },
  {
    name: "@Р А С Е Я Н С Т В О",
    id: "-43901086",
    lastUpdateDate: initialDate,
    source: "https://vk.com/s_mayonezom"
  },
  // {
  //   name: "@Катавасия",
  //   id: "-52833601",
  //   lastUpdateDate: initialDate,
  //   source: "https://vk.com/ktvs1"
  // }
  {
    name: "@damn",
    id: "-19977823",
    lastUpdateDate: initialDate,
    source: "https://vk.com/daaamnnn"
  },
  {
    name: "@w h i t e s a t i n",
    id: "-96245789",
    lastUpdateDate: initialDate,
    source: "https://vk.com/satin_white"
  },
  {
    name: "@DANKEST MEMES",
    id: "-121642448",
    lastUpdateDate: initialDate,
    source: "https://vk.com/dankest_dankest"
  },
  {
    name: "@Картинки категории Б",
    id: "-155464693",
    lastUpdateDate: initialDate,
    source: "https://vk.com/karkb"
  },
  {
    name: "@Comics Network",
    id: "-50554618",
    lastUpdateDate: initialDate,
    source: "https://vk.com/cartwork"
  },
  {
    name: "@БОРЩ",
    id: "-460389",
    lastUpdateDate: initialDate,
    source: "https://vk.com/borsch"
  },
  {
    name: "@check you",
    id: "-31866112",
    lastUpdateDate: initialDate,
    source: "https://vk.com/check_tyt"
  },
  {
    name: "@че",
    id: "-53845179",
    lastUpdateDate: initialDate,
    source: "https://vk.com/21jqofa"
  },
];



const startConfig = {
  src: 'VK',
  method: startWatchVk,
  groups: groups
}


async function  startWatchVk(vk, groups) {
  console.log("START NEW PULL CYCLE \n\n")
  for (const element of groups) {
   
    console.log("CHECKING GROUP", element.name)
    
    var response = await vk.call('wall.get', {
      owner_id: element.id,
      count: 3,
    })

    var filteredAndMappedItems = filterVkPost(response.items, element);   
    if (filteredAndMappedItems.length > 0) {
      element.lastUpdateDate = filteredAndMappedItems[0].date;
      signal(filteredAndMappedItems)
    }

    console.log("CHECKING END OF", element.name)

    await sleep(delayForGroup);
  }

  await sleep(baseDelayMs);

  startConfig.method(vk, startConfig.groups)
}

function sleep(timeOut){

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true)
    }, timeOut)
  })

}


function filterVkPost(items, group) {
  var filteredItems = [];
  for (var i = 0; i < items.length; i++) {

    if (items[i].is_pinned == 1) {
      continue
    }

    if (group.lastUpdateDate >= items[i].date * 1000) {
      break;
    }

    if (items[i].marked_as_ads == 0 ) {
      filteredItems.push(mapVkPost(items[i], group));
    }
  }

  return filteredItems;
}


function setCaption(text, group, postId, ownerId) {
  signature = `${getRandomReaction()} <a href="https://vk.com/wall${ownerId}_${postId}">${group.name}</a>`;
  return text === "" ? signature : `${textPipe(text)}\n\n${signature}`;
}

function textPipe(text) {
  if (!text.includes('[club')) {
    return text
  }
  var freshString = '';
  var splitted = text.split("[");
  
  splitted.forEach(el => {
    var splittedEl = el.split("]")
    splittedEl.forEach(el1 => {
      var lastSplit = el1.split("|")
      if (lastSplit.length == 2 && lastSplit[0].includes('club')) {
        var link = `<a href='vk.com/${lastSplit[0]}'>${lastSplit[1]} </a>`
        freshString = freshString + link;
      }
      else {
        freshString = freshString + lastSplit.join(' ');
      }
    })

  })

  return freshString
}

function getRandomReaction() {

  var reactionArray = ['📡', '👉', '👀', '⚡️', '❤️', '🤩', '🔪', '🙈', '👆', '😃','😉','😎','👁','📯','➡️','⬆️','🔝','📣','📢','🙊','🙀',
  'Свежак от',
  'Свежачок от',  
  'Подъехал свежак от',
  'Свежак от ребят из',
  'Новый пост от',
  'Подкатил свежак от',
  'Прилетел свежачок от ',
  'Прилетел свежачок от рябят из',
  'Самое свежее из',
  'Чекни оригинал здесь - ',
  'Взято у',
  'Честно взято у ребят из',
  'Приехало из',
  'Пост подтянули из',
  'Пост подтянули у ребят из',
  'Самый смак от',
  'Свежее свежего от',
  'Авторам спасибо -',
  'Только самое новое из',
  'За пост спасибо',
  'Пост прямиком из ',
  'Свежак прямиком из',
  'Стащили у',
  'Честно копирнули с',
  'Пост залетел из',
  'Подтянули свежак у',
  'Самое новое от',  
  '❤️ With love from',
  '😉 Свежак от',
  '📡 📣 🔝 Свежачок от 👉',
  '📯 Подъехал свежак от 👉',
  '🤩 Свежак от ребят из',
  '❤️ Новый пост от',
  '📡 Подкатил свежак от',
  '🤩 Прилетел свежачок от ➡️',
  '😎 Прилетел свежачок от рябят из',
  'Самое свежее из ➡️',
  '📢 Чекни оригинал здесь - ',
  '👀 Взято у',
  '🙊 Честно взято у ребят из',
  '📡 Приехало из',
  '🙊 Пост подтянули из',
  '❤️ Пост подтянули у ребят из 👉',
  '❤️ Самый смак от 👉',
  '🔝 Свежее свежего от',
  '📣 Авторам спасибо -',
  '😎 Только самое новое из',
  'За пост спасибо 👉',
  '⬆️ Пост прямиком из',
  'Свежак прямиком из ➡️',
  '👀 Стащили у',
  '👀 Честно копирнули с',
  '📡🔝 Пост залетел из',
  '😎 Подтянули свежак у',
  '👆 Самое новое от 👉',
];
  var randomNumber = Math.floor(Math.random() * reactionArray.length);
  return reactionArray[randomNumber]
}

function mapVkPost(item, group) {
  mappedItem = {
    id: item.id,
    attachments: [],
    date: item.date * 1000
  };

  if (!item.attachments) {
    return mappedItem;
  }

  item.attachments.forEach((element, index) => {
    var mappedAttachment = {
      type: element.type,
      media: element.type == 'photo' ? element.photo.sizes.pop().url : null,
      parse_mode: "HTML"
    }

    if (index == 0) {
      mappedAttachment.caption = setCaption(item.text, group, item.id, item.owner_id);
    }
    if (mappedAttachment.type == 'photo') {
      mappedItem.attachments.push(mappedAttachment)
    }
  })

  return mappedItem;
}

async function start() {
  easyvk({
    username: '79052716234',  //'callname@mail.ru',
    password: 'kSqZzlfHzVyfAGnL', //'vseradidoti2',
    sessionFile: path.join(__dirname, '.my-session')
  }).then(async vk => {
      setTimeout( () => {
        startConfig.method(vk, startConfig.groups)
      }, 5000)
  })
}


module.exports = {
  start,
};
