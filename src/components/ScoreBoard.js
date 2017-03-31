import React, { PropTypes } from 'react';

const ScoreBoard = ({ score }) => (
  <div className="score">
    Score: <span className="score-value">{score}</span>  
  </div>
);

ScoreBoard.propTypes = {
  score: PropTypes.number,
};

export default ScoreBoard;