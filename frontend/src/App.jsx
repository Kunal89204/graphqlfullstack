import React, { useState } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';

// GraphQL Queries and Mutations
const getUsers = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;

const addUsers = gql`
  mutation AddUser($name: String!, $email: String!) {
    addUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

// Main App Component
const App = () => {
  const { loading, error, data } = useQuery(getUsers);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [addUser] = useMutation(addUsers);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addUser({ variables: { name, email } });
      setName('');
      setEmail('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>User List</h1>
      </div>

      {/* User List */}
      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red', textAlign: 'center' }}>Error: {error.message}</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: '0' }}>
          {data.users.map((user) => (
            <li
              key={user.id}
              style={{
                padding: '10px',
                marginBottom: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                backgroundColor: '#f9f9f9',
              }}
            >
              <p style={{ fontWeight: 'bold', margin: '0' }}>{user.name}</p>
              <p style={{ color: '#555', margin: '0' }}>{user.email}</p>
            </li>
          ))}
        </ul>
      )}

      {/* Add User Form */}
      <form onSubmit={handleSubmit} style={{ marginTop: '20px', padding: '20px', borderRadius: '5px', backgroundColor: '#f2f2f2', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>Add New User</h2>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Name</label>
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            borderRadius: '5px',
            border: 'none',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Add User
        </button>
      </form>
    </div>
  );
};

export default App;
