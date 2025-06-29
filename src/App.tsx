// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ModelDetail from './pages/ModelDetail';
import Terminology from './pages/Terminology';
import SEOAudit from './components/SEOAudit';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/model/:modelId" element={<ModelDetail />} />
          <Route path="/terminology" element={<Terminology />} />
        </Routes>
        <SEOAudit />
      </Router>
    </HelmetProvider>
  );
}

export default App;