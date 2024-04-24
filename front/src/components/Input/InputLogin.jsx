import React from 'react';

const InputField = ({ id, type, label, value, onChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        placeholder={`Enter ${label}`}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
