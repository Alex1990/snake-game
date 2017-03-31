import { connect } from 'react-redux';
import Score from '../components/Score';

const mapStateToProps = (state) => {
  return {
    score: state.score,
  };
};

const ScoreField = connect(
  mapStateToProps,
)(Score);

export default ScoreField;