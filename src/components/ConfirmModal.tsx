import React from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-bold mb-4">Confirm Action</h2>
        <p className="mb-4">{message}</p>
        <div className="flex justify-between">
          <button 
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700" 
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700" 
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};


export default ConfirmModal;
