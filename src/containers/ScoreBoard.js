import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

export const ScoreBoard = ({ score }) => (
  <div className="score">
    Score: <span className="score-value">{score}</span>  
  </div>
);

ScoreBoard.propTypes = {
  score: PropTypes.number,
};

const mapStateToProps = (state) => {
  return {
    score: state.score,
  };
};

export default connect(
  mapStateToProps,
)(ScoreBoard);
