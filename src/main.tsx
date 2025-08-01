import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

console.log('🚀 main.tsx loading...');
console.log('📍 Root element:', document.getElementById('root'));
console.log('🌍 Environment:', {
  hostname: window.location.hostname,
  apiUrl: import.meta.env.VITE_API_URL
});

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('❌ Root element not found!');
  document.body.innerHTML = '<div style="color: red; padding: 20px;">ERROR: Root element not found!</div>';
} else {
  console.log('✅ Root element found, creating React root...');
  const root = createRoot(rootElement);
  console.log('✅ React root created, rendering App...');
  
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  
  console.log('✅ App rendered!');
}
