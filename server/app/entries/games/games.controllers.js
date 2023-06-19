const { stripIndent } = require('common-tags');
const util = require('util');
var request = require("request");

const db = require('../../db/connection');
const replay = require('../replayHelpers');


async function createGame(data) {
  console.log("save game to db", data);

  const { id, liga, ligaid, t1name, t2name, t1reds, t2reds, 
          t1yellows, t2yellows, t1corners, t2corners, signaltime, 
          gamedate, t1goals, t2goals, t1next, t2next, nonext, result} = data;

  try {
    await db('games').insert({ id, liga, ligaid, t1name, t2name, t1reds, t2reds, 
      t1yellows, t2yellows, t1corners, t2corners, signaltime, 
      gamedate, t1goals, t2goals, t1next, t2next, nonext, result});
    
  } catch (err) {
    console.log(err);
    return;
  }
  
}

async function getYesterdayGames ()
{
  var start = new Date (new Date().toLocaleString("en-US", {timeZone: "Europe/Moscow"}));
  start.setDate(start.getDate() - 2); 
  start.setUTCHours(0,0,0,0);
  start = start.toISOString(); 
  console.log("start", start);
  var end = new Date (new Date().toLocaleString("en-US", {timeZone: "Europe/Moscow"}));
  end.setUTCHours(23,59,59,999);
  end.setDate(end.getDate() - 1);  
  end = end.toISOString();
  console.log("end", end);
  let games;
  
  try {
      games = await db.select('*')
        .from('games')
        .where('gamedate', '>', start).andWhere('gamedate', '<=', end);
    } catch (err) {
      console.log(err);
      return;
    }

    return games;

}

async function getAdditionalResult()
{

  var day = new Date (new Date().toLocaleString("en-US", {timeZone: "Europe/Moscow"}));
  day.setDate(day.getDate() - 1);
  var dayStr = new Date (day.setUTCHours(0,0,0,0)).toISOString().split("T")[0];
  var data1 = JSON.stringify({ Language: 'ru',
  Params: [ dayStr, null, null, null, null ],
  Vers: 4,
  partner: 51 });
  var options = { method: 'POST',
    url: 'https://1xstavka.ru/getTranslate/ViewGameResults1xZoneGroup',
    headers: 
     { 'Accept': 'application/json, text/plain, */*',
       'cache-control': 'no-cache',
       Connection: 'keep-alive',
       Cookie: 'lng=ru; flaglng=ru; auid=WNT5lF3ZS8Q1TvESW2CoAg==;  ua=deleted; is_secret_code=deleted; disallow_sport=deleted',
       Host: '1xstavka.ru',
       'Cache-Control': 'no-cache',
       "Content-Type": "application/json; charset=utf-8" },
    body: data1 };
  
    return new Promise((resolve,reject) => {
      request(options, function (error, response, body) {
        if (error) reject(error);  

      var gamesInfoData = JSON.parse(body).Data;
  
      var items = [];
      for(var i = 0; i < gamesInfoData.length; i++)
      {
        if (gamesInfoData[i]["Name"] === 'Футбол')
        {
          items = gamesInfoData[i]["Elems"];
          break;
        }
      }
      console.log(items)
      resolve (items);
     })
    });
  

}

