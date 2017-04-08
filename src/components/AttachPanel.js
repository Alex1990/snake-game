import React from 'react';
import ScoreBoard from '../containers/ScoreBoard';
import ManInfo from './ManInfo';

const AttachPanel = () => (
  <div className="attach-panel">
    <ScoreBoard />
    <ManInfo />
  </div>
);

export default AttachPanel;