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

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function ApiDataFetcher() {
  // Use fetchPosts() here
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    setLoading(true);
    fetchPosts().then((data: Post[]) => {
      setPosts(data);
    }).catch((error: Error) => {
      setError(error);
    }).finally(() => {
      setLoading(false);
    });
  }, []);
  
  if(loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error: {error.message}</div>
  }
  return (
    <div>
      <h2>API Data Fetcher</h2>
      <Requirements>
            <li>Fetch data from a public API (e.g., https://jsonplaceholder.typicode.com/posts).</li>
            <li>Display the data in a list.</li>
            <li>Handle loading state.</li>
            <li>Handle error state.</li>
      </Requirements>
      
      <div style={{ border: '1px dashed #666', padding: '2rem', borderRadius: '8px', textAlign: 'center' }}>
        {posts.map((post: Post) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

