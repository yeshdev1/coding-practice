import React, { useState, useEffect, useRef } from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const PacketThrottlerImplementation = () => {
  const [messages, setMessages] = useState([]);
  const [queueSize, setQueueSize] = useState(0);
  const bufferRef = useRef([]);

  // Simulate high frequency incoming messages
  useEffect(() => {
    const interval = setInterval(() => {
      const newItem = "Msg " + Date.now();
      bufferRef.current.push(newItem);
      setQueueSize(bufferRef.current.length);
    }, 50); // Incoming every 50ms (very fast)
    return () => clearInterval(interval);
  }, []);

  // Throttler / Batcher
  useEffect(() => {
      const interval = setInterval(() => {
          if (bufferRef.current.length > 0) {
              setMessages(prev => [...prev, ...bufferRef.current]); // Batch update
              bufferRef.current = [];
              setQueueSize(0);
          }
      }, 1000); // Update UI every 1000ms
      return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h3>Queue (Hidden): {queueSize}</h3>
      <div style={{ height: '200px', overflow: 'auto', border: '1px solid #ccc', padding: '10px' }}>
        {messages.map((m, i) => <div key={i}>{m}</div>)}
        {messages.length === 0 && <div>Waiting for batch...</div>}
      </div>
    </div>
  );
}

const PacketThrottler = () => {
  const initialCode = `
export default function Throttler() {
  const [messages, setMessages] = React.useState([]);
  const [queueSize, setQueueSize] = React.useState(0);

  // Simulate high frequency incoming messages
  React.useEffect(() => {
    const interval = setInterval(() => {
      const newItem = "Msg " + Date.now();
      // Instead of setting messages directly, queue them
    }, 100); // Incoming every 100ms
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h3>Queue: {queueSize}</h3>
      <div style={{ height: '200px', overflow: 'auto', border: '1px solid #ccc' }}>
        {messages.map((m, i) => <div key={i}>{m}</div>)}
      </div>
    </div>
  );
}
`;

  return (
    <div>
      <h2>Async Packet Throttler</h2>
      <p>
        <strong>Scenario:</strong> Handling a firehose of WebSocket messages without crashing the browser.
        <pre>{`
[ WebSocket Stream ] -> (100 msgs/sec)
      |
      v
[ Internal Buffer ] (Accumulate)
      |
      | (Wait 1000ms)
      |
      v
[ Batch Update State ] (Once per sec)
      |
      v
[ UI Render ] (Smooth, single paint)
        `}</pre>
      </p>
      <Requirements>
        <li>Simulate a stream of data arriving every 100ms (or faster).</li>
        <li>Do NOT update the UI for every single message (performance killer).</li>
        <li>Implement a buffer/queue system that updates the UI only once every 1000ms with the batch of new messages.</li>
      </Requirements>
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} solutionComponent={PacketThrottlerImplementation} />
      </div>
    </div>
  );
};

export default PacketThrottler;
