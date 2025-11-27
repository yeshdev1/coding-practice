import React from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const DeepRefLifecycle = () => {
  const initialCode = `
export default function LegacyWrapper() {
  const domRef = React.useRef(null);

  React.useEffect(() => {
    // Simulate initializing a jQuery plugin or D3 chart
    const el = domRef.current;
    el.innerHTML = "Initialized Legacy Lib";
    
    // Handle updates manually
    
    return () => {
      // Cleanup
      el.innerHTML = "";
    };
  }, []);

  return <div ref={domRef} style={{ border: '1px solid blue', padding: '10px' }} />;
}
`;

  return (
    <div>
      <h2>Advanced Refs & Lifecycle Integration</h2>
      <Requirements>
        <li>Simulate wrapping a non-React library (like D3 or jQuery).</li>
        <li>Initialize the library on mount.</li>
        <li>Update the library when props change (without re-mounting the component).</li>
        <li>Properly destroy/cleanup the library instance on unmount to prevent memory leaks.</li>
      </Requirements>
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} />
      </div>
    </div>
  );
};

export default DeepRefLifecycle;
