const chai = require('chai');
const sinon = require('sinon');

const { comeback } = require('../../app/parser/strategies');
const testData = require('../json-data/comeback');

chai.should();

describe('str3-5: "Comeback"', () => {
  it('#1 Valid data without hole **signal**', () => {
    const {
      data1: {
        events,
        initialCoeffs,
      },
    } = testData;
    const signal = sinon.spy();

    const trackGames = {};

    events.forEach((games) => {
      games.Value.forEach((game) => {
        comeback(game, initialCoeffs, trackGames, signal);
      });
    });

    signal.called.should.be.a('Boolean').eqls(true);
    Object.keys(trackGames).length.should.be.eqls(0);
  });

  // it('#2 Valid data with hole **signal**', () => {
  //   const {
  //     data2: {
  //       events,
  //       initialCoeffs,
  //     },
  //   } = testData;
  //   const signal = sinon.spy();
  //   const trackGames = {};

  //   events.forEach((games) => {
  //     comeback(games.Value, initialCoeffs, trackGames, signal);
  //   });

  //   signal.called.should.be.a('Boolean').eqls(true);
  //   Object.keys(trackGames).length.should.be.eqls(0);
  // });

  // it('#3 Valid data with hole and jump account **signal**', () => {
  //   const {
  //     data3: {
  //       events,
  //       initialCoeffs,
  //     },
  //   } = testData;
  //   const signal = sinon.spy();
  //   const trackGames = {};

  //   events.forEach((games) => {
  //     comeback(games.Value, initialCoeffs, trackGames, signal);
  //   });

  //   signal.called.should.be.a('Boolean').eqls(true);
  //   Object.keys(trackGames).length.should.be.eqls(0);
  // });

  // it('#4 Invalid data with jump account **no signal**', () => {
  //   const {
  //     data4: {
  //       events,
  //       initialCoeffs,
  //     },
  //   } = testData;
  //   const signal = sinon.spy();
  //   const trackGames = {};

  //   events.forEach((games) => {
  //     comeback(games.Value, initialCoeffs, trackGames, signal);
  //   });

  //   signal.called.should.be.a('Boolean').eqls(false);
  //   Object.keys(trackGames).length.should.be.eqls(0);
  // });
});
