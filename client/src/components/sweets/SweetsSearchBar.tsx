import React from 'react';

interface SweetsSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SweetsSearchBar: React.FC<SweetsSearchBarProps> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search sweets..."
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full p-2 border rounded"
    />
  );
};

export default SweetsSearchBar;
