import React from 'react';
import ScoreBoardContainer from '../containers/ScoreBoard';
import ManInfo from './ManInfo';

const AttachPanel = () => (
  <div className="attach-panel">
    <ScoreBoardContainer />
    <ManInfo />
  </div>
);

export default AttachPanel;