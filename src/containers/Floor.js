import React from 'react';
import { connect } from 'react-redux';
import * as propTypes from '../constants/propTypes';
import Tile from '../components/Tile';

export const Floor = ({ tiles, snakeOrientation }) => {
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
    <div className="floor">{tileList}</div>
  );
};

Floor.propTypes = {
  tiles: propTypes.tiles,
  snakeOrientation: propTypes.orientation,
};

const mapStateToProps = (state) => {
  return {
    tiles: state.tiles,
    snakeOrientation: state.snakeOrientation,
  };
};

export default connect(
  mapStateToProps,
)(Floor);
