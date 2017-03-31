import React from 'react';
import PlayLayer from '../containers/PlayLayer';
import StatusInfoLayer from '../containers/StatusInfoLayer';

const PlayArea = () => (
  <div className="play-area">
    <PlayLayer />
    <StatusInfoLayer />
  </div>
);

export default PlayArea;