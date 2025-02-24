import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import loginimage from '../Images/login.jpg';

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('user'); // 'user' or 'admin'
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (activeTab === 'admin') {
      if (username === 'admin@gmail.com' && password === 'admin123') {
        onLogin('admin');
        setLoading(false);
        navigate('/admindashboard');
      } else {
        setError('Invalid admin credentials');
        setLoading(false);
      }
    } else {
      try {
        const response = await axios.post('http://localhost:3000/auth/login', {
          username,
          password,
        });

        if (response.data.message === 'Success') {
          // Save the token
          localStorage.setItem("token", response.data.token);
          onLogin(username);
          navigate('/');
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        console.error('Error logging in:', error);
        setError('An error occurred during login');
      }
      setLoading(false);
    }
  };

  const handleCreateAccountClick = () => {
    navigate('/create-account');
  };

  return (
    <div
      className="relative h-screen flex flex-col justify-center items-center"
      style={{ backgroundImage: `url(${loginimage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <h1 className="relative z-10 text-4xl font-bold text-white mb-8 bg-black bg-opacity-70 px-6 py-2 rounded-md shadow-lg"
       style={{ fontFamily: 'Sandra'}}>
        Video Management System
      </h1>
      <form onSubmit={handleSubmit} className="relative z-10 bg-black bg-opacity-70 p-8 rounded-md text-white max-w-xs w-full">
        <div className="flex mb-4">
          <button
            type="button"
            className={`flex-1 p-2 ${activeTab === 'user' ? 'bg-blue-600' : 'bg-gray-600'} rounded-l`}
            onClick={() => setActiveTab('user')}
          >
            User
          </button>
          <button
            type="button"
            className={`flex-1 p-2 ${activeTab === 'admin' ? 'bg-blue-600' : 'bg-gray-600'} rounded-r`}
            onClick={() => setActiveTab('admin')}
          >
            Admin
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 border-t-blue-500 animate-spin"></div>
          </div>
        ) : (
          <>
            {error && <div className="mb-4 text-red-600">{error}</div>}
            <h1 className="text-center text-2xl mb-4">{activeTab === 'user' ? 'User Login' : 'Admin Login'}</h1>
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
            <button
              type="submit"
              className="block w-full p-2 mb-4 bg-red-600 rounded text-white font-semibold"
            >
              Sign In
            </button>
            {activeTab === 'user' && (
              <button
                type="button"
                className="block w-full p-2 mb-4 bg-green-600 rounded text-white font-semibold"
                onClick={handleCreateAccountClick}
              >
                Create Account
              </button>
            )}
          </>
        )}
      </form>
    </div>
  );
}

export default LoginPage;
