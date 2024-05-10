import React, { useState } from 'react';
import InputField from '../components/Input/InputLogin'; // Importa il componente InputField
import useFetch from '../hooks/useFetch';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="flex items-center justify-center mt-20">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4" action='/settings'>
          <InputField // Usa il componente InputField per i campi di input
            id="username"
            type="text"
            label="Username:"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputField
            id="password"
            type="password"
            label="Password:"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
