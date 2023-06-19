const chai = require('chai');
const sinon = require('sinon');

const { str31 } = require('../../app/parser/strategies');
const testData = require('./../json-data/str3-1');

chai.should();
chai.use(require('chai-shallow-deep-equal'));

describe('str3-1: "Total less 3th set"', () => {
  it('#1 Valid data **signal**', () => {
    const {
      data1: {
        events,
        initialCoeffs,
      },
    } = testData;
    const signal = sinon.spy();
    const untrackedGames = {};

    events.forEach((games) => {
      games.Value.forEach((game) => {
        str31(game, initialCoeffs, untrackedGames, signal);
      });
    });

    signal.called.should.be.a('Boolean').eqls(true);
    Object.keys(untrackedGames).length.should.be.eqls(1);
  });
});
