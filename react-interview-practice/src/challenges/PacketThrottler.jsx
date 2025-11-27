import React from 'react';

const PacketThrottler = () => {
  return (
    <div>
      <h2>Async Packet Throttler</h2>
      <p>Simulate receiving a high-volume stream of data packets. Build a component that throttles updates to the UI (e.g., once every 500ms) while queuing intermediate data to be processed in batches.</p>
    </div>
  );
};

export default PacketThrottler;

