import React from 'react';
import ScoreField from '../containers/ScoreField';
import ManInfo from './ManInfo';

const AttachPanel = () => (
  <div className="attach-panel">
    <ScoreField />
    <ManInfo />
  </div>
);

export default AttachPanel;