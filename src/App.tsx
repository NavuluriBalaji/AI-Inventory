// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ModelDetail from './pages/ModelDetail';
import Terminology from './pages/Terminology';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/model/:modelId" element={<ModelDetail />} />
        <Route path="/terminology" element={<Terminology />} />
      </Routes>
    </Router>
  );
}

export default App;