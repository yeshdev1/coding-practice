/**
 * Challenge: Simple Form Validation
 * Difficulty: Easy
 * 
 * Requirements:
 * 1. Login form with Email and Password fields.
 * 2. Validate email format on submit (or on blur).
 * 3. Validate password length (e.g., min 6 chars).
 * 4. Show error messages below fields.
 */

import React, { useState } from 'react';
import Requirements from '../components/Requirements';

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

export default function SimpleFormValidation() {
  return (
    <div>
      <h2>Simple Form Validation</h2>
      <Requirements>
            <li>Login form with Email and Password fields.</li>
            <li>Validate email format on submit (or on blur).</li>
            <li>Validate password length (e.g., min 6 chars).</li>
            <li>Show error messages below fields.</li>
      </Requirements>
      
      <div style={{ border: '1px dashed #666', padding: '2rem', borderRadius: '8px', textAlign: 'center' }}>
        <SimpleFormValidationImplementation />
      </div>
    </div>
  );
}

