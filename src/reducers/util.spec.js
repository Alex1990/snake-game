import * as util from './util';

describe('reducers/util', () => {
  it('cloneTiles', () => {
    const tiles = [
      [ { type: 'default', row: 0, col: 0 }, { type: 'default', row: 0, col: 1 } ],
      [ { type: 'default', row: 1, col: 0 }, { type: 'default', row: 1, col: 1 } ],
    ];
    const clonedTiles = util.cloneTiles(tiles);
    expect(clonedTiles).toEqual(tiles);
    expect(clonedTiles).not.toBe(tiles);
    expect(clonedTiles[0]).not.toBe(tiles[0]);
    expect(clonedTiles[0][0]).not.toBe(tiles[0][0]);
  });
});