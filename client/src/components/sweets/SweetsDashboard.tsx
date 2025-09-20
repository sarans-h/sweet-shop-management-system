import React, { useEffect, useState } from 'react';
// import { useDarkMode } from '../../DarkModeContext';
import { useNavigate } from 'react-router-dom';
import SweetCard from './SweetCard';
import SweetsSearchBar from './SweetsSearchBar';
import { API_PATHS } from '../../constants/api';

interface Sweet {
  _id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

interface SweetsDashboardProps {
  darkMode?: boolean;
}

const SweetsDashboard: React.FC<SweetsDashboardProps> = () => {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/auth');
      return;
    }
  fetch(API_PATHS.sweets, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => setSweets(data))
      .catch(() => setSweets([]));
  }, [navigate]);

  const handlePurchase = async (id: string) => {
    try {
  const res = await fetch(API_PATHS.sweetPurchase(id), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        const updated = await res.json();
        setSweets(sweets => sweets.map(s => s._id === id ? { ...s, quantity: updated.quantity } : s));
        alert('Purchase successful!');
      } else {
        const error = await res.json();
        alert(error.error || 'Purchase failed');
      }
    } catch (err) {
      alert('Network error');
    }
  };

  const filteredSweets = sweets.filter(sweet =>
    sweet.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-2">
      <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-300 text-center">Sweet Shop Dashboard</h1>
        </div>
        <div className="flex justify-center mb-6">
          <SweetsSearchBar value={search} onChange={setSearch} />
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filteredSweets.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 dark:text-gray-300 text-base py-6 border rounded-lg bg-gray-100 dark:bg-gray-700">No sweets found. Try searching for something else or check back later!</div>
          ) : (
            filteredSweets.map(sweet => (
              <div className="hover:shadow-lg transition-shadow rounded-lg dark:hover:shadow-blue-900">
                <SweetCard key={sweet._id} sweet={sweet} onPurchase={handlePurchase} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SweetsDashboard;
