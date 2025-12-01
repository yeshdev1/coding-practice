import React, { useState } from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const ColorPickerImplementation = () => {
  const [color, setColor] = useState('#ffffff');
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff'];

  return (
    <div>
      <div 
        style={{ 
          width: '100px', 
          height: '100px', 
          backgroundColor: color, 
          border: '1px solid #ccc',
          marginBottom: '10px'
        }} 
      />
      <div style={{ display: 'flex', gap: '5px' }}>
        {colors.map(c => (
          <button 
            key={c} 
            onClick={() => setColor(c)}
            style={{ 
              backgroundColor: c, 
              width: '30px', 
              height: '30px', 
              border: 'none',
              cursor: 'pointer',
              borderRadius: '50%'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default function ColorPicker() {
  const initialCode = `
import React, { useState } from 'react';

export default function ColorPicker() {
  const [color, setColor] = useState('#ffffff');
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff'];

  return (
    <div>
      <div 
        style={{ 
          width: '100px', 
          height: '100px', 
          backgroundColor: color, 
          border: '1px solid #ccc',
          marginBottom: '10px'
        }} 
      />
      <div style={{ display: 'flex', gap: '5px' }}>
        {colors.map(c => (
          <button 
            key={c} 
            onClick={() => setColor(c)}
            style={{ 
              backgroundColor: c, 
              width: '30px', 
              height: '30px', 
              border: 'none',
              cursor: 'pointer',
              borderRadius: '50%'
            }}
          />
        ))}
      </div>
    </div>
  );
}
`;

  return (
    <div className="challenge-container">
      <h2>Color Picker</h2>
      <p>
        <strong>Scenario:</strong> A simple tool to pick a color from a palette and apply it to a preview box.
      </p>
      <Requirements>
        <li>Display a preview box that changes background color.</li>
        <li>Provide a list of color buttons (swatches).</li>
        <li>Clicking a swatch updates the preview box color.</li>
      </Requirements>
      
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} solutionComponent={ColorPickerImplementation} />
      </div>
    </div>
  );
}

