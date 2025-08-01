import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import SafeApp from './SafeApp.tsx';
import TestApp from './TestApp.tsx';
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
  
  // Use SafeApp for production to handle errors gracefully
  const isProduction = window.location.hostname.includes('vercel.app');
  const useTestApp = new URLSearchParams(window.location.search).has('test');
  
  let AppToRender;
  if (useTestApp) {
    AppToRender = <TestApp />;
  } else if (isProduction) {
    AppToRender = <SafeApp />;
  } else {
    AppToRender = <App />;
  }
  
  root.render(
    <StrictMode>
      {AppToRender}
    </StrictMode>
  );
  
  console.log('✅ App rendered!');
}
