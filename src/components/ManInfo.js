import React from 'react';

const ManInfo = () => (
  <div className="man-info">
    <ul>
      <li>Press <code>Enter</code> key to <b>start</b>.</li>
      <li>Press <code>Space</code> key to <b>pause</b> or <b>resume</b>.</li>
      <li>
        Press the arrow keys (<code>↑</code>, <code>↓</code>, 
        <code>←</code>, <code>→</code>) to control the direction
        which the snake moves torwards.
      </li>
    </ul>
  </div>
);

export default ManInfo;