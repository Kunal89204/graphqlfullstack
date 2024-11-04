import React, { useState } from 'react'
import {useMutation, useQuery, gql } from '@apollo/client'

const getUsers = gql`
  query GetUsers {
    users{
      id
      name
      email
    }
  }
`;

const addUsers = gql`
  mutation AddUser($name: String!, $email: String!){
    addUser(name: $name, email:$email){
    id
    name
    email
    }
  }
`;




const App = () => {
  const {loading, error, data}  = useQuery(getUsers)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [addUser] = useMutation(addUsers)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addUser({variables:{name, email}});
      setName('')
      setEmail('')
    } catch (error) {
      console.log(error)
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
<ul>
      {data.users.map(user => (
        <li key={user.id}>{user.name} - {user.email}</li>
      ))}
    </ul>

    <form onSubmit={handleSubmit}>
      <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
      <button type="submit">Add User</button>
    </form>
    </div>
  )
}

export default App
