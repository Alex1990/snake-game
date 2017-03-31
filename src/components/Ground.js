import React from 'react';
import * as propTypes from '../propTypes';
import Tile from './Tile';

const Ground = ({ tiles, snakeOrientation }) => {
  const tileList = tiles.map((rowTiles, row) =>
    <div className="tile-row" key={`tile-row-${row}`}>
    {
      rowTiles.map((tile, col) => {
        const tileProps = {
          key: `tile-${row}-${col}`,
          type: tile.type,
        };

        if (tile.type === 'snake-head') {
          tileProps.snakeOrientation = snakeOrientation;
        }

        return <Tile {...tileProps} />
      })
    }
    </div>
  );
  return (
    <div className="ground">{tileList}</div>
  );
};

Ground.propTypes = {
  tiles: propTypes.tiles,
  snakeOrientation: propTypes.orientation,
};

export default Ground;