async function getYersterdayResultsFromSource ()
{
  var day = new Date (new Date().toLocaleString("en-US", {timeZone: "Europe/Moscow"}));
  day.setDate(day.getDate() - 1);
  var dayStr = new Date (day.setUTCHours(0,0,0,0)).toISOString().split("T")[0];
  
  var options = { method: 'GET',
    url: 'https://1xstavka.ru/results/getmain',
    qs: { date: dayStr, showAll: 'true' },
  //   headers: 
  //    { 'cache-control': 'no-cache',
  //      'X-Requested-With': 'XMLHttpRequest',
  //      'Accept': 'application/json, text/plain, */*',
  //      'Cookie':`lng=ru; flaglng=ru; typeBetNames=short; tzo=3; 
  //      ga=GA1.2.1185673061.1574939592; gid=GA1.2.1734565348.1574939592; 
  //      bonus_choice=1; blocks=1%2C1%2C1%2C1%2C1%2C1%2C1%2C1; completed_user_settings=true; 
  //      ym_uid=157493959517730673; ym_d=1574939595; ym_isad=2;
  //      _consultsystems[e6mnOJwgq7HM]=XdHbs0ohI1rL; pushfree_status=canceled;
  //      ym_visorc_38116770=w; modeZoneSport1=1; right_side=right; dnb=1; 
  //      glhf=1574986178; ggru=160; sportId=1;` } };
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Accept": "application/json, text/plain, */*",
    "X-Requested-With": "XMLHttpRequest",
    "Cookie": "lng=ru; tzo=3; flaglng=ru; typeBetNames=short; bonus_choice=1;   modeZoneSport1=1; right_side=right; dnb=1; _glhf=1574986178; ggru=160;",
    "Cache-Control": "no-cache",
    "Host": "1xstavka.ru",
    "Connection": "keep-alive",
    "cache-control": "no-cache"
  }    
  };
  
  return new Promise((resolve,reject) => {
    request(options, function (error, response, body) {
      if (error) reject(error);  
   // console.log('response', response);
    //console.log('body', body);
    var gamesInfoData = [];
    try {
      gamesInfoData = JSON.parse(body).results;//.Value;
    }
    catch (error) {
      resolve([]);
    }
    //var gamesDataResponse = util.inspect(JSON.parse(body).results, false, null, true)

    var items = [];
    for(var i = 0; i < gamesInfoData.length; i++)
    {
      if (gamesInfoData[i]["Name"] === 'Футбол')
      {
        items = gamesInfoData[i]["Elems"];
        break;
      }
    }
    console.log(items)
    resolve (items);
   })
  });
  
}

async function updateGameResult (id, result)
{
  try {
      await db('games')  
      .where({id: id}).update({result: result});
  } catch (err) {
    console.log(err);
    return;
  }

}

async function checkAndUpdateResults ()
{
    console.log('<<< checkAndUpdateResults start >>>');
    Promise.all([getYesterdayGames(), getYersterdayResultsFromSource(), getAdditionalResult()]).then(data => { 
      
      var games = data[0];  
      var sourceGames = data[1];  
      var additionalGames = data[2];
      

      games.forEach(function(game) 
      {      
        if(game.ligaid !== null)
        {
          var sourceGameLiga = sourceGames.find(function(e) {
            return e["ID"] === game.ligaid;
          })

          if (!sourceGameLiga)
          {
            return;
          }

         // console.log("liga",sourceGameLiga);
    
          var sourceGame = sourceGameLiga["Elems"].find(function(g){
            return g["idgame"] === game.id;
          })

          if (!sourceGame)
          {
            return;
          }

         // console.log("sourcegame",sourceGame);
    
          var scoreStr = `${game.t1goals}:${game.t2goals}`;
          
          //console.log(game.id);
         // console.log("sourceGame[scores]", sourceGame["scores"])

          var scores = sourceGame["scores"][0];

          if(!scores)
          {
            return;
          }
          
          if(scoreStr.indexOf(scores.split(' ')[0]) > -1)
          {
            console.log("gameupdate true",game.id)
            updateGameResult(game.id, 'true');
          }
          else
          {
            console.log("gameupdate false",game.id)
            updateGameResult(game.id, 'false');
          }
        }

      })
//try one more time)
      games.forEach(function(game){
        
        if(game.ligaid !== null)
        {
          var sourceGameLiga = additionalGames.find(function(e) {
            return e["ID"] === game.ligaid;
          })
          console.log('sourceGameLigaADD', sourceGameLiga);

          if (!sourceGameLiga)
          {
            return;
          }

         // console.log("liga",sourceGameLiga);
    

          var sourceGame = sourceGameLiga["Elems"].find(function(g){
            return g["Head"][0] === game.id;
          })
          console.log('sourceGameADD', sourceGame);
          if (!sourceGame)
          {
            return;
          }

         // console.log("sourcegame",sourceGame);
    
          var scoreStr = `${game.t1goals}:${game.t2goals}`;
          
          //console.log(game.id);
         // console.log("sourceGame[scores]", sourceGame["scores"])

          var scores = sourceGame["Head"][6];
          console.log('db',scoreStr)
          console.log('source',scores);

          if(!scores)
          {
            return;
          }
          
          console.log('ee');

          if(scoreStr.indexOf(scores.split(' ')[0]) > -1)
          {
            console.log("gameupdate true",game.id)
            updateGameResult(game.id, 'true');
          }
          else
          {
            console.log("gameupdate false",game.id)
            updateGameResult(game.id, 'false');
          }
        }
      })

      console.log('<<< checkAndUpdateResults end >>>');

    });
    

}

async function getGamesFromDb(req, res)
{
  const {from: fromDate, to: toDate} = req.params;

  var start = new Date (new Date(fromDate).toLocaleString("en-US", {timeZone: "Europe/Moscow"})); 
  start.setUTCHours(0,0,0,0);
  start = start.toISOString(); 

  var end = new Date (new Date(toDate).toLocaleString("en-US", {timeZone: "Europe/Moscow"}));
  end.setUTCHours(23,59,59,999);  
  end = end.toISOString();

  let games;
  try {
    games = await db.select('*')
      .from('games')
      .where('gamedate', '>', start).andWhere('gamedate', '<=', end)
      .orderBy('gamedate')
  } catch (err) {
    replay.serverError(res, 'Database error!');
    return ;
  }
  if(games.length)
  {
    const data = games;
    const message = stripIndent``;
    replay.successWithData(res, message, data);
    return;
  }
  replay.notFound(res, 'Games not found');
}


module.exports = {
    createGame,
    updateGameResult,
    getYesterdayGames,
    checkAndUpdateResults,
    getGamesFromDb

};
