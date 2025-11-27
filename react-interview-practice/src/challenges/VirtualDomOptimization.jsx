import React from 'react';

const VirtualDomOptimization = () => {
  return (
    <div>
      <h2>Virtual DOM vs Direct DOM Optimization</h2>
      <p>
        Create a stress test with a grid of 2,500 interactive cells (50x50) that update rapidly. 
        Compare and implement three approaches:
        <br />
        1. <strong>Naive React</strong>: Global state causing full tree re-renders (observe the lag).
        <br />
        2. <strong>Optimized React</strong>: Localized state and <code>React.memo</code> to minimize Virtual DOM diffing.
        <br />
        3. <strong>Direct DOM (Refs)</strong>: Bypassing the Virtual DOM entirely for high-frequency updates (e.g., using <code>requestAnimationFrame</code> and Refs) to demonstrate raw performance limits.
      </p>
    </div>
  );
};

export default VirtualDomOptimization;

