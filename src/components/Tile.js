import React from 'react';
import * as propTypes from '../propTypes';

const Tile = ({ type, snakeOrientation }) => {
  const className = `tile ${type} ${snakeOrientation ? snakeOrientation.toLowerCase() : ''}`;
  return <div className={className}></div>
};

Tile.propTypes = {
  type: propTypes.tileType,
  snakeOrientation: propTypes.orientation,
};

export default Tile;