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

const ApiDataFetcherImplementation = () => {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setLoading(true);
    fetchPosts()
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch data');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>API Data Fetcher</h2>
      <ul>
        {data.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
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
      <p>
        <strong>Scenario:</strong> Fetch and display data from an external source, handling all network states.
        <pre>{`
[ Component Mounts ] -> [ Loading... ]
         |
    (Async Fetch)
         |
         v
   (Success?)  ----->  (Failure?)
       |                   |
[ Data Loaded ]        [ Error Message ]
- Item 1
- Item 2
        `}</pre>
      </p>
      <Requirements>
            <li>Fetch data from a public API (e.g., https://jsonplaceholder.typicode.com/posts).</li>
            <li>Display the data in a list.</li>
            <li>Handle loading state.</li>
            <li>Handle error state.</li>
      </Requirements>
      
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} solutionComponent={ApiDataFetcherImplementation} />
      </div>
    </div>
  );
}
