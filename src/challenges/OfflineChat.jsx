import React, { useState, useEffect, useRef } from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const OfflineChatImplementation = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const queueRef = useRef([]);

  useEffect(() => {
      const handleOnline = () => {
          setIsOnline(true);
          flushQueue();
      };
      const handleOffline = () => setIsOnline(false);

      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      return () => {
          window.removeEventListener('online', handleOnline);
          window.removeEventListener('offline', handleOffline);
      };
  }, []);

  const flushQueue = () => {
      queueRef.current.forEach(msg => {
          // Simulate API call
          console.log('Flushing:', msg);
          setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, status: 'sent' } : m));
      });
      queueRef.current = [];
  };

  const sendMessage = () => {
      if (!input.trim()) return;
      const newMsg = { id: Date.now(), text: input, status: isOnline ? 'sent' : 'pending' };
      setMessages(prev => [...prev, newMsg]);
      setInput('');

      if (!isOnline) {
          queueRef.current.push(newMsg);
      } else {
          // Simulate network delay
          setMessages(prev => [...prev.slice(0, -1), { ...newMsg, status: 'sending' }]);
          setTimeout(() => {
              setMessages(prev => prev.map(m => m.id === newMsg.id ? { ...m, status: 'sent' } : m));
          }, 500);
      }
  };

  return (
    <div style={{ padding: '20px', height: '500px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '10px', background: isOnline ? '#e6fffa' : '#ffebee', color: isOnline ? 'green' : 'red', marginBottom: '10px' }}>
          Status: {isOnline ? 'Online' : 'Offline (Messages queued)'}
      </div>
      <div style={{ flex: 1, border: '1px solid #ccc', overflowY: 'auto', marginBottom: '10px', padding: '10px' }}>
        {messages.map(msg => (
            <div key={msg.id} style={{ marginBottom: '5px', opacity: msg.status === 'pending' ? 0.5 : 1 }}>
                <span style={{ fontWeight: 'bold' }}>User: </span>
                {msg.text} 
                <span style={{ fontSize: '0.7rem', marginLeft: '10px', color: '#888' }}>({msg.status})</span>
            </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input 
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            type="text" 
            placeholder="Type a message..." 
            style={{ flex: 1 }} 
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

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
      <p>
        <strong>Scenario:</strong> Robust messaging that works on spotty connections (Subway/Elevator).
        <pre>{`
[ User ] -> Send "Hello"
    |
    v
[ Local Store ] -> Add to Queue: [{ id: 1, text: "Hello", status: "pending" }]
    |
    v
[ UI ] -> Render "Hello" (Greyed out / Spinner)
    |
(Network Online?)
    |
    +-- YES --> [ API POST ] --(Success)--> Update Store (status: "sent")
    |
    +-- NO ---> [ Wait for Event 'online' ]
        `}</pre>
      </p>
      <Requirements>
        <li><strong>Optimistic UI:</strong> Messages should appear immediately in the list before the server confirms receipt.</li>
        <li><strong>Offline Support:</strong> Detect network status (\`navigator.onLine\`). If offline, queue messages locally.</li>
        <li><strong>Sync Mechanism:</strong> When connectivity is restored, flush the message queue to the server in order.</li>
        <li><strong>Conflict Resolution:</strong> Handle scenarios where messages arrive out of order or fail to send.</li>
        <li><strong>Message Status:</strong> Display visual indicators for 'Sending', 'Sent', 'Failed', and 'Queued'.</li>
      </Requirements>
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} solutionComponent={OfflineChatImplementation} />
      </div>
    </div>
  );
};

export default OfflineChat;
