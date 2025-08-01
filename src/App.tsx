import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Component, ErrorInfo, ReactNode } from 'react';

// Error boundary component
class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('🚨 Error caught by boundary:', error);
    console.error('🚨 Error info:', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '20px', 
          background: 'orange', 
          color: 'white', 
          minHeight: '100vh',
          fontSize: '18px' 
        }}>
          <h1>🚨 Something went wrong!</h1>
          <p>Error: {this.state.error?.message}</p>
          <p>Check the console for more details.</p>
          <button onClick={() => window.location.reload()}>
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import SimpleModelDetail from './pages/SimpleModelDetail';
import Terminology from './pages/Terminology';
import SEOAudit from './components/SEOAudit';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/model/:modelId" element={<SimpleModelDetail />} />
            <Route path="/terminology" element={<Terminology />} />
          </Routes>
          <SEOAudit />
        </ErrorBoundary>
      </Router>
    </HelmetProvider>
  );
}

export default App;