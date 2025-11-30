import React, { useState, useRef, useEffect } from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

class LegacyLib {
    constructor(element) {
        this.element = element;
        this.element.innerHTML = 'Legacy Lib Initialized';
        this.element.style.color = 'blue';
    }
    update(data) {
        this.element.innerHTML = `Legacy Lib Updated: ${data}`;
        this.element.style.color = 'green';
    }
    destroy() {
        this.element.innerHTML = '';
        console.log('Legacy Lib Destroyed');
    }
}

const DeepRefLifecycleImplementation = () => {
  const domRef = useRef(null);
  const libRef = useRef(null);
  const [data, setData] = useState(0);

  useEffect(() => {
    // Initialize
    libRef.current = new LegacyLib(domRef.current);
    
    // Cleanup
    return () => {
        if (libRef.current) {
            libRef.current.destroy();
        }
    };
  }, []);

  useEffect(() => {
      // Update
      if (libRef.current) {
          libRef.current.update(data);
      }
  }, [data]);

  return (
    <div style={{ padding: '20px' }}>
      <div ref={domRef} style={{ border: '1px solid blue', padding: '10px', marginBottom: '10px' }} />
      <button onClick={() => setData(d => d + 1)}>Update Data ({data})</button>
    </div>
  );
}

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
      <p>
        <strong>Scenario:</strong> Wrapping a non-React library (D3, Maps, jQuery) inside a React component.
        <pre>{`
[ React Component ]
    |
    +-- useEffect (Mount) -> Initialize "LegacyLib(div)"
    |
    +-- useEffect (Prop Change) -> LegacyLib.update(newData)
    |
    +-- useEffect (Unmount) -> LegacyLib.destroy()
        `}</pre>
      </p>
      <Requirements>
        <li>Simulate wrapping a non-React library (like D3 or jQuery).</li>
        <li>Initialize the library on mount.</li>
        <li>Update the library when props change (without re-mounting the component).</li>
        <li>Properly destroy/cleanup the library instance on unmount to prevent memory leaks.</li>
      </Requirements>
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} solutionComponent={DeepRefLifecycleImplementation} />
      </div>
    </div>
  );
};

export default DeepRefLifecycle;
