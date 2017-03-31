import { connect } from 'react-redux';
import PromptInfoComponent from '../components/PromptInfo';

const mapStateToProps = (state) => {
  return {
    gameStatus: state.gameStatus,
  };
};

const PromptInfo = connect(
  mapStateToProps,
)(PromptInfoComponent);

export default PromptInfo;