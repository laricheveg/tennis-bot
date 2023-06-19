const chai = require('chai');
const sinon = require('sinon');

const { str34 } = require('../../app/parser/strategies');
const testData = require('../json-data/str3-4');


chai.should();

describe('Str3-4', () => {
  it('#1 Favorite wins sets 1 and 4 (4 set account diff > 4) **signal**', () => {
    const {
      data1: {
        games,
        initialCoeffs,
        newInitialCoeffs,
        newGames,
      },
    } = testData;
    const signal = sinon.spy();
    const untrackedGames = {};

    games.Value.forEach((game) => {
      str34(game, initialCoeffs, untrackedGames, signal);
    });

    signal.called.should.be.a('Boolean').eqls(true);
    Object.keys(untrackedGames).length.should.be.eqls(1);

    // check of clean up untrackedGames
    newGames.Value.forEach((game) => {
      str34(game, newInitialCoeffs, untrackedGames, signal);
    });

    Object.keys(untrackedGames).length.should.be.eqls(0);
  });

  it('#2 Favorite wins sets 3 and 4 (4 set account diff > 4) **signal**', () => {
    const {
      data2: {
        games,
        initialCoeffs,
      },
    } = testData;
    const signal = sinon.spy();
    const untrackedGames = {};

    games.Value.forEach((game) => {
      str34(game, initialCoeffs, untrackedGames, signal);
    });

    signal.called.should.be.a('Boolean').eqls(true);
    Object.keys(untrackedGames).length.should.be.eqls(1);
  });

  it('#3 Favorite wins sets 3 and 4 (4 set account diff < 4) **no signal**', () => {
    const {
      data3: {
        games,
        initialCoeffs,
      },
    } = testData;
    const signal = sinon.spy();
    const untrackedGames = {};

    games.Value.forEach((game) => {
      str34(game, initialCoeffs, untrackedGames, signal);
    });

    signal.called.should.be.a('Boolean').eqls(false);
    Object.keys(untrackedGames).length.should.be.eqls(0);
  });

  it('#4 Favorite wins sets 2 and 4 (4 set account diff > 4) **no signal**', () => {
    const {
      data4: {
        games,
        initialCoeffs,
      },
    } = testData;
    const signal = sinon.spy();
    const untrackedGames = {};

    games.Value.forEach((game) => {
      str34(game, initialCoeffs, untrackedGames, signal);
    });

    signal.called.should.be.a('Boolean').eqls(false);
    Object.keys(untrackedGames).length.should.be.eqls(0);
  });

  it('#5 Favorite wins sets 3 and 4 (5 set started) **no signal**', () => {
    const {
      data5: {
        games,
        initialCoeffs,
      },
    } = testData;
    const signal = sinon.spy();
    const untrackedGames = {};

    games.Value.forEach((game) => {
      str34(game, initialCoeffs, untrackedGames, signal);
    });

    signal.called.should.be.a('Boolean').eqls(false);
    Object.keys(untrackedGames).length.should.be.eqls(0);
  });
});
