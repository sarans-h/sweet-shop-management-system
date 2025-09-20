import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import SweetsDashboard from './components/sweets/SweetsDashboard';
import AdminPanel from './components/sweets/AdminPanel';

function App() {
  const [darkMode, setDarkMode] = React.useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches);

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(d => !d);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="w-full flex justify-end items-center px-6 py-4">
        <button
          className="px-4 py-2 rounded-lg border bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
        >
          {darkMode ? '🌙 Dark' : '☀️ Light'}
        </button>
      </header>
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SweetsDashboard darkMode={darkMode} />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/admin" element={<AdminPanel darkMode={darkMode} />} />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;