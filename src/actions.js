import { SNAKE_MOVE_SPEED } from './setup';
import {
  INITIALIZE, INITIALIZE_TILES, INITIALIZE_SNAKE,
  SET_GAME_STATUS, SET_SNAKE_ORIENTATION, SET_TARGET_ORIENTATION, CHANGE_TARGET_ORIENTATION,
  SET_MOVE_TIMER, CLEAR_MOVE_TIMER,
  SNAKE_MOVE, SET_SCORE, ADD_SCORE,
} from './actionTypes';

function initialize() {
  return {
    type: INITIALIZE,
  };
}

function initializeTiles({ tiles, snake, egg }) {
  return {
    type: INITIALIZE_TILES,
    tiles,
    snake,
    egg,
  };
}

function initializeSnake(snake) {
  return {
    type: INITIALIZE_SNAKE,
    snake,
  };
}

function setGameStatus(gameStatus) {
  return {
    type: SET_GAME_STATUS,
    gameStatus,
  };
}

function setScore(score) {
  return {
    type: SET_SCORE,
    score,
  };
}

function addScore(variation) {
  return {
    type: ADD_SCORE,
    variation,
  };
}

function setTargetOrientation(targetOrientation) {
  return {
    type: SET_TARGET_ORIENTATION,
    targetOrientation,
  };
}

function changeTargetOrientation({
  gameStatus,
  targetOrientation,
  snakeOrientation,
} = {}) {
  return {
    type: CHANGE_TARGET_ORIENTATION,
    gameStatus,
    targetOrientation,
    snakeOrientation,
  };
}

function setSnakeOrientation(snakeOrientation) {
  return {
    type: SET_SNAKE_ORIENTATION,
    snakeOrientation,
  };
}

function setMoveTimer(moveTimer) {
  return {
    type: SET_MOVE_TIMER,
    moveTimer,
  };
}

function clearMoveTimer() {
  return {
    type: CLEAR_MOVE_TIMER,
  };
}

function changeOrientation(targetOrientation) {
  return (dispatch, getState) => {
    const { gameStatus, snakeOrientation } = getState();

    dispatch(changeTargetOrientation({
      gameStatus,
      targetOrientation,
      snakeOrientation,
    }));
  };
}

function start() {
  return (dispatch, getState) => {
    const { gameStatus } = getState();
    if (gameStatus === 'LOST') {
      dispatch(initialize());
    }
    dispatch(setGameStatus('RUNNING'));
    const moveTimer = setInterval(() => {
      dispatch(snakeMove());
    }, 1000 * 1 / SNAKE_MOVE_SPEED);
    dispatch(setMoveTimer(moveTimer));
  };
}

function togglePaused() {
  return (dispatch, getState) => {
    const { gameStatus } = getState();

    if (gameStatus === 'RUNNING') {
      dispatch(setGameStatus('PAUSED'));
      dispatch(clearMoveTimer());
    } else if (gameStatus === 'PAUSED') {
      const moveTimer = setInterval(() => {
        dispatch(snakeMove());
      }, 1000 * 1 / SNAKE_MOVE_SPEED);
      dispatch(setMoveTimer(moveTimer));
      dispatch(setGameStatus('RUNNING'));
    }
  };
}

function snakeMove() {
  return {
    type: SNAKE_MOVE,
  };
}

export {
  initialize,
  initializeTiles,
  initializeSnake,
  start,
  setGameStatus,
  togglePaused,
  setMoveTimer,
  clearMoveTimer,
  setScore,
  addScore,
  setSnakeOrientation,
  setTargetOrientation,
  changeTargetOrientation,
  changeOrientation,
  snakeMove,
};
