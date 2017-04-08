import React from 'react';
import { connect } from 'react-redux';
import * as propTypes from '../constants/propTypes';

export const PromptInfo = ({ gameStatus }) => {
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

PromptInfo.propTypes = {
  gameStatus: propTypes.gameStatus,
};

const mapStateToProps = (state) => {
  return {
    gameStatus: state.gameStatus,
  };
};

export default connect(
  mapStateToProps,
)(PromptInfo);
