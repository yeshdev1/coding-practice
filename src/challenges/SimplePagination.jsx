import React, { useState } from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const SimplePaginationImplementation = () => {
  const items = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);
  const itemsPerPage = 5;
  const [page, setPage] = useState(1);

  const startIndex = (page - 1) * itemsPerPage;
  const displayedItems = items.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  return (
    <div>
      <ul style={{ listStyle: 'none', padding: 0, height: '150px' }}>
        {displayedItems.map(item => <li key={item} style={{ padding: '5px' }}>{item}</li>)}
      </ul>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <button 
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button 
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default function SimplePagination() {
  const initialCode = `
import React, { useState } from 'react';

export default function SimplePagination() {
  const items = Array.from({ length: 20 }, (_, i) => \`Item \${i + 1}\`);
  const itemsPerPage = 5;
  const [page, setPage] = useState(1);

  const startIndex = (page - 1) * itemsPerPage;
  const displayedItems = items.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  return (
    <div>
      <ul style={{ listStyle: 'none', padding: 0, height: '150px' }}>
        {displayedItems.map(item => <li key={item} style={{ padding: '5px' }}>{item}</li>)}
      </ul>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <button 
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button 
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
`;

  return (
    <div className="challenge-container">
      <h2>Simple Pagination</h2>
      <p>
        <strong>Scenario:</strong> Break a long list of items into smaller pages with navigation controls.
      </p>
      <Requirements>
        <li>Create a dummy array of 20 items.</li>
        <li>Show only 5 items at a time.</li>
        <li>"Next" and "Previous" buttons to navigate.</li>
        <li>Disable "Previous" on first page and "Next" on last page.</li>
      </Requirements>
      
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} solutionComponent={SimplePaginationImplementation} />
      </div>
    </div>
  );
}
