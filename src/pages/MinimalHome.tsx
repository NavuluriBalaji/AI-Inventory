import React from 'react';

const MinimalHome: React.FC = () => {
  return (
    <div style={{ 
      padding: '20px', 
      background: 'blue', 
      color: 'white', 
      minHeight: '100vh',
      fontSize: '24px' 
    }}>
      <h1>🏠 MINIMAL HOME - Testing Basic Home Component</h1>
      <p>If you see this blue page, the basic Home component structure works.</p>
      <p>Current time: {new Date().toLocaleTimeString()}</p>
    </div>
  );
};

export default MinimalHome;
