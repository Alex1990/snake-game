import React from 'react';
import Floor from '../containers/Floor';
import PromptInfo from '../containers/PromptInfo';

const PlayArea = () => (
  <div className="play-area">
    <Floor />
    <PromptInfo />
  </div>
);

export default PlayArea;