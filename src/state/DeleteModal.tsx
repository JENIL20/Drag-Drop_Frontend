import React from 'react';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold">Are you sure you want to delete?</h2>
        <div className="flex justify-end mt-4">
          <button className="bg-gray-300 px-4 py-2 rounded mr-2" onClick={onClose}>Cancel</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={onConfirm}>Yes, Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;