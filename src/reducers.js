import { combineReducers } from 'redux';
import {
  INITIALIZE, INITIALIZE_TILES, INITIALIZE_SNAKE,
  SET_GAME_STATUS, SET_SNAKE_ORIENTATION, SET_TARGET_ORIENTATION, CHANGE_TARGET_ORIENTATION,
  SET_MOVE_TIMER, CLEAR_MOVE_TIMER,
  SNAKE_MOVE, SET_SCORE, ADD_SCORE,
  TILES_SNAKE_MOVE, TILES_EAT_EGG,
  SNAKE_SNAKE_MOVE, SNAKE_EAT_EGG, GENERATE_EGG
} from './actionTypes';
import {
  ROW_COUNT, COL_COUNT, SNAKE_LENGTH,
  GAME_STATUS, SNAKE_ORIENTATION, TARGET_ORIENTATION,
} from './setup';
import {
  initializeTiles, initializeSnake, setGameStatus, setScore, addScore,
  setTargetOrientation, setSnakeOrientation, clearMoveTimer,
} from './actions';

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

function gameStatusReducer(state = GAME_STATUS, action) {
  switch (action.type) {
    case SET_GAME_STATUS:
      return action.gameStatus;
    default:
      return state;
  }
}

function snakeOrientationReduer(state = SNAKE_ORIENTATION, action) {
  switch (action.type) {
    case SET_SNAKE_ORIENTATION:
      return action.snakeOrientation;
    default:
      return state;
  }
}

function targetOrientationReducer(state = TARGET_ORIENTATION, action) {
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

function cloneTiles(tiles) {
  return tiles.map(rowTiles =>
    rowTiles.map(tile => ({ ...tile }))
  );
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

function getInitalizedTiles() {
  const tiles = [];

  for (let i = 0; i < ROW_COUNT; i++) {
    tiles[i] = [];
    for (let j = 0; j < COL_COUNT; j++) {
      tiles[i][j] = {
        type: 'default',
        row: i,
        col: j,
      };
    }
  }

  return tiles;
}

function getInitalizedSnake() {
  let deltaRow = 0;
  let deltaCol = 0;

  switch (TARGET_ORIENTATION) {
    case 'UP': deltaRow = 1; break;
    case 'DOWN': deltaRow = -1; break;
    case 'LEFT': deltaCol = 1; break;
    case 'RIGHT': deltaCol = -1; break;
    default: break;
  }

  let row = 12;
  let col = 30;

  const snake = [{
    type: 'snake-head',
    row,
    col,
  }];

  for (let i = 0; i < SNAKE_LENGTH - 1; i++) {
    row += deltaRow;
    col += deltaCol;

    snake.push({
      type: 'snake-joint',
      row,
      col,
    });
  }

  return snake;
}

function getInitializedEgg() {
  return {
    type: 'egg',
    row: 12,
    col: 8,
  };
}

function generateEgg(tiles, snake) {
  const rowCount = tiles.length;
  const colCount = tiles[0].length;
  let row = 0;
  let col = 0;

  while (true) {
    row = Math.floor(Math.random() * rowCount);
    col = Math.floor(Math.random() * colCount);

    let generated = true;

    for (let i = 0; i < snake.length; i++) {
      const joint = snake[i];
      if (joint.row === row && joint.col === col) {
        generated = false;
        break;
      }
    }

    if (generated) break;
  }

  return {
    type: 'egg',
    row,
    col,
  };
}

function isLost({ tiles, snake, nextTileRow, nextTileCol }) {
  const rowCount = tiles.length;
  const colCount = tiles[0].length;
  let status = false;

  if (nextTileRow < 0 || nextTileRow >= rowCount
      || nextTileCol < 0 || nextTileCol >= colCount) {
    status = true;
  }

  for (let i = 0; i < snake.length; i++) {
    if (snake[i].row === nextTileRow && snake[i].col === nextTileCol) {
      status = true;
      break;
    }
  }

  return status;
}


function crossSliceInitialize(state = {}, action) {
  const nextState = { ...state };
  const tiles = getInitalizedTiles();
  const snake = getInitalizedSnake();
  const egg = getInitializedEgg();

  nextState.score = scoreReducer(state.score, setScore(0));
  nextState.gameStatus = gameStatusReducer(state.gameStatus, setGameStatus('INITIALIZED'));
  nextState.targetOrientation = targetOrientationReducer(state.targetOrientation, setTargetOrientation(TARGET_ORIENTATION));
  nextState.snakeOrientation = snakeOrientationReduer(state.snakeOrientation, setSnakeOrientation(SNAKE_ORIENTATION));
  nextState.tiles = tilesReducer(state.tiles, initializeTiles({ tiles, snake, egg }));
  nextState.snake = snakeReducer(state.snake, initializeSnake(snake));

  return nextState;
}

function crossSliceSnakeMove(state, action) {
  const nextState = { ...state };
  const { score, targetOrientation, snakeOrientation, tiles, snake } = state;
  let nextTileRow = snake[0].row;
  let nextTileCol = snake[0].col;

  switch (state.targetOrientation) {
    case 'UP':
      nextTileRow -= 1;
      break;
    case 'DOWN':
      nextTileRow += 1;
      break;
    case 'LEFT':
      nextTileCol -= 1;
      break;
    case 'RIGHT':
      nextTileCol += 1;
      break;
    default:
      break;
  }

  if (isLost({ tiles, snake, nextTileRow, nextTileCol })) {
    nextState.gameStatus = gameStatusReducer(state.gameStatus, setGameStatus('LOST'));
    nextState.moveTimer = moveTimerReducer(state.moveTimer, clearMoveTimer());
  } else {
    const nextTile = tiles[nextTileRow][nextTileCol];
    switch (nextTile.type) {
      case 'egg':
        nextState.tiles = tilesReducer(tiles, {
          type: TILES_EAT_EGG,
          snake: snake,
          egg: nextTile,
        });
        nextState.snake = snakeReducer(snake, {
          type: SNAKE_EAT_EGG,
          egg: nextTile,
        });
        nextState.tiles = tilesReducer(nextState.tiles, {
          type: GENERATE_EGG,
          egg: generateEgg(nextState.tiles, nextState.snake),
        });
        nextState.snakeOrientation = snakeOrientationReduer(snakeOrientation, setSnakeOrientation(targetOrientation));
        nextState.score = scoreReducer(score, addScore(1));
        break;
      case 'default':
        nextState.tiles = tilesReducer(tiles, {
          type: TILES_SNAKE_MOVE,
          snake: snake,
          tile: nextTile,
        });
        nextState.snake = snakeReducer(snake, {
          type: SNAKE_SNAKE_MOVE,
          tile: nextTile,
        });
        nextState.snakeOrientation = snakeOrientationReduer(snakeOrientation, setSnakeOrientation(targetOrientation));
        break;
      default:
        break;
    }
  }
  return nextState;
}

function crossSliceReducer(state, action) {
  switch (action.type) {
    case INITIALIZE:
      return crossSliceInitialize(state, action);
    case SNAKE_MOVE:
      return crossSliceSnakeMove(state, action);
    default:
      return state;
  }
}

const combinedReducers = combineReducers({
  score: scoreReducer,
  gameStatus: gameStatusReducer,
  moveTimer: moveTimerReducer,
  snakeOrientation: snakeOrientationReduer,
  targetOrientation: targetOrientationReducer,
  tiles: tilesReducer,
  snake: snakeReducer,
});

const rootReducer = function (state, action) {
  const intermediateState = combinedReducers(state, action);
  const finalState = crossSliceReducer(intermediateState, action);
  return finalState;
}

export default rootReducer;