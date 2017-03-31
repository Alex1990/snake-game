import React from 'react';
import FloorContainer from '../containers/Floor';
import PromptInfoContainer from '../containers/PromptInfo';

const PlayArea = () => (
  <div className="play-area">
    <FloorContainer />
    <PromptInfoContainer />
  </div>
);

export default PlayArea;