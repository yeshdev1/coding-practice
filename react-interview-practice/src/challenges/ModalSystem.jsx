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

import Requirements from '../components/Requirements';

export default function ModalSystem() {
  return (
    <div>
      <h2>Modal/Dialog System</h2>
      <Requirements>
            <li>Create a way to open a modal from anywhere (Context or Hook).</li>
            <li>Modal should overlay the screen.</li>
            <li>Close on clicking the background overlay or pressing Escape.</li>
            <li>Support multiple distinct modals if possible.</li>
      </Requirements>
      
      <div style={{ border: '1px dashed #666', padding: '2rem', borderRadius: '8px', textAlign: 'center' }}>
        [Your Implementation Goes Here]
      </div>
    </div>
  );
}

