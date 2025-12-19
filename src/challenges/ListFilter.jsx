import React, { useState } from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const ListFilterImplementation = () => {
  const items = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape'];
  const [filter, setFilter] = useState('');

  const filteredItems = items.filter(item => 
    item.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <input 
        type="text" 
        placeholder="Search fruits..." 
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ marginBottom: '10px', padding: '5px' }}
      />
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filteredItems.map(item => (
          <li key={item} style={{ padding: '5px', borderBottom: '1px solid #333' }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function ListFilter({ showSolutionPanel = false }) {
  const initialCode = `
import React, { useState } from 'react';

export default function ListFilter() {
  const items = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape'];
  const [filter, setFilter] = useState('');

  const filteredItems = items.filter(item => 
    item.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <input 
        type="text" 
        placeholder="Search fruits..." 
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ marginBottom: '10px', padding: '5px' }}
      />
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filteredItems.map(item => (
          <li key={item} style={{ padding: '5px', borderBottom: '1px solid #333' }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
`;

  return (
    <div className="challenge-container">
      <h2>List Filter</h2>
      <p>
        <strong>Scenario:</strong> Filter a static list of items in real-time based on user input.
      </p>
      <Requirements>
        <li>Display a list of strings.</li>
        <li>Input field for searching/filtering.</li>
        <li>Update the displayed list as the user types (case-insensitive).</li>
      </Requirements>
      
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground
          initialCode={initialCode}
          solutionComponent={ListFilterImplementation}
          showSolutionPanel={showSolutionPanel}
          solutionCode={initialCode}
          solutionNotes={[
            'Keeps the immutable source list separate from the filter text for predictable filtering.',
            'toLowerCase on both sides prevents case-sensitivity issues without extra libraries.',
            'Mapping filtered results keeps render cheap while the filter logic stays declarative.',
          ]}
         />
      </div>
    </div>
  );
}

