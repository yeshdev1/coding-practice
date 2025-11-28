import React from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const MiniFigma = () => {
  const initialCode = `
export default function CanvasEditor() {
  // Use HTML5 Canvas or SVG
  // Implement state for a list of shapes: { type, x, y, width, height, color }
  
  return (
    <div style={{ padding: '20px' }}>
      <h3>Mini Figma</h3>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <button>Add Rectangle</button>
        <button>Add Circle</button>
      </div>
      <div style={{ 
        width: '100%', 
        height: '400px', 
        border: '1px solid #ccc',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Canvas or SVG Area */}
      </div>
    </div>
  );
}
`;

  return (
    <div>
      <h2>Mini Figma (Vector Graphics Editor)</h2>
      <Requirements>
        <li><strong>Shape System:</strong> Support creating, moving, and resizing multiple shape types (rect, circle).</li>
        <li><strong>Selection Model:</strong> Click to select, click background to deselect, Shift+Click for multi-select.</li>
        <li><strong>Layering:</strong> Implement Z-index management (Bring to Front, Send to Back).</li>
        <li><strong>Performance:</strong> Ensure 60fps dragging performance using `requestAnimationFrame` or unmanaged updates (avoiding React render cycle for drag events).</li>
        <li><strong>Zoom/Pan:</strong> Implement an infinite canvas with scroll/zoom capabilities.</li>
      </Requirements>
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} />
      </div>
    </div>
  );
};

export default MiniFigma;

