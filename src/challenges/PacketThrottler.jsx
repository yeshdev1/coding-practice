import React from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

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
      <Requirements>
        <li>Simulate a stream of data arriving every 100ms (or faster).</li>
        <li>Do NOT update the UI for every single message (performance killer).</li>
        <li>Implement a buffer/queue system that updates the UI only once every 1000ms with the batch of new messages.</li>
      </Requirements>
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} />
      </div>
    </div>
  );
};

export default PacketThrottler;
