import {
  INIT_SNAKE_SPEED, INIT_SNAKE_ORIENTATION, INIT_TARGET_ORIENTATION,
} from '../constants/setup';
import {
  INITIALIZE_TILES, INITIALIZE_SNAKE,
  SET_GAME_STATUS, SET_SNAKE_SPEED,
  SET_SNAKE_ORIENTATION, SET_TARGET_ORIENTATION, CHANGE_TARGET_ORIENTATION,
  SET_MOVE_TIMER, CLEAR_MOVE_TIMER,
  SET_SCORE, ADD_SCORE,
  TILES_EAT_EGG, SNAKE_EAT_EGG, GENERATE_EGG,
  TILES_SNAKE_MOVE, SNAKE_SNAKE_MOVE,
} from '../constants/actionTypes';
import {
  isLost, getNextTile, generateEgg,
  getInitTiles, getInitSnake, getInitEgg
} from './util';

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

function setSnakeSpeed(snakeSpeed) {
  return {
    type: SET_SNAKE_SPEED,
    snakeSpeed,
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

function initialize() {
  return (dispatch, getState) => {
    const tiles = getInitTiles();
    const snake = getInitSnake();
    const egg = getInitEgg();

    dispatch(setScore(0));
    dispatch(setGameStatus('INITIALIZED'));
    dispatch(setTargetOrientation(INIT_TARGET_ORIENTATION));
    dispatch(setSnakeOrientation(INIT_SNAKE_ORIENTATION));
    dispatch(setSnakeSpeed(INIT_SNAKE_SPEED));
    dispatch(initializeTiles({ tiles, snake, egg }));
    dispatch(initializeSnake(snake));
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

    if (gameStatus !== 'RUNNING' && gameStatus !== 'PAUSED') {
      dispatch(setGameStatus('RUNNING'));
      const moveTimer = setInterval(() => {
        dispatch(snakeMove());
      }, 1000 * 1 / INIT_SNAKE_SPEED);
      dispatch(setMoveTimer(moveTimer));
      return moveTimer;
    }
  };
}

function snakeMove() {
  return (dispatch, getState) => {
    const { score, targetOrientation, tiles, snake } = getState();
    const { row: nextTileRow, col: nextTileCol } = getNextTile({ snakeHead: snake[0], targetOrientation });

    if (isLost({ tiles, snake, nextTileRow, nextTileCol })) {
      dispatch(setGameStatus('LOST'));
      dispatch(clearMoveTimer());
    } else {
      const nextTile = tiles[nextTileRow][nextTileCol];
      switch (nextTile.type) {
        case 'egg':
          dispatch({
            type: TILES_EAT_EGG,
            snake: snake,
            egg: nextTile,
          });
          dispatch({
            type: SNAKE_EAT_EGG,
            egg: nextTile,
          });
          dispatch({
            type: GENERATE_EGG,
            egg: generateEgg({ tiles, snake }),
          });
          dispatch(setSnakeOrientation(targetOrientation));
          dispatch(addScore(1));
          if (score > 0 && score % 5 === 0) {
            const newSpeed = INIT_SNAKE_SPEED + Math.floor(score / 5);
            dispatch(clearMoveTimer());
            dispatch(setSnakeSpeed(newSpeed));
            const moveTimer = setInterval(() => {
              dispatch(snakeMove());
            }, 1000 * 1 / newSpeed);
            dispatch(setMoveTimer(moveTimer));
          }
          break;
        case 'default':
          dispatch({
            type: TILES_SNAKE_MOVE,
            snake: snake,
            tile: nextTile,
          });
          dispatch({
            type: SNAKE_SNAKE_MOVE,
            tile: nextTile,
          });
          dispatch(setSnakeOrientation(targetOrientation));
          break;
        default:
          break;
      }
    }
  };
}

function togglePaused() {
  return (dispatch, getState) => {
    const { gameStatus, snakeSpeed } = getState();

    if (gameStatus === 'RUNNING') {
      dispatch(setGameStatus('PAUSED'));
      dispatch(clearMoveTimer());
    } else if (gameStatus === 'PAUSED') {
      const moveTimer = setInterval(() => {
        dispatch(snakeMove());
      }, 1000 * 1 / snakeSpeed);
      dispatch(setMoveTimer(moveTimer));
      dispatch(setGameStatus('RUNNING'));
    }
  };
}

export {
  initialize,
  initializeTiles,
  initializeSnake,
  setGameStatus,
  setSnakeSpeed,
  setMoveTimer,
  clearMoveTimer,
  setScore,
  addScore,
  setSnakeOrientation,
  setTargetOrientation,
  changeTargetOrientation,
  changeOrientation,
  start,
  snakeMove,
  togglePaused,
};
