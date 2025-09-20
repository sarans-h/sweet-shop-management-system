import React from 'react';

interface Sweet {
  _id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

interface SweetCardProps {
  sweet: Sweet;
  onPurchase: (id: string) => void;
  isAdmin?: boolean;
  onEdit?: (sweet: Sweet) => void;
  onDelete?: (id: string) => void;
}

const SweetCard: React.FC<SweetCardProps> = ({ sweet, onPurchase, isAdmin, onEdit, onDelete }) => {
  return (
    <div className="border rounded p-4 mb-4 flex flex-col gap-2">
      <h3 className="font-bold text-lg">{sweet.name}</h3>
      <div>Category: {sweet.category}</div>
      <div>Price: ₹{sweet.price}</div>
      <div>Quantity: {sweet.quantity}</div>
      <button
        disabled={sweet.quantity === 0}
        onClick={() => onPurchase(sweet._id)}
        className="bg-blue-500 text-white px-3 py-1 rounded disabled:bg-gray-400"
      >
        Purchase
      </button>
      {isAdmin && (
        <div className="flex gap-2 mt-2">
          <button onClick={() => onEdit && onEdit(sweet)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
          <button onClick={() => onDelete && onDelete(sweet._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
        </div>
      )}
    </div>
  );
};

export default SweetCard;
