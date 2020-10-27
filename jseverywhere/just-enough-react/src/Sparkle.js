import React, { useState } from 'react';

function Sparkle() {
  const [sparkle, addSparkle] = useState('');
  return (
    <div>
      <button onClick={() => addSparkle(sparkle + '\u2728')}>
        Add some sparkle
      </button>
      <p>{sparkle}</p>
    </div>
  );
}

export default Sparkle;
