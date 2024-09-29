import React, { useState } from 'react';
import axios from 'axios';
import './RegisterForm.css';  // Import the CSS file

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
axios.defaults.withCredentials = true
  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse(null);  // Clear previous responses
    setError(null);  // Clear previous errors

    // Data to be sent to the backend
    const data = {
      name,
      address
    };

    try {
      // Send POST request to the backend
      const res = await axios.post('https://smoke-trees-api.vercel.app/register', data);
      setResponse(res.data);  // Show success message from backend
    } catch (err) {
      // Handle error
      setError(err.response ? err.response.data.error : 'Something went wrong!');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
      <h2>Register User and Address</h2>

        <div className='input-con'>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='input-con'>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>

      {/* Display success response */}
      {response && (
        <div className="success-message">
          <h4>Registration Successful !!</h4>
        </div>
      )}

      {/* Display error message */}
      {error && (
        <div className="error-message">
          <h4>Error:</h4>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
