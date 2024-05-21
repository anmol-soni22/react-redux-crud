import React from 'react';

const UnauthenticatedPage = () => {
  return (
    <div style={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f0f0f0'
    }}>
      <h3>You are not authenticated. Please log in to view this page.</h3>
      <a href="/login" style={{
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        textDecoration: 'none',
        borderRadius: '4px',
        marginTop: '20px',
        fontSize: '16px',
      }}>Log In</a>
    </div>
  );
};

export default UnauthenticatedPage;
