const chai = require('chai');
const sinon = require('sinon');

const { str33 } = require('../../app/parser/strategies');
const testData = require('../json-data/str3-3');


chai.should();

describe('Str3-3', () => {
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
      str33(game, initialCoeffs, untrackedGames, signal);
    });

    signal.called.should.be.a('Boolean').eqls(true);
    Object.keys(untrackedGames).length.should.be.eqls(1);

    // check of clean up untrackedGames
    newGames.Value.forEach((game) => {
      str33(game, newInitialCoeffs, untrackedGames, signal);
    });

    Object.keys(untrackedGames).length.should.be.eqls(0);
  });
});
