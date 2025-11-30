import React, { useState, useEffect } from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const AutoDismissAlertsImplementation = () => {
  const [alerts, setAlerts] = useState([]);

  const addAlert = () => {
    const id = Date.now();
    setAlerts(prev => [...prev, { id, text: 'Alert ' + id }]);
    
    setTimeout(() => {
        setAlerts(prev => prev.filter(a => a.id !== id));
    }, 3000);
  };

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={addAlert}>Show Toast</button>
      <div style={{ position: 'fixed', top: 10, right: 10, display: 'flex', flexDirection: 'column', gap: '5px' }}>
        {alerts.map(alert => (
          <div key={alert.id} style={{ background: '#333', color: '#fff', padding: '10px', borderRadius: '4px', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>
            {alert.text}
          </div>
        ))}
      </div>
    </div>
  );
}

const AutoDismissAlerts = () => {
  const initialCode = `
export default function ToastSystem() {
  const [alerts, setAlerts] = React.useState([]);

  const addAlert = () => {
    const id = Date.now();
    setAlerts([...alerts, { id, text: 'Alert ' + id }]);
    
    // Implement auto-dismiss logic here
  };

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={addAlert}>Show Toast</button>
      <div style={{ position: 'fixed', top: 10, right: 10 }}>
        {alerts.map(alert => (
          <div key={alert.id} style={{ background: '#333', color: '#fff', padding: '10px', margin: '5px' }}>
            {alert.text}
          </div>
        ))}
      </div>
    </div>
  );
}
`;

  return (
    <div>
      <h2>Auto-Dismiss Alerts (Toast)</h2>
      <p>
        <strong>Scenario:</strong> Notification system that manages its own lifecycle.
        <pre>{`
[ User Action ] -> Add Alert "Saved!"
                      |
                      v
              [ Alert ID:1 (3s left) ]
                      |
                  (1s... 2s...)
                      |
                      v
              [ Alert ID:1 (0s) ] -> (Remove from DOM)
        `}</pre>
      </p>
      <Requirements>
        <li>Create a system to add toast notifications.</li>
        <li>Each toast should automatically disappear after 3 seconds.</li>
        <li>Ensure timers are cleaned up if the user manually closes a toast (if implemented) or if the component unmounts.</li>
        <li>Handle multiple overlapping timers correctly.</li>
      </Requirements>
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} solutionComponent={AutoDismissAlertsImplementation} />
      </div>
    </div>
  );
};

export default AutoDismissAlerts;
