import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SweetCard from './SweetCard';
import AddSweetForm from './AddSweetForm';
import UpdateSweetForm from './UpdateSweetForm';
import { API_PATHS } from '../../constants/api';

interface Sweet {
  _id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

interface AdminPanelProps {
  darkMode?: boolean;
}

const AdminPanel: React.FC<AdminPanelProps> = () => {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [editingSweet, setEditingSweet] = useState<Sweet | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (!token || role !== 'admin') {
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

  const handleEdit = (sweet: Sweet) => {
    setEditingSweet(sweet);
    setShowEditModal(true);
  };
  const handleDelete = async (id: string) => {
    try {
  const res = await fetch(API_PATHS.sweet(id), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
      });
      if (res.ok) {
        setSweets(sweets => sweets.filter(s => s._id !== id));
        alert('Sweet deleted');
      } else {
        const error = await res.json();
        alert(error.error || 'Delete failed');
      }
    } catch {
      alert('Network error');
    }
  };

  const handleAddSweet = async (sweet: { name: string; category: string; price: number; quantity: number }) => {
    try {
  const res = await fetch(API_PATHS.sweets, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sweet)
      });
      if (res.ok) {
        const newSweet = await res.json();
  setSweets(sweets => [...sweets, newSweet]);
  setShowAddModal(false);
  alert('Sweet added');
      } else {
        const error = await res.json();
        alert(error.error || 'Add failed');
      }
    } catch {
      alert('Network error');
    }
  };

  const handleUpdateSweet = async (sweet: Sweet) => {
    try {
  const res = await fetch(API_PATHS.sweet(sweet._id), {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sweet)
      });
      if (res.ok) {
        const updated = await res.json();
        setSweets(sweets => sweets.map(s => s._id === sweet._id ? updated : s));
  setEditingSweet(null);
  setShowEditModal(false);
  alert('Sweet updated');
      } else {
        const error = await res.json();
        alert(error.error || 'Update failed');
      }
    } catch {
      alert('Network error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-2">
      <div className="max-w-4xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h2 className="text-2xl font-extrabold text-blue-700 dark:text-blue-300">Admin Panel</h2>
          <button
            className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
            onClick={() => setShowAddModal(true)}
          >
            + Add Sweet
          </button>
        </div>
        <div className="mt-4">
          {sweets.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-300 py-8">No sweets available.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {sweets.map(sweet => (
                <SweetCard
                  key={sweet._id}
                  sweet={sweet}
                  onPurchase={() => {}}
                  isAdmin
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Sweet Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-2xl"
              onClick={() => setShowAddModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-6 text-blue-700 dark:text-blue-300">Add Sweet</h3>
            <AddSweetForm onAdd={handleAddSweet} />
          </div>
        </div>
      )}

      {/* Edit Sweet Modal */}
      {showEditModal && editingSweet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-2xl"
              onClick={() => { setShowEditModal(false); setEditingSweet(null); }}
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-6 text-blue-700 dark:text-blue-300">Edit Sweet</h3>
            <UpdateSweetForm sweet={editingSweet} onUpdate={handleUpdateSweet} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
