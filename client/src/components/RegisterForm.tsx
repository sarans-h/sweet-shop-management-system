import React, { useState } from 'react';

interface RegisterFormProps {
  onRegister: (username: string, email: string, password: string,role:string) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister(username, email, password, role);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700 dark:text-gray-200" htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
      </div>
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
      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700 dark:text-gray-200" htmlFor="role">Role</label>
        <select
          id="role"
          className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={role}
          onChange={e => setRole(e.target.value)}
          required
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
