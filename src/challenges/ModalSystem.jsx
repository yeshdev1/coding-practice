/**
 * Challenge: Modal System
 * Difficulty: Medium
 * 
 * Requirements:
 * 1. Create a way to open a modal from anywhere (Context or Hook).
 * 2. Modal should overlay the screen.
 * 3. Close on clicking the background overlay or pressing Escape.
 * 4. Support multiple distinct modals if possible.
 */

import React, { useState, createContext, useContext, useEffect } from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState(null);

    const openModal = (modalContent) => {
        setContent(modalContent);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setContent(null);
    };

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}
            {isOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center',
                    zIndex: 1000
                }} onClick={closeModal}>
                    <div style={{ background: 'white', padding: '20px', borderRadius: '8px', color: 'black' }} onClick={e => e.stopPropagation()}>
                        {content}
                        <button onClick={closeModal} style={{ marginTop: '10px' }}>Close</button>
                    </div>
                </div>
            )}
        </ModalContext.Provider>
    );
};

const useModal = () => useContext(ModalContext);

const ModalSystemImplementation = () => {
    return (
        <ModalProvider>
            <AppContent />
        </ModalProvider>
    )
}

const AppContent = () => {
    const { openModal } = useModal();
    return (
        <div>
            <h2>App Content</h2>
            <button onClick={() => openModal(<h3>Hello from Modal!</h3>)}>Open Modal</button>
        </div>
    )
}

export default function ModalSystem() {
  const initialCode = `
export default function ModalExample() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      
      {isOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', color: 'black' }}>
            <h3>Modal Title</h3>
            <p>This is a modal!</p>
            <button onClick={() => setIsOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
`;

  return (
    <div>
      <h2>Modal/Dialog System</h2>
      <p>
        <strong>Scenario:</strong> Implement a reusable modal mechanism that can be triggered easily.
        <pre>{`
[ Page Content ]
    |
(Button Click)
    |
    v
[ Overlay (z-index: high) ] <--- (Click to Close)
    |
    +-- [ Modal Box ] (Centered)
          |
          +-- [ X ] (Close)
          +-- [ Content ]
        `}</pre>
      </p>
      <Requirements>
            <li>Create a way to open a modal from anywhere (Context or Hook).</li>
            <li>Modal should overlay the screen.</li>
            <li>Close on clicking the background overlay or pressing Escape.</li>
            <li>Support multiple distinct modals if possible.</li>
      </Requirements>
      
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} solutionComponent={ModalSystemImplementation} />
      </div>
    </div>
  );
}
