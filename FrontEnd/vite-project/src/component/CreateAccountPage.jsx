import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import './LoginPage';
import loginimage from '../Images/login.jpg';

function CreateAccountPage() {
  const[firstname,setFirstName]=useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleCreateAccount = (e) => {
    e.preventDefault();

    // Basic validation before sending data to the backend
    if (!firstname ||!username || !password || !mobile) {
      setError('All fields are required.');
      return;
    }

    // Send user data to the backend for registration
    axios.post('http://localhost:3000/auth/register', { firstname,username, password, mobile })
      .then(response => {
        if (response.data && response.data._id) {
          setSuccessMessage('Account created successfully! You can now log in.');
          setTimeout(() => {
            setSuccessMessage('');
            navigate('/');
          }, 1000);
        } else {
          setError(response.data.message || 'Failed to create account');
        }
      })
      .catch(err => {
        console.error(err);
        setError('An error occurred while creating the account');
      });
  };

  return (
    <div
      className="relative h-screen flex justify-center items-center"
      style={{ backgroundImage: `url(${loginimage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <form onSubmit={handleCreateAccount} className="relative z-10 bg-black bg-opacity-70 p-8 rounded-md text-white max-w-xs w-full">
        {error && <div className="mb-4 text-red-600">{error}</div>}
        {successMessage && (
          <div className="mb-4 text-green-600 transition-all duration-500 transform translate-x-full">
            {successMessage}
          </div>
        )}
        <label style={{
   textAlign:"center",fontFamily:'serif',color:"whitesmoke",height: "80px",fontSize:"2rem",marginLeft:"20%"
    // Optionally add a top margin to shift upwards
  }}
>Registration</label>
        <input
          type="text"
          placeholder="FirstName"
          value={firstname}
          onChange={(e) => setFirstName(e.target.value)}
          className="block w-full mb-4 p-2 bg-gray-700 rounded text-white focus:outline-none"
          // style={{gap:"20px"}}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block w-full mb-4 p-2 bg-gray-700 rounded text-white focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full mb-4 p-2 bg-gray-700 rounded text-white focus:outline-none"
        />
        <input
          type="text"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="block w-full mb-4 p-2 bg-gray-700 rounded text-white focus:outline-none"
        />
        <button 
          type="submit"
          className="block w-full p-2 mb-4 bg-green-600 rounded text-white font-semibold"
        >
          Create Account
        </button>
        <p>Already have an account? <Link to='/' style={{color:"red"}}> SignUp</Link> </p>
        
      </form>
    </div>
  );
}

export default CreateAccountPage;
