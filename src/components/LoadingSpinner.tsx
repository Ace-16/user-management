import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500 border-solid border-opacity-50"></div>
    </div>
  );
};

export default LoadingSpinner;
