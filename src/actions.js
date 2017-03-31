const INITIALIZE = 'INITIALIZE';
const INITIALIZE_TILES = 'INITIALIZE_TILES';
const INITIALIZE_SNAKE = 'INITIALIZE_SNAKE';
const SET_MOVE_TIMER = 'SET_MOVE_TIMER';
const CLEAR_MOVE_TIMER = 'CLEAR_MOVE_TIMER';
const SET_GAME_STATUS = 'SET_GAME_STATUS';
const ADD_SCORE = 'ADD_SCORE';
const SET_SNAKE_ORIENTATION = 'SET_SNAKE_ORIENTATION';
const SET_TARGET_ORIENTATION = 'SET_TARGET_ORIENTATION';
const SNAKE_MOVE = 'SNAKE_MOVE';
const TILES_SNAKE_MOVE = 'TILES_SNAKE_MOVE';
const TILES_EAT_EGG = 'TILES_EAT_EGG';
const SNAKE_SNAKE_MOVE = 'SNAKE_SNAKE_MOVE';
const SNAKE_EAT_EGG = 'SNAKE_EAT_EGG';
const GENERATE_EGG = 'GENERATE_EGG';

const INIT_GAME_STATUS = 'UNINITIALIZED';
const INIT_SNAKE_ORIENTATION = 'LEFT';
const INIT_TARGET_ORIENTATION = 'LEFT';

const gameStatusList = [
  'UNINITIALIZED', 'INITIALIZING', 'INITIALIZED',
  'RUNNING', 'PAUSED', 'LOST',
];
const orientations = ['UP', 'DOWN', 'LEFT', 'RIGHT'];
const tileTypes = ['default', 'egg', 'snake-head', 'snake-joint'];

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

function addScore(variation) {
  return {
    type: ADD_SCORE,
    variation,
  };
}

function setTargetOrientation(
  targetOrientation = INIT_TARGET_ORIENTATION,
  snakeOrientation = INIT_SNAKE_ORIENTATION,
) {
  return {
    type: SET_TARGET_ORIENTATION,
    targetOrientation,
    snakeOrientation,
  };
}

function setSnakeOrientation(snakeOrientation = INIT_SNAKE_ORIENTATION) {
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

function start() {
  return (dispatch, getState) => {
    const { gameStatus } = getState();
    if (gameStatus === 'LOST') {
      dispatch(initialize());
    }
    dispatch(setGameStatus('RUNNING'));
    const moveTimer = setInterval(() => {
      dispatch(snakeMove());
    }, 500);
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
        dispatch(snakeMove);
      }, 500);
      dispatch(setMoveTimer(moveTimer));
      dispatch(setGameStatus('RUNNING'));
    }
  };
}

function setOrientation(targetOrientation) {
  return (dispatch, getState) => {
    const { snakeOrientation } = getState();

    dispatch(setTargetOrientation(targetOrientation, snakeOrientation));
  };
}

function snakeMove() {
  return {
    type: SNAKE_MOVE,
  };
}

export {
  INIT_GAME_STATUS,
  INIT_SNAKE_ORIENTATION,
  INIT_TARGET_ORIENTATION,

  INITIALIZE,
  INITIALIZE_TILES,
  INITIALIZE_SNAKE,
  SET_MOVE_TIMER,
  CLEAR_MOVE_TIMER,
  SET_GAME_STATUS,
  ADD_SCORE,
  SET_SNAKE_ORIENTATION,
  SET_TARGET_ORIENTATION,
  SNAKE_MOVE,
  TILES_SNAKE_MOVE,
  TILES_EAT_EGG,
  SNAKE_SNAKE_MOVE,
  SNAKE_EAT_EGG,
  GENERATE_EGG,

  gameStatusList,
  orientations,
  tileTypes,

  initialize,
  initializeTiles,
  initializeSnake,
  start,
  setGameStatus,
  togglePaused,
  setMoveTimer,
  clearMoveTimer,
  addScore,
  setSnakeOrientation,
  setTargetOrientation,
  setOrientation,
  snakeMove,
};
