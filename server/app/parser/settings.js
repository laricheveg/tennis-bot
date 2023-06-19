

var options = {
    score: '00 01 10',
    secondsMin: 5030,
    secondsMax: 5050,
    teamCornersMore: 5,
    teamCornersDifference:3,
    teamYellowsMore: 5,
    teamNextGoalRate: 5.5,
    teamNextGoalDifference: 2.5,
    nobodyNextGoalRateMoreThan: 1.2,
    nobodyNextGoalRateLessThan: 1.4,
    contacts: "futbots@yandex.ru",
    referalMessage: 'test2',
    info: 'info'
}

module.exports = {
    options,
    optionsHelper
};

function optionsHelper(data) {
    Object.keys(options).forEach(key => {
        options[key] = data[key.toLowerCase()]
    })
}
  