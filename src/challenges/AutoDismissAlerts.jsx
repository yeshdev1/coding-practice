import React from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

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
      <Requirements>
        <li>Create a system to add toast notifications.</li>
        <li>Each toast should automatically disappear after 3 seconds.</li>
        <li>Ensure timers are cleaned up if the user manually closes a toast (if implemented) or if the component unmounts.</li>
        <li>Handle multiple overlapping timers correctly.</li>
      </Requirements>
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} />
      </div>
    </div>
  );
};

export default AutoDismissAlerts;
