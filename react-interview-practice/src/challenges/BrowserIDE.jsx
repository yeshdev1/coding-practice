import React from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const BrowserIDE = () => {
  const initialCode = `
const initialFiles = [
  { 
    name: 'src', 
    type: 'folder', 
    children: [
      { name: 'App.js', type: 'file', content: 'console.log("Hello");' },
      { name: 'styles.css', type: 'file', content: 'body { color: red; }' }
    ]
  },
  { name: 'package.json', type: 'file', content: '{ "name": "demo" }' }
];

export default function MiniIDE() {
  // Manage file tree state, open tabs, and active file content
  
  return (
    <div style={{ display: 'flex', height: '400px', border: '1px solid #ccc' }}>
      <div style={{ width: '200px', borderRight: '1px solid #ccc', padding: '10px' }}>
        {/* File Tree */}
        File Explorer
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ height: '40px', borderBottom: '1px solid #ccc', display: 'flex' }}>
          {/* Tabs */}
        </div>
        <div style={{ flex: 1, padding: '10px' }}>
          {/* Editor Area */}
        </div>
      </div>
    </div>
  );
}
`;

  return (
    <div>
      <h2>Browser IDE (File System & Tabs)</h2>
      <Requirements>
        <li><strong>Recursive File Tree:</strong> Render a nested file structure with collapsible folders.</li>
        <li><strong>Tab Management:</strong> Open files in tabs. Handle multiple tabs, active tab switching, and closing tabs.</li>
        <li><strong>State Management:</strong> Updating a file's content in the editor should reflect in the file tree state.</li>
        <li><strong>Syntax Highlighting:</strong> Implement a basic highlighter (or integrate Prism/similar) for JS and CSS.</li>
        <li><strong>Unsaved Changes:</strong> Show an indicator (e.g., dot) on tabs with unsaved changes.</li>
      </Requirements>
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} />
      </div>
    </div>
  );
};

export default BrowserIDE;

