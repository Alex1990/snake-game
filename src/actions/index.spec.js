import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as actions from './';
import * as types from '../constants/actionTypes';
import * as setup from '../constants/setup';
import * as util from './util';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    setInterval.mockClear();
  });

  it('initializeTiles', () => {
    const tiles = util.getInitTiles();
    const snake = util.getInitSnake();
    const egg = util.getInitEgg();
    const expectedAction = {
      type: types.INITIALIZE_TILES,
      tiles,
      snake,
      egg,
    };
    expect(actions.initializeTiles({ tiles, snake, egg })).toEqual(expectedAction);
  });

  it('initializeSnake', () => {
    const snake = util.getInitSnake();
    const expectedAction = {
      type: types.INITIALIZE_SNAKE,
      snake,
    };
    expect(actions.initializeSnake(snake)).toEqual(expectedAction);
  });

  it('setGameStatus', () => {
    const gameStatus = 'INITIALIZED';
    const expectedAction = {
      type: types.SET_GAME_STATUS,
      gameStatus,
    };
    expect(actions.setGameStatus(gameStatus)).toEqual(expectedAction);
  });

  it('setSnakeSpeed', () => {
    const snakeSpeed = 5;
    const expectedAction = {
      type: types.SET_SNAKE_SPEED,
      snakeSpeed,
    };
    expect(actions.setSnakeSpeed(snakeSpeed)).toEqual(expectedAction);
  });

  it('setScore', () => {
    const score = 1;
    const expectedAction = {
      type: types.SET_SCORE,
      score,
    };
    expect(actions.setScore(score)).toEqual(expectedAction);
  });

  it('addScore', () => {
    const variation = 1;
    const expectedAction = {
      type: types.ADD_SCORE,
      variation,
    };
    expect(actions.addScore(variation)).toEqual(expectedAction);
  });

  it('setTargetOrientation', () => {
    const targetOrientation = 'UP';
    const expectedAction = {
      type: types.SET_TARGET_ORIENTATION,
      targetOrientation,
    };
    expect(actions.setTargetOrientation(targetOrientation)).toEqual(expectedAction);
  });

  it('changeTargetOrientation', () => {
    const gameStatus = 'RUNNING';
    const targetOrientation = 'UP';
    const snakeOrientation = 'LEFT';
    const expectedAction = {
      type: types.CHANGE_TARGET_ORIENTATION,
      gameStatus,
      targetOrientation,
      snakeOrientation,
    };
    expect(actions.changeTargetOrientation({
      gameStatus, targetOrientation, snakeOrientation,
    })).toEqual(expectedAction);
  });

  it('setSnakeOrientation', () => {
    const snakeOrientation = 'LEFT';
    const expectedAction = {
      type: types.SET_SNAKE_ORIENTATION,
      snakeOrientation,
    };
    expect(actions.setSnakeOrientation(snakeOrientation)).toEqual(expectedAction);
  });

  it('setMoveTimer', () => {
    const moveTimer = 42;
    const expectedAction = {
      type: types.SET_MOVE_TIMER,
      moveTimer,
    };
    expect(actions.setMoveTimer(moveTimer)).toEqual(expectedAction);
  });

  it('clearMoveTimer', () => {
    const expectedAction = {
      type: types.CLEAR_MOVE_TIMER,
    };
    expect(actions.clearMoveTimer()).toEqual(expectedAction);
  });

  it('initialize', () => {
    const tiles = util.getInitTiles();
    const snake = util.getInitSnake();
    const egg = util.getInitEgg();
    const expectedActions = [
      { type: types.SET_SCORE, score: 0 },
      { type: types.SET_GAME_STATUS, gameStatus: 'INITIALIZED' },
      {
        type: types.SET_TARGET_ORIENTATION,
        targetOrientation: setup.INIT_TARGET_ORIENTATION,
      },
      {
        type: types.SET_SNAKE_ORIENTATION,
        snakeOrientation: setup.INIT_SNAKE_ORIENTATION,
      },
      {
        type: types.SET_SNAKE_SPEED,
        snakeSpeed: setup.INIT_SNAKE_SPEED,
      },
      {
        type: types.INITIALIZE_TILES,
        tiles,
        snake,
        egg,
      },
      {
        type: types.INITIALIZE_SNAKE,
        snake,
      },
    ];
    const store = mockStore({});

    store.dispatch(actions.initialize());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('changeOrientation', () => {
    const gameStatus = 'RUNNING';
    const targetOrientation = 'UP';
    const snakeOrientation = 'LEFT';
    const expectedActions = [
      {
        type: types.CHANGE_TARGET_ORIENTATION,
        gameStatus,
        targetOrientation,
        snakeOrientation,
      },
    ];
    const store = mockStore({
      gameStatus,
      snakeOrientation,
      targetOrientation: 'LEFT',
    });

    store.dispatch(actions.changeOrientation(targetOrientation));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('start', () => {
    const gameStatus = 'INITIALIZED';
    const store = mockStore({
      gameStatus,
    });
    const moveTimer = store.dispatch(actions.start());
    const expectedActions = [
      { type: types.SET_GAME_STATUS, gameStatus: 'RUNNING' },
      { type: types.SET_MOVE_TIMER, moveTimer },
    ];

    expect(store.getActions()).toEqual(expectedActions);
    expect(setInterval.mock.calls.length).toBe(1);
    expect(setInterval.mock.calls[0][1]).toBe(1000 * 1 / setup.INIT_SNAKE_SPEED);
  });

  xit('snakeMove', () => {
  });

  it('togglePaused', () => {
    const gameStatus = 'RUNNING';
    const snakeSpeed = 4;
    const expectedActions = [
      { type: types.SET_GAME_STATUS, gameStatus: 'PAUSED' },
      { type: types.CLEAR_MOVE_TIMER },
    ];
    const store = mockStore({
      gameStatus,
    });

    store.dispatch(actions.togglePaused());
    expect(store.getActions()).toEqual(expectedActions);
  });
});

