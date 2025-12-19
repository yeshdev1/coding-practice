import React, { useState } from 'react';
import Requirements from '../components/Requirements';
import CodePlayground from '../components/CodePlayground';

const SimpleFormValidationImplementation = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Invalid email');
      setSuccess(false);
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setSuccess(false);
      return;
    }
    setError('');
    setSuccess(true);
  }
  return (
    <div>
      <h2>Simple Form Validation</h2>
      <p>Create a login form with email and password validation.</p>
      <form onSubmit={handleSubmit}>
        <div>
          <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail((e.target as HTMLInputElement).value)} onBlur={() => setError('')} />
        </div>
        <div>
          <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword((e.target as HTMLInputElement).value)} onBlur={() => setError('')}  />
        </div>
        <div>
          <button type='submit'>Submit</button>
        </div>
      </form>
      {error && <p>{error}</p>}
      {success && <p>Form submitted successfully</p>}
    </div>
  )
}

export default function SimpleFormValidation({ showSolutionPanel = false }: { showSolutionPanel?: boolean }) {
  const initialCode = `
export default function LoginForm() {
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Invalid email address');
    } else {
      setError('');
      alert('Success!');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px', maxWidth: '300px' }}>
      <div style={{ marginBottom: '10px' }}>
        <label>Email:</label>
        <input 
          type="text" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          style={{ display: 'block', width: '100%', marginTop: '5px' }}
        />
        {error && <span style={{ color: 'red', fontSize: '0.8rem' }}>{error}</span>}
      </div>
      <button type="submit">Login</button>
    </form>
  );
}
`;

  return (
    <div>
      <h2>Simple Form Validation</h2>
      <p>
        <strong>Scenario:</strong> Build a secure login form that provides immediate feedback.
        <pre>{`
[ Email Input ]   [ Password Input ]
      |                 |
  (onBlur/Change)   (onBlur/Change)
      |                 |
  v-------v         v-------v
(Check Format)    (Check Length > 6)
      |                 |
[ Error Msg ]     [ Error Msg ]
        `}</pre>
      </p>
      <Requirements>
            <li>Login form with Email and Password fields.</li>
            <li>Validate email format on submit (or on blur).</li>
            <li>Validate password length (e.g., min 6 chars).</li>
            <li>Show error messages below fields.</li>
      </Requirements>
      
      <div style={{ marginBottom: '20px' }}>
         <h3>Live Playground</h3>
         <CodePlayground
          initialCode={initialCode}
          solutionComponent={SimpleFormValidationImplementation}
          showSolutionPanel={showSolutionPanel}
          solutionCode={initialCode}
          solutionNotes={[
            'Email/password validation is kept inside submit handler to gate successful submits.',
            'Error state is reset on blur/change to reduce user friction while typing.',
            'Minimal markup keeps focus on form semantics and validation feedback placement.',
          ]}
         />
      </div>
    </div>
  );
}
