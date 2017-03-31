import React, { PropTypes } from 'react';

const Score = ({ score }) => (
  <div className="score">
    Score: <span className="score-value">{score}</span>  
  </div>
);

Score.propTypes = {
  score: PropTypes.number,
};

export default Score;