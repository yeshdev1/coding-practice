import React from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const OfflineChat = () => {
  const initialCode = `
export default function ChatApp() {
  // Simulate a WebSocket or API connection
  // Manage messages, optimistic updates, and offline queue
  
  return (
    <div style={{ padding: '20px', height: '500px', display: 'flex', flexDirection: 'column' }}>
      <h3>Offline Capable Chat</h3>
      <div style={{ flex: 1, border: '1px solid #ccc', overflowY: 'auto', marginBottom: '10px' }}>
        {/* Message List */}
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input type="text" placeholder="Type a message..." style={{ flex: 1 }} />
        <button>Send</button>
      </div>
    </div>
  );
}
`;

  return (
    <div>
      <h2>Offline-First Chat Application</h2>
      <Requirements>
        <li><strong>Optimistic UI:</strong> Messages should appear immediately in the list before the server confirms receipt.</li>
        <li><strong>Offline Support:</strong> Detect network status (`navigator.onLine`). If offline, queue messages locally.</li>
        <li><strong>Sync Mechanism:</strong> When connectivity is restored, flush the message queue to the server in order.</li>
        <li><strong>Conflict Resolution:</strong> Handle scenarios where messages arrive out of order or fail to send.</li>
        <li><strong>Message Status:</strong> Display visual indicators for 'Sending', 'Sent', 'Failed', and 'Queued'.</li>
      </Requirements>
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} />
      </div>
    </div>
  );
};

export default OfflineChat;

