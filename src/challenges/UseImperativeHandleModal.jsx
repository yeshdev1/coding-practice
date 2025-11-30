import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const CustomModal = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false)
  }));
  
  if (!isOpen) return null;

  return (
    <div style={{ border: '1px solid black', padding: '20px', background: '#eee', marginTop: '10px' }}>
      Modal Content
      <button onClick={() => setIsOpen(false)} style={{ marginLeft: '10px' }}>Close Internal</button>
    </div>
  );
});

const UseImperativeHandleModalImplementation = () => {
  const modalRef = useRef();

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={() => modalRef.current?.open()}>Open via Ref</button>
      <CustomModal ref={modalRef} />
    </div>
  );
}

const UseImperativeHandleModal = () => {
  const initialCode = `
const CustomModal = React.forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = React.useState(false);

  // Expose open/close methods to parent via ref
  
  if (!isOpen) return null;

  return (
    <div style={{ border: '1px solid black', padding: '20px', background: '#eee' }}>
      Modal Content
      <button onClick={() => setIsOpen(false)}>Close Internal</button>
    </div>
  );
});

export default function Parent() {
  const modalRef = React.useRef();

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={() => modalRef.current?.open()}>Open via Ref</button>
      <CustomModal ref={modalRef} />
    </div>
  );
}
`;

  return (
    <div>
      <h2>useImperativeHandle Modal</h2>
      <p>
        <strong>Scenario:</strong> Controlling a child component from a parent imperatively.
        <pre>{`
[ Parent ]
    |
    +-- useRef(modalRef)
    |     |
    |   (Calls)
    |     |
    |     v
[ Child Modal (forwardRef) ]
    |
    +-- useImperativeHandle(ref, () => ({
          open: () => setIsOpen(true),
          close: () => setIsOpen(false)
        }))
        `}</pre>
      </p>
      <Requirements>
        <li>Create a child Modal component that manages its own \`isOpen\` state.</li>
        <li>Use \`React.forwardRef\` and \`useImperativeHandle\` to expose \`open()\` and \`close()\` methods to the parent.</li>
        <li>The parent should trigger the modal using a ref, not props.</li>
      </Requirements>
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} solutionComponent={UseImperativeHandleModalImplementation} />
      </div>
    </div>
  );
};

export default UseImperativeHandleModal;
