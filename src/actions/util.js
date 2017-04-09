import {
  ROW_COUNT, COL_COUNT, INIT_SNAKE_LENGTH,
  INIT_TARGET_ORIENTATION, INIT_SNAKE_ROW, INIT_SNAKE_COL,
  INIT_EGG_ROW, INIT_EGG_COL,
} from '../constants/setup';

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

function getInitTiles() {
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

function getInitSnake() {
  let deltaRow = 0;
  let deltaCol = 0;

  switch (INIT_TARGET_ORIENTATION) {
    case 'UP': deltaRow = 1; break;
    case 'DOWN': deltaRow = -1; break;
    case 'LEFT': deltaCol = 1; break;
    case 'RIGHT': deltaCol = -1; break;
    default: break;
  }

  let row = INIT_SNAKE_ROW;
  let col = INIT_SNAKE_COL;

  const snake = [{
    type: 'snake-head',
    row,
    col,
  }];

  for (let i = 0; i < INIT_SNAKE_LENGTH - 1; i++) {
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

function getInitEgg() {
  return {
    type: 'egg',
    row: INIT_EGG_ROW,
    col: INIT_EGG_COL,
  };
}

function getNextTile({ snakeHead, targetOrientation }) {
  const nextTile = {
    row: snakeHead.row,
    col: snakeHead.col,
  };

  switch (targetOrientation) {
    case 'UP':
      nextTile.row -= 1;
      break;
    case 'DOWN':
      nextTile.row += 1;
      break;
    case 'LEFT':
      nextTile.col -= 1;
      break;
    case 'RIGHT':
      nextTile.col += 1;
      break;
    default:
      break;
  }

  return nextTile;
}

function generateEgg({ tiles, snake }) {
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

export {
  isLost,
  getInitTiles,
  getInitSnake,
  getInitEgg,
  getNextTile,
  generateEgg,
};