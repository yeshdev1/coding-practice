import React, { useState, useEffect } from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const CarouselImplementation = () => {
  const images = [
    'https://via.placeholder.com/300x200/FF5733/ffffff?text=Image+1',
    'https://via.placeholder.com/300x200/33FF57/ffffff?text=Image+2',
    'https://via.placeholder.com/300x200/3357FF/ffffff?text=Image+3'
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
        setIndex(prev => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  const next = () => setIndex((index + 1) % images.length);
  const prev = () => setIndex((index - 1 + images.length) % images.length);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h3>Carousel</h3>
      <img src={images[index]} alt="Carousel" style={{ borderRadius: '8px', marginBottom: '10px' }} />
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button onClick={prev}>Prev</button>
        <button onClick={next}>Next</button>
      </div>
    </div>
  );
}

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
      <p>
        <strong>Scenario:</strong> A rotating showcase of images.
        <pre>{`
   (Prev)                  (Next)
    <   [ Image 2 ]          >

Index:    0      1      2
List: [ Img1, Img2, Img3 ]
                 ^
                 |
            Current View
        `}</pre>
      </p>
      <Requirements>
        <li>Display one image at a time from a list.</li>
        <li>Add "Next" and "Previous" buttons to navigate.</li>
        <li>Implement circular navigation (Next on last goes to first).</li>
        <li>Add an auto-play feature that advances every 3 seconds.</li>
      </Requirements>
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} solutionComponent={CarouselImplementation} />
      </div>
    </div>
  );
};

export default Carousel;
