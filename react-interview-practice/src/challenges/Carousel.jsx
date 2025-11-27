import React from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const Carousel = () => {
  const initialCode = `
export default function ImageCarousel() {
  const images = [
    'https://via.placeholder.com/300x200/FF5733/ffffff?text=Image+1',
    'https://via.placeholder.com/300x200/33FF57/ffffff?text=Image+2',
    'https://via.placeholder.com/300x200/3357FF/ffffff?text=Image+3'
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h3>Carousel</h3>
      {/* Implement carousel logic here */}
    </div>
  );
}
`;

  return (
    <div>
      <h2>Image Carousel</h2>
      <Requirements>
        <li>Display one image at a time from a list.</li>
        <li>Add "Next" and "Previous" buttons to navigate.</li>
        <li>Implement circular navigation (Next on last goes to first).</li>
        <li>Add an auto-play feature that advances every 3 seconds.</li>
      </Requirements>
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} />
      </div>
    </div>
  );
};

export default Carousel;
