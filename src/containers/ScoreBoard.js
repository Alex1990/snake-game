import { connect } from 'react-redux';
import ScoreBoardComponent from '../components/ScoreBoard';

const mapStateToProps = (state) => {
  return {
    score: state.score,
  };
};

const ScoreBoard = connect(
  mapStateToProps,
)(ScoreBoardComponent);

export default ScoreBoard;