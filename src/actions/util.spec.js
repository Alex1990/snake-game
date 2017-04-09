import * as setup from '../constants/setup';
import * as util from './util';

describe('actions/util', () => {
  describe('isLost', () => {
    it('should be false', () => {
      const tiles = util.getInitTiles();
      const snake = util.getInitSnake();
      const snakeHead = snake[0];
      const nextTileRow = snakeHead.row - 1;
      const nextTileCol = snakeHead.col ;

      expect(util.isLost({
        tiles,
        snake,
        nextTileRow,
        nextTileCol,
      })).toBe(false);
    });

    it('should be true', () => {
      const tiles = util.getInitTiles();
      const snake = util.getInitSnake();
      const nextTileRow = 0;
      const nextTileCol = -1;

      expect(util.isLost({
        tiles,
        snake,
        nextTileRow,
        nextTileCol,
      })).toBe(true);
    });

    it('should be true', () => {
      const tiles = util.getInitTiles();
      const snake = util.getInitSnake();
      const snakeHead = snake[0];
      const nextTileRow = snakeHead.row;
      const nextTileCol = snakeHead.col + 1;

      expect(util.isLost({
        tiles,
        snake,
        nextTileRow,
        nextTileCol,
      })).toBe(true);
    });
  });

  it('getInitTiles', () => {
    const tiles = util.getInitTiles();
    expect(tiles.length).toBe(setup.ROW_COUNT);
    expect(tiles[0].length).toBe(setup.COL_COUNT);
    expect(tiles[0][0]).toEqual({
      type: 'default',
      row: 0,
      col: 0,
    });
  });

  it('getInitSnake', () => {
    const snake = util.getInitSnake();
    expect(snake.length).toBe(setup.INIT_SNAKE_LENGTH);
    expect(snake[0].type).toBe('snake-head');
    expect(snake[1].type).toBe('snake-joint');
  });

  it('getInitEgg', () => {
    const egg = util.getInitEgg();
    expect(egg).toEqual({
      type: 'egg',
      row: setup.INIT_EGG_ROW,
      col: setup.INIT_EGG_COL,
    });
  });

  it('getNextTile', () => {
    const row = 10;
    const col = 10;
    const snakeHead = {
      type: 'snake-head',
      row,
      col,
    };
    expect(util.getNextTile({
      snakeHead,
      targetOrientation: 'UP',
    })).toEqual({
      row: row - 1,
      col,
    });
    expect(util.getNextTile({
      snakeHead,
      targetOrientation: 'DOWN',
    })).toEqual({
      row: row + 1,
      col,
    });
    expect(util.getNextTile({
      snakeHead,
      targetOrientation: 'LEFT',
    })).toEqual({
      row,
      col: col - 1,
    });
    expect(util.getNextTile({
      snakeHead,
      targetOrientation: 'RIGHT',
    })).toEqual({
      row,
      col: col + 1,
    });
  });

  it('generateEgg', () => {
    const tiles = util.getInitTiles();
    const snake = util.getInitSnake();
    const egg = util.generateEgg({ tiles, snake });
    expect(egg.type).toBe('egg');
  });
});