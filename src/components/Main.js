import React, { Component, PropTypes } from 'react';
import keycode from 'keycode';
import PlayArea from './PlayArea';
import AttachPanel from './AttachPanel';

class Main extends Component {

  static propTypes = {
    initialize: PropTypes.func,
    start: PropTypes.func,
    togglePaused: PropTypes.func,
    changeOrientation: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleKeyUp(e) {
    const { start, togglePaused, changeOrientation } = this.props;
    const keyName = keycode(e);
    switch (keyName) {
      case 'enter': start(); break;
      case 'space': togglePaused(); break;
      case 'up':
      case 'down':
      case 'left':
      case 'right':
        changeOrientation(keyName.toUpperCase());
        break;
      default:
        break;
    }
  }

  componentDidMount() {
    this.props.initialize();
    window.addEventListener('keyup', this.handleKeyUp);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyUp);
  }

  render() {
    return (
      <div className="app-main">
        <PlayArea />
        <AttachPanel />
      </div>
    );
  }
};

export default Main;