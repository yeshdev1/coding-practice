import React, { useState } from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const FileTree = ({ files, onSelect, expandedFolders, toggleFolder }) => {
    return (
        <div>
            {files.map(item => (
                <div key={item.name} style={{ marginLeft: '10px' }}>
                    {item.type === 'folder' ? (
                        <div>
                            <span 
                                onClick={() => toggleFolder(item.name)} 
                                style={{ cursor: 'pointer', fontWeight: 'bold' }}
                            >
                                {expandedFolders.includes(item.name) ? '📂' : '📁'} {item.name}
                            </span>
                            {expandedFolders.includes(item.name) && (
                                <FileTree 
                                    files={item.children} 
                                    onSelect={onSelect} 
                                    expandedFolders={expandedFolders} 
                                    toggleFolder={toggleFolder} 
                                />
                            )}
                        </div>
                    ) : (
                        <div 
                            onClick={() => onSelect(item)} 
                            style={{ cursor: 'pointer' }}
                        >
                            📄 {item.name}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

const BrowserIDEImplementation = () => {
  const [files, setFiles] = useState([
    { 
        name: 'src', 
        type: 'folder', 
        children: [
            { name: 'App.js', type: 'file', content: 'console.log("Hello App");' },
            { name: 'styles.css', type: 'file', content: 'body { color: red; }' }
        ]
    },
    { name: 'package.json', type: 'file', content: '{ "name": "demo" }' }
  ]);
  const [expandedFolders, setExpandedFolders] = useState(['src']);
  const [openTabs, setOpenTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(null);

  const toggleFolder = (name) => {
      setExpandedFolders(prev => 
          prev.includes(name) ? prev.filter(f => f !== name) : [...prev, name]
      );
  };

  const openFile = (file) => {
      if (!openTabs.find(t => t.name === file.name)) {
          setOpenTabs([...openTabs, file]);
      }
      setActiveTab(file);
  };

  const closeTab = (fileName) => {
      const newTabs = openTabs.filter(t => t.name !== fileName);
      setOpenTabs(newTabs);
      if (activeTab && activeTab.name === fileName) {
          setActiveTab(newTabs.length > 0 ? newTabs[newTabs.length - 1] : null);
      }
  };

  const updateFileContent = (content) => {
      if (!activeTab) return;
      // Deep update is complex, simplifying for demo by just updating active tab object in memory
      // In real app, need to traverse file tree to update content
      setActiveTab({ ...activeTab, content });
  };

  return (
    <div style={{ display: 'flex', height: '400px', border: '1px solid #ccc' }}>
      <div style={{ width: '200px', borderRight: '1px solid #ccc', padding: '10px', overflowY: 'auto' }}>
        <FileTree 
            files={files} 
            onSelect={openFile} 
            expandedFolders={expandedFolders} 
            toggleFolder={toggleFolder} 
        />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ height: '40px', borderBottom: '1px solid #ccc', display: 'flex', overflowX: 'auto' }}>
          {openTabs.map(tab => (
              <div 
                key={tab.name}
                onClick={() => setActiveTab(tab)}
                style={{ 
                    padding: '10px', 
                    cursor: 'pointer',
                    background: activeTab?.name === tab.name ? '#eee' : 'white',
                    borderRight: '1px solid #ddd',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                }}
              >
                  {tab.name}
                  <span onClick={(e) => { e.stopPropagation(); closeTab(tab.name); }} style={{ fontSize: '0.8rem' }}>✕</span>
              </div>
          ))}
        </div>
        <div style={{ flex: 1, padding: '10px' }}>
          {activeTab ? (
              <textarea 
                style={{ width: '100%', height: '100%' }} 
                value={activeTab.content} 
                onChange={e => updateFileContent(e.target.value)} 
              />
          ) : (
              <div style={{ color: '#888', marginTop: '20px', textAlign: 'center' }}>Select a file to edit</div>
          )}
        </div>
      </div>
    </div>
  );
}

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
      <p>
        <strong>Scenario:</strong> Managing complex state for a developer tool.
        <pre>{`
[ App State ]
{
  files: { 'src/App.js': '...', 'package.json': '...' },
  expandedFolders: ['src'],
  openTabs: ['src/App.js'],
  activeTab: 'src/App.js'
}

(Click 'styles.css') -> Update OpenTabs -> Update ActiveTab -> Render Editor
        `}</pre>
      </p>
      <Requirements>
        <li><strong>Recursive File Tree:</strong> Render a nested file structure with collapsible folders.</li>
        <li><strong>Tab Management:</strong> Open files in tabs. Handle multiple tabs, active tab switching, and closing tabs.</li>
        <li><strong>State Management:</strong> Updating a file's content in the editor should reflect in the file tree state.</li>
        <li><strong>Syntax Highlighting:</strong> Implement a basic highlighter (or integrate Prism/similar) for JS and CSS.</li>
        <li><strong>Unsaved Changes:</strong> Show an indicator (e.g., dot) on tabs with unsaved changes.</li>
      </Requirements>
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} solutionComponent={BrowserIDEImplementation} />
      </div>
    </div>
  );
};

export default BrowserIDE;
