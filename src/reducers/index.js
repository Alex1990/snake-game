import { combineReducers } from 'redux';
import {
  INIT_GAME_STATUS, INIT_SNAKE_SPEED, INIT_SNAKE_ORIENTATION, INIT_TARGET_ORIENTATION,
} from './setup';
import {
  INITIALIZE_TILES, INITIALIZE_SNAKE,
  SET_GAME_STATUS, SET_SNAKE_SPEED, SET_SNAKE_ORIENTATION,
  SET_TARGET_ORIENTATION, CHANGE_TARGET_ORIENTATION,
  SET_MOVE_TIMER, CLEAR_MOVE_TIMER,
  SET_SCORE, ADD_SCORE,
  TILES_SNAKE_MOVE, TILES_EAT_EGG,
  SNAKE_SNAKE_MOVE, SNAKE_EAT_EGG, GENERATE_EGG
} from './actionTypes';
import { cloneTiles } from './util';

function scoreReducer(state = 0, action) {
  switch (action.type) {
    case SET_SCORE:
      return action.score;
    case ADD_SCORE:
      return state + action.variation;
    default:
      return state;
  }
}

function gameStatusReducer(state = INIT_GAME_STATUS, action) {
  switch (action.type) {
    case SET_GAME_STATUS:
      return action.gameStatus;
    default:
      return state;
  }
}

function snakeSpeedReducer(state = INIT_SNAKE_SPEED, action) {
  switch (action.type) {
    case SET_SNAKE_SPEED:
      return action.snakeSpeed;
    default:
      return state;
  }
}

function snakeOrientationReduer(state = INIT_SNAKE_ORIENTATION, action) {
  switch (action.type) {
    case SET_SNAKE_ORIENTATION:
      return action.snakeOrientation;
    default:
      return state;
  }
}

function targetOrientationReducer(state = INIT_TARGET_ORIENTATION, action) {
  switch (action.type) {
    case SET_TARGET_ORIENTATION:
      return action.targetOrientation;
    case CHANGE_TARGET_ORIENTATION:
      if (action.gameStatus !== 'RUNNING') return state;
      if (action.targetOrientation === 'LEFT' || action.targetOrientation === 'RIGHT') {
        if (action.snakeOrientation === 'UP' || action.snakeOrientation === 'DOWN') {
          return action.targetOrientation;
        }
      } else {
        if (action.snakeOrientation === 'LEFT' || action.snakeOrientation === 'RIGHT') {
          return action.targetOrientation;
        }
      }
      return state;
    default:
      return state;
  }
}

function moveTimerReducer(state = null, action) {
  switch (action.type) {
    case SET_MOVE_TIMER:
      return action.moveTimer;
    case CLEAR_MOVE_TIMER:
      clearInterval(state);
      return null;
    default:
      return state;
  }
}

function tilesReducer(state = [], action) {
  let newTiles;
  let snake;
  let tile;
  let egg;
  let head;
  let tail;

  switch (action.type) {

    case INITIALIZE_TILES:
      newTiles = action.tiles;
      snake = action.snake;

      for (let i = 0; i < snake.length; i++) {
        const joint = snake[i];
        newTiles[joint.row][joint.col].type = joint.type;
      }

      egg = action.egg;
      newTiles[egg.row][egg.col].type = egg.type;
      return newTiles;

    case TILES_SNAKE_MOVE:
      newTiles = cloneTiles(state);
      snake = action.snake;
      tile = action.tile;
      head = snake[0];
      tail = snake[snake.length - 1];

      newTiles[tile.row][tile.col].type = 'snake-head';
      newTiles[head.row][head.col].type = 'snake-joint';
      newTiles[tail.row][tail.col].type = 'default';

      return newTiles;

    case TILES_EAT_EGG:
      newTiles = cloneTiles(state);
      snake = action.snake;
      egg = action.egg;
      head = snake[0];

      newTiles[egg.row][egg.col].type = 'snake-head';
      newTiles[head.row][head.col].type = 'snake-joint';

      return newTiles;

    case GENERATE_EGG:
      newTiles = cloneTiles(state);
      egg = action.egg;

      newTiles[egg.row][egg.col].type = egg.type;
      return newTiles;

    default:
      return state;
  }
}

function snakeReducer(state = [], action) {
  let nextState;
  let egg;
  let tile;

  switch (action.type) {
    case INITIALIZE_SNAKE:
      return action.snake;
    case SNAKE_SNAKE_MOVE:
      tile = action.tile;
      nextState = state.map(joint => ({ ...joint }));

      nextState[0].type = 'snake-joint';

      return [
        {
          type: 'snake-head',
          row: tile.row,
          col: tile.col,
        },
      ].concat(nextState.slice(0, -1));

    case SNAKE_EAT_EGG:
      egg = action.egg;
      nextState = state.map(joint => ({ ...joint }));

      nextState[0].type = 'snake-joint';

      return [
        {
          type: 'snake-head',
          row: egg.row,
          col: egg.col,
        },
      ].concat(nextState.slice());

    default:
      return state;
  }
}

export default combineReducers({
  score: scoreReducer,
  gameStatus: gameStatusReducer,
  snakeSpeed: snakeSpeedReducer,
  moveTimer: moveTimerReducer,
  snakeOrientation: snakeOrientationReduer,
  targetOrientation: targetOrientationReducer,
  tiles: tilesReducer,
  snake: snakeReducer,
});