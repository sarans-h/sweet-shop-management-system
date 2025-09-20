import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { API_PATHS } from '../constants/api';

const AuthPage: React.FC = () => {
  const [showLogin, setShowLogin] = useState(true);

  const handleLogin = async (email: string, password: string) => {
    try {
  const res = await fetch(API_PATHS.authLogin, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        alert('Login successful!');
        if (data.token) {
          localStorage.setItem('token', data.token);
          try {
            const decoded: any = jwtDecode(data.token);
            if (decoded.role) {
              localStorage.setItem('role', decoded.role);
            }
          } catch {}
        }
        // TODO: Redirect to dashboard or admin
      } else {
        alert(data.error || 'Login failed');
      }
    } catch {
      alert('Network error');
    }
  };

  const handleRegister = async (username: string, email: string, password: string, role: string) => {
    try {
  const res = await fetch(API_PATHS.authRegister, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, role })
      });
      const data = await res.json();
      if (res.ok) {
        alert('Registration successful!');
        if (data.token) {
          localStorage.setItem('token', data.token);
          try {
            const decoded: any = jwtDecode(data.token);
            if (decoded.role) {
              localStorage.setItem('role', decoded.role);
            }
          } catch {}
        }
        // TODO: Redirect to dashboard or admin
      } else {
        alert(data.error || 'Registration failed');
      }
    } catch {
      alert('Network error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-2">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl">
        <div className="flex justify-center mb-8 gap-4">
          <button
            onClick={() => setShowLogin(true)}
            disabled={showLogin}
            className={`px-5 py-2 rounded-lg font-semibold transition border-2 focus:outline-none ${showLogin ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-blue-100 dark:hover:bg-blue-900'}`}
          >
            Login
          </button>
          <button
            onClick={() => setShowLogin(false)}
            disabled={!showLogin}
            className={`px-5 py-2 rounded-lg font-semibold transition border-2 focus:outline-none ${!showLogin ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-blue-100 dark:hover:bg-blue-900'}`}
          >
            Register
          </button>
        </div>
        {showLogin ? (
          <LoginForm onLogin={handleLogin} />
        ) : (
          <RegisterForm onRegister={handleRegister as any} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
