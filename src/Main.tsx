import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import App from './App';

const root = document.getElementById('root');

if (root) {
  const reactDOMRoot = createRoot(root);

  reactDOMRoot.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
