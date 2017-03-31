import React, { PropTypes } from 'react';
import { tileTypes, orientations } from '../actions';
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
  tiles: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.oneOf(tileTypes),
      })
    )
  ),
  snakeOrientation: PropTypes.oneOf(orientations),
};

export default Ground;