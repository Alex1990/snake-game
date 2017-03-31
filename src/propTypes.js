import { PropTypes } from 'react';

export const gameStatuses = [
  'UNINITIALIZED', 'INITIALIZING', 'INITIALIZED',
  'RUNNING', 'PAUSED', 'LOST',
];
export const orientations = ['UP', 'DOWN', 'LEFT', 'RIGHT'];
export const tileTypes = ['default', 'egg', 'snake-head', 'snake-joint'];

export const gameStatus = PropTypes.oneOf(gameStatuses);
export const orientation = PropTypes.oneOf(orientations);
export const tileType = PropTypes.oneOf(tileTypes);

export const tiles = PropTypes.arrayOf(
  PropTypes.arrayOf(
    PropTypes.shape({
      type: tileType,
      row: PropTypes.number,
      col: PropTypes.number,
    })
  )
);