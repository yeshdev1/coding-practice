import React, { useState, useEffect, useRef } from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const MiniFigmaImplementation = () => {
  const [shapes, setShapes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const canvasRef = useRef(null);

  const addShape = (type) => {
      setShapes([...shapes, { 
          id: Date.now(), 
          type, 
          x: Math.random() * 200, 
          y: Math.random() * 200, 
          width: 50, 
          height: 50,
          color: type === 'rect' ? 'blue' : 'red'
      }]);
  };

  // Simple drag implementation using mouse events on the shape itself
  // For 60fps, we'd normally use a ref for the shape positions and requestAnimationFrame
  // But here we stick to React state for simplicity of the "Sample"
  const handleDragStart = (e, id) => {
      e.stopPropagation();
      setSelectedId(id);
  };

  const handleDrag = (e) => {
      if (selectedId && e.buttons === 1) {
          // This is not performant for high frequency, but works for a demo
          // Ideally update a Mutable Ref and render loop
          setShapes(prev => prev.map(s => 
              s.id === selectedId 
              ? { ...s, x: s.x + e.movementX, y: s.y + e.movementY } 
              : s
          ));
      }
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <button onClick={() => addShape('rect')}>Add Rectangle</button>
        <button onClick={() => addShape('circle')}>Add Circle</button>
      </div>
      <div 
        ref={canvasRef}
        onMouseMove={handleDrag}
        onMouseUp={() => setSelectedId(null)}
        style={{ 
            width: '100%', 
            height: '400px', 
            border: '1px solid #ccc',
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: '#f9f9f9'
        }}
      >
        {shapes.map(shape => (
            <div
                key={shape.id}
                onMouseDown={(e) => handleDragStart(e, shape.id)}
                style={{
                    position: 'absolute',
                    left: shape.x,
                    top: shape.y,
                    width: shape.width,
                    height: shape.height,
                    backgroundColor: shape.color,
                    borderRadius: shape.type === 'circle' ? '50%' : '0',
                    border: selectedId === shape.id ? '2px solid black' : 'none',
                    cursor: 'grab'
                }}
            />
        ))}
      </div>
    </div>
  );
}

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
      <p>
        <strong>Scenario:</strong> Building a vector design tool. Handling complex mouse interactions and rendering.
        <pre>{`
[ Canvas ]
    |
(MouseDown on Rect) -> [ Selection State: Rect ID ]
    |
(MouseMove) -> [ Update Rect Coordinates ] (60fps)
    |
(MouseUp) -> [ Commit Change to History ]
        `}</pre>
      </p>
      <Requirements>
        <li><strong>Shape System:</strong> Support creating, moving, and resizing multiple shape types (rect, circle).</li>
        <li><strong>Selection Model:</strong> Click to select, click background to deselect, Shift+Click for multi-select.</li>
        <li><strong>Layering:</strong> Implement Z-index management (Bring to Front, Send to Back).</li>
        <li><strong>Performance:</strong> Ensure 60fps dragging performance using \`requestAnimationFrame\` or unmanaged updates (avoiding React render cycle for drag events).</li>
        <li><strong>Zoom/Pan:</strong> Implement an infinite canvas with scroll/zoom capabilities.</li>
      </Requirements>
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} solutionComponent={MiniFigmaImplementation} />
      </div>
    </div>
  );
};

export default MiniFigma;
