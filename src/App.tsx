import React, { useState } from 'react';

const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribed with:', email);
    // Optionally post to backend here
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      <input
        type="email"
        value={email}
        required
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        placeholder="Enter your email"
        style={{
          width: '300px',
          padding: '8px',
          borderRadius: '8px',
          marginRight: '10px',
        }}
      />
      <button
        type="submit"
        style={{
          padding: '8px 16px',
          borderRadius: '8px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Subscribe
      </button>
    </form>
  );
};

export default NewsletterForm;
