import React from 'react';

const WorkerOffloading = () => {
  return (
    <div>
      <h2>Worker Pool & Offloading</h2>
      <p>
        Implement a <strong>Worker Pool</strong> system that handles heavy computational tasks (like image processing or large dataset sorting) without blocking the main thread.
        <br /><br />
        <strong>Requirements:</strong>
        <br />
        1. <strong>Task Queue</strong>: Manage a queue of incoming tasks.
        <br />
        2. <strong>Worker Pool</strong>: instantiate a fixed number of Web Workers (e.g., 4) to process tasks in parallel.
        <br />
        3. <strong>Load Balancing</strong>: Distribute tasks efficiently across available workers.
        <br />
        4. <strong>Optimization</strong>: Terminate idle workers or reuse them to prevent memory leaks.
        <br />
        <em>(Bonus: Integrate a Service Worker to cache the results or handle offline task queuing).</em>
      </p>
    </div>
  );
};

export default WorkerOffloading;

