import { connect } from 'react-redux';
import StatusInfo from '../components/StatusInfo';

const mapStateToProps = (state) => {
  return {
    gameStatus: state.gameStatus,
  };
};

const StatusInfoLayer = connect(
  mapStateToProps,
)(StatusInfo);

export default StatusInfoLayer;