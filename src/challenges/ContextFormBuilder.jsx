import React, { useState, useContext, createContext } from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const FormContext = createContext();

const FormProvider = ({ children }) => {
    const [schema, setSchema] = useState([]);

    const addField = (type) => {
        setSchema([...schema, { id: Date.now(), type, label: `New ${type}` }]);
    };

    const removeField = (id) => {
        setSchema(schema.filter(f => f.id !== id));
    };

    const updateField = (id, key, value) => {
        setSchema(schema.map(f => f.id === id ? { ...f, [key]: value } : f));
    };

    return (
        <FormContext.Provider value={{ schema, addField, removeField, updateField }}>
            {children}
        </FormContext.Provider>
    );
};

const useFormBuilder = () => useContext(FormContext);

const BuilderControls = () => {
    const { addField } = useFormBuilder();
    return (
        <div style={{ marginBottom: '20px' }}>
            <button onClick={() => addField('text')}>Add Text</button>
            <button onClick={() => addField('checkbox')}>Add Checkbox</button>
        </div>
    );
};

const BuilderCanvas = () => {
    const { schema, removeField, updateField } = useFormBuilder();
    return (
        <div style={{ border: '1px dashed #666', padding: '10px', marginBottom: '20px' }}>
            {schema.length === 0 && <p>No fields added.</p>}
            {schema.map(field => (
                <div key={field.id} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
                    <span>{field.type}</span>
                    <input 
                        value={field.label} 
                        onChange={(e) => updateField(field.id, 'label', e.target.value)} 
                        placeholder="Field Label"
                    />
                    <button onClick={() => removeField(field.id)}>X</button>
                </div>
            ))}
        </div>
    );
};

const FormPreview = () => {
    const { schema } = useFormBuilder();
    return (
        <div style={{ border: '1px solid #666', padding: '10px' }}>
            <h3>Preview</h3>
            <form onSubmit={e => e.preventDefault()}>
                {schema.map(field => (
                    <div key={field.id} style={{ marginBottom: '10px' }}>
                        <label style={{ display: 'block' }}>{field.label}</label>
                        {field.type === 'text' ? <input type="text" /> : <input type="checkbox" />}
                    </div>
                ))}
            </form>
        </div>
    );
};

const ContextFormBuilderImplementation = () => {
    return (
        <FormProvider>
            <div style={{ padding: '20px' }}>
                <h3>Form Builder</h3>
                <BuilderControls />
                <BuilderCanvas />
                <FormPreview />
            </div>
        </FormProvider>
    );
}

const ContextFormBuilder = () => {
  const initialCode = `
// Implement a form builder that uses Context to manage form state
// and supports adding/removing different field types dynamically.

export default function FormBuilder() {
  return (
    <div style={{ padding: '20px' }}>
      <h3>Form Builder</h3>
      {/* Your implementation here */}
    </div>
  );
}
`;

  return (
    <div>
      <h2>Context Form Builder</h2>
      <p>
        <strong>Scenario:</strong> Dynamic form generation driven by global state.
        <pre>{`
[ Form Context (Schema) ]
{ fields: [{id: 1, type: 'text'}, {id: 2, type: 'checkbox'}] }
      |
      +---> [ Builder View ]
      |     - Add Field
      |     - Remove Field
      |
      +---> [ Preview View ]
            - Render <input>
            - Render <checkbox>
        `}</pre>
      </p>
      <Requirements>
        <li>Create a FormContext to manage the state of the form schema.</li>
        <li>Allow users to add new fields (Text, Checkbox, Select) to the form.</li>
        <li>Render the form dynamically based on the schema in Context.</li>
        <li>Implement a "Preview" mode to see the working form.</li>
      </Requirements>
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground initialCode={initialCode} solutionComponent={ContextFormBuilderImplementation} />
      </div>
    </div>
  );
};

export default ContextFormBuilder;
