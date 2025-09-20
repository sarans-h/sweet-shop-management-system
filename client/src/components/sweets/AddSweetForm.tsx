import React, { useState } from 'react';

interface AddSweetFormProps {
  onAdd: (sweet: { name: string; category: string; price: number; quantity: number }) => void;
}

const AddSweetForm: React.FC<AddSweetFormProps> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ name, category, price, quantity });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700 dark:text-gray-200" htmlFor="name">Name</label>
        <input
          id="name"
          className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700 dark:text-gray-200" htmlFor="category">Category</label>
        <input
          id="category"
          className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={category}
          onChange={e => setCategory(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700 dark:text-gray-200" htmlFor="price">Price</label>
        <input
          id="price"
          type="number"
          className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={price}
          onChange={e => setPrice(Number(e.target.value))}
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700 dark:text-gray-200" htmlFor="quantity">Quantity</label>
        <input
          id="quantity"
          type="number"
          className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={quantity}
          onChange={e => setQuantity(Number(e.target.value))}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
      >
        Add Sweet
      </button>
    </form>
  );
};

export default AddSweetForm;
