import React, { useState } from 'react';

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700 dark:text-gray-200" htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700 dark:text-gray-200" htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
