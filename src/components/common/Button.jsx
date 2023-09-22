import React from 'react';

export const Button = ({ text }) => {
  return (
    <button
      type="submit"
      className="rounded shadow bg-green-700 text-white py-2 px-4"
    >
      {text}
    </button>
  );
};
