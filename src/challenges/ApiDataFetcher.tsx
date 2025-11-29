/**
 * Challenge: API Data Fetcher
 * Difficulty: Easy
 * 
 * Requirements:
 * 1. Fetch data from a public API (e.g., https://jsonplaceholder.typicode.com/posts).
 * 2. Display the data in a list.
 * 3. Handle loading state.
 * 4. Handle error state.
 */

import React from 'react';
import { fetchPosts } from '../api/mockApi';
import { useEffect, useState } from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function ApiDataFetcher() {
  const initialCode = `
// Mock fetch function provided for playground
const fetchMockData = () => new Promise(resolve => {
  setTimeout(() => resolve([
    { id: 1, title: "Mock Post 1", body: "Content 1" },
    { id: 2, title: "Mock Post 2", body: "Content 2" }
  ]), 1000);
});

export default function DataFetcher() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    fetchMockData().then(res => {
      setData(res);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      {data.map(item => (
        <div key={item.id} style={{ marginBottom: '15px', borderBottom: '1px solid #ccc' }}>
          <h4>{item.title}</h4>
          <p>{item.body}</p>
        </div>
      ))}
    </div>
  );
}
`;

  return (
    <div>
      <h2>API Data Fetcher</h2>
      <Requirements>
            <li>Fetch data from a public API (e.g., https://jsonplaceholder.typicode.com/posts).</li>
            <li>Display the data in a list.</li>
            <li>Handle loading state.</li>
            <li>Handle error state.</li>
      </Requirements>
      
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} />
      </div>

      <h3>Reference Implementation (Static)</h3>
      <div style={{ border: '1px dashed #666', padding: '2rem', borderRadius: '8px', textAlign: 'center' }}>
        {/* Reference implementation hidden behind loading state in actual component, 
            but rendered here for structure */}
        <p>Check source code for full implementation details.</p>
      </div>
    </div>
  );
}

