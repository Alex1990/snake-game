import * as reducers from './';
import * as setup from '../constants/setup';
import * as types from '../constants/actionTypes';
import * as util from '../actions/util';

describe('reducers', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    clearInterval.mockClear();
  });

  describe('score', () => {
    it('should return 0', () => {
      expect(
        reducers.score(undefined, {})
      ).toBe(0);
    });

    it('should set score', () => {
      expect(
        reducers.score(1, {
          type: types.SET_SCORE,
          score: 42,
        })
      ).toBe(42);
    });

    it('should add score by 1', () => {
      expect(
        reducers.score(1, {
          type: types.ADD_SCORE,
          variation: 1,
        })
      ).toBe(2);
    });
  });

  describe('gameStatus', () => {
    it('should return the initial value', () => {
      expect(
        reducers.gameStatus(undefined, {})
      ).toBe(setup.INIT_GAME_STATUS);
    });

    it('should set to be the specified value', () => {
      expect(
        reducers.gameStatus(undefined, {
          type: types.SET_GAME_STATUS,
          gameStatus: 'INITIALIZED',
        })
      ).toBe('INITIALIZED');
    });
  });

  describe('snakeSpeed', () => {
    it('should return the initial value', () => {
      expect(
        reducers.snakeSpeed(undefined, {})
      ).toBe(setup.INIT_SNAKE_SPEED);
    });

    it('should set to be the specified value', () => {
      expect(
        reducers.snakeSpeed(2, {
          type: types.SET_SNAKE_SPEED,
          snakeSpeed: 4,
        })
      ).toBe(4);
    });
  });

  describe('snakeOrientation', () => {
    it('should return the initial value', () => {
      expect(
        reducers.snakeOrientation(undefined, {})
      ).toBe(setup.INIT_SNAKE_ORIENTATION);
    });

    it('should set to be the specified value', () => {
      expect(
        reducers.snakeOrientation('LEFT', {
          type: types.SET_SNAKE_ORIENTATION,
          snakeOrientation: 'UP',
        })
      ).toBe('UP');
    });
  });

  describe('targetOrientation', () => {
    it('should return the initial value', () => {
      expect(
        reducers.targetOrientation(undefined, {})
      ).toBe(setup.INIT_TARGET_ORIENTATION);
    });

    it('should set to be the specified value', () => {
      expect(
        reducers.targetOrientation('LEFT', {
          type: types.SET_TARGET_ORIENTATION,
          targetOrientation: 'UP',
        })
      ).toBe('UP');
    });

    it('should change the target orientation', () => {
      expect(
        reducers.targetOrientation('LEFT', {
          type: types.CHANGE_TARGET_ORIENTATION,
          gameStatus: 'RUNNING',
          targetOrientation: 'UP',
          snakeOrientation: 'LEFT',
        })
      ).toBe('UP');
    });

    it('should not change the target orientation', () => {
      expect(
        reducers.targetOrientation('LEFT', {
          type: types.CHANGE_TARGET_ORIENTATION,
          gameStatus: 'PUASED',
          targetOrientation: 'UP',
          snakeOrientation: 'LEFT',
        })
      ).toBe('LEFT');
      expect(
        reducers.targetOrientation('LEFT', {
          type: types.CHANGE_TARGET_ORIENTATION,
          gameStatus: 'RUNNING',
          targetOrientation: 'UP',
          snakeOrientation: 'DOWN',
        })
      ).toBe('LEFT');
    });
  });

  describe('moveTimer', () => {
    it('should return the initial value', () => {
      expect(
        reducers.moveTimer(undefined, {})
      ).toBe(null);
    });

    it('should set the move timer', () => {
      expect(
        reducers.moveTimer(null, {
          type: types.SET_MOVE_TIMER,
          moveTimer: 42,
        })
      ).toBe(42);
    });

    it('should clear the move timer', () => {
      expect(
        reducers.moveTimer(42, {
          type: types.CLEAR_MOVE_TIMER,
        })
      ).toBe(null);
      expect(clearInterval.mock.calls.length).toBe(1);
    });
  });

  describe('tiles', () => {
    it('should return the initial value', () => {
      expect(
        reducers.tiles(undefined, {})
      ).toEqual([]);
    });
  });

  describe('snake', () => {
    it('should return the initial value', () => {
      expect(
        reducers.tiles(undefined, {})
      ).toEqual([]);
    });

    it('initialize snake', () => {
      const snake = util.getInitSnake();
      expect(
        reducers.snake([], {
          type: types.INITIALIZE_SNAKE,
          snake,
        })
      ).toEqual(snake);
    });
  });
});
