import React, { PropTypes } from 'react';
import { gameStatusList } from '../actions';

const StatusInfo = ({ gameStatus }) => {
  let info;

  switch (gameStatus) {
    case 'INITIALIZING':
      info = <p>Initializing...</p>;
      break;
    case 'INITIALIZED':
      info = <p>Press the "Enter" key to play</p>;
      break;
    case 'PAUSED':
      info = <p>Press the "Space" key to continue</p>;
      break;
    case 'LOST':
      info = <p>You lost! Press the "Enter" key to play again</p>;
      break;
    default:
      info = null;
  }

  if (info) {
    return <div className="game-status-info">{info}</div>;
  } else {
    return null;
  }
};

StatusInfo.propTypes = {
  gameStatus: PropTypes.oneOf(gameStatusList),
};

export default StatusInfo;