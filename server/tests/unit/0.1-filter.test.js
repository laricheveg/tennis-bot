// const chai = require('chai');

// const { filterGames } = require('../../app/parser/stages');

// chai.should();
// chai.use(require('chai-shallow-deep-equal'));

// // ******************************************************

// const allGames = [
//   { LE: 'Greece. A1. Women' },
//   { LE: 'Italy. Serie A2' },
//   { LE: 'National Collegiate Athletic Association (NCAA). Women' },
//   { LE: 'Belgium Championship. Women' },
//   { LE: 'National Collegiate Athletic Association (NCAA). Mans' },
//   { LE: 'Israel Championship' },
//   { LE: 'Portugal. Division A1' },
//   { LE: 'Spain. Region League. Women' },
//   { LE: 'Peru Championship' },
//   { LE: 'Portugal Championship U18' },
//   { LE: 'Portugal. Division 3. Women' },
//   { LE: 'Slovakia. Division 3. Women' },
//   { LE: 'Slovakia. Division 3. Men' },
//   { LE: 'Russia. Division 3. Women' },
//   { LE: 'Russia. Superleague 3. Women' },
// ];

// const correctResult = [
//   { LE: 'Greece. A1. Women' },
//   { LE: 'Italy. Serie A2' },
//   { LE: 'National Collegiate Athletic Association (NCAA). Women' },
//   { LE: 'Belgium Championship. Women' },
//   { LE: 'National Collegiate Athletic Association (NCAA). Mans' },
//   { LE: 'Portugal. Division A1' },
//   { LE: 'Spain. Region League. Women' },
//   { LE: 'Peru Championship' },
//   { LE: 'Portugal Championship U18' },
//   { LE: 'Portugal. Division 3. Women' },
//   { LE: 'Slovakia. Division 3. Men' },
//   { LE: 'Russia. Superleague 3. Women' },
// ];

// describe('Filter test', () => {
//   it('should return correct result', () => {
//     const testFiltered = filterGames(allGames);
//     testFiltered.should.shallowDeepEqual(correctResult);
//   });
// });
