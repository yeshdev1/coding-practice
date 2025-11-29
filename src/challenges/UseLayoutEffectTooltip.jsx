import React from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const UseLayoutEffectTooltip = () => {
  const initialCode = `
export default function TooltipDemo() {
  const [show, setShow] = React.useState(false);
  const buttonRef = React.useRef(null);
  const tooltipRef = React.useRef(null);

  // Use useLayoutEffect to calculate position

  return (
    <div style={{ padding: '50px' }}>
      <button 
        ref={buttonRef}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        Hover me
      </button>
      {show && (
        <div 
          ref={tooltipRef}
          style={{ position: 'absolute', background: 'black', color: 'white', padding: '5px' }}
        >
          Tooltip
        </div>
      )}
    </div>
  );
}
`;

  return (
    <div>
      <h2>useLayoutEffect Tooltip</h2>
      <Requirements>
        <li>Create a tooltip that appears when hovering a button.</li>
        <li>The tooltip needs to calculate its position based on the button's DOM rect.</li>
        <li>Use `useLayoutEffect` to measure and position the tooltip *synchronously* before the browser paints to prevent visual flickering/jumping.</li>
      </Requirements>
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} />
      </div>
    </div>
  );
};

export default UseLayoutEffectTooltip;